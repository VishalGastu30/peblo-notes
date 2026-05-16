'use client';

import React from 'react';
import { Users, Globe, ExternalLink } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { Footer } from '@/components/layout/footer';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function SharedPage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* TopNavBar */}
      <header className="flex justify-between items-center w-full px-margin-desktop h-16 z-40 bg-surface/80 backdrop-blur-md border-b border-white/5 sticky top-0">
        <div className="flex items-center gap-8">
          <h2 className="font-display-hero text-title-md text-primary">Shared Notes</h2>
        </div>
      </header>

      <div className="p-margin-desktop flex-1">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Info Card */}
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-8 border border-primary/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-title-md text-on-surface">Publicly Shared</h3>
                <p className="text-body-sm text-on-surface-variant">Notes you&apos;ve made accessible via share links</p>
              </div>
            </div>
          </motion.div>

          {/* Empty State */}
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-16 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-surface-variant/30 border border-white/5 flex items-center justify-center mb-6">
              <Users className="w-10 h-10 text-outline" />
            </div>
            <h3 className="font-title-md text-on-surface mb-2">No shared notes yet</h3>
            <p className="text-body-sm text-on-surface-variant max-w-sm mb-8">
              When you share a note publicly, it will appear here. Open any note and click the Share button to generate a public link.
            </p>
            <div className="flex items-center gap-2 text-primary text-body-sm font-medium">
              <ExternalLink className="w-4 h-4" />
              <span>Public links are accessible to anyone</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
