'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, ArrowUpDown, SearchX, Loader2 } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNotes } from '@/hooks/use-notes';
import { useEditorStore } from '@/stores/editor-store';
import { formatDistanceToNow } from 'date-fns';

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
        <div className={cn(
          "relative group transition-all duration-500 rounded-xl",
          isFocused ? "shadow-[0_0_30px_rgba(242,202,80,0.15)] ring-1 ring-primary/50 bg-surface-container-low" : "bg-surface-container border-none"
        )}>
          <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300", isFocused ? "text-primary" : "text-outline")} />
          <input 
            className="w-full bg-transparent border-none rounded-xl pl-10 pr-10 py-3 text-body-sm text-on-surface outline-none placeholder:text-outline/50"
            placeholder="Search notes..." 
            type="text"
            value={searchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(e.target.value.length > 0);
            }}
          />
          {isSearching && (
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors flex items-center justify-center"
              onClick={() => {
                setSearchQuery('');
                setIsSearching(false);
              }}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
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
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70"
          >
            <SearchX className="w-12 h-12 text-outline/50 font-light" />
            <div>
              <h3 className="font-display-hero text-[24px] text-on-surface">Nothing found.</h3>
              <p className="text-body-sm text-on-surface-variant mt-2 max-w-[200px] mx-auto">Try different keywords or clear your filters.</p>
            </div>
            {isSearching && (
              <button 
                className="px-4 py-2 border border-primary/30 text-primary rounded-xl font-label-caps hover:bg-primary/5 transition-colors mt-2"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearching(false);
                }}
              >
                CLEAR FILTERS
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {notes.map((note: any) => {
              const isActive = activeNoteId === note.id;
              
              return (
                <motion.div 
                  key={note.id}
                  variants={itemVariants}
                  whileHover={{ y: -2, scale: 0.99 }}
                  onClick={() => setActiveNote(note.id)}
                  className={cn(
                    "p-5 rounded-[24px] border cursor-pointer group transition-all duration-300 relative overflow-hidden",
                    isActive 
                      ? "bg-primary/5 border-primary/20 shadow-[0_0_20px_rgba(242,202,80,0.05)]" 
                      : "bg-surface-container hover:bg-surface-variant/50 border-white/5"
                  )}
                >
                  {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-r-full"></div>}
                  
                  <div className={cn("flex justify-between items-start mb-2", isActive && "pl-2")}>
                    <h3 className={cn(
                      "font-title-md text-[18px] transition-colors",
                      isActive ? "text-primary group-hover:underline decoration-primary/50 underline-offset-4" : "text-on-surface group-hover:text-primary"
                    )}>
                      {note.title || 'Untitled'}
                    </h3>
                    <span className="text-[10px] text-outline font-medium tracking-wider whitespace-nowrap ml-2">
                      {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <p className={cn("text-body-sm text-on-surface-variant line-clamp-2 mb-4 leading-relaxed", isActive && "pl-2")}>
                    {note.contentText || 'No content...'}
                  </p>
                  
                  <div className={cn("flex flex-wrap gap-2", isActive && "pl-2")}>
                    {note.category && (
                      <span className="px-2 py-0.5 bg-surface-variant text-outline text-[10px] rounded border border-white/5 font-medium">
                        {note.category.name}
                      </span>
                    )}
                    {note.tags?.map((tag: any) => (
                      <span key={tag.id} className="px-2 py-0.5 bg-secondary-container/30 text-secondary text-[10px] rounded border border-secondary/10 font-medium">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
            
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

