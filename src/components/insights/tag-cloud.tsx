import React from 'react';
import { motion } from 'framer-motion';

interface TagCloudProps {
  tags: { name: string; count: number }[];
  variants?: any;
}

export function TagCloud({ tags, variants }: TagCloudProps) {
  const maxCount = Math.max(...tags.map(t => t.count), 1);

  return (
    <motion.div
      variants={variants}
      className="glass-card p-6 rounded-2xl border border-white/5"
    >
      <h3 className="text-label-caps text-outline uppercase tracking-widest text-[10px] mb-6">Most Used Tags</h3>
      
      {tags.length === 0 ? (
        <p className="text-body-sm text-on-surface-variant italic">No tags yet</p>
      ) : (
        <div className="space-y-3">
          {tags.map((tag, i) => (
            <div key={tag.name} className="flex items-center gap-3">
              <span className="text-body-sm text-on-surface-variant w-20 truncate">{tag.name}</span>
              <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(tag.count / maxCount) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                />
              </div>
              <span className="text-[10px] text-outline w-6 text-right">{tag.count}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
