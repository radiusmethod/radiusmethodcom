import { getContentByType } from '../lib/content'
import ContentLanding from '../components/ContentLanding'

export default async function NewsPage() {
  const content = await getContentByType('news')
  console.log('News content:', content) // Debug log
  return <ContentLanding content={content} type="news" />
} 