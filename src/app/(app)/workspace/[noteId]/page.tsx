import React from 'react';
import { NoteList } from '@/components/notes/note-list';
import { NoteEditor } from '@/components/notes/note-editor';
import { AIPanel } from '@/components/ai/ai-panel';

export default async function NoteDetailPage({ params }: { params: Promise<{ noteId: string }> }) {
  const { noteId } = await params;
  
  return (
    <div className="grid grid-cols-12 h-full w-full">
      <NoteList initialNoteId={noteId} />
      <NoteEditor />
      <AIPanel />
    </div>
  );
}
