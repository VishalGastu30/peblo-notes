import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface AiLoadingStateProps {
  title?: string;
  description?: string;
}

export function AiLoadingState({ 
  title = "Synthesizing Context", 
  description = "Extracting core pillars and actionable intelligence." 
}: AiLoadingStateProps) {
  return (
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
        <p className="font-title-md text-on-surface">{title}</p>
        <p className="text-body-sm text-on-surface-variant mt-1 max-w-[200px] mx-auto">{description}</p>
      </div>
    </motion.div>
  );
}
