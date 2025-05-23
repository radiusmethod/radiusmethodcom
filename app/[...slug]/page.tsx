import { getContentBySlug } from '../lib/content'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface ContentPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: ContentPageProps): Promise<Metadata> {
  const slug = params.slug.join('/')
  const content = await getContentBySlug(slug)
  
  if (!content) {
    return {
      title: 'Not Found'
    }
  }

  return {
    title: content.title,
    description: content.content.substring(0, 160)
  }
}

export default async function ContentPage({ params }: ContentPageProps) {
  const slug = params.slug.join('/')
  const content = await getContentBySlug(slug)
  
  if (!content) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.content }} />
    </article>
  )
} 