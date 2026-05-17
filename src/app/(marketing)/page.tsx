'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { FileText, Users, BarChart3, ShieldCheck, Lock, AtSign, Share2, Search, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';

export default function LandingPage() {
  // Stagger variants for the hero text
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  };

  return (
    <div className="font-body-lg min-h-screen bg-background text-on-background selection:bg-primary selection:text-on-primary">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-16 z-50 fixed top-0 bg-surface/80 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-display-hero text-title-md text-primary flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center">
              <FileText className="w-3 h-3 text-on-primary" />
            </div>
            Peblo Notes
          </Link>
          <div className="hidden md:flex gap-8">
            <Link className="text-on-surface hover:text-primary transition-colors font-label-caps text-xs tracking-widest uppercase" href="#features">Features</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-xs tracking-widest uppercase" href="#how-it-works">How it works</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-xs tracking-widest uppercase" href="#security">Security</Link>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/login" className="text-on-surface-variant hover:text-primary font-label-caps text-[10px] sm:text-xs tracking-widest uppercase transition-colors">Sign In</Link>
          <Link href="/signup">
            <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-caps text-xs tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(242,202,80,0.15)] hover:shadow-[0_0_30px_rgba(242,202,80,0.3)]">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center overflow-hidden min-h-[90vh] justify-center">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ 
              x: [0, 50, -50, 0], 
              y: [0, 30, -30, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full"
          />
          <motion.div 
            animate={{ 
              x: [0, -40, 40, 0], 
              y: [0, -50, 50, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full"
          />
        </div>

        <motion.div 
          className="z-10 w-full max-w-4xl flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-label-caps tracking-widest uppercase">
            <Sparkles className="w-3 h-3" /> Introducing Peblo AI 2.0
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="font-display-hero text-headline-lg md:text-display-hero leading-[1.1] mb-8 tracking-tight drop-shadow-2xl">
            Thought, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ffdf70] to-primary italic pr-2">Refined.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="max-w-2xl text-on-surface-variant text-lg md:text-xl font-body-lg mb-12 leading-relaxed">
            The intelligent canvas for high-stakes thinkers. Harness the power of generative AI to synthesize complexity into clarity and collaborate with editorial precision.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 mb-24 w-full sm:w-auto">
            <Link href="/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-primary text-on-primary px-10 py-4 rounded-full font-label-caps text-sm tracking-widest uppercase hover:brightness-110 transition-all duration-300 shadow-[0_0_30px_rgba(242,202,80,0.25)] flex items-center justify-center gap-2 active:scale-95 group">
                Start Writing 
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="w-full sm:w-auto border border-white/20 text-on-surface px-10 py-4 rounded-full font-label-caps text-sm tracking-widest uppercase hover:bg-white/5 transition-colors duration-300 active:scale-95">
              View Demo
            </button>
          </motion.div>

          {/* Product Mockup (CSS Only) */}
          <motion.div variants={itemVariants} className="w-full max-w-5xl mx-auto perspective-1000">
            <div className="relative w-full aspect-[16/10] rounded-2xl border border-white/10 bg-surface-container-lowest/80 backdrop-blur-2xl shadow-2xl shadow-primary/5 overflow-hidden flex flex-col transform rotate-x-12 hover:rotate-x-0 transition-transform duration-700 group">
              {/* Fake Top Bar */}
              <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 bg-surface-container-low/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/10 group-hover:bg-error/80 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-white/10 group-hover:bg-[#f2ca50]/80 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-white/10 group-hover:bg-[#55d699]/80 transition-colors"></div>
                </div>
                <div className="flex-1 max-w-md mx-auto bg-surface-container rounded-md h-6 border border-white/5 flex items-center px-3">
                  <Search className="w-3 h-3 text-outline/50" />
                </div>
              </div>
              {/* Fake App Body */}
              <div className="flex-1 flex">
                {/* Fake Sidebar */}
                <div className="w-1/4 h-full border-r border-white/5 p-4 space-y-4 hidden sm:block bg-surface-container-low/30">
                  <div className="h-4 w-20 bg-white/10 rounded"></div>
                  <div className="space-y-2 mt-6">
                    <div className="h-6 w-full bg-primary/20 rounded border border-primary/20"></div>
                    <div className="h-6 w-3/4 bg-white/5 rounded"></div>
                    <div className="h-6 w-5/6 bg-white/5 rounded"></div>
                  </div>
                </div>
                {/* Fake Editor */}
                <div className="flex-1 p-8 sm:p-12 space-y-6 relative overflow-hidden">
                  <div className="h-10 w-2/3 bg-white/10 rounded-lg"></div>
                  <div className="space-y-3 pt-4">
                    <div className="h-4 w-full bg-white/5 rounded"></div>
                    <div className="h-4 w-full bg-white/5 rounded"></div>
                    <div className="h-4 w-5/6 bg-white/5 rounded"></div>
                  </div>
                  <div className="space-y-3 pt-4">
                    <div className="h-4 w-full bg-white/5 rounded"></div>
                    <div className="h-4 w-4/5 bg-white/5 rounded"></div>
                  </div>
                  {/* Floating AI Panel Mock */}
                  <div className="absolute right-8 bottom-8 w-64 h-48 rounded-xl bg-surface-container border border-primary/30 shadow-[0_0_30px_rgba(242,202,80,0.1)] p-4 space-y-3 backdrop-blur-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-300">
                    <div className="flex items-center gap-2 text-primary border-b border-white/5 pb-2">
                      <Sparkles className="w-4 h-4" />
                      <div className="h-3 w-16 bg-primary/30 rounded"></div>
                    </div>
                    <div className="h-3 w-full bg-white/10 rounded"></div>
                    <div className="h-3 w-full bg-white/10 rounded"></div>
                    <div className="h-3 w-2/3 bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>
              {/* Glare effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
        <AnimatedSection className="text-center mb-20">
          <h2 className="font-display-hero text-headline-lg-mobile md:text-headline-lg mb-6">Cognition, Amplified.</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">Peblo doesn't just store your notes; it understands them. Experience a new paradigm of digital thought organization.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedSection delay={0.1}>
            <div className="glass-card p-10 h-full flex flex-col gap-6 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(242,202,80,0.1)] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="text-primary w-7 h-7" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface">Intelligent Summaries</h3>
              <p className="text-on-surface-variant font-body-sm text-base leading-relaxed flex-1">
                Convert hours of research and long-form transcripts into executive briefs instantly. Our AI preserves nuance while optimizing for speed.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="glass-card p-10 h-full flex flex-col gap-6 hover:border-secondary/40 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(221,184,255,0.1)] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="text-secondary w-7 h-7" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface">Seamless Sharing</h3>
              <p className="text-on-surface-variant font-body-sm text-base leading-relaxed flex-1">
                Collaborate in real-time with an interface designed for focus. Shared workspaces allow for versioned edits and asynchronous context-sync.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="glass-card p-10 h-full flex flex-col gap-6 hover:border-tertiary/40 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,200,214,0.1)] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-tertiary/10 border border-tertiary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="text-tertiary w-7 h-7" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface">Deep Insights</h3>
              <p className="text-on-surface-variant font-body-sm text-base leading-relaxed flex-1">
                Identify patterns across your entire library. Connect disparate thoughts automatically and uncover connections you didn't know existed.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 bg-surface-container-lowest/50 border-y border-white/5">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
          <AnimatedSection className="text-center mb-24">
            <h2 className="font-display-hero text-headline-lg-mobile md:text-headline-lg mb-6">Frictionless Workflow</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">From chaotic brain dumps to structured editorial pieces in three fluid steps.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

            {[
              { num: '01', title: 'Capture', desc: 'Jot down raw thoughts rapidly. The minimalist editor gets out of your way, letting your ideas flow uninterrupted.' },
              { num: '02', title: 'Synthesize', desc: 'Summon the AI assistant to distill your notes, extract action items, and automatically tag content for your taxonomy.' },
              { num: '03', title: 'Publish', desc: 'Generate public, read-only links with beautiful typography to share your refined thoughts with the world.' }
            ].map((step, idx) => (
              <AnimatedSection key={step.num} delay={0.1 * idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-surface border border-primary/20 flex items-center justify-center text-primary font-display-hero text-2xl mb-8 shadow-[0_0_30px_rgba(242,202,80,0.1)]">
                  {step.num}
                </div>
                <h3 className="font-title-md text-title-md text-on-surface mb-4">{step.title}</h3>
                <p className="text-on-surface-variant text-base">{step.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-32 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto overflow-hidden">
        <AnimatedSection className="text-center mb-20">
          <h2 className="font-display-hero text-headline-lg-mobile md:text-headline-lg">Trusted by Visionaries</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="glass-card p-8 rounded-[24px] border border-white/5 relative">
              <div className="text-primary text-4xl font-serif absolute top-6 left-6 opacity-20">"</div>
              <p className="text-on-surface-variant text-lg relative z-10 mb-8 italic">
                "Peblo has completely transformed how our product team documents strategy. The AI extraction alone saves us hours every week, and the interface is simply beautiful."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center border border-white/10">
                  <AtSign className="w-5 h-5 text-outline" />
                </div>
                <div>
                  <h4 className="text-on-surface font-title-md">Elena Rostova</h4>
                  <p className="text-outline text-sm">VP Product, Nexus AI</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="glass-card p-8 rounded-[24px] border border-white/5 relative">
              <div className="text-primary text-4xl font-serif absolute top-6 left-6 opacity-20">"</div>
              <p className="text-on-surface-variant text-lg relative z-10 mb-8 italic">
                "Finally, a workspace that respects my cognitive load. The dark-mode-first approach and the subtle animations make deep work an absolute joy."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center border border-white/10">
                  <AtSign className="w-5 h-5 text-outline" />
                </div>
                <div>
                  <h4 className="text-on-surface font-title-md">Marcus Chen</h4>
                  <p className="text-outline text-sm">Lead Architect, Synthetix</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section id="security" className="py-32 px-margin-mobile md:px-margin-desktop bg-surface-container-low border-y border-white/5 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-container-max-width mx-auto flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
          <AnimatedSection className="flex-1 text-center md:text-left">
            <h2 className="font-display-hero text-[40px] md:text-[56px] leading-tight mb-6">Built for precision.<br/>Secured for peace of mind.</h2>
            <p className="text-on-surface-variant text-lg mb-10 max-w-xl mx-auto md:mx-0">
              We understand that your thoughts are your most valuable asset. Peblo utilizes enterprise-grade encryption and isolated data environments for every workspace.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6">
              <div className="flex items-center justify-center sm:justify-start gap-3 bg-surface-container py-3 px-6 rounded-xl border border-white/5">
                <ShieldCheck className="text-primary w-6 h-6" />
                <span className="font-label-caps text-xs tracking-widest uppercase">SOC2 COMPLIANT</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 bg-surface-container py-3 px-6 rounded-xl border border-white/5">
                <Lock className="text-primary w-6 h-6" />
                <span className="font-label-caps text-xs tracking-widest uppercase">END-TO-END ENCRYPTION</span>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="flex-1 w-full max-w-md">
            <div className="aspect-square rounded-full border border-primary/20 p-8 flex items-center justify-center relative shadow-[0_0_50px_rgba(242,202,80,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full animate-pulse-slow"></div>
              {/* CSS Representation of Security instead of Image */}
              <div className="relative z-10 w-48 h-48 rounded-full border-2 border-primary/40 flex items-center justify-center backdrop-blur-sm bg-surface-container-lowest/50 overflow-hidden">
                <div className="absolute w-full h-1 bg-primary/30 blur-sm top-1/2 -translate-y-1/2 animate-[scan_3s_ease-in-out_infinite_alternate]"></div>
                <Lock className="w-16 h-16 text-primary" />
              </div>
              {/* Decorative rings */}
              <div className="absolute inset-8 border border-white/5 rounded-full border-dashed animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute inset-16 border border-primary/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-margin-mobile md:px-margin-desktop text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
        <AnimatedSection className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-display-hero text-[48px] md:text-[64px] mb-8">Ready to refine your thoughts?</h2>
          <p className="text-on-surface-variant text-xl mb-12">Join thousands of intellectuals, designers, and strategists elevating their cognitive output.</p>
          <Link href="/signup">
            <button className="bg-primary text-on-primary px-12 py-5 rounded-full font-label-caps text-sm tracking-[0.2em] uppercase hover:brightness-110 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(242,202,80,0.3)]">
              CREATE FREE ACCOUNT
            </button>
          </Link>
          <p className="mt-6 text-sm text-outline font-label-caps uppercase tracking-widest">No credit card required</p>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-white/5 py-12 relative z-10">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display-hero text-2xl text-primary">Peblo Notes</span>
            <span className="text-outline font-label-caps text-xs tracking-widest uppercase mt-1">© 2026 Peblo AI. Editorial Precision.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link className="text-outline hover:text-primary transition-colors font-label-caps text-xs tracking-widest uppercase" href="#">Privacy</Link>
            <Link className="text-outline hover:text-primary transition-colors font-label-caps text-xs tracking-widest uppercase" href="#">Terms</Link>
            <Link className="text-outline hover:text-primary transition-colors font-label-caps text-xs tracking-widest uppercase" href="#">API</Link>
            <Link className="text-outline hover:text-primary transition-colors font-label-caps text-xs tracking-widest uppercase" href="#">Changelog</Link>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-primary transition-colors text-outline">
              <AtSign className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-primary transition-colors text-outline">
              <Share2 className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>

      {/* Global styles for animations used in landing page */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-300%); }
          100% { transform: translateY(300%); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-x-12 {
          transform: rotateX(12deg) rotateY(-5deg);
        }
        .hover\\:rotate-x-0:hover {
          transform: rotateX(0deg) rotateY(0deg);
        }
      `}} />
    </div>
  );
}
