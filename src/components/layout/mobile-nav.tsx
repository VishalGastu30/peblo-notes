'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, BarChart3, Plus, Archive, Settings, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/stores/editor-store';
import { mutate } from 'swr';

const mobileNavItems = [
  { href: '/workspace', icon: FileText, label: 'Notes' },
  { href: '/archive', icon: Archive, label: 'Archive' },
  // FAB placeholder
  { href: '/insights', icon: BarChart3, label: 'Insights' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function MobileNav() {
  const pathname = usePathname();
  const [isCreating, setIsCreating] = useState(false);
  const { setActiveNote } = useEditorStore();

  const handleCreateNote = async () => {
    try {
      setIsCreating(true);
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error('Failed to create note');
      const { data } = await res.json();
      mutate((key: string) => typeof key === 'string' && key.startsWith('/api/notes'));
      setActiveNote(data.id);
      window.location.href = '/workspace';
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-white/5 flex items-end justify-around z-50 px-2 pb-[env(safe-area-inset-bottom,8px)] pt-1">
      {/* First two nav items */}
      {mobileNavItems.slice(0, 2).map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + '/');
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 p-2 min-w-[56px] transition-colors",
              active ? "text-primary" : "text-outline hover:text-on-surface"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}

      {/* Center FAB */}
      <div className="relative -top-4">
        <button
          onClick={handleCreateNote}
          disabled={isCreating}
          className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_0_24px_rgba(242,202,80,0.35)] hover:scale-105 active:scale-95 transition-all border-4 border-surface-container-lowest disabled:opacity-70"
        >
          {isCreating ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Plus className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Last two nav items */}
      {mobileNavItems.slice(2).map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + '/');
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 p-2 min-w-[56px] transition-colors",
              active ? "text-primary" : "text-outline hover:text-on-surface"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
