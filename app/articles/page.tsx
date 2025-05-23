import { getContentByType } from '../lib/content'
import ContentLanding from '../components/ContentLanding'

export default async function ArticlesPage() {
  const content = await getContentByType('articles')
  return <ContentLanding content={content} type="articles" />
} 