import { ContentMetadata } from '../lib/content'
import ContentCard from './ContentCard'
import styles from './ContentLanding.module.css'

interface ContentLandingProps {
  content: ContentMetadata[]
  type: string
}

export default function ContentLanding({ content, type }: ContentLandingProps) {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        {content.map((item) => (
          <ContentCard key={item.slug} content={item} />
        ))}
      </div>
    </div>
  )
} 