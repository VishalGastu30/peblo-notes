import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Metadata } from "next"

// Server Component for fetching the shared note
async function getSharedNote(shareId: string) {
  const note = await prisma.note.findUnique({
    where: { shareId },
    include: {
      user: { select: { name: true } },
      tags: { include: { tag: true } }
    }
  })

  if (!note || !note.isPublic) {
    return null
  }

  return {
    title: note.title,
    content: note.content,
    authorName: note.user.name ? note.user.name.split(' ')[0] : 'Someone',
    updatedAt: note.updatedAt,
    readTime: Math.max(1, Math.ceil((note.content?.split(' ').length || 0) / 200)),
    tags: note.tags.map(t => t.tag.name)
  }
}

// Generate Open Graph Metadata
export async function generateMetadata({ params }: { params: Promise<{ shareId: string }> }): Promise<Metadata> {
  const { shareId } = await params;
  const note = await getSharedNote(shareId)
  
  if (!note) {
    return { title: 'Note Not Found | Peblo Notes' }
  }

  const title = note.title || 'Untitled Note'
  
  // Strip HTML for description
  const cleanContent = note.content ? note.content.replace(/<[^>]*>?/gm, '') : ''
  const description = cleanContent ? cleanContent.substring(0, 150) + '...' : 'A note shared via Peblo.'

  return {
    title: `${title} | Peblo Notes`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      authors: [note.authorName]
    }
  }
}

export default async function SharedNotePage({ params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params;
  const note = await getSharedNote(shareId)

  if (!note) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-6 sm:px-12 lg:px-24">
      {/* Read-only Document Container */}
      <div className="w-full max-w-3xl glass-card rounded-[32px] p-8 sm:p-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
        
        {/* Header */}
        <header className="mb-12 relative z-10 border-b border-white/5 pb-8">
          <h1 className="font-display-hero text-4xl sm:text-5xl text-on-surface mb-6 leading-tight">
            {note.title || 'Untitled Note'}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-body-sm text-outline">
            <span className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
                {note.authorName.charAt(0)}
              </div>
              {note.authorName}
            </span>
            <span>•</span>
            <span>{new Date(note.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span>{note.readTime} min read</span>
          </div>

          {note.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {note.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-surface-variant/50 text-on-surface-variant border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content Canvas */}
        <div 
          className="prose prose-invert max-w-none text-body-lg text-on-surface-variant space-y-6 leading-relaxed relative z-10"
          dangerouslySetInnerHTML={{ __html: note.content || '<p>No content...</p>' }}
        />

        {/* Footer Branding */}
        <footer className="mt-20 pt-8 border-t border-white/5 flex items-center justify-between text-body-sm text-outline relative z-10">
          <p>Shared via <strong className="text-primary font-title-md">Peblo</strong></p>
          <a href="/" className="hover:text-primary transition-colors hover:underline">Create your own</a>
        </footer>
      </div>
    </div>
  )
}
