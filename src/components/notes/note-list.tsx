'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, ArrowUpDown, SearchX, Loader2 } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNotes } from '@/hooks/use-notes';
import { useEditorStore } from '@/stores/editor-store';
import { formatDistanceToNow } from 'date-fns';
import { NoteCard } from './note-card';
import { SearchBar } from './search-bar';
import { EmptyState } from './empty-state';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] } }
};

export function NoteList() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Custom debounced search query
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { notes, isLoading, hasMore, loadMore } = useNotes({
    search: debouncedSearchQuery,
    archived: false,
    sort: 'updated'
  });

  const { activeNoteId, setActiveNote } = useEditorStore();

  return (
    <section className="col-span-3 border-r border-white/5 bg-surface-container-lowest flex flex-col h-full z-10 relative">
      <div className="p-6 space-y-6 shrink-0">
        <SearchBar 
          value={searchQuery}
          onChange={(val) => {
            setSearchQuery(val);
            setIsSearching(val.length > 0);
          }}
          isFocused={isFocused}
          onFocusChange={setIsFocused}
        />
        
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div 
              key="search-active"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  className="ml-auto text-[10px] font-bold uppercase tracking-wider text-error hover:underline"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearching(false);
                  }}
                >
                  Clear search
                </button>
              </div>
              <p className="text-body-sm text-outline-variant">{notes?.length || 0} notes match your search</p>
            </motion.div>
          ) : (
            <motion.div 
              key="search-inactive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-2"
            >
              <span className="px-3 py-1.5 bg-primary text-on-primary rounded-full text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(242,202,80,0.3)]">All</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-label-caps text-outline">Sorted by Date</span>
          <ArrowUpDown className="w-4 h-4 text-outline cursor-pointer hover:text-primary transition-colors" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-4 pb-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-primary/50" />
          </div>
        ) : notes?.length === 0 ? (
          <EmptyState 
            isSearching={isSearching}
            onClearFilters={() => {
              setSearchQuery('');
              setIsSearching(false);
            }}
          />
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {notes.map((note: any) => (
              <NoteCard
                key={note.id}
                note={note}
                isActive={activeNoteId === note.id}
                onClick={() => setActiveNote(note.id)}
                variants={itemVariants}
              />
            ))}
            
            {hasMore && (
              <div className="pt-4 flex justify-center">
                <button 
                  onClick={loadMore}
                  className="px-4 py-2 text-body-sm text-primary hover:bg-primary/10 rounded-full transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

