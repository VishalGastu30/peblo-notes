import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, style, ...props }: SkeletonProps) {
  return (
    <div
      style={style}
      className={cn(
        "animate-pulse rounded-lg bg-white/5 relative overflow-hidden",
        "after:absolute after:inset-0 after:translate-x-[-100%] after:animate-[shimmer_2s_infinite]",
        "after:bg-gradient-to-r after:from-transparent after:via-white/[0.03] after:to-transparent",
        className
      )}
      {...props}
    />
  );
}

export function NoteCardSkeleton() {
  return (
    <div className="p-5 rounded-[24px] border border-white/5 bg-surface-container space-y-4">
      <div className="flex justify-between items-start">
        <Skeleton className="h-5 w-2/3 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
      </div>
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-4/5 rounded" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
    </div>
  );
}

export function NoteListSkeleton() {
  return (
    <div className="space-y-4 px-4">
      {[0, 1, 2].map(i => (
        <NoteCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function AiPanelSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-5 w-24 rounded" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="h-3 w-20 rounded" />
      </div>
      <Skeleton className="h-10 w-24 rounded" />
      <Skeleton className="h-3 w-32 rounded" />
    </div>
  );
}

export function EditorSkeleton() {
  return (
    <div className="flex-1 px-16 py-12 space-y-8">
      <Skeleton className="h-12 w-2/3 rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
      </div>
      <div className="space-y-4 pt-4">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
      </div>
    </div>
  );
}

export function ActivityChartSkeleton() {
  return (
    <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24 rounded" />
        <Skeleton className="w-4 h-4 rounded" />
      </div>
      <div className="flex items-end gap-2 h-32">
        {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
          <Skeleton key={i} className="flex-1 rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}
