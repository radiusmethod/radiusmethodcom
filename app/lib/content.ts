import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

export type ContentType = 'news' | 'articles' | 'blog'

export interface ContentItem {
  slug: string
  title: string
  date: string
  image: string
  tags: string[]
  content: string
  type: ContentType
}

export interface ContentMetadata {
  slug: string
  title: string
  date: string
  image: string
  tags: string[]
  type: ContentType
}

export async function getContentByType(type: ContentType): Promise<ContentMetadata[]> {
  const typeDirectory = path.join(contentDirectory, type)
  const fileNames = fs.readdirSync(typeDirectory)
  
  const allContent = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(typeDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    return {
      slug,
      title: data.title,
      date: data.date,
      image: data.image,
      tags: data.tags || [],
      type
    }
  })

  return allContent.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
}

export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  // Search through all content types
  const types: ContentType[] = ['news', 'articles', 'blog']
  
  for (const type of types) {
    const typeDirectory = path.join(contentDirectory, type)
    const filePath = path.join(typeDirectory, `${slug}.md`)
    
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      const processedContent = await remark()
        .use(html)
        .process(content)
      
      return {
        slug,
        title: data.title,
        date: data.date,
        image: data.image,
        tags: data.tags || [],
        content: processedContent.toString(),
        type
      }
    }
  }
  
  return null
}

export function getAllContentTypes(): ContentType[] {
  return fs.readdirSync(contentDirectory)
    .filter(item => fs.statSync(path.join(contentDirectory, item)).isDirectory()) as ContentType[]
} 