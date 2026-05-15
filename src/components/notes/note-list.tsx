'use client';

import React, { useState } from 'react';

export function NoteList() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="col-span-3 border-r border-white/5 bg-surface-container-lowest flex flex-col h-full">
      <div className="p-6 space-y-6">
        <div className={`relative group transition-all ${isSearching ? 'glow-amber rounded-xl' : ''}`}>
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
          <input 
            className={`w-full bg-surface-container border-none rounded-xl pl-10 pr-10 py-2 text-body-sm focus:ring-1 transition-all text-on-surface outline-none ${isSearching ? 'ring-1 ring-primary/50 bg-surface-container-low' : 'focus:ring-primary/50'}`} 
            placeholder="Search notes..." 
            type="text"
            value={searchQuery}
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
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
        
        {isSearching ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                Strategy <span className="material-symbols-outlined text-[12px] cursor-pointer hover:opacity-70">close</span>
              </span>
              <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                AI <span className="material-symbols-outlined text-[12px] cursor-pointer hover:opacity-70">close</span>
              </span>
              <button className="px-3 py-1 bg-transparent border border-secondary/30 text-secondary rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-secondary/10 transition-colors">
                + Add Filter
              </button>
              <button 
                className="ml-auto text-[10px] font-bold uppercase tracking-wider text-error hover:underline"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearching(false);
                }}
              >
                Clear all
              </button>
            </div>
            <p className="text-body-sm text-outline-variant">14 notes match your search</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-[10px] font-bold uppercase tracking-wider">All</span>
            <span className="px-3 py-1 bg-surface-variant/50 text-on-surface-variant border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-surface-variant transition-colors cursor-pointer">Strategy</span>
            <span className="px-3 py-1 bg-surface-variant/50 text-on-surface-variant border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-surface-variant transition-colors cursor-pointer">AI</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-label-caps text-outline">Sorted by Date</span>
          <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">swap_vert</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-4 pb-6">
        {isSearching && searchQuery === 'nothing' ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
            <span className="material-symbols-outlined text-[48px] text-outline/50 font-light">search_off</span>
            <div>
              <h3 className="font-display-hero text-[24px] text-on-surface">Nothing found.</h3>
              <p className="text-body-sm text-on-surface-variant mt-2 max-w-[200px] mx-auto">Try different keywords or clear your filters.</p>
            </div>
            <button 
              className="px-4 py-2 border border-primary/30 text-primary rounded-xl font-label-caps hover:bg-primary/5 transition-colors mt-2"
              onClick={() => {
                setSearchQuery('');
                setIsSearching(false);
              }}
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <>
            {/* Note Card Active */}
            <div className={`p-5 rounded-[28px] glass-panel bg-primary/5 border-primary/20 cursor-pointer group transition-all duration-500 transform ${isSearching ? 'translate-y-0 opacity-100' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-title-md text-[18px] text-primary group-hover:underline">
                  Product <span className={isSearching ? 'text-primary font-bold' : ''}>Strategy</span> 2024
                </h3>
                <span className="text-[10px] text-outline">2m ago</span>
              </div>
              <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-4">Establishing the core pillars of our AI integration roadmap for the upcoming fiscal...</p>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-secondary-container/30 text-secondary text-[10px] rounded border border-secondary/10">Draft</span>
                <span className="px-2 py-0.5 bg-tertiary-container/30 text-tertiary text-[10px] rounded border border-tertiary/10">Roadmap</span>
              </div>
            </div>
            
            {/* Note Card */}
            <div className={`p-5 rounded-[28px] bg-surface-container hover:bg-surface-variant/30 border border-white/5 cursor-pointer transition-all group duration-500 delay-75 transform ${isSearching ? 'translate-y-0 opacity-90' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-title-md text-[18px] text-on-surface group-hover:text-primary transition-colors">Q4 Roadmap</h3>
                <span className="text-[10px] text-outline">1h ago</span>
              </div>
              <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-4">Milestones for the editorial dashboard redesign and backend latency improvements.</p>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-surface-variant text-outline text-[10px] rounded border border-white/5">Project</span>
              </div>
            </div>
            
            {/* Note Card */}
            <div className={`p-5 rounded-[28px] bg-surface-container hover:bg-surface-variant/30 border border-white/5 cursor-pointer transition-all group duration-500 delay-150 transform ${isSearching ? 'translate-y-0 opacity-80' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-title-md text-[18px] text-on-surface group-hover:text-primary transition-colors">Brand Identity Guidelines</h3>
                <span className="text-[10px] text-outline">Yesterday</span>
              </div>
              <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-4">Visual tokens, typography hierarchy, and the balance of luxury editorial aesthetics.</p>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-surface-variant text-outline text-[10px] rounded border border-white/5">Design</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
