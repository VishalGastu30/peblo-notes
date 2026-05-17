'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FileText, Sparkles, Brain, Lock } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <main className="flex min-h-[100dvh] flex-col md:flex-row bg-background text-on-surface overflow-x-hidden">
      {/* Left Visual Panel — compact on mobile, full on desktop */}
      <section className="relative w-full md:w-5/12 lg:w-1/2 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/[0.06]
        py-8 px-6 md:min-h-screen shrink-0">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface-container-low to-background" />
        
        {/* Animated gradient orbs */}
        <motion.div 
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] w-[60vw] md:w-[20vw] h-[60vw] md:h-[20vw] bg-primary/15 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ x: [0, -25, 25, 0], y: [0, 25, -15, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[15%] right-[5%] w-[50vw] md:w-[18vw] h-[50vw] md:h-[18vw] bg-secondary/10 blur-[100px] rounded-full"
        />

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.1) 59px, rgba(255,255,255,0.1) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.1) 59px, rgba(255,255,255,0.1) 60px)`
          }}
        />

        {/* Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-lg w-full"
        >
          {/* Brand badge */}
          <motion.div variants={itemVariants} className="mb-5">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center shadow-[0_0_12px_rgba(242,202,80,0.25)]">
                <FileText className="w-4 h-4 text-on-primary" />
              </div>
              <span className="font-display-hero text-sm text-primary tracking-wide">Peblo Notes</span>
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="font-display-hero text-3xl md:text-5xl text-primary mb-3 leading-[1.1]"
          >
            Think deeper.
            <br />
            <span className="text-on-surface">Write better.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-on-surface-variant text-sm md:text-lg leading-relaxed max-w-sm mb-6 md:mb-10"
          >
            The intellectual sanctuary for your digital consciousness.
          </motion.p>

          {/* Feature pills — hidden on very small screens */}
          <motion.div variants={itemVariants} className="hidden sm:flex flex-wrap gap-2">
            {[
              { icon: Sparkles, label: 'AI Summaries' },
              { icon: Brain, label: 'Smart Search' },
              { icon: Lock, label: 'Private & Secure' },
            ].map((feature) => (
              <div 
                key={feature.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-on-surface-variant"
              >
                <feature.icon className="w-3 h-3 text-primary/70" />
                {feature.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Right Form Panel — scrollable so buttons never get cut off */}
      <section className="w-full md:w-7/12 lg:w-1/2 flex items-start md:items-center justify-center bg-surface flex-1 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-[440px] space-y-8 px-6 py-8 md:px-12 md:py-16"
        >
          <header className="space-y-2">
            <h2 className="font-display-hero text-2xl md:text-4xl text-on-surface">{title}</h2>
            <p className="text-on-surface-variant text-sm md:text-base">{subtitle}</p>
          </header>
          {children}
        </motion.div>
      </section>
    </main>
  );
}
