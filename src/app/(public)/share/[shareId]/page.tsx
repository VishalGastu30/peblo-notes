import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SharePage() {
  return (
    <div className="bg-background text-on-background font-body-lg selection:bg-primary selection:text-on-primary min-h-screen">
      {/* Top Navigation (Shell Implementation) */}
      <nav className="flex justify-between items-center w-full px-margin-desktop h-16 z-40 bg-surface/80 backdrop-blur-md border-b border-white/5 sticky top-0">
        <div className="flex items-center gap-2">
          <span className="font-display-hero text-title-md text-primary">Peblo Notes</span>
          <div className="hidden md:flex ml-8 gap-6 items-center">
            <span className="text-on-surface-variant font-label-caps text-label-caps uppercase tracking-widest border border-outline-variant px-3 py-1 rounded-full">Public Share</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary text-on-primary font-label-caps text-label-caps px-6 py-2 rounded-full hover:brightness-110 transition-all">
            JOIN PEBLO
          </button>
        </div>
      </nav>
      
      <main className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* Header Section */}
            <header className="space-y-6">
              <div className="flex items-center gap-4">
                <img alt="Author Avatar" className="w-12 h-12 rounded-full border border-primary/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyVL_OePV2IC0MD5jC4Q0wD4cPtLq5QoXnu_W6ITSC6z2fl2Ii3Z6ZF6LUbxJKuHIu37a_JvOJJvCTR6chlaUskWuvboC_RLNxfYC9YAxQ9CD2xwab6yWre_1duR39l2jloCDD25N5SNXVQqwJh7rT8z7ARrvTI8_EDjQDT-dNAl5BAMbbgYDmGaaaVsBP7X5qNwt9SMA-iO2vrhMd09jmdBMYYc5fs2SBRaSBYe0LIOWSLhwjZ8nNOM3kGtii10uH7jhzTpns5Cm-"/>
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface">Julian Thorne</span>
                  <span className="font-label-caps text-label-caps text-outline uppercase">Design Lead, Project Zenith</span>
                </div>
              </div>
              <h1 className="font-display-hero text-headline-lg-mobile md:text-headline-lg leading-tight">
                Project <span className="text-primary italic">Zenith</span> Design Specs
              </h1>
            </header>
            
            {/* Note Body (Markdown Style) */}
            <article className="glass-card rounded-[28px] p-8 md:p-12 space-y-8 text-on-surface-variant bg-surface-container-low/40 border border-white/5 backdrop-blur-xl">
              <section className="space-y-4">
                <h2 className="font-title-md text-title-md text-on-surface flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">architecture</span>
                  I. Core Philosophy
                </h2>
                <p className="font-body-lg text-body-lg leading-relaxed">
                  The Zenith initiative aims to redefine the <span className="text-primary font-semibold">spatial computing interface</span> through a lens of quiet luxury. We move away from aggressive skeuomorphism toward a "weighted minimalism" that prioritizes user cognitive load above all else.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 className="font-title-md text-title-md text-on-surface flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">palette</span>
                  II. Visual Tokens
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-surface-container-low rounded-xl border border-white/5">
                    <span className="font-label-caps text-label-caps text-outline block mb-2">PRIMARY ACCENT</span>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary shadow-[0_0_15px_rgba(242,202,80,0.3)]"></div>
                      <span className="font-body-sm text-body-sm text-on-surface">Copper Gold (#F2CA50)</span>
                    </div>
                  </div>
                  <div className="p-6 bg-surface-container-low rounded-xl border border-white/5">
                    <span className="font-label-caps text-label-caps text-outline block mb-2">BASE LAYER</span>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-background border border-white/10"></div>
                      <span className="font-body-sm text-body-sm text-on-surface">Obsidian Ink (#131315)</span>
                    </div>
                  </div>
                </div>
              </section>
              
              <section className="space-y-4">
                <h3 className="font-title-md text-title-md text-on-surface">III. Functional Requirements</h3>
                <ul className="space-y-3 list-none">
                  <li className="flex gap-4">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    <span className="font-body-lg text-body-lg">Haptic feedback synchronized with <span className="text-primary font-semibold">Iris-tinted</span> hover states.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    <span className="font-body-lg text-body-lg">Transition durations locked at <span className="text-primary font-semibold">300ms</span> with Ease-Out-Expo curves.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    <span className="font-body-lg text-body-lg">Dynamic blur coefficients for background glass components (min 12px).</span>
                  </li>
                </ul>
              </section>
              
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mt-8">
                <img alt="Design Inspiration" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfCJjreOM3jQvcbtm5mBbFgO7MaO4yBcQdogDxVmn3bw4evEC18HgM8e0eLd4GEJ1y216Zgrn9vJgH4zwmpNkWIda64bachUcl6KanKpKUqjYrwBslfZcpH_ppDtXl1P-gRmBYBvKj0GdZRle1CZgVLnwZjCjOuDY6xUuP1o1ge0D7Zhq7RKNiZDZQp9VvF-uY-F_zcvJVKu5JLZ5oGP2ToxNRRXVCGLPMHW3VybiFad_syxEwN-T1cMGGAo_KutDFcK-R97AC-4a1"/>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6">
                  <p className="font-label-caps text-label-caps text-on-surface-variant italic">Fig 1.1: Mood study for motion and texture interactions.</p>
                </div>
              </div>
            </article>
          </div>
          
          {/* Sidebar (Optional) */}
          <aside className="lg:col-span-4 space-y-8 sticky top-24">
            {/* Shared Badge */}
            <div className="glass-card rounded-[28px] bg-surface-container-low/40 border border-white/5 backdrop-blur-xl p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-primary text-4xl">share_reviews</span>
              </div>
              <div>
                <h4 className="font-title-md text-title-md text-on-surface">Shared from Peblo</h4>
                <p className="font-body-sm text-body-sm text-outline">An AI Workspace built for creative intellectualism and editorial precision.</p>
              </div>
              <button className="w-full py-3 bg-primary-container text-on-primary-container font-label-caps text-label-caps rounded-xl hover:scale-[0.98] transition-transform">
                CREATE YOUR OWN NOTE
              </button>
            </div>
            
            {/* Tag List */}
            <div className="space-y-4">
              <h5 className="font-label-caps text-label-caps text-outline uppercase px-2">Associated Tags</h5>
              <div className="flex flex-wrap gap-2">
                <span className="bg-surface-container-high text-tertiary px-4 py-2 rounded-full font-label-caps text-label-caps border border-tertiary/20">#DesignSpecs</span>
                <span className="bg-surface-container-high text-tertiary px-4 py-2 rounded-full font-label-caps text-label-caps border border-tertiary/20">#ProjectZenith</span>
                <span className="bg-surface-container-high text-tertiary px-4 py-2 rounded-full font-label-caps text-label-caps border border-tertiary/20">#UIUX</span>
                <span className="bg-surface-container-high text-tertiary px-4 py-2 rounded-full font-label-caps text-label-caps border border-tertiary/20">#Strategy</span>
              </div>
            </div>
            
            {/* Metadata Card */}
            <div className="bg-surface-container-lowest p-6 rounded-[28px] border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-label-caps text-label-caps text-outline uppercase">Visibility</span>
                <span className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-sm">public</span>
                  <span className="font-label-caps text-label-caps">Public</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label-caps text-label-caps text-outline uppercase">Updated</span>
                <span className="font-label-caps text-label-caps text-on-surface">Oct 24, 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label-caps text-label-caps text-outline uppercase">Read Time</span>
                <span className="font-label-caps text-label-caps text-on-surface">4 Minutes</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-white/5 py-16 mt-20">
        <div className="max-w-container-max-width mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-display-hero text-body-lg text-on-surface">Peblo Notes</span>
            <p className="font-label-caps text-label-caps text-outline uppercase tracking-[0.2em]">Thought, Refined.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="font-body-sm text-body-sm text-outline-variant max-w-xs text-center md:text-right">
              Capture your finest ideas in a workspace that matches the caliber of your thinking.
            </p>
            <div className="flex gap-6">
              <Link className="font-label-caps text-label-caps text-outline hover:text-secondary underline transition-all" href="#">Privacy</Link>
              <Link className="font-label-caps text-label-caps text-outline hover:text-secondary underline transition-all" href="#">Terms</Link>
              <Link className="font-label-caps text-label-caps text-outline hover:text-secondary underline transition-all" href="#">API</Link>
            </div>
          </div>
        </div>
        <div className="max-w-container-max-width mx-auto px-margin-desktop mt-12 pt-8 border-t border-white/5">
          <p className="font-label-caps text-label-caps text-outline-variant text-center">
            © 2026 Peblo AI. Editorial Precision. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
