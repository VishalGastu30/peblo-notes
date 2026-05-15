import React from 'react';
import { NoteList } from '@/components/notes/note-list';
import { NoteEditor } from '@/components/notes/note-editor';
import { AIPanel } from '@/components/ai/ai-panel';

export default function WorkspacePage() {
  return (
    <div className="grid grid-cols-12 h-full w-full">
      <NoteList />
      <NoteEditor />
      <AIPanel />
    </div>
  );
}
