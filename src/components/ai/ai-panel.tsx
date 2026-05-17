'use client';

import React, { useEffect } from 'react';
import { Sparkles, Info, CheckCircle2, Circle, RefreshCw, Copy, Loader2, Type } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAiAction } from '@/hooks/use-ai-action';
import { useEditorStore } from '@/stores/editor-store';
import { useNote } from '@/hooks/use-note';
import { AiActionButton } from './ai-action-button';
import { AiLoadingState } from './ai-loading-state';
import { AiResultCard } from './ai-result-card';

export function AIPanel() {
  const { activeNoteId } = useEditorStore();
  const { updateNote } = useNote(activeNoteId);
  const { state, result, error, generate, reset, copy } = useAiAction(activeNoteId);

  // Reset AI panel state when switching between notes
  useEffect(() => {
    reset();
  }, [activeNoteId]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <section className="bg-surface-container-low flex items-center justify-center h-full relative overflow-hidden w-full">
         <div className="text-center opacity-50 px-6">
          <Sparkles className="w-8 h-8 text-outline mx-auto mb-4" />
          <p className="font-title-md text-xl text-on-surface">AI Insights</p>
          <p className="text-body-sm text-on-surface-variant mt-2">Select a note to generate AI insights.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface-container-low flex flex-col h-full relative overflow-hidden w-full">
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
              <AiLoadingState />
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
                  <AiActionButton 
                    label="Executive Summary" 
                    icon={<Info className="w-4 h-4" />} 
                    onClick={() => generate('summary')} 
                  />
                  <AiActionButton 
                    label="Extract Action Items" 
                    icon={<CheckCircle2 className="w-4 h-4" />} 
                    onClick={() => generate('actions')} 
                  />
                  <AiActionButton 
                    label="Suggest Title" 
                    icon={<Type className="w-4 h-4" />} 
                    onClick={() => generate('title')} 
                  />
                </motion.div>
              )}

              {/* Results */}
              {result?.summary && (
                <AiResultCard
                  variants={itemVariants}
                  title="Executive Summary"
                  icon={<Info className="w-4 h-4" />}
                  content={result.summary}
                  onCopy={() => copy(result.summary!)}
                  onRegenerate={() => generate('summary')}
                />
              )}

              {result?.actionItems && (
                <AiResultCard
                  variants={itemVariants}
                  title="Action Items"
                  icon={<CheckCircle2 className="w-4 h-4" />}
                  content={
                    result.actionItems.length === 0 ? (
                      <p className="text-body-sm text-on-surface-variant italic">No action items found.</p>
                    ) : (
                      <ul className="space-y-2">
                        {result.actionItems.map((item, idx) => (
                          <motion.li 
                            key={idx}
                            whileHover={{ x: 4 }}
                            className="flex gap-3 items-start group cursor-pointer"
                          >
                            <Circle className="text-primary/50 w-4 h-4 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                            <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )
                  }
                  onCopy={() => copy(result.actionItems!.join('\n'))}
                  onRegenerate={() => generate('actions')}
                />
              )}

              {result?.suggestedTitle && (
                <AiResultCard
                  variants={itemVariants}
                  title="Suggested Title"
                  icon={<Type className="w-4 h-4" />}
                  content={
                    <div className="space-y-4">
                      <div className="group relative">
                        <div 
                          className="text-body-sm font-medium text-on-surface hover:text-primary cursor-pointer transition-colors pr-6"
                          onClick={() => {
                            updateNote({ title: result.suggestedTitle });
                            // Using a simple DOM-based toast if useToast isn't directly available here
                            const el = document.createElement('div');
                            el.className = 'fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium z-50 animate-in slide-in-from-bottom-5';
                            el.textContent = 'Title applied!';
                            document.body.appendChild(el);
                            setTimeout(() => { el.classList.add('animate-out', 'fade-out', 'slide-out-to-bottom-5'); setTimeout(() => el.remove(), 300); }, 2000);
                          }}
                        >
                          {result.suggestedTitle}
                        </div>
                        <span className="absolute -top-6 left-0 text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-primary/10 px-2 py-0.5 rounded">
                          Click to apply
                        </span>
                      </div>
                      
                      {result.alternatives && result.alternatives.length > 0 && (
                        <div className="pt-2 border-t border-white/5 space-y-2">
                          <p className="text-[10px] text-outline font-label-caps uppercase tracking-widest mb-3">Alternatives</p>
                          {result.alternatives.map((alt, idx) => (
                            <div key={idx} className="group relative">
                              <div 
                                className="text-body-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors pr-6"
                                onClick={() => {
                                  updateNote({ title: alt });
                                  const el = document.createElement('div');
                                  el.className = 'fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium z-50 animate-in slide-in-from-bottom-5';
                                  el.textContent = 'Title applied!';
                                  document.body.appendChild(el);
                                  setTimeout(() => { el.classList.add('animate-out', 'fade-out', 'slide-out-to-bottom-5'); setTimeout(() => el.remove(), 300); }, 2000);
                                }}
                              >
                                {alt}
                              </div>
                              <span className="absolute -top-6 left-0 text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-primary/10 px-2 py-0.5 rounded z-10">
                                Click to apply
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  }
                  onCopy={() => copy([result.suggestedTitle, ...(result.alternatives || [])].join('\n'))}
                  onRegenerate={() => generate('title')}
                />
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

