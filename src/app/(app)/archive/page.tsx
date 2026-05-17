'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Archive, Loader2, RotateCcw, Trash2, AlertTriangle, PackageOpen, Search } from 'lucide-react';
import { useNotes } from '@/hooks/use-notes';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { SearchBar } from '@/components/notes/search-bar';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function ArchivePage() {
  const { notes, isLoading, mutate } = useNotes({ archived: true });
  const { toast } = useToast();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredNotes = notes?.filter((n: any) =>
    (n.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (n.contentText || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestore = async (noteId: string) => {
    setLoadingAction(noteId);
    try {
      const res = await fetch(`/api/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isArchived: false }),
      });
      if (!res.ok) throw new Error('Failed to restore');
      toast({ title: 'Note restored successfully' });
      mutate();
    } catch {
      toast({ title: 'Failed to restore note', variant: 'destructive' });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDelete = async (noteId: string) => {
    setLoadingAction(noteId);
    try {
      const res = await fetch(`/api/notes/${noteId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast({ title: 'Note permanently deleted' });
      setDeleteTarget(null);
      mutate();
    } catch {
      toast({ title: 'Failed to delete note', variant: 'destructive' });
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="grid grid-cols-12 h-full w-full">
      {/* Left: Archive List */}
      <section className="col-span-4 border-r border-white/5 bg-surface-container-lowest flex flex-col h-full">
        <div className="p-6 space-y-6 shrink-0">
          <div>
            <h2 className="font-display-hero text-[32px] text-on-surface flex items-center gap-3">
              <Archive className="text-error w-8 h-8" />
              Archived
            </h2>
            <p className="font-label-caps text-[12px] text-outline mt-1 tracking-widest uppercase">
              {filteredNotes?.length || 0} archived notes
            </p>
          </div>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            isFocused={isFocused}
            onFocusChange={setIsFocused}
          />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-3 pb-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="w-6 h-6 animate-spin text-primary/50" />
            </div>
          ) : filteredNotes?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-48 text-center space-y-3"
            >
              <Archive className="w-10 h-10 text-outline/30" />
              <p className="text-body-sm text-on-surface-variant">No archived notes</p>
            </motion.div>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
              {filteredNotes?.map((note: any) => (
                <motion.div
                  key={note.id}
                  variants={itemVariants}
                  className="relative p-5 rounded-2xl bg-surface-container hover:bg-surface-variant/30 border border-white/5 cursor-pointer transition-all group opacity-80 hover:opacity-100"
                >
                  <div className="absolute top-4 right-4 px-2 py-0.5 bg-error/15 text-error text-[9px] font-bold tracking-widest uppercase rounded-full border border-error/10">
                    Archived
                  </div>
                  <h3 className="font-title-md text-[16px] text-on-surface group-hover:text-primary transition-colors pr-20 truncate">
                    {note.title || 'Untitled'}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                    {note.contentText || note.content?.replace(/<[^>]*>?/gm, '') || 'No content...'}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    {note.category && (
                      <span className="px-2 py-0.5 bg-surface-variant text-outline text-[10px] rounded border border-white/5 font-medium">
                        {note.category.name}
                      </span>
                    )}
                    <span className="text-[10px] text-outline">
                      {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                    </span>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRestore(note.id); }}
                      disabled={loadingAction === note.id}
                      className="w-8 h-8 rounded-full bg-surface-bright flex items-center justify-center text-primary hover:brightness-110 border border-white/10 shadow-lg disabled:opacity-50"
                      title="Restore"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteTarget(note.id); }}
                      disabled={loadingAction === note.id}
                      className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center text-error hover:bg-error/20 border border-error/10 shadow-lg disabled:opacity-50"
                      title="Delete permanently"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Right: Empty State */}
      <section className="col-span-8 bg-surface flex flex-col h-full items-center justify-center p-12 text-center">
        <div className="w-32 h-32 mb-8 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 shadow-[0_0_40px_rgba(242,202,80,0.05)]">
          <PackageOpen className="w-16 h-16 text-primary/40" />
        </div>
        <h2 className="font-display-hero text-[40px] text-on-surface mb-4">Select a note to preview.</h2>
        <p className="font-body-lg text-on-surface-variant max-w-md mx-auto mb-8">
          Archived notes are read-only. Restore them to edit or interact with the AI assistant.
        </p>
      </section>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-container-high border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-error" />
                </div>
                <h3 className="font-title-md text-on-surface text-lg">Delete permanently?</h3>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-6">
                This action cannot be undone. The note and all its data will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 border border-white/10 text-on-surface rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteTarget)}
                  disabled={loadingAction === deleteTarget}
                  className="flex-1 py-2.5 bg-error text-white rounded-xl text-sm font-medium hover:bg-error/90 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {loadingAction === deleteTarget ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
