import React from 'react';

interface AiActionButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function AiActionButton({ label, icon, onClick }: AiActionButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-variant/30 border border-white/5 hover:bg-surface-variant hover:border-white/10 transition-colors group"
    >
      <span className="text-body-sm font-medium text-on-surface">{label}</span>
      <div className="text-outline group-hover:text-primary transition-colors">
        {icon}
      </div>
    </button>
  );
}
