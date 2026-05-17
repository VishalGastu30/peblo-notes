import React from "react"
import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { MoreVertical, Pin, Archive, Trash2, Share, AlertTriangle, Loader2 } from "lucide-react"
import { useState } from "react"
import { useOptimisticAction } from "@/hooks/use-optimistic-action"
import { mutate } from "swr"

interface NoteCardProps {
  note: any
  isActive: boolean
  onClick: () => void
  variants?: any
}

export function NoteCard({ note, isActive, onClick, variants }: NoteCardProps) {
  // Use note.content and strip HTML if note.contentText is not available
  const previewText = note.contentText || (note.content ? note.content.replace(/<[^>]*>?/gm, '') : 'No content...')
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { execute } = useOptimisticAction()

  const refreshNotes = () => mutate((key) => typeof key === 'string' && key.startsWith('/api/notes'))

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation()
    execute({
      apiCall: () => fetch(`/api/notes/${note.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isPinned: !note.isPinned }) }),
      onOptimistic: () => { note.isPinned = !note.isPinned; refreshNotes() },
      onRevert: () => { note.isPinned = !note.isPinned; refreshNotes() },
      successMessage: note.isPinned ? 'Note unpinned' : 'Note pinned'
    })
  }

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation()
    execute({
      apiCall: () => fetch(`/api/notes/${note.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isArchived: true }) }),
      onOptimistic: () => { note.isArchived = true; refreshNotes() },
      onRevert: () => { note.isArchived = false; refreshNotes() },
      successMessage: 'Note archived'
    })
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/notes/${note.id}`, { method: 'DELETE' })
      if (res.ok) refreshNotes()
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -2, scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "p-5 rounded-[24px] border cursor-pointer group transition-all duration-300 relative overflow-hidden",
        isActive
          ? "bg-surface-variant/30 border-primary/30 shadow-[0_0_20px_rgba(242,202,80,0.15)] ring-1 ring-primary/20"
          : "bg-surface-container hover:bg-surface-variant/50 border-white/5"
      )}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-r-full"></div>
      )}

      <div className={cn("flex justify-between items-start mb-2 relative", isActive && "pl-2")}>
        <h3
          className={cn(
            "font-title-md text-[18px] transition-colors pr-8",
            isActive
              ? "text-primary group-hover:underline decoration-primary/50 underline-offset-4"
              : "text-on-surface group-hover:text-primary"
          )}
        >
          {note.title || "Untitled"}
        </h3>
        
        {/* Dropdown Menu */}
        <div className="absolute right-0 top-0">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild onClick={(e) => e.stopPropagation()}>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-outline hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content 
                align="end"
                className="z-50 min-w-[160px] bg-surface-container-high border border-white/10 rounded-xl p-1 shadow-2xl animate-in fade-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenu.Item onClick={handlePin} className="flex items-center gap-2 px-3 py-2 text-sm text-on-surface hover:bg-white/5 rounded-lg cursor-pointer outline-none transition-colors">
                  <Pin className="w-4 h-4" />
                  {note.isPinned ? 'Unpin Note' : 'Pin Note'}
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={handleArchive} className="flex items-center gap-2 px-3 py-2 text-sm text-on-surface hover:bg-white/5 rounded-lg cursor-pointer outline-none transition-colors">
                  <Archive className="w-4 h-4" />
                  Archive Note
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-px bg-white/10 my-1" />
                <DropdownMenu.Item onClick={() => setShowDeleteDialog(true)} className="flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-lg cursor-pointer outline-none transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete Note
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      <p className={cn("text-body-sm text-on-surface-variant line-clamp-2 mb-4 leading-relaxed", isActive && "pl-2")}>
        {previewText}
      </p>

      <div className={cn("flex flex-wrap gap-2 items-center", isActive && "pl-2")}>
        {note.category && (
          <span className="px-2 py-0.5 bg-surface-variant text-outline text-[10px] rounded border border-white/5 font-medium">
            {note.category.name}
          </span>
        )}
        {note.tags?.map((tag: any) => (
          <span
            key={tag.id}
            className="px-2 py-0.5 bg-secondary-container/30 text-secondary text-[10px] rounded border border-secondary/10 font-medium"
          >
            {tag.name}
          </span>
        ))}
        {note.isArchived && (
          <span className="px-2 py-0.5 bg-destructive/20 text-destructive text-[10px] rounded border border-destructive/20 font-medium">
            ARCHIVED
          </span>
        )}
        {note.isPublic && (
          <span className="px-2 py-0.5 bg-tertiary-container/30 text-tertiary text-[10px] rounded border border-tertiary/20 font-medium">
            SHARED
          </span>
        )}
        {note.isPinned && (
          <span className="ml-auto text-primary">
            <Pin className="w-3 h-3 fill-current" />
          </span>
        )}
        <span className="text-[10px] text-outline font-medium tracking-wider whitespace-nowrap ml-auto">
          {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
        </span>
      </div>

      {/* Delete Confirmation Dialog inside the card */}
      {showDeleteDialog && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => { e.stopPropagation(); setShowDeleteDialog(false) }}
        >
          <div 
            className="bg-surface-container-high border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-error" />
              </div>
              <h3 className="font-title-md text-on-surface text-lg">Delete note?</h3>
            </div>
            <p className="text-body-sm text-on-surface-variant mb-6">
              This action cannot be undone. The note will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowDeleteDialog(false) }}
                className="flex-1 py-2.5 border border-white/10 text-on-surface rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete() }}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-error text-white rounded-xl text-sm font-medium hover:bg-error/90 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
