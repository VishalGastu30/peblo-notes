'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl border border-red-500/20 bg-[#1a1a1a] p-10 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <h2 className="text-[28px] font-bold mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-400">
              An unexpected error occurred. Please try again.
            </p>
          </div>
          {error.digest && (
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
              Error ID: {error.digest}
            </p>
          )}
          <div className="flex gap-3">
            <button
              onClick={reset}
              className="flex-1 py-3 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <Link href="/" className="flex-1">
              <button className="w-full py-3 border border-white/10 text-white rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </button>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
