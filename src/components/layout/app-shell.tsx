import React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNav } from '@/components/layout/mobile-nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-surface font-body-lg selection:bg-primary-container/30">
      <Sidebar />
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
