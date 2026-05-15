import React from 'react';
import Image from 'next/image';

export function AIPanel() {
  return (
    <section className="col-span-3 bg-surface-container-low border-l border-white/5 flex flex-col h-full">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <h2 className="font-title-md text-on-surface">AI Insights</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {/* Summary Block */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-label-caps text-outline">Executive Summary</span>
            <span className="material-symbols-outlined text-sm text-outline">info</span>
          </div>
          <div className="p-4 rounded-2xl bg-surface-variant/30 border border-white/5 text-body-sm text-on-surface-variant leading-relaxed">
            Proposes a 2024 strategy focusing on "Luxury Editorial" design combined with AI integration. Key themes include "Tactile Digitalism" and focus-driven UX using a dark-mode-first aesthetic to enhance long-form cognitive work.
          </div>
        </div>
        
        {/* Action Items Block */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-label-caps text-outline">Action Items</span>
            <span className="material-symbols-outlined text-sm text-outline">task_alt</span>
          </div>
          <div className="p-4 rounded-2xl bg-surface-variant/30 border border-white/5 space-y-3">
            <div className="flex gap-3 items-start">
              <span className="material-symbols-outlined text-primary text-sm pt-1">radio_button_unchecked</span>
              <span className="text-body-sm text-on-surface-variant">Finalize visual token set for 'Tactile Digitalism' components.</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="material-symbols-outlined text-primary text-sm pt-1">radio_button_unchecked</span>
              <span className="text-body-sm text-on-surface-variant">Prototype the 'Loom' 3D thought visualization engine.</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="material-symbols-outlined text-primary text-sm pt-1">radio_button_unchecked</span>
              <span className="text-body-sm text-on-surface-variant">Schedule review for brand identity guidelines integration.</span>
            </div>
          </div>
        </div>
        
        {/* AI Visual Insight */}
        <div className="rounded-28px overflow-hidden border border-primary/20 relative group">
          <img alt="AI analysis visualization" className="w-full aspect-square object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCCAUZ2TGHqTfMXY8KgiziaUt7gO43b8J239Kl_HZ5R1_hx5Nseeys6Z9G3d2Bi80dyubDB-S38lIZVrWcwfINS36GArm_RkvpxZBHUU3MeryablTsVH-eM6Sv-2Ip0ima-dvLMu83hwVY3vsjtTRA_skh_G41xVRYhK_UVw6TknXfeOuynkShsbHNhaaH7vuqq1yAM62Ft9KW_07I7X-REIaPbojRFEuCMWgxqLoEVIKgc8hC8vHe9VjI2cR41ulp8iz_S6hnc5Fj"/>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[10px] font-label-caps text-primary mb-1">Visual Metaphor</p>
            <p className="text-[12px] text-on-surface font-medium leading-tight">Concept mapping of "Radiant Intelligence" flow within the workspace.</p>
          </div>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="p-6 mt-auto border-t border-white/5 bg-surface-container-high/50">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-2 bg-primary text-on-primary rounded-xl text-body-sm font-bold transition-all hover:brightness-110 active:scale-95">
            <span className="material-symbols-outlined text-sm">refresh</span>
            Regenerate
          </button>
          <button className="flex items-center justify-center gap-2 py-2 border border-primary/30 text-primary rounded-xl text-body-sm font-bold transition-all hover:bg-primary/10 active:scale-95">
            <span className="material-symbols-outlined text-sm">content_copy</span>
            Copy
          </button>
        </div>
      </div>
    </section>
  );
}
