import React from "react"
import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface NoteCardProps {
  note: any
  isActive: boolean
  onClick: () => void
  variants?: any
}

export function NoteCard({ note, isActive, onClick, variants }: NoteCardProps) {
  // Use note.content and strip HTML if note.contentText is not available
  const previewText = note.contentText || (note.content ? note.content.replace(/<[^>]*>?/gm, '') : 'No content...')
  
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -2, scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "p-5 rounded-[24px] border cursor-pointer group transition-all duration-300 relative overflow-hidden",
        isActive
          ? "bg-primary/5 border-primary/20 shadow-[0_0_20px_rgba(242,202,80,0.05)]"
          : "bg-surface-container hover:bg-surface-variant/50 border-white/5"
      )}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-r-full"></div>
      )}

      <div className={cn("flex justify-between items-start mb-2", isActive && "pl-2")}>
        <h3
          className={cn(
            "font-title-md text-[18px] transition-colors",
            isActive
              ? "text-primary group-hover:underline decoration-primary/50 underline-offset-4"
              : "text-on-surface group-hover:text-primary"
          )}
        >
          {note.title || "Untitled"}
        </h3>
        <span className="text-[10px] text-outline font-medium tracking-wider whitespace-nowrap ml-2">
          {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
        </span>
      </div>

      <p className={cn("text-body-sm text-on-surface-variant line-clamp-2 mb-4 leading-relaxed", isActive && "pl-2")}>
        {previewText}
      </p>

      <div className={cn("flex flex-wrap gap-2", isActive && "pl-2")}>
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
      </div>
    </motion.div>
  )
}
