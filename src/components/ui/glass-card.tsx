'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'primary' | 'secondary' | 'tertiary' | 'amber' | 'none';
  interactive?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  glowColor = 'none', 
  interactive = true,
  ...props 
}: GlassCardProps) {
  
  const glowMap = {
    primary: 'hover:shadow-[0_0_40px_rgba(242,202,80,0.15)] hover:border-primary/30',
    secondary: 'hover:shadow-[0_0_40px_rgba(221,184,255,0.15)] hover:border-secondary/30',
    tertiary: 'hover:shadow-[0_0_40px_rgba(255,200,214,0.15)] hover:border-tertiary/30',
    amber: 'hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:border-[#d4af37]/30',
    none: ''
  };

  const interactiveClasses = interactive 
    ? 'cursor-pointer hover:-translate-y-1 transition-all duration-300' 
    : '';

  return (
    <motion.div
      whileHover={interactive ? { scale: 0.995 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      className={cn(
        "glass-card bg-surface-container-low/40 backdrop-blur-xl border border-white/5 rounded-[28px] overflow-hidden",
        interactiveClasses,
        glowMap[glowColor],
        className
      )}
      {...props}
    >
      {/* Subtle top glare */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
