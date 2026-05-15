import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/5 full-width py-12">
      <div className="max-w-container-max-width mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-display-hero text-body-lg text-on-surface">Peblo Notes</span>
          <p className="font-label-caps text-label-caps text-outline mt-2">© 2026 Peblo AI. Editorial Precision.</p>
        </div>
        <div className="flex gap-8">
          <Link className="font-label-caps text-label-caps text-outline hover:text-secondary transition-all opacity-80 hover:opacity-100" href="#">Privacy</Link>
          <Link className="font-label-caps text-label-caps text-outline hover:text-secondary transition-all opacity-80 hover:opacity-100" href="#">Terms</Link>
          <Link className="font-label-caps text-label-caps text-outline hover:text-secondary transition-all opacity-80 hover:opacity-100" href="#">API</Link>
          <Link className="font-label-caps text-label-caps text-outline hover:text-secondary transition-all opacity-80 hover:opacity-100" href="#">Changelog</Link>
        </div>
      </div>
    </footer>
  );
}
