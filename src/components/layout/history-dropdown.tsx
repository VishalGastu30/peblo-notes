'use client';

import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { History, FileText } from 'lucide-react';
import { useNotes } from '@/hooks/use-notes';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEditorStore } from '@/stores/editor-store';

export function HistoryDropdown() {
  const { notes } = useNotes({ sort: 'updated', archived: false });
  const router = useRouter();
  const { setActiveNote } = useEditorStore();
  
  const recentNotes = notes?.slice(0, 5) || [];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="hover:text-primary transition-colors p-1">
          <History className="w-5 h-5" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content 
          className="z-50 w-72 bg-surface-container-high border border-white/10 rounded-2xl shadow-xl p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
          sideOffset={12}
          align="end"
        >
          <div className="mb-4 px-2">
            <h3 className="font-title-md text-on-surface">Recent Notes</h3>
          </div>
          <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar">
            {recentNotes.length === 0 ? (
              <p className="text-body-sm text-outline px-2">No recent notes</p>
            ) : (
              recentNotes.map((note: any) => (
                <div 
                  key={note.id} 
                  className="p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer flex gap-3 group"
                  onClick={() => {
                    setActiveNote(note.id);
                    router.push('/workspace');
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0 border border-white/5 group-hover:border-primary/30 transition-colors">
                    <FileText className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-on-surface truncate group-hover:text-primary transition-colors">{note.title || 'Untitled'}</p>
                    <p className="text-[10px] text-outline mt-0.5">{formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
