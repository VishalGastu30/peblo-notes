import React from 'react';
import Image from 'next/image';

export function NoteEditor() {
  return (
    <section className="col-span-6 bg-surface flex flex-col h-full relative">
      {/* Toolbar */}
      <div className="h-16 flex items-center justify-between px-8 border-b border-white/5">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-outline hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined text-lg">format_bold</span>
          </div>
          <div className="flex items-center gap-2 text-outline hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined text-lg">format_italic</span>
          </div>
          <div className="flex items-center gap-2 text-outline hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
          </div>
          <div className="w-px h-4 bg-white/10"></div>
          <div className="flex items-center gap-2 text-outline hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined text-lg">link</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-label-caps text-outline flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
            Autosave: Saved
          </span>
          <button className="px-4 py-1.5 text-body-sm font-medium border border-white/10 rounded-full hover:bg-white/5 transition-colors">Share</button>
        </div>
      </div>
      
      {/* Editor Canvas */}
      <div className="flex-1 overflow-y-auto px-16 py-12 custom-scrollbar">
        <input className="w-full bg-transparent border-none p-0 mb-8 font-display-hero text-headline-lg focus:ring-0 text-on-surface outline-none" type="text" defaultValue="Product Strategy 2024"/>
        <div className="prose prose-invert max-w-none text-body-lg text-on-surface-variant space-y-6 leading-relaxed">
          <p>Our objective for 2024 centers on the intersection of <strong>Luxury Editorial</strong> and <strong>Futuristic Workspaces</strong>. We are not just building a note-taking app; we are crafting a digital atelier for the modern intellectual.</p>
          <h2 className="font-title-md text-on-surface text-2xl pt-4">Core Pillars</h2>
          <ul className="list-disc pl-5 space-y-3">
            <li>Focus-First Interface: Reducing cognitive load through intentional negative space.</li>
            <li>Radiant Intelligence: AI features that feel like a subtle glow rather than a disruptive interruption.</li>
            <li>Tactile Digitalism: Using glassmorphism and depth to simulate physical premium materials like obsidian and polished metal.</li>
          </ul>
          <p>The transition to dark-mode-first is not merely an aesthetic choice. It is a functional requirement for prolonged deep work sessions, minimizing eye strain while emphasizing the vibrant gold and iris accents that represent active AI cognition.</p>
          <div className="h-40 w-full rounded-28px overflow-hidden my-8 grayscale hover:grayscale-0 transition-all duration-700">
            <img alt="Workspace inspiration" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9B4o9CX5C7IS6y_Bn1cosgITzvF-bE3OqvutowZLx3dSQcO--OdnYNSHc7lzka6aS1ltbo22rykSJa-7NWjbwgbDs3Ffz6uhli81wxgQPsjINJGN8czVvYLmIjejhWRtSKYMCNqfpSWwNJcBiqCoDtteJ4tpeasmnl1hbQWVZ6r2gdxQ-zUtt9XPUCQ9HIXx67cdj5G0OrC41TTEPehezFNT0j7xGdOErSUybdudbrLwL0sNsPOx_3YgzlEQian-hPVcVWMSSeStp"/>
          </div>
          <p>Future iterations will include the 'Loom' view—a three-dimensional visualization of thought connections, utilizing the primary amber color to map neural links across archived and active workspace datasets.</p>
        </div>
      </div>
    </section>
  );
}
