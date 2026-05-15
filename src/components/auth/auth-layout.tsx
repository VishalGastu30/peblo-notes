import React from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col md:flex-row bg-[#131315] text-[#e5e1e4]">
      {/* Left Visual Panel */}
      <section className="relative w-full md:w-5/12 lg:w-1/2 min-h-[409px] md:min-h-screen flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity" 
            alt="Workspace background" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR5NViiRlfQacnzCUb4Mby1d2AxwMRbqBDCRvcwYmiAZHN3GkuaQgoe1efAfrPcFiCkYTNX-v4oPYE0eXcyJv2qGdFafMjJUb-EI0n1sHRzgg_m5ozWT06-C4t230wl-al2EZXB4qEwQQcvowrKeevi_veDPTmt6fESKgr4S9zLgBxOGJOTpTV1kvKPfldChwz-kEI1fBdSnwMm5g_bu64Vkn2ijcRkSnpJiFgQmYNlTfm3__XZGZoJ_46fFQGPgsfQQRM8z20VcvR"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-primary/10"></div>
        </div>
        <div className="relative z-10 p-margin-desktop max-w-lg">
          <h1 className="font-display-hero text-headline-lg-mobile md:text-display-hero text-primary mb-4 leading-tight">
            Peblo Notes
          </h1>
          <p className="font-title-md text-on-surface-variant max-w-sm mb-8">
            The intellectual sanctuary for your digital consciousness.
          </p>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-primary"></div>
            <span className="font-label-caps text-primary uppercase tracking-[0.2em]">AI Integrated Workspace</span>
          </div>
        </div>
      </section>

      {/* Right Form Panel */}
      <section className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-6 md:p-margin-desktop bg-surface">
        <div className="w-full max-w-[480px] space-y-10">
          <header className="space-y-2">
            <h2 className="font-headline-lg-mobile md:text-headline-lg font-bold text-on-surface">{title}</h2>
            <p className="text-on-surface-variant font-body-lg">{subtitle}</p>
          </header>
          {children}
        </div>
      </section>
    </main>
  );
}
