'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface ActivityChartProps {
  data: { date: string; words: number; notes: number }[];
  variants?: any;
}

export function ActivityChart({ data, variants }: ActivityChartProps) {
  const maxWords = Math.max(...data.map(d => d.words), 1);
  
  return (
    <motion.div
      variants={variants}
      className="glass-card p-6 rounded-2xl border border-white/5"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-label-caps text-outline uppercase tracking-widest text-[10px]">Activity Trends</h3>
        <TrendingUp className="w-4 h-4 text-primary/50" />
      </div>

      {data.length === 0 ? (
        <p className="text-body-sm text-on-surface-variant italic text-center py-8">No activity data yet</p>
      ) : (
        <div className="relative">
          {/* SVG Line Chart */}
          <svg viewBox={`0 0 ${data.length * 40} 120`} className="w-full h-32" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 1, 2, 3].map(i => (
              <line
                key={i}
                x1="0"
                y1={i * 40}
                x2={data.length * 40}
                y2={i * 40}
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="1"
              />
            ))}
            
            {/* Area fill */}
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(242,202,80,0.2)" />
                <stop offset="100%" stopColor="rgba(242,202,80,0)" />
              </linearGradient>
            </defs>
            <path
              d={`M 0 120 ${data.map((d, i) => `L ${i * 40 + 20} ${120 - (d.words / maxWords) * 100}`).join(' ')} L ${(data.length - 1) * 40 + 20} 120 Z`}
              fill="url(#areaGradient)"
            />
            
            {/* Line */}
            <path
              d={data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * 40 + 20} ${120 - (d.words / maxWords) * 100}`).join(' ')}
              fill="none"
              stroke="rgba(242,202,80,0.6)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {data.map((d, i) => (
              <circle
                key={i}
                cx={i * 40 + 20}
                cy={120 - (d.words / maxWords) * 100}
                r="3"
                fill="var(--color-primary, #f2ca50)"
                stroke="var(--color-surface, #1a1a1a)"
                strokeWidth="2"
                className="opacity-0 hover:opacity-100 transition-opacity"
              />
            ))}
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between mt-2">
            {data.map((d, i) => (
              <span key={i} className="text-[9px] text-outline text-center flex-1">
                {new Date(d.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
