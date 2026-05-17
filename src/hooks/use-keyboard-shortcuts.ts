'use client';

import React from 'react';
import { useEffect } from 'react';

interface KeyboardShortcutsOptions {
  onNewNote?: () => void;
  onSearch?: () => void;
  onArchive?: () => void;
  onShare?: () => void;
  onEscape?: () => void;
}

export function useKeyboardShortcuts({
  onNewNote,
  onSearch,
  onArchive,
  onShare,
  onEscape,
}: KeyboardShortcutsOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;

      // ⌘N - New Note
      if (isMeta && e.key === 'n') {
        e.preventDefault();
        onNewNote?.();
      }

      // ⌘K - Search
      if (isMeta && e.key === 'k') {
        e.preventDefault();
        onSearch?.();
      }

      // ⌘⇧A - Archive
      if (isMeta && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        onArchive?.();
      }

      // ⌘⇧S - Share
      if (isMeta && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        onShare?.();
      }

      // Escape
      if (e.key === 'Escape') {
        onEscape?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNewNote, onSearch, onArchive, onShare, onEscape]);
}
