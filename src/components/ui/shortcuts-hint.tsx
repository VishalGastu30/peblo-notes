'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';

const shortcuts = [
  { keys: ['⌘', 'N'], label: 'New Note' },
  { keys: ['⌘', 'K'], label: 'Search' },
  { keys: ['⌘', '⇧', 'A'], label: 'Archive Note' },
  { keys: ['⌘', '⇧', 'S'], label: 'Share Note' },
  { keys: ['Esc'], label: 'Close / Deselect' },
];

export function ShortcutsHint() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-surface-container border border-white/10 flex items-center justify-center text-outline hover:text-primary hover:border-primary/30 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(242,202,80,0.1)]"
        title="Keyboard shortcuts"
      >
        <Keyboard className="w-4 h-4" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-container-high border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Keyboard className="w-5 h-5 text-primary" />
                  <h3 className="font-title-md text-on-surface">Keyboard Shortcuts</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors text-outline hover:text-on-surface"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((shortcut, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                  >
                    <span className="text-body-sm text-on-surface-variant">{shortcut.label}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, j) => (
                        <kbd
                          key={j}
                          className="px-2 py-1 bg-surface-container-lowest border border-white/10 rounded-md text-[11px] text-on-surface font-mono min-w-[24px] text-center shadow-sm"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-outline mt-6 text-center uppercase tracking-widest">
                Use Ctrl on Windows/Linux
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
