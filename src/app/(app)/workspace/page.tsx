'use client';

import React, { useState } from 'react';
import { NoteList } from '@/components/notes/note-list';
import { NoteEditor } from '@/components/notes/note-editor';
import { AIPanel } from '@/components/ai/ai-panel';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { useEditorStore } from '@/stores/editor-store';
import { ArrowLeft, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

function MobileWorkspace() {
  const { activeNoteId, setActiveNote } = useEditorStore();
  const [showAI, setShowAI] = useState(false);

  // If AI panel is open, show that
  if (showAI) {
    return (
      <div className="flex flex-col h-full w-full pb-20">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-surface shrink-0">
          <button onClick={() => setShowAI(false)} className="p-1 text-outline hover:text-on-surface transition-colors">
            <X className="w-5 h-5" />
          </button>
          <span className="font-title-md text-sm text-on-surface">AI Assistant</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <AIPanel />
        </div>
      </div>
    );
  }

  // If a note is active, show the editor
  if (activeNoteId) {
    return (
      <div className="flex flex-col h-full w-full pb-20">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-surface shrink-0">
          <button onClick={() => setActiveNote(null)} className="flex items-center gap-2 text-outline hover:text-on-surface transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Notes</span>
          </button>
          <button
            onClick={() => setShowAI(true)}
            className="p-2 text-outline hover:text-primary transition-colors rounded-lg hover:bg-white/5"
          >
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <NoteEditor />
        </div>
      </div>
    );
  }

  // Default: show the note list
  return (
    <div className="flex flex-col h-full w-full pb-20">
      <NoteList />
    </div>
  );
}

function DesktopWorkspace() {
  return (
    <Group orientation="horizontal" className="h-full w-full">
      {/* Note List Panel - 25% */}
      <Panel id="list" defaultSize="25%" minSize="15%" maxSize="35%">
        <NoteList />
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

export default function WorkspacePage() {
  return (
    <>
      {/* Desktop: full 3-panel layout */}
      <div className="hidden md:block h-full w-full">
        <DesktopWorkspace />
      </div>
      {/* Mobile: single-panel stacked view */}
      <div className="block md:hidden h-full w-full">
        <MobileWorkspace />
      </div>
    </>
  );
}
