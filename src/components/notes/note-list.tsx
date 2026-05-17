'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, ArrowUpDown, SearchX, Loader2 } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNotes } from '@/hooks/use-notes';
import { useTags } from '@/hooks/use-tags';
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

export interface NoteListProps {
  initialNoteId?: string;
}

export function NoteList({ initialNoteId }: NoteListProps = {}) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [sort, setSort] = useState<'updated' | 'created' | 'title'>('updated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Custom debounced search query
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Load preferences — only after mount to avoid SSR/hydration mismatch
  useEffect(() => {
    const defaultSort = localStorage.getItem('peblo_default_sort') as any;
    if (defaultSort) setSort(defaultSort);
    const defaultOrder = localStorage.getItem('peblo_default_sort_order') as any;
    if (defaultOrder) setSortOrder(defaultOrder);
  }, []);

  const { notes, isLoading, hasMore, loadMore } = useNotes({
    search: debouncedSearchQuery,
    tags: selectedTags,
    archived: false,
    sort,
    sortOrder
  });
  
  const { tags } = useTags();

  const { activeNoteId, setActiveNote } = useEditorStore();

  useEffect(() => {
    if (initialNoteId && activeNoteId !== initialNoteId) {
      setActiveNote(initialNoteId);
    }
  }, [initialNoteId, activeNoteId, setActiveNote]);

  return (
    <section className="bg-surface-container-lowest flex flex-col h-full overflow-hidden relative">
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
              <button 
                onClick={() => setSelectedTags([])}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all",
                  selectedTags.length === 0 
                    ? "bg-primary text-on-primary shadow-[0_0_15px_rgba(242,202,80,0.3)]"
                    : "bg-surface-variant text-outline hover:text-on-surface"
                )}
              >
                All
              </button>
              
              {tags.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTags(selectedTags.filter(id => id !== tag.id));
                      } else {
                        setSelectedTags([...selectedTags, tag.id]);
                      }
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1",
                      isSelected
                        ? "bg-primary text-on-primary shadow-[0_0_15px_rgba(242,202,80,0.3)]"
                        : "bg-surface-variant text-outline hover:text-on-surface"
                    )}
                  >
                    {tag.name}
                    {isSelected && <X className="w-3 h-3" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex items-center gap-2 pt-2 border-t border-white/5 mt-2">
          <div className="relative flex items-center group cursor-pointer bg-surface-variant/30 hover:bg-surface-variant/50 px-3 py-1.5 rounded-lg transition-colors border border-white/5 flex-1">
            <select 
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as any);
                localStorage.setItem('peblo_default_sort', e.target.value);
              }}
              className="text-[10px] font-bold uppercase tracking-wider text-outline group-hover:text-on-surface bg-transparent border-none focus:ring-0 cursor-pointer appearance-none pl-0 py-1 z-10 w-full outline-none"
            >
              <option value="updated" className="bg-surface-container text-on-surface">Sorted by Date</option>
              <option value="created" className="bg-surface-container text-on-surface">Created Date</option>
              <option value="title" className="bg-surface-container text-on-surface">Alphabetical</option>
            </select>
          </div>
          <button 
            onClick={() => {
              const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
              setSortOrder(newOrder);
              localStorage.setItem('peblo_default_sort_order', newOrder);
            }}
            className="w-8 h-8 rounded-lg bg-surface-variant/30 hover:bg-surface-variant/50 border border-white/5 flex items-center justify-center transition-colors group relative"
            title={sortOrder === 'asc' ? "Ascending" : "Descending"}
          >
            <ArrowUpDown className={cn("w-4 h-4 text-outline group-hover:text-primary transition-transform", sortOrder === 'desc' && "scale-y-[-1]")} />
          </button>
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

