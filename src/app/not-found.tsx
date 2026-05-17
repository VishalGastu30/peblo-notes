'use client';

import React from 'react';
import { FileQuestion, Home } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div className="w-24 h-24 mx-auto rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center shadow-[0_0_40px_rgba(242,202,80,0.1)]">
          <FileQuestion className="w-12 h-12 text-primary/60" />
        </div>
        
        <div>
          <h1 className="font-display-hero text-[48px] text-on-surface mb-4">404</h1>
          <p className="text-body-lg text-on-surface-variant">
            This page doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Link href="/">
          <button className="px-8 py-3 bg-primary text-on-primary font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(242,202,80,0.15)] flex items-center justify-center gap-2 mx-auto">
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
