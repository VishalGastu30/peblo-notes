import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  subtitle?: string;
  iconColor?: string;
  borderColor?: string;
  variants?: any;
}

export function StatCard({ icon: Icon, label, value, subtitle, iconColor = 'text-primary', borderColor = 'border-primary/20', variants }: StatCardProps) {
  return (
    <motion.div
      variants={variants}
      className={`glass-card p-6 rounded-2xl border ${borderColor} hover:shadow-[0_0_30px_rgba(242,202,80,0.05)] transition-shadow`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center border border-white/5`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <span className="text-label-caps text-outline uppercase tracking-widest text-[10px]">{label}</span>
      </div>
      <div className="font-display-hero text-[36px] text-on-surface leading-none mb-1">
        {value}
      </div>
      {subtitle && (
        <p className="text-body-sm text-on-surface-variant mt-2">{subtitle}</p>
      )}
    </motion.div>
  );
}
