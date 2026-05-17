import React from 'react';
import { motion } from 'framer-motion';
import { SearchX, FilePlus2 } from 'lucide-react';

interface EmptyStateProps {
  isSearching: boolean;
  onClearFilters: () => void;
  onCreateNote?: () => void;
}

export function EmptyState({ isSearching, onClearFilters, onCreateNote }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70"
    >
      {isSearching ? (
        <SearchX className="w-12 h-12 text-outline/50 font-light" />
      ) : (
        <FilePlus2 className="w-12 h-12 text-outline/50 font-light" />
      )}
      
      <div>
        <h3 className="font-display-hero text-[24px] text-on-surface">
          {isSearching ? "Nothing found." : "No notes yet."}
        </h3>
        <p className="text-body-sm text-on-surface-variant mt-2 max-w-[200px] mx-auto">
          {isSearching 
            ? "Try different keywords or clear your filters." 
            : "Create your first note to start organizing your thoughts."}
        </p>
      </div>
      
      {isSearching ? (
        <button 
          className="px-4 py-2 border border-primary/30 text-primary rounded-xl font-label-caps hover:bg-primary/5 transition-colors mt-2"
          onClick={onClearFilters}
        >
          CLEAR FILTERS
        </button>
      ) : (
        onCreateNote && (
          <button 
            className="px-4 py-2 bg-primary text-on-primary rounded-xl font-label-caps hover:bg-primary/90 transition-colors mt-2"
            onClick={onCreateNote}
          >
            CREATE NOTE
          </button>
        )
      )}
    </motion.div>
  );
}
