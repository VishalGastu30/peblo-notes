import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SettingsSectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

export function SettingsSection({ icon: Icon, title, children }: SettingsSectionProps) {
  return (
    <section className="space-y-6">
      <h3 className="font-title-md text-title-md text-primary flex items-center gap-3 border-b border-white/5 pb-4">
        <Icon className="w-5 h-5" />
        {title}
      </h3>
      <div className="glass-card bg-surface-container-lowest border border-white/5 rounded-[24px] p-8 space-y-8">
        {children}
      </div>
    </section>
  );
}

interface SettingsRowProps {
  title: string;
  description: string;
  children: React.ReactNode;
  variant?: 'default' | 'danger';
}

export function SettingsRow({ title, description, children, variant = 'default' }: SettingsRowProps) {
  const isDanger = variant === 'danger';
  return (
    <div className={`flex justify-between items-center ${isDanger ? 'pt-4 border-t border-error/10' : ''}`}>
      <div>
        <h4 className={`font-body-lg ${isDanger ? 'text-error' : 'text-on-surface'}`}>{title}</h4>
        <p className={`text-body-sm ${isDanger ? 'text-error/70' : 'text-outline'}`}>{description}</p>
      </div>
      {children}
    </div>
  );
}
