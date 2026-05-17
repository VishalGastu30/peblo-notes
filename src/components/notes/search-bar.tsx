import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  isFocused: boolean;
  onFocusChange: (focused: boolean) => void;
}

export function SearchBar({ value, onChange, isFocused, onFocusChange }: SearchBarProps) {
  const isSearching = value.length > 0;

  return (
    <div className={cn(
      "relative rounded-full transition-all duration-300",
      isFocused ? "shadow-[0_0_20px_rgba(242,202,80,0.15)] ring-1 ring-primary/50" : "bg-surface-variant border border-white/5"
    )}>
      <Search className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
        isFocused ? "text-primary" : "text-outline"
      )} />
      <input 
        type="text" 
        placeholder="Search notes..." 
        value={value}
        className="w-full bg-transparent border-none py-3 pl-10 pr-10 text-body-lg text-on-surface placeholder:text-outline-variant focus:ring-0 rounded-full"
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
        onChange={(e) => onChange(e.target.value)}
      />
      {isSearching && (
        <button 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors flex items-center justify-center"
          onClick={() => onChange('')}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
