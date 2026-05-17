import React from 'react';
import { motion } from 'framer-motion';

interface ThisWeekBlockProps {
  weeklyActivity: {
    totalWords: number;
    totalNotes: number;
    totalAiActions: number;
    days: { date: string; words: number; notes: number }[];
  };
  variants?: any;
}

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function ThisWeekBlock({ weeklyActivity, variants }: ThisWeekBlockProps) {
  const maxWords = Math.max(...weeklyActivity.days.map(d => d.words), 1);

  return (
    <motion.div
      variants={variants}
      className="glass-card p-6 rounded-2xl border border-white/5"
    >
      <h3 className="text-label-caps text-outline uppercase tracking-widest text-[10px] mb-6">This Week</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <div className="font-display-hero text-[24px] text-on-surface">{weeklyActivity.totalWords.toLocaleString()}</div>
          <p className="text-[10px] text-outline uppercase tracking-wider">Words Written</p>
        </div>
        <div>
          <div className="font-display-hero text-[24px] text-primary">{weeklyActivity.totalNotes}</div>
          <p className="text-[10px] text-outline uppercase tracking-wider">Notes Created</p>
        </div>
        <div>
          <div className="font-display-hero text-[24px] text-secondary">{weeklyActivity.totalAiActions}</div>
          <p className="text-[10px] text-outline uppercase tracking-wider">AI Actions</p>
        </div>
      </div>

      {/* Mini bar chart */}
      <div className="flex items-end gap-2 h-20">
        {weeklyActivity.days.map((day, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t bg-primary/30 hover:bg-primary/50 transition-colors min-h-[4px]"
              style={{ height: `${Math.max((day.words / maxWords) * 100, 5)}%` }}
            />
            <span className="text-[9px] text-outline">{dayLabels[i]}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
