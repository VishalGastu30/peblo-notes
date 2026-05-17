import React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNav } from '@/components/layout/mobile-nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[100dvh] overflow-hidden bg-background text-on-surface font-body-lg selection:bg-primary-container/30">
      <div className="hidden md:flex shrink-0 h-full">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
