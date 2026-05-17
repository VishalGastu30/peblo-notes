import React from 'react';
import { NoteList } from '@/components/notes/note-list';
import { NoteEditor } from '@/components/notes/note-editor';
import { AIPanel } from '@/components/ai/ai-panel';
import { Group, Panel, Separator } from 'react-resizable-panels';

export default async function NoteDetailPage({ params }: { params: Promise<{ noteId: string }> }) {
  const { noteId } = await params;

  return (
    <Group orientation="horizontal" className="h-full w-full">
      {/* Note List Panel - 25% */}
      <Panel id="list" defaultSize="25%" minSize="15%" maxSize="35%">
        <NoteList initialNoteId={noteId} />
      </Panel>

      <Separator id="handle-1" style={{ width: '4px', background: 'rgba(255,255,255,0.06)' }} />

      {/* Editor Panel - 50% */}
      <Panel id="editor" defaultSize="50%" minSize="25%">
        <NoteEditor />
      </Panel>

      <Separator id="handle-2" style={{ width: '4px', background: 'rgba(255,255,255,0.06)' }} />

      {/* AI Insights Panel - 25% */}
      <Panel id="ai" defaultSize="25%" minSize="15%" maxSize="35%">
        <AIPanel />
      </Panel>
    </Group>
  );
}
