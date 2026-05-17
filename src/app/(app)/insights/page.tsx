'use client';

import React, { useEffect, useRef } from 'react';
import { Footer } from '@/components/layout/footer';
import { Search, Bell, History, FileText, Sparkles, Users, TrendingUp, ArrowRight, Wand2, ExternalLink, Lightbulb, Link as LinkIcon, CalendarDays, BarChart3, Loader2 } from 'lucide-react';
import { motion, useInView, Variants } from 'framer-motion';
import { useInsights } from '@/hooks/use-insights';
import { formatDistanceToNow } from 'date-fns';

// Helper component for counting numbers
function CountingNumber({ value, suffix = '', prefix = '' }: { value: number, suffix?: string, prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && ref.current) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          // Easing function (easeOutExpo)
          const progress = elapsedTime / duration;
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = Math.round(start + (value - start) * easeProgress);
          
          if (ref.current) {
            ref.current.textContent = `${prefix}${currentVal}${suffix}`;
          }
          requestAnimationFrame(updateCounter);
        } else {
          if (ref.current) {
            ref.current.textContent = `${prefix}${value}${suffix}`;
          }
        }
      };

      requestAnimationFrame(updateCounter);
    }
  }, [value, isInView, suffix, prefix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function InsightsPage() {
  const { insights, isLoading } = useInsights();

  if (isLoading || !insights) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const { 
    totalNotes, 
    publicNotes, 
    totalAiActions, 
    weeklyActivity, 
    activityTrend,
    mostUsedTags,
    aiBreakdown,
    recentlyEdited
  } = insights;

  // Calculate percentages for AI Breakdown
  const sumAi = Math.max(1, totalAiActions); // avoid division by zero
  const aiPercentages = [
    { name: 'Summarization', percent: Math.round((aiBreakdown.summaries / sumAi) * 100), color: 'bg-primary' },
    { name: 'Action Items', percent: Math.round((aiBreakdown.actionItems / sumAi) * 100), color: 'bg-secondary' },
    { name: 'Title Suggestions', percent: Math.round((aiBreakdown.titles / sumAi) * 100), color: 'bg-tertiary' }
  ];

  // Map 30 day trend to heights (max 100)
  const maxActions = Math.max(1, ...activityTrend.map((d: any) => d.notesEdited + d.aiActions));
  const trendHeights = activityTrend.map((d: any) => Math.max(5, Math.round(((d.notesEdited + d.aiActions) / maxActions) * 100)));

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* TopNavBar Shell */}
      <header className="flex justify-between items-center w-full px-margin-desktop h-16 z-40 bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-white/5 docked full-width top-0 sticky">
        <div className="flex items-center gap-8">
          <h2 className="font-display-hero text-title-md text-primary">Workspace Insights</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <input className="bg-surface-container-low border-none rounded-full px-10 py-1.5 text-sm w-64 focus:ring-1 focus:ring-primary/40 placeholder:text-outline/50 text-on-surface outline-none transition-all" placeholder="Search insights..." type="text"/>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline/50 w-4 h-4" />
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <Bell className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
            <History className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
            <button className="px-4 py-1.5 border border-secondary text-secondary font-medium rounded-full text-sm hover:bg-secondary/10 transition-all">Share</button>
          </div>
        </div>
      </header>

      {/* Dashboard Grid Content */}
      <div className="p-margin-desktop space-y-gutter flex-1">
        {/* Top Row: Stat Cards */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter"
        >
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-6 flex flex-col justify-between h-40 hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start">
              <p className="font-label-caps text-label-caps text-outline uppercase">Total Notes</p>
              <FileText className="text-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline-lg text-headline-lg leading-none"><CountingNumber value={totalNotes} /></h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Active repository</p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-6 flex flex-col justify-between h-40 glow-amber border border-primary/20 hover:-translate-y-1 transition-transform relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
            <div className="flex justify-between items-start relative z-10">
              <p className="font-label-caps text-label-caps text-outline uppercase">AI Actions</p>
              <Sparkles className="text-primary-container w-6 h-6 animate-pulse" />
            </div>
            <div className="relative z-10">
              <h3 className="font-headline-lg text-headline-lg leading-none"><CountingNumber value={totalAiActions} /></h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Intelligence generated</p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-6 flex flex-col justify-between h-40 hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start">
              <p className="font-label-caps text-label-caps text-outline uppercase">Shared</p>
              <Users className="text-secondary w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline-lg text-headline-lg leading-none"><CountingNumber value={publicNotes} /></h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Public notes</p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-6 flex flex-col justify-between h-40 hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start">
              <p className="font-label-caps text-label-caps text-outline uppercase">Weekly Activity</p>
              <TrendingUp className="text-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline-lg text-headline-lg leading-none text-primary">
                <CountingNumber value={Math.abs(weeklyActivity.trend)} prefix={weeklyActivity.trend >= 0 ? "+" : "-"} suffix="%" />
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Since last week</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Middle: Activity Trends */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-[28px] p-8 h-[400px] flex flex-col"
        >
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="font-title-md text-title-md text-on-surface">Activity Trends</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Cognitive output over the last 30 days</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-surface-variant text-label-caps text-primary cursor-pointer hover:bg-surface-variant/80 transition-colors">Daily</span>
            </div>
          </div>
          <div className="flex-1 relative flex items-end gap-1">
            {trendHeights.map((height: number, i: number) => (
              <motion.div 
                key={i}
                initial={{ height: "0%" }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.02, type: "spring", bounce: 0.3 }}
                className="flex-1 bg-gradient-to-t from-primary/30 to-primary/5 hover:from-primary/50 hover:to-primary/20 transition-colors rounded-t-lg relative group cursor-pointer"
                title={activityTrend[i].date}
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-white/10 text-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {activityTrend[i].notesEdited + activityTrend[i].aiActions} actions
                </div>
              </motion.div>
            ))}
            
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                className="opacity-80" 
                d="M0,80 Q100,20 200,60 T400,10 T600,70 T800,30 T1000,50" 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="flex justify-between mt-4 font-label-caps text-[10px] text-outline uppercase tracking-widest">
            <span>30 days ago</span>
            <span>15 days ago</span>
            <span>Today</span>
          </div>
        </motion.section>

        {/* Bottom Row: Tags & Activity */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-gutter pb-margin-desktop"
        >
          {/* Most Used Tags */}
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-8 lg:col-span-1">
            <h4 className="font-title-md text-title-md text-on-surface mb-6">Most Used Tags</h4>
            <div className="space-y-6">
              {mostUsedTags.length === 0 ? (
                <p className="text-body-sm text-on-surface-variant italic">No tags used yet.</p>
              ) : (
                mostUsedTags.slice(0, 4).map((tag: any, i: number) => {
                  const maxTagCount = Math.max(...mostUsedTags.map((t: any) => t.count));
                  const width = `${Math.max(10, Math.round((tag.count / maxTagCount) * 100))}%`;
                  const colors = ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-outline'];
                  const colorClass = colors[i % colors.length];

                  return (
                    <div key={tag.name} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>
                          <span className="font-body-lg text-body-lg">{tag.name}</span>
                        </div>
                        <span className="font-label-caps text-outline">{tag.count} Notes</span>
                      </div>
                      <div className="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: "0%" }}
                          animate={{ width }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className={`h-full ${colorClass} rounded-full`}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>

          {/* This Week Summary (Moved to span 2 for better layout) */}
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-8 lg:col-span-2 bg-surface-container border border-primary/20 hover:-translate-y-1 transition-transform shadow-[0_0_30px_rgba(242,202,80,0.05)]">
            <h4 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              <CalendarDays className="text-primary w-5 h-5" />
              This Week's Synopsis
            </h4>
            <div className="space-y-4">
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                {weeklyActivity.summary}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-surface-container-low rounded-xl border border-white/5 space-y-2">
                  <div className="text-outline text-body-sm">Notes Created</div>
                  <div className="text-on-surface font-headline-sm"><CountingNumber value={weeklyActivity.notesThisWeek} /></div>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl border border-white/5 space-y-2">
                  <div className="text-outline text-body-sm">AI Actions</div>
                  <div className="text-on-surface font-headline-sm"><CountingNumber value={weeklyActivity.aiActionsThisWeek} /></div>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl border border-white/5 space-y-2">
                  <div className="text-outline text-body-sm">Avg Words/Note</div>
                  <div className="text-on-surface font-headline-sm"><CountingNumber value={weeklyActivity.avgNoteLength} /></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Enhanced Insights Bottom Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-gutter pb-margin-desktop"
        >
          {/* AI Usage Breakdown */}
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-8 hover:-translate-y-1 transition-transform">
            <h4 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              <BarChart3 className="text-secondary w-5 h-5" />
              AI Usage Breakdown
            </h4>
            <div className="space-y-5">
              {totalAiActions === 0 ? (
                <p className="text-body-sm text-on-surface-variant italic">No AI actions used yet.</p>
              ) : (
                aiPercentages.map((item, i) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-body-sm mb-1">
                      <span className="text-on-surface">{item.name}</span>
                      <span className="text-outline">{item.percent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: `${item.percent}%` }}
                        transition={{ duration: 1, delay: 0.8 + i * 0.1, type: "spring" }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Recently Edited with AI */}
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-8 hover:-translate-y-1 transition-transform">
            <h4 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              <Wand2 className="text-primary w-5 h-5" />
              Recently Enhanced with AI
            </h4>
            <div className="space-y-4">
              {recentlyEdited.length === 0 ? (
                <p className="text-body-sm text-on-surface-variant italic">No AI enhanced notes yet.</p>
              ) : (
                recentlyEdited.map((item: any, i: number) => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ x: 4 }}
                    className="group cursor-pointer border-l-2 border-transparent hover:border-primary pl-3 -ml-3 transition-all"
                  >
                    <h5 className="font-body-lg text-on-surface group-hover:text-primary transition-colors">{item.title || 'Untitled Note'}</h5>
                    <p className="text-body-sm text-outline">Updated {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}</p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
}
