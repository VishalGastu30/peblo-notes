'use client';

import React, { useState } from 'react';
import { Sparkles, Info, CheckCircle2, Circle, RefreshCw, Copy, Loader2 } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export function AIPanel() {
  const [isGenerating, setIsGenerating] = useState(false);

  // Simulated generation handler
  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2500);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="col-span-3 bg-surface-container-low border-l border-white/5 flex flex-col h-full relative overflow-hidden">
      {/* Active Generating Glow */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 right-0 w-full h-[200px] bg-primary/20 blur-[100px] rounded-full pointer-events-none z-0 mix-blend-screen animate-pulse-glow"
          />
        )}
      </AnimatePresence>

      <div className="p-6 border-b border-white/5 relative z-10 bg-surface-container-low/80 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              {isGenerating && <span className="absolute w-5 h-5 rounded-full bg-primary/40 animate-ping"></span>}
              <Sparkles className={`w-5 h-5 transition-colors ${isGenerating ? 'text-primary' : 'text-on-surface-variant'}`} />
            </div>
            <h2 className="font-title-md text-on-surface">AI Insights</h2>
          </div>
          {isGenerating && (
            <span className="text-[10px] font-label-caps text-primary uppercase tracking-widest animate-pulse">Generating...</span>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative z-10">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div 
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full space-y-4 text-center"
            >
              <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <div>
                <p className="font-title-md text-on-surface">Synthesizing Context</p>
                <p className="text-body-sm text-on-surface-variant mt-1 max-w-[200px]">Extracting core pillars and actionable intelligence.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {/* Summary Block */}
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-label-caps text-outline uppercase">Executive Summary</span>
                  <Info className="w-4 h-4 text-outline" />
                </div>
                <div className="p-4 rounded-2xl bg-surface-variant/30 border border-white/5 text-body-sm text-on-surface-variant leading-relaxed shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-shadow">
                  Proposes a 2024 strategy focusing on "Luxury Editorial" design combined with AI integration. Key themes include "Tactile Digitalism" and focus-driven UX using a dark-mode-first aesthetic to enhance long-form cognitive work.
                </div>
              </motion.div>
              
              {/* Action Items Block */}
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-label-caps text-outline uppercase">Action Items</span>
                  <CheckCircle2 className="w-4 h-4 text-outline" />
                </div>
                <div className="p-4 rounded-2xl bg-surface-variant/30 border border-white/5 space-y-3 shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-shadow">
                  {[
                    "Finalize visual token set for 'Tactile Digitalism' components.",
                    "Prototype the 'Loom' 3D thought visualization engine.",
                    "Schedule review for brand identity guidelines integration."
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="flex gap-3 items-start group cursor-pointer"
                    >
                      <Circle className="text-primary/50 w-4 h-4 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                      <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* AI Visual Insight */}
              <motion.div variants={itemVariants} className="rounded-[28px] overflow-hidden border border-primary/20 relative group cursor-pointer">
                <div className="w-full aspect-square bg-gradient-to-br from-primary/10 via-surface-container to-background flex items-center justify-center group-hover:from-primary/20 transition-colors duration-500">
                  <span className="text-outline font-label-caps text-xs tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">VISUALIZATION</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80"></div>
                <div className="absolute bottom-5 left-5 right-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="text-[10px] font-label-caps text-primary mb-1 uppercase tracking-widest">Visual Metaphor</p>
                  <p className="text-[13px] text-on-surface font-medium leading-relaxed">Concept mapping of "Radiant Intelligence" flow within the workspace.</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer Actions */}
      <div className="p-6 mt-auto border-t border-white/5 bg-surface-container-high/50 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="flex items-center justify-center gap-2 py-3 bg-primary text-on-primary rounded-xl text-xs font-label-caps tracking-widest uppercase transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(242,202,80,0.15)]"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            Regenerate
          </button>
          <button 
            disabled={isGenerating}
            className="flex items-center justify-center gap-2 py-3 border border-primary/30 text-primary rounded-xl text-xs font-label-caps tracking-widest uppercase transition-all hover:bg-primary/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
      </div>
    </section>
  );
}
