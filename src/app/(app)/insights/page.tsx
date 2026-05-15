import React from 'react';
import { Footer } from '@/components/layout/footer';

export default function InsightsPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* TopNavBar Shell */}
      <header className="flex justify-between items-center w-full px-margin-desktop h-16 z-40 bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-white/5 docked full-width top-0 sticky">
        <div className="flex items-center gap-8">
          <h2 className="font-display-hero text-title-md text-primary">Workspace Insights</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <input className="bg-surface-container-low border-none rounded-full px-10 py-1.5 text-sm w-64 focus:ring-1 focus:ring-primary/40 placeholder:text-outline/50 text-on-surface outline-none" placeholder="Search insights..." type="text"/>
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline/50 scale-75">search</span>
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <span className="material-symbols-outlined hover:text-primary cursor-pointer transition-colors">notifications</span>
            <span className="material-symbols-outlined hover:text-primary cursor-pointer transition-colors">history</span>
            <button className="px-4 py-1.5 border border-secondary text-secondary font-medium rounded-full text-sm hover:bg-secondary/10 transition-all">Share</button>
          </div>
        </div>
      </header>

      {/* Dashboard Grid Content */}
      <div className="p-margin-desktop space-y-gutter flex-1">
        {/* Top Row: Stat Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
          <div className="glass-card rounded-[28px] p-6 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <p className="font-label-caps text-label-caps text-outline uppercase">Total Notes</p>
              <span className="material-symbols-outlined text-primary">description</span>
            </div>
            <div>
              <h3 className="font-headline-lg text-headline-lg leading-none">124</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Active repository</p>
            </div>
          </div>
          
          <div className="glass-card rounded-[28px] p-6 flex flex-col justify-between h-40 glow-amber border border-primary/20">
            <div className="flex justify-between items-start">
              <p className="font-label-caps text-label-caps text-outline uppercase">AI Summaries</p>
              <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div>
              <h3 className="font-headline-lg text-headline-lg leading-none">89</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Intelligence generated</p>
            </div>
          </div>
          
          <div className="glass-card rounded-[28px] p-6 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <p className="font-label-caps text-label-caps text-outline uppercase">Collaboration</p>
              <span className="material-symbols-outlined text-secondary">group</span>
            </div>
            <div>
              <h3 className="font-headline-lg text-headline-lg leading-none">12</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Shared workspaces</p>
            </div>
          </div>
          
          <div className="glass-card rounded-[28px] p-6 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <p className="font-label-caps text-label-caps text-outline uppercase">Weekly Activity</p>
              <span className="material-symbols-outlined text-primary">trending_up</span>
            </div>
            <div>
              <h3 className="font-headline-lg text-headline-lg leading-none text-primary">+15%</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Since last Monday</p>
            </div>
          </div>
        </section>

        {/* Middle: Activity Trends */}
        <section className="glass-card rounded-[28px] p-8 h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="font-title-md text-title-md text-on-surface">Activity Trends</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Cognitive output over the last 30 days</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-surface-variant text-label-caps text-primary cursor-pointer">Daily</span>
              <span className="px-3 py-1 rounded-full text-label-caps text-outline cursor-pointer hover:bg-surface-variant/50 transition-colors">Weekly</span>
            </div>
          </div>
          <div className="flex-1 relative flex items-end gap-1">
            <div className="flex-1 bg-gradient-to-t from-primary/20 to-primary/5 rounded-t-lg h-[40%]" title="Day 1"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/30 to-primary/10 rounded-t-lg h-[55%]" title="Day 2"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/25 to-primary/5 rounded-t-lg h-[45%]" title="Day 3"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/40 to-primary/15 rounded-t-lg h-[70%]" title="Day 4"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/60 to-primary/20 rounded-t-lg h-[85%]" title="Day 5"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/35 to-primary/10 rounded-t-lg h-[60%]" title="Day 6"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/50 to-primary/15 rounded-t-lg h-[75%]" title="Day 7"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/45 to-primary/10 rounded-t-lg h-[65%]" title="Day 8"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/20 to-primary/5 rounded-t-lg h-[30%]" title="Day 9"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/5 rounded-t-lg h-[15%]" title="Day 10"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/30 to-primary/10 rounded-t-lg h-[50%]" title="Day 11"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/55 to-primary/20 rounded-t-lg h-[80%]" title="Day 12"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/70 to-primary/30 rounded-t-lg h-[95%]" title="Day 13"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/40 to-primary/15 rounded-t-lg h-[60%]" title="Day 14"></div>
            <div className="flex-1 bg-gradient-to-t from-primary/30 to-primary/10 rounded-t-lg h-[45%]" title="Day 15"></div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <path className="opacity-80" d="M0,80 Q100,20 200,60 T400,10 T600,70 T800,30 T1000,50" fill="none" stroke="#D4AF37" strokeWidth="2"></path>
            </svg>
          </div>
          <div className="flex justify-between mt-4 font-label-caps text-[10px] text-outline uppercase tracking-widest">
            <span>Oct 01</span>
            <span>Oct 15</span>
            <span>Oct 30</span>
          </div>
        </section>

        {/* Bottom Row: Tags & Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter pb-margin-desktop">
          {/* Most Used Tags */}
          <div className="glass-card rounded-[28px] p-8 lg:col-span-1">
            <h4 className="font-title-md text-title-md text-on-surface mb-6">Most Used Tags</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-body-lg text-body-lg">Strategy</span>
                </div>
                <span className="font-label-caps text-outline">42 Notes</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-body-lg text-body-lg">Roadmap</span>
                </div>
                <span className="font-label-caps text-outline">28 Notes</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="font-body-lg text-body-lg">Design</span>
                </div>
                <span className="font-label-caps text-outline">19 Notes</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-outline"></span>
                  <span className="font-body-lg text-body-lg">Personal</span>
                </div>
                <span className="font-label-caps text-outline">12 Notes</span>
              </div>
            </div>
            <button className="mt-8 text-secondary font-label-caps flex items-center gap-2 hover:underline">
              VIEW ALL TAXONOMY
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Recent AI Actions List */}
          <div className="glass-card rounded-[28px] p-8 lg:col-span-2">
            <h4 className="font-title-md text-title-md text-on-surface mb-6">Recent AI Actions</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-6 p-4 rounded-xl hover:bg-surface-variant/30 transition-all group">
                <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                  <span className="material-symbols-outlined scale-75">auto_fix_high</span>
                </div>
                <div className="flex-1">
                  <p className="font-body-lg text-body-lg text-on-surface">Summarized "Q4 Brand Strategy"</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">2 minutes ago • Workspace A</p>
                </div>
                <span className="material-symbols-outlined text-outline opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">open_in_new</span>
              </div>
              
              <div className="flex items-center gap-6 p-4 rounded-xl hover:bg-surface-variant/30 transition-all group">
                <div className="w-10 h-10 rounded-full bg-primary-container/20 border border-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined scale-75">lightbulb</span>
                </div>
                <div className="flex-1">
                  <p className="font-body-lg text-body-lg text-on-surface">Identified action items from "Stakeholder Sync"</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">1 hour ago • Collaboration Hub</p>
                </div>
                <span className="material-symbols-outlined text-outline opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">open_in_new</span>
              </div>
              
              <div className="flex items-center gap-6 p-4 rounded-xl hover:bg-surface-variant/30 transition-all group">
                <div className="w-10 h-10 rounded-full bg-secondary-container/20 border border-secondary/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined scale-75">link</span>
                </div>
                <div className="flex-1">
                  <p className="font-body-lg text-body-lg text-on-surface">Linked "Roadmap v2" to 4 existing strategy notes</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">4 hours ago • Semantic Web</p>
                </div>
                <span className="material-symbols-outlined text-outline opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">open_in_new</span>
              </div>
            </div>
          </div>
        </section>
        {/* Enhanced Insights Bottom Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter pb-margin-desktop">
          {/* This Week Summary */}
          <div className="glass-card rounded-[28px] p-8 lg:col-span-1 bg-surface-container border border-primary/20">
            <h4 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
              This Week
            </h4>
            <div className="space-y-4">
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                You've been heavily focused on <span className="text-primary font-medium">Product Strategy</span> and <span className="text-secondary font-medium">Design Systems</span>.
              </p>
              <div className="p-4 bg-surface-container-low rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between text-body-sm">
                  <span className="text-outline">Notes Created</span>
                  <span className="text-on-surface font-medium">12</span>
                </div>
                <div className="flex justify-between text-body-sm">
                  <span className="text-outline">AI Invocations</span>
                  <span className="text-on-surface font-medium">34</span>
                </div>
                <div className="flex justify-between text-body-sm">
                  <span className="text-outline">Reading Time</span>
                  <span className="text-on-surface font-medium">2h 15m</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Usage Breakdown */}
          <div className="glass-card rounded-[28px] p-8 lg:col-span-1">
            <h4 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">analytics</span>
              AI Usage
            </h4>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-body-sm mb-1">
                  <span className="text-on-surface">Summarization</span>
                  <span className="text-outline">45%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-primary rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-body-sm mb-1">
                  <span className="text-on-surface">Action Item Extraction</span>
                  <span className="text-outline">30%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                  <div className="w-[30%] h-full bg-secondary rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-body-sm mb-1">
                  <span className="text-on-surface">Semantic Search</span>
                  <span className="text-outline">25%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                  <div className="w-[25%] h-full bg-tertiary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recently Edited */}
          <div className="glass-card rounded-[28px] p-8 lg:col-span-1">
            <h4 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-outline">history</span>
              Recently Edited
            </h4>
            <div className="space-y-4">
              <div className="group cursor-pointer">
                <h5 className="font-body-lg text-on-surface group-hover:text-primary transition-colors">Q4 Roadmap</h5>
                <p className="text-body-sm text-outline">Updated 2h ago</p>
              </div>
              <div className="group cursor-pointer">
                <h5 className="font-body-lg text-on-surface group-hover:text-primary transition-colors">Brand Guidelines</h5>
                <p className="text-body-sm text-outline">Updated yesterday</p>
              </div>
              <div className="group cursor-pointer">
                <h5 className="font-body-lg text-on-surface group-hover:text-primary transition-colors">User Research Synthesis</h5>
                <p className="text-body-sm text-outline">Updated 3 days ago</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
