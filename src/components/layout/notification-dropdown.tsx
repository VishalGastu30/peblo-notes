'use client';

import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Bell, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const mockNotifications = [
  { id: 1, type: 'ai', message: 'Note summary generated successfully', time: new Date(Date.now() - 1000 * 60 * 5) },
  { id: 2, type: 'system', message: 'Welcome to Peblo Notes v1.0.0', time: new Date(Date.now() - 1000 * 60 * 60 * 2) },
];

export function NotificationDropdown() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="relative hover:text-primary transition-colors p-1">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full ring-2 ring-surface" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content 
          className="z-50 w-80 bg-surface-container-high border border-white/10 rounded-2xl shadow-xl p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
          sideOffset={12}
          align="end"
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-title-md text-on-surface">Notifications</h3>
            <button className="text-[10px] uppercase font-bold tracking-widest text-primary hover:underline">
              Mark all read
            </button>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
            {mockNotifications.map(notif => (
              <div key={notif.id} className="p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer flex gap-3">
                <div className="shrink-0 mt-0.5">
                  {notif.type === 'ai' ? (
                    <Sparkles className="w-4 h-4 text-secondary" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-on-surface leading-tight">{notif.message}</p>
                  <p className="text-[10px] text-outline mt-1">{formatDistanceToNow(notif.time, { addSuffix: true })}</p>
                </div>
              </div>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
