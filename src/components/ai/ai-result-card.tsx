import React from 'react';
import { motion } from 'framer-motion';

interface AiResultCardProps {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  onCopy?: () => void;
  onRegenerate?: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  variants?: any;
}

export function AiResultCard({ 
  title, 
  icon, 
  content, 
  onCopy, 
  onRegenerate, 
  primaryAction,
  variants 
}: AiResultCardProps) {
  return (
    <motion.div variants={variants} className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-label-caps text-outline uppercase">{title}</span>
        <div className="text-outline">
          {icon}
        </div>
      </div>
      
      <div className="p-4 rounded-2xl bg-surface-variant/30 border border-white/5 text-body-sm text-on-surface-variant leading-relaxed shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-shadow">
        {content}
      </div>
      
      <div className="flex justify-end gap-2 mt-2">
        {onCopy && (
          <button onClick={onCopy} className="text-[10px] font-label-caps text-outline hover:text-primary uppercase tracking-widest px-2 py-1">
            Copy
          </button>
        )}
        {onRegenerate && (
          <button onClick={onRegenerate} className="text-[10px] font-label-caps text-outline hover:text-primary uppercase tracking-widest px-2 py-1">
            Regenerate
          </button>
        )}
        {primaryAction && (
          <button onClick={primaryAction.onClick} className="text-[10px] font-label-caps text-primary hover:text-primary/80 uppercase tracking-widest px-2 py-1 ml-2 border border-primary/20 rounded">
            {primaryAction.label}
          </button>
        )}
      </div>
    </motion.div>
  );
}
