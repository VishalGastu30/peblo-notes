'use client';

import React from 'react';
import { Users, Globe, ExternalLink } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { TopBar } from '@/components/layout/top-bar';
import { useNotes } from '@/hooks/use-notes';
import { NoteCard } from '@/components/notes/note-card';
import { useEditorStore } from '@/stores/editor-store';
import { useRouter } from 'next/navigation';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function SharedPage() {
  const { notes, isLoading } = useNotes({ archived: false });
  const { setActiveNote } = useEditorStore();
  const router = useRouter();
  
  const sharedNotes = notes?.filter((n: any) => n.isPublic) || [];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar">
      <TopBar title="Shared Notes" />

      <div className="p-margin-desktop flex-1">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Info Card */}
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-8 border border-primary/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-title-md text-on-surface">Publicly Shared</h3>
                <p className="text-body-sm text-on-surface-variant">Notes you&apos;ve made accessible via share links</p>
              </div>
            </div>
          </motion.div>

          {/* Notes List */}
          {isLoading ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : sharedNotes.length > 0 ? (
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sharedNotes.map((note: any) => (
                <NoteCard 
                  key={note.id} 
                  note={note} 
                  isActive={false} 
                  onClick={() => {
                    setActiveNote(note.id);
                    router.push('/workspace');
                  }} 
                />
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-16 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-surface-variant/30 border border-white/5 flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-outline" />
              </div>
              <h3 className="font-title-md text-on-surface mb-2">No shared notes yet</h3>
              <p className="text-body-sm text-on-surface-variant max-w-sm mb-8">
                When you share a note publicly, it will appear here. Open any note and click the Share button to generate a public link.
              </p>
              <div className="flex items-center gap-2 text-primary text-body-sm font-medium">
                <ExternalLink className="w-4 h-4" />
                <span>Public links are accessible to anyone</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
