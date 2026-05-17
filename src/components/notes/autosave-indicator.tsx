import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutosaveIndicatorProps {
  status: 'idle' | 'saving' | 'saved' | 'error' | 'offline';
}

export function AutosaveIndicator({ status }: AutosaveIndicatorProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="flex items-center gap-2"
      >
        <div className="relative flex items-center justify-center w-4 h-4">
          {status === 'saving' && <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />}
          {status === 'saved' && (
            <>
              <span className="absolute w-2 h-2 rounded-full bg-primary/40 animate-ping"></span>
              <span className="relative w-1.5 h-1.5 rounded-full bg-primary"></span>
            </>
          )}
          {status === 'error' && <RefreshCcw className="w-3 h-3 text-rose-400" />}
          {status === 'offline' && <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>}
        </div>
        <span className={cn(
          "text-[11px] font-label-caps",
          status === 'saving' ? "text-amber-400" :
          status === 'error' ? "text-rose-400" :
          status === 'offline' ? "text-outline" : "text-outline"
        )}>
          {status === 'saving' ? 'Saving...' :
           status === 'saved' ? 'Saved to Cloud' :
           status === 'error' ? 'Save failed' :
           status === 'offline' ? 'Offline - queued' : ''}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
