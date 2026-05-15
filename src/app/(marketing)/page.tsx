import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="font-body-lg min-h-screen bg-[#131315] text-[#e5e1e4]">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center w-full px-margin-desktop h-16 z-40 fixed top-0 bg-surface/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-8">
          <span className="font-display-hero text-title-md text-primary">Peblo Notes</span>
          <div className="hidden md:flex gap-6">
            <Link className="text-primary border-b-2 border-primary pb-1 font-title-md text-title-md" href="/workspace">Workspace</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all font-title-md text-title-md" href="/workspace">Library</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all font-title-md text-title-md" href="/workspace">Collaborators</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-on-surface-variant hover:text-primary cursor-pointer transition-all">Sign In</Link>
          <Link href="/signup">
            <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-caps text-label-caps hover:scale-95 transition-transform duration-150">Get Started</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-20 px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10"></div>
        <h1 className="font-display-hero text-[64px] md:text-display-hero leading-tight mb-6">
          Thought, Refined.
        </h1>
        <p className="max-w-2xl text-on-surface-variant text-body-lg font-body-lg mb-10">
          The intelligent canvas for high-stakes thinkers. Harness the power of generative AI to synthesize complexity into clarity and collaborate with editorial precision.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link href="/signup">
            <button className="bg-primary-container text-on-primary-container px-10 py-4 rounded-full font-title-md text-title-md hover:bg-primary transition-colors duration-300">
              Get Started
            </button>
          </Link>
          <button className="border border-secondary text-secondary px-10 py-4 rounded-full font-title-md text-title-md hover:bg-secondary/10 transition-colors duration-300">
            Watch Demo
          </button>
        </div>

        {/* Product Preview Mockup */}
        <div className="w-full max-w-container-max-width mx-auto glass-card p-4 ai-glow">
          <div className="rounded-xl overflow-hidden border border-white/5 bg-surface-container-lowest">
            <img 
              alt="Peblo Notes Workspace Mockup" 
              className="w-full h-auto object-cover opacity-90" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1yyH21tqPMGdNrMLdjwILZnGYFAxJiehAW5MVrLqUZcQmbr4MzSWY3xiU24E0bZ-K1dSFHiTj8vDljgccuds23GyfAD74TSRAk00IEYKXQR7T56XqgBzwsUcJcoK3hb_Ne5VO4xeLQmVN25OokO_o3q1YZ4J0AUHyRKPhjggh4zLruBrlwXMyXltZNaLxLD2Xs_ClZL_vT2qRcsgDhCfmJ510R-7EQ92mqCy5UsU4wuA7aaOiM45OkJgSiV62qFhw_O_njPa8PFhP"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Feature 1 */}
          <div className="glass-card p-10 flex flex-col gap-6 hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">description</span>
            </div>
            <h3 className="font-headline-lg text-title-md">Intelligent Summaries</h3>
            <p className="text-on-surface-variant font-body-sm text-body-sm">
              Convert hours of research and long-form transcripts into executive briefs instantly. Our AI preserves nuance while optimizing for speed.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card p-10 flex flex-col gap-6 hover:border-secondary/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-3xl">group</span>
            </div>
            <h3 className="font-headline-lg text-title-md">Seamless Sharing</h3>
            <p className="text-on-surface-variant font-body-sm text-body-sm">
              Collaborate in real-time with an interface designed for focus. Shared workspaces allow for versioned edits and asynchronous context-sync.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card p-10 flex flex-col gap-6 hover:border-tertiary/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-3xl">analytics</span>
            </div>
            <h3 className="font-headline-lg text-title-md">Deep Insights</h3>
            <p className="text-on-surface-variant font-body-sm text-body-sm">
              Identify patterns across your entire library. Connect disparate thoughts automatically and uncover connections you didn't know existed.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 px-margin-mobile md:px-margin-desktop bg-surface-container-low">
        <div className="max-w-container-max-width mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display-hero text-headline-lg mb-6">Built for precision. Secured for peace of mind.</h2>
            <p className="text-on-surface-variant text-body-lg mb-8">
              We understand that your thoughts are your most valuable asset. Peblo utilizes enterprise-grade encryption and isolated data environments for every workspace.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                <span className="font-label-caps text-label-caps">SOC2 COMPLIANT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">lock</span>
                <span className="font-label-caps text-label-caps">END-TO-END ENCRYPTION</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="aspect-square rounded-full border border-primary/20 p-8 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
              <img 
                alt="Security Abstract Visualization" 
                className="w-full h-full object-cover rounded-full mix-blend-screen opacity-80" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIQGiF1JO_5NKYhYfaBoBivSfDRPbLtM0-yteJ8BiBgOYlfqg1coQFD9oBUP9KGLl_va7PXkue2BDXba7PEykklSCKT7fCeFHlgVJx6SnLDXFFrdVkVdcPmKYWa0eYrpub7khlbLNfpZWAIYTFfetCFEubX5tRsdjGjpT-XgOUgu5stXiNY2A2bDTMy9eyPBhBcWb9yLEK3xVxKYV9qrmxStUlPJo7rr2dDOz8q8fAFKduPhYxqQDxyjClYB2d5z5to38mSdzvTeD5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-white/5 py-12">
        <div className="max-w-container-max-width mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display-hero text-body-lg text-on-surface">Peblo Notes</span>
            <span className="text-secondary font-label-caps text-label-caps">© 2026 Peblo AI. Editorial Precision.</span>
          </div>
          <div className="flex gap-8">
            <Link className="text-outline hover:text-secondary underline transition-all font-label-caps text-label-caps opacity-80 hover:opacity-100" href="#">Privacy</Link>
            <Link className="text-outline hover:text-secondary underline transition-all font-label-caps text-label-caps opacity-80 hover:opacity-100" href="#">Terms</Link>
            <Link className="text-outline hover:text-secondary underline transition-all font-label-caps text-label-caps opacity-80 hover:opacity-100" href="#">API</Link>
            <Link className="text-outline hover:text-secondary underline transition-all font-label-caps text-label-caps opacity-80 hover:opacity-100" href="#">Changelog</Link>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">alternate_email</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">share</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
