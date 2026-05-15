import React from 'react';

export default function ArchivePage() {
  return (
    <div className="grid grid-cols-12 h-full w-full">
      {/* Middle Column: Archive List */}
      <section className="col-span-4 border-r border-white/5 bg-surface-container-lowest flex flex-col h-full">
        <div className="p-6 space-y-6">
          <div>
            <h2 className="font-display-hero text-[32px] text-on-surface flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[32px]">archive</span>
              Archived
            </h2>
            <p className="font-label-caps text-[12px] text-secondary mt-1 tracking-widest uppercase">23 archived notes</p>
          </div>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input className="w-full bg-surface-container border-none rounded-xl pl-10 pr-4 py-2 text-body-sm focus:ring-1 focus:ring-primary/50 transition-all text-on-surface outline-none" placeholder="Search archived notes..." type="text"/>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-[10px] font-bold uppercase tracking-wider">All</span>
            <span className="px-3 py-1 bg-surface-variant/50 text-on-surface-variant border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-surface-variant transition-colors cursor-pointer">Strategy</span>
            <span className="px-3 py-1 bg-surface-variant/50 text-on-surface-variant border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-surface-variant transition-colors cursor-pointer">Design</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-label-caps text-outline">Sorted by Archive Date ↓</span>
            <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">swap_vert</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-4 pb-6">
          {/* Archived Note Card */}
          <div className="relative p-5 rounded-[28px] bg-surface-container hover:bg-surface-variant/30 border border-white/5 cursor-pointer transition-all group opacity-80 hover:opacity-100">
            <div className="absolute top-4 right-4 px-2 py-0.5 bg-error-container/20 text-error text-[9px] font-bold tracking-widest uppercase rounded-full border border-error/10">
              Archived
            </div>
            
            <div className="flex justify-between items-start mb-2 pr-16">
              <h3 className="font-title-md text-[18px] text-on-surface group-hover:text-primary transition-colors">Q3 Retrospective</h3>
            </div>
            <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-4">Analysis of our design system rollout and areas where cognitive load actually increased...</p>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 bg-surface-variant text-outline text-[10px] rounded border border-white/5">Strategy</span>
            </div>
            
            {/* Quick Actions (Hover) */}
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-8 h-8 rounded-full bg-surface-bright flex items-center justify-center text-primary hover:brightness-110 border border-white/10 shadow-lg">
                <span className="material-symbols-outlined text-[16px]">unarchive</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-error-container/20 flex items-center justify-center text-error hover:bg-error-container/40 border border-error/10 shadow-lg">
                <span className="material-symbols-outlined text-[16px]">delete</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Column: Empty State (Archive is Read-Only) */}
      <section className="col-span-8 bg-surface flex flex-col h-full items-center justify-center p-12 text-center">
        <div className="w-32 h-32 mb-8 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 shadow-[0_0_40px_rgba(242,202,80,0.05)]">
          <span className="material-symbols-outlined text-[64px] text-primary/40">inventory_2</span>
        </div>
        <h2 className="font-display-hero text-[40px] text-on-surface mb-4">Select a note to preview.</h2>
        <p className="font-body-lg text-on-surface-variant max-w-md mx-auto mb-8">
          Archived notes are read-only. Restore them to edit or interact with the AI assistant.
        </p>
        <button className="px-6 py-2 border border-primary/30 text-primary rounded-xl font-label-caps tracking-widest hover:bg-primary/5 transition-colors">
          RESTORE ALL
        </button>
      </section>
    </div>
  );
}
