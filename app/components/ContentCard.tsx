import Link from 'next/link'
import Image from 'next/image'
import { ContentMetadata } from '../lib/content'
import styles from './ContentCard.module.css'

interface ContentCardProps {
  content: ContentMetadata
}

export default function ContentCard({ content }: ContentCardProps) {
  console.log('Rendering card for:', content.title, 'with image:', content.image)
  
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={content.image}
          alt={content.title}
          width={800}
          height={450}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          priority={content.slug === 'zero-trust-initiative'}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.date}>
          {new Date(content.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div className={styles.title}>{content.title}</div>
        <Link href={`/${content.slug}`} className={styles.readMore}>
          Read More <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
} 