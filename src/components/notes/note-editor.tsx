'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Bold, Italic, List, ListOrdered, Link as LinkIcon, Share2, MoreHorizontal, 
  Loader2, Strikethrough, Code, Quote, Heading1, Heading2, Heading3, Minus, Undo, Redo
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEditorStore } from '@/stores/editor-store';
import { useNote } from '@/hooks/use-note';
import { cn } from '@/lib/utils';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { AutosaveIndicator } from './autosave-indicator';
import { ShareDialog } from './share-dialog';

// Toolbar button component for cleaner rendering
function ToolbarButton({ 
  onClick, 
  isActive, 
  children, 
  title 
}: { 
  onClick: () => void; 
  isActive?: boolean; 
  children: React.ReactNode; 
  title?: string;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault(); // Prevent editor blur
        onClick();
      }}
      title={title}
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer group",
        isActive
          ? "bg-primary/15 text-primary shadow-sm"
          : "text-outline hover:text-on-surface hover:bg-white/5"
      )}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-4 bg-white/10 mx-1" />;
}

export function NoteEditor() {
  const { activeNoteId, autosaveStatus } = useEditorStore();
  const { note, isLoading, handleEditorChange, updateNote } = useNote(activeNoteId);

  const [title, setTitle] = useState('');
  const titleSaveRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Placeholder.configure({
        placeholder: 'Start typing...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: note?.content || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: 'flex: 1; min-height: 100%; outline: none; cursor: text; padding-bottom: 8rem;',
      },
    },
    onUpdate: ({ editor }) => {
      handleEditorChange(editor.getHTML(), editor.getText());
    },
  });

  // Keep editable state in sync with activeNoteId
  useEffect(() => {
    if (editor) {
      editor.setEditable(!!activeNoteId);
    }
  }, [editor, activeNoteId]);

  // Sync content when note changes
  useEffect(() => {
    if (note && editor && note.id === activeNoteId) {
      if (editor.getHTML() !== note.content) {
        editor.commands.setContent(note.content || '');
      }
      setTitle(note.title || '');
    }
  }, [note?.id, activeNoteId, editor]);

  // Debounced title save — 1.5s after user stops typing
  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
    if (titleSaveRef.current) clearTimeout(titleSaveRef.current);
    titleSaveRef.current = setTimeout(() => {
      updateNote({ title: value });
    }, 1500);
  }, [updateNote]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (titleSaveRef.current) clearTimeout(titleSaveRef.current);
    };
  }, []);

  if (!activeNoteId) {
    return (
      <section className="bg-surface flex items-center justify-center h-full w-full">
        <div className="text-center opacity-50">
          <p className="font-title-md text-xl text-on-surface">No note selected</p>
          <p className="text-body-sm text-on-surface-variant mt-2">Select a note from the sidebar or create a new one.</p>
        </div>
      </section>
    );
  }

  if (isLoading && !note) {
    return (
      <section className="bg-surface flex items-center justify-center h-full w-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
      </section>
    );
  }

  return (
    <section className="bg-surface flex flex-col h-full w-full relative overflow-hidden z-0 border-x border-white/5 shadow-2xl">
      {/* Background glow when editor is active */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000 opacity-50"></div>

      {/* Toolbar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-14 md:h-16 flex items-center justify-between px-3 md:px-6 border-b border-white/5 relative z-10 bg-surface/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
      >
        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-white/5 overflow-x-auto no-scrollbar">
          {/* Text Formatting */}
          <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} isActive={editor?.isActive('bold')} title="Bold (Ctrl+B)">
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} isActive={editor?.isActive('italic')} title="Italic (Ctrl+I)">
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().toggleStrike().run()} isActive={editor?.isActive('strike')} title="Strikethrough">
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().toggleCode().run()} isActive={editor?.isActive('code')} title="Inline Code">
            <Code className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Headings */}
          <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor?.isActive('heading', { level: 1 })} title="Heading 1">
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor?.isActive('heading', { level: 2 })} title="Heading 2">
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor?.isActive('heading', { level: 3 })} title="Heading 3">
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Lists */}
          <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} isActive={editor?.isActive('bulletList')} title="Bullet List">
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} isActive={editor?.isActive('orderedList')} title="Numbered List">
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Block elements */}
          <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()} isActive={editor?.isActive('blockquote')} title="Quote">
            <Quote className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
            <Minus className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Undo / Redo */}
          <ToolbarButton onClick={() => editor?.chain().focus().undo().run()} title="Undo (Ctrl+Z)">
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().redo().run()} title="Redo (Ctrl+Shift+Z)">
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0 ml-2">
          <AutosaveIndicator status={autosaveStatus as any} />
          <div className="flex items-center gap-2">
            <ShareDialog 
              noteId={note?.id} 
              isPublic={note?.isPublic || false} 
              shareId={note?.shareId || null}
              trigger={
                <button className={cn(
                  "px-3 md:px-4 py-1.5 text-body-sm font-medium border border-white/10 rounded-full hover:bg-white/5 transition-colors flex items-center gap-2 group",
                  note?.isPublic && "border-tertiary/30 text-tertiary bg-tertiary/10 hover:bg-tertiary/20"
                )}>
                  <Share2 className={cn("w-3.5 h-3.5 transition-colors", note?.isPublic ? "text-tertiary" : "text-outline group-hover:text-on-surface")} />
                  <span className="hidden sm:inline">{note?.isPublic ? 'Shared' : 'Share'}</span>
                </button>
              }
            />
          </div>
        </div>
      </motion.div>
      
      {/* Editor Canvas */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-16 md:py-12 custom-scrollbar relative z-10 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="max-w-3xl w-full mx-auto flex flex-col flex-1"
        >
          {/* Title Area */}
          <div className="shrink-0 mb-8">
            <input 
              className="w-full bg-transparent border-none p-0 font-display-hero text-display-hero leading-tight focus:ring-0 text-on-surface outline-none placeholder:text-outline/30 cursor-text" 
              type="text" 
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Untitled Note"
            />
          </div>

          {/* Editor Body Area - fills all remaining space */}
          <div className="editor-body prose prose-invert max-w-none text-body-lg text-on-surface-variant leading-relaxed">
            <EditorContent editor={editor} className="flex flex-col flex-1" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
