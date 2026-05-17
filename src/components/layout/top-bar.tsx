'use client';

import React from 'react';
import { Search, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { NotificationDropdown } from './notification-dropdown';
import { HistoryDropdown } from './history-dropdown';
import { cn } from '@/lib/utils';

interface TopBarProps {
  title: string;
  showSearch?: boolean;
  actions?: React.ReactNode;
}

export function TopBar({ title, showSearch = true, actions }: TopBarProps) {
  return (
    <header className="flex justify-between items-center w-full px-4 md:px-margin-desktop h-16 z-40 bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-white/5 sticky top-0">
      <div className="flex items-center gap-8">
        <h2 className="font-display-hero text-title-md text-primary">{title}</h2>
      </div>
      <div className="flex items-center gap-6">
        {showSearch && (
          <div className="relative hidden lg:block">
            <input 
              className="bg-surface-container-low border-none rounded-full px-10 py-1.5 text-sm w-64 focus:ring-1 focus:ring-primary/40 placeholder:text-outline/50 text-on-surface outline-none transition-all" 
              placeholder="Search..." 
              type="text"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline/50 w-4 h-4" />
          </div>
        )}
        <div className="flex items-center gap-4 text-on-surface-variant">
          <NotificationDropdown />
          <HistoryDropdown />
          {actions}
          <div className="md:hidden flex items-center ml-1">
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-surface-variant/50 hover:text-error hover:bg-error/10 transition-colors text-outline"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
