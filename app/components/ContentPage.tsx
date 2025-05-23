import { ContentItem } from '../lib/content'

interface ContentPageProps {
  content: ContentItem
}

export default function ContentPage({ content }: ContentPageProps) {
  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <time dateTime={content.date}>
            {new Date(content.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <div className="flex gap-2">
            {content.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </article>
  )
} 