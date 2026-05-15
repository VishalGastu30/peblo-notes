import React from 'react';

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around z-50 px-2 pb-safe">
      <button className="flex flex-col items-center gap-1 p-2 text-primary">
        <span className="material-symbols-outlined text-[24px]">description</span>
        <span className="text-[10px] font-label-caps tracking-widest">NOTES</span>
      </button>
      
      <button className="flex flex-col items-center gap-1 p-2 text-outline hover:text-on-surface transition-colors">
        <span className="material-symbols-outlined text-[24px]">search</span>
        <span className="text-[10px] font-label-caps tracking-widest">SEARCH</span>
      </button>
      
      {/* FAB (Floating Action Button) for New Note */}
      <div className="relative -top-5">
        <button className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_0_20px_rgba(242,202,80,0.3)] hover:scale-105 active:scale-95 transition-all border-4 border-surface-container-lowest">
          <span className="material-symbols-outlined text-[28px]">add</span>
        </button>
      </div>
      
      <button className="flex flex-col items-center gap-1 p-2 text-outline hover:text-on-surface transition-colors">
        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        <span className="text-[10px] font-label-caps tracking-widest">AI</span>
      </button>
      
      <button className="flex flex-col items-center gap-1 p-2 text-outline hover:text-on-surface transition-colors">
        <span className="material-symbols-outlined text-[24px]">settings</span>
        <span className="text-[10px] font-label-caps tracking-widest">MENU</span>
      </button>
    </nav>
  );
}
