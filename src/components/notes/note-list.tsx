import React from 'react';

export function NoteList() {
  return (
    <section className="col-span-3 border-r border-white/5 bg-surface-container-lowest flex flex-col h-full">
      <div className="p-6 space-y-6">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
          <input className="w-full bg-surface-container border-none rounded-xl pl-10 pr-4 py-2 text-body-sm focus:ring-1 focus:ring-primary/50 transition-all text-on-surface" placeholder="Search notes..." type="text"/>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-[10px] font-bold uppercase tracking-wider">All</span>
          <span className="px-3 py-1 bg-surface-variant/50 text-on-surface-variant border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-surface-variant transition-colors cursor-pointer">Strategy</span>
          <span className="px-3 py-1 bg-surface-variant/50 text-on-surface-variant border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-surface-variant transition-colors cursor-pointer">AI</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-label-caps text-outline">Sorted by Date</span>
          <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">swap_vert</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-4 pb-6">
        {/* Note Card Active */}
        <div className="p-5 rounded-28px glass-panel bg-primary/5 border-primary/20 cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-title-md text-[18px] text-primary group-hover:underline">Product Strategy 2024</h3>
            <span className="text-[10px] text-outline">2m ago</span>
          </div>
          <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-4">Establishing the core pillars of our AI integration roadmap for the upcoming fiscal...</p>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 bg-secondary-container/30 text-secondary text-[10px] rounded border border-secondary/10">Draft</span>
            <span className="px-2 py-0.5 bg-tertiary-container/30 text-tertiary text-[10px] rounded border border-tertiary/10">Roadmap</span>
          </div>
        </div>
        
        {/* Note Card */}
        <div className="p-5 rounded-28px bg-surface-container hover:bg-surface-variant/30 border border-white/5 cursor-pointer transition-all group">
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
        <div className="p-5 rounded-28px bg-surface-container hover:bg-surface-variant/30 border border-white/5 cursor-pointer transition-all group">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-title-md text-[18px] text-on-surface group-hover:text-primary transition-colors">Brand Identity Guidelines</h3>
            <span className="text-[10px] text-outline">Yesterday</span>
          </div>
          <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-4">Visual tokens, typography hierarchy, and the balance of luxury editorial aesthetics.</p>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 bg-surface-variant text-outline text-[10px] rounded border border-white/5">Design</span>
          </div>
        </div>
      </div>
    </section>
  );
}
