'use client';

import React, { useState, useEffect } from 'react';
import { Bold, Italic, List, Link as LinkIcon, Share2, MoreHorizontal, Loader2, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditorStore } from '@/stores/editor-store';
import { useNote } from '@/hooks/use-note';
import { cn } from '@/lib/utils';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { AutosaveIndicator } from './autosave-indicator';

export function NoteEditor() {
  const [isHovered, setIsHovered] = useState(false);
  const { activeNoteId, autosaveStatus } = useEditorStore();
  const { note, isLoading, handleEditorChange, updateNote } = useNote(activeNoteId);

  const [title, setTitle] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start typing...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: note?.content || '',
    onUpdate: ({ editor }) => {
      handleEditorChange(editor.getHTML(), editor.getText());
    },
    editable: !!activeNoteId,
  });

  // Sync content when note changes
  useEffect(() => {
    if (note && editor && note.id === activeNoteId) {
      if (editor.getHTML() !== note.content) {
        editor.commands.setContent(note.content || '');
      }
      setTitle(note.title || '');
    }
  }, [note?.id, activeNoteId, editor]);

  if (!activeNoteId) {
    return (
      <section className="col-span-6 bg-surface flex items-center justify-center h-full">
        <div className="text-center opacity-50">
          <p className="font-title-md text-xl text-on-surface">No note selected</p>
          <p className="text-body-sm text-on-surface-variant mt-2">Select a note from the sidebar or create a new one.</p>
        </div>
      </section>
    );
  }

  if (isLoading && !note) {
    return (
      <section className="col-span-6 bg-surface flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
      </section>
    );
  }

  return (
    <section className="col-span-6 bg-surface flex flex-col h-full relative overflow-hidden z-0">
      {/* Background glow when editor is active */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000 opacity-50"></div>

      {/* Toolbar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-16 flex items-center justify-between px-8 border-b border-white/5 relative z-10 bg-surface/50 backdrop-blur-md"
      >
        <div className="flex items-center gap-2">
          <button 
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={cn("w-8 h-8 flex items-center justify-center rounded-md transition-colors cursor-pointer group", editor?.isActive('bold') ? "bg-white/10 text-on-surface" : "text-outline hover:text-on-surface hover:bg-white/5")}
          >
            <Bold className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={cn("w-8 h-8 flex items-center justify-center rounded-md transition-colors cursor-pointer group", editor?.isActive('italic') ? "bg-white/10 text-on-surface" : "text-outline hover:text-on-surface hover:bg-white/5")}
          >
            <Italic className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={cn("w-8 h-8 flex items-center justify-center rounded-md transition-colors cursor-pointer group", editor?.isActive('bulletList') ? "bg-white/10 text-on-surface" : "text-outline hover:text-on-surface hover:bg-white/5")}
          >
            <List className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
          <div className="w-px h-4 bg-white/10 mx-2"></div>
          <button className="w-8 h-8 flex items-center justify-center text-outline hover:text-on-surface hover:bg-white/5 rounded-md transition-colors cursor-pointer group">
            <LinkIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <AutosaveIndicator status={autosaveStatus as any} />
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 text-body-sm font-medium border border-white/10 rounded-full hover:bg-white/5 transition-colors flex items-center gap-2 group">
              <Share2 className="w-3.5 h-3.5 text-outline group-hover:text-on-surface transition-colors" />
              Share
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full hover:bg-white/5 transition-colors">
              <MoreHorizontal className="w-4 h-4 text-outline" />
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Editor Canvas */}
      <div className="flex-1 overflow-y-auto px-16 py-12 custom-scrollbar relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <input 
            className="w-full bg-transparent border-none p-0 mb-8 font-display-hero text-display-hero leading-tight focus:ring-0 text-on-surface outline-none placeholder:text-outline/30" 
            type="text" 
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              updateNote({ title: e.target.value });
            }}
            placeholder="Note Title"
          />
          <div className="prose prose-invert max-w-none text-body-lg text-on-surface-variant space-y-6 leading-relaxed">
            <EditorContent editor={editor} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
