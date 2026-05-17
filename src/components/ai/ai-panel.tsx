'use client';

import React from 'react';
import { Sparkles, Info, CheckCircle2, Circle, RefreshCw, Copy, Loader2, Type } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAiAction } from '@/hooks/use-ai-action';
import { useEditorStore } from '@/stores/editor-store';
import { useNote } from '@/hooks/use-note';

export function AIPanel() {
  const { activeNoteId } = useEditorStore();
  const { updateNote } = useNote(activeNoteId);
  const { state, result, error, generate, reset, copy } = useAiAction(activeNoteId);

  const isGenerating = state === 'generating';

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

  if (!activeNoteId) {
    return (
      <section className="col-span-3 bg-surface-container-low border-l border-white/5 flex items-center justify-center h-full relative overflow-hidden">
         <div className="text-center opacity-50 px-6">
          <Sparkles className="w-8 h-8 text-outline mx-auto mb-4" />
          <p className="font-title-md text-xl text-on-surface">AI Insights</p>
          <p className="text-body-sm text-on-surface-variant mt-2">Select a note to generate AI insights.</p>
        </div>
      </section>
    );
  }

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
              {error && (
                <motion.div variants={itemVariants} className="p-4 rounded-2xl bg-error/10 border border-error/20 text-error text-body-sm text-center">
                  {error}
                </motion.div>
              )}

              {state === 'idle' && !error && (
                <motion.div variants={itemVariants} className="space-y-3">
                  <p className="text-body-sm text-on-surface-variant text-center mb-6">What would you like to generate for this note?</p>
                  <button 
                    onClick={() => generate('summary')}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-variant/30 border border-white/5 hover:bg-surface-variant hover:border-white/10 transition-colors group"
                  >
                    <span className="text-body-sm font-medium text-on-surface">Executive Summary</span>
                    <Info className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                  </button>
                  <button 
                    onClick={() => generate('actions')}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-variant/30 border border-white/5 hover:bg-surface-variant hover:border-white/10 transition-colors group"
                  >
                    <span className="text-body-sm font-medium text-on-surface">Extract Action Items</span>
                    <CheckCircle2 className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                  </button>
                  <button 
                    onClick={() => generate('title')}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-variant/30 border border-white/5 hover:bg-surface-variant hover:border-white/10 transition-colors group"
                  >
                    <span className="text-body-sm font-medium text-on-surface">Suggest Title</span>
                    <Type className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                  </button>
                </motion.div>
              )}

              {/* Results */}
              {result?.summary && (
                <motion.div variants={itemVariants} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-label-caps text-outline uppercase">Executive Summary</span>
                    <Info className="w-4 h-4 text-outline" />
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-variant/30 border border-white/5 text-body-sm text-on-surface-variant leading-relaxed shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-shadow">
                    {result.summary}
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={() => copy(result.summary!)} className="text-[10px] font-label-caps text-outline hover:text-primary uppercase tracking-widest px-2 py-1">Copy</button>
                    <button onClick={() => generate('summary')} className="text-[10px] font-label-caps text-outline hover:text-primary uppercase tracking-widest px-2 py-1">Regenerate</button>
                  </div>
                </motion.div>
              )}

              {result?.actionItems && (
                <motion.div variants={itemVariants} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-label-caps text-outline uppercase">Action Items</span>
                    <CheckCircle2 className="w-4 h-4 text-outline" />
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-variant/30 border border-white/5 space-y-3 shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-shadow">
                    {result.actionItems.length === 0 ? (
                      <p className="text-body-sm text-on-surface-variant italic">No action items found.</p>
                    ) : (
                      result.actionItems.map((item, idx) => (
                        <motion.div 
                          key={idx}
                          whileHover={{ x: 4 }}
                          className="flex gap-3 items-start group cursor-pointer"
                        >
                          <Circle className="text-primary/50 w-4 h-4 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                          <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{item}</span>
                        </motion.div>
                      ))
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={() => copy(result.actionItems!.join('\n'))} className="text-[10px] font-label-caps text-outline hover:text-primary uppercase tracking-widest px-2 py-1">Copy All</button>
                    <button onClick={() => generate('actions')} className="text-[10px] font-label-caps text-outline hover:text-primary uppercase tracking-widest px-2 py-1">Regenerate</button>
                  </div>
                </motion.div>
              )}

              {result?.suggestedTitle && (
                <motion.div variants={itemVariants} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-label-caps text-outline uppercase">Suggested Title</span>
                    <Type className="w-4 h-4 text-outline" />
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-variant/30 border border-white/5 space-y-3 shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-shadow">
                    <div 
                      className="text-body-sm font-medium text-on-surface hover:text-primary cursor-pointer transition-colors"
                      onClick={() => updateNote({ title: result.suggestedTitle })}
                    >
                      {result.suggestedTitle}
                    </div>
                    {result.alternatives && result.alternatives.length > 0 && (
                      <div className="pt-2 border-t border-white/5 space-y-2">
                        <p className="text-[10px] text-outline font-label-caps uppercase tracking-widest">Alternatives</p>
                        {result.alternatives.map((alt, idx) => (
                          <div 
                            key={idx} 
                            className="text-body-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors"
                            onClick={() => updateNote({ title: alt })}
                          >
                            {alt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={() => generate('title')} className="text-[10px] font-label-caps text-outline hover:text-primary uppercase tracking-widest px-2 py-1">Regenerate</button>
                  </div>
                </motion.div>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer Actions */}
      {state !== 'idle' && !isGenerating && (
        <div className="p-6 mt-auto border-t border-white/5 bg-surface-container-high/50 relative z-10">
          <button 
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 py-3 border border-white/10 text-on-surface-variant rounded-xl text-xs font-label-caps tracking-widest uppercase transition-all hover:bg-white/5 active:scale-95"
          >
            Clear Results
          </button>
        </div>
      )}
    </section>
  );
}

