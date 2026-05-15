import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Sidebar() {
  return (
    <aside className="docked h-screen w-64 left-0 top-0 bg-surface-container-low backdrop-blur-xl border-r border-white/10 flex flex-col py-gutter px-4 z-50">
      <div className="mb-12 px-2">
        <h1 className="font-display-hero text-title-md text-primary">Peblo Notes</h1>
        <p className="font-label-caps text-[10px] tracking-widest text-on-surface-variant uppercase">AI Workspace</p>
      </div>
      
      <button className="mb-8 w-full py-4 bg-primary text-on-primary font-title-md text-body-lg rounded-28px flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-[0_0_15px_rgba(242,202,80,0.2)]">
        <span className="material-symbols-outlined">add</span>
        New Note
      </button>
      
      <nav className="flex-1 space-y-2">
        <Link className="flex items-center gap-4 px-4 py-3 rounded-xl text-primary font-bold border-r-2 border-primary bg-surface-variant/20 hover:bg-surface-variant/50 transition-all" href="/workspace">
          <span className="material-symbols-outlined">description</span>
          All Notes
        </Link>
        <Link className="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant font-medium hover:bg-surface-variant/50 transition-colors" href="/workspace?filter=recent">
          <span className="material-symbols-outlined">schedule</span>
          Recent
        </Link>
        <Link className="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant font-medium hover:bg-surface-variant/50 transition-colors" href="/archive">
          <span className="material-symbols-outlined">archive</span>
          Archived
        </Link>
        <Link className="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant font-medium hover:bg-surface-variant/50 transition-colors" href="/shared">
          <span className="material-symbols-outlined">group</span>
          Shared
        </Link>
        <Link className="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant font-medium hover:bg-surface-variant/50 transition-colors" href="/insights">
          <span className="material-symbols-outlined">analytics</span>
          Insights
        </Link>
      </nav>
      
      <div className="mt-auto pt-4 border-t border-white/5 space-y-2">
        <Link className="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant font-medium hover:bg-surface-variant/50 transition-colors" href="/settings">
          <span className="material-symbols-outlined">settings</span>
          Settings
        </Link>
        <Link className="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface-variant font-medium hover:bg-surface-variant/50 transition-colors" href="/help">
          <span className="material-symbols-outlined">help</span>
          Help
        </Link>
        <div className="flex items-center gap-3 px-4 py-4 mt-4">
          <img 
            alt="User profile avatar" 
            className="w-8 h-8 rounded-full border border-primary/30 object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2fZ8NBG0ol0ykCKQyNcX6DBeK7TGrhQericZ4MWCTLwp1zZJSd4wu7tcXNoEJX8fDKs0Q51BTYTSAfpf1mJVUrKKUlGQrUGPyblXAUBK22EwKh9zQZAouRkDDZd1ZO1cBGm-qiCSwsS_5LjiXXfpT_x_2VFcl8IwzSgUrty5pF_pgFE02dIpqdOWNwlgyK1d_vzSpT9YD048YEb5BED_8IffTdGEQbGDn_HQHfOx-RZETujmH7Of8QmCPwkhAHnyyUIc-SNxY6VaS"
          />
          <span className="text-body-sm font-medium">Alex Rivera</span>
        </div>
      </div>
    </aside>
  );
}
