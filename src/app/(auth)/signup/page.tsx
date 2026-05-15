import Link from 'next/link';
import { AuthLayout } from '@/components/auth/auth-layout';

export default function SignUpPage() {
  return (
    <AuthLayout title="Begin your journey" subtitle="Precision workspace for the modern mind.">
      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="font-label-caps text-on-surface-variant block uppercase tracking-wider">Full Name</label>
            <input className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary text-on-surface placeholder:text-outline/40 transition-all outline-none" placeholder="Julian Thorne" type="text" />
          </div>
          <div className="space-y-2">
            <label className="font-label-caps text-on-surface-variant block uppercase tracking-wider">Email Address</label>
            <input className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary text-on-surface placeholder:text-outline/40 transition-all outline-none" placeholder="julian@peblo.ai" type="email" />
          </div>
          <div className="space-y-2">
            <label className="font-label-caps text-on-surface-variant block uppercase tracking-wider">Password</label>
            <div className="relative">
              <input className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary text-on-surface placeholder:text-outline/40 transition-all outline-none" placeholder="••••••••" type="password" />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors" type="button">
                <span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-label-caps text-on-surface-variant block uppercase tracking-wider">Confirm Password</label>
            <input className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary text-on-surface placeholder:text-outline/40 transition-all outline-none" placeholder="••••••••" type="password" />
          </div>
        </div>
        
        <div className="pt-4 space-y-4">
          <button className="w-full bg-primary-container text-on-primary-container font-title-md py-4 rounded-xl hover:bg-primary transition-all duration-300 shadow-[0_0_40px_-10px_rgba(212,175,55,0.15)] font-bold" type="submit">
            Create Account
          </button>
          
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 font-label-caps text-outline uppercase tracking-widest">or continue with</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>
          
          <button className="w-full flex items-center justify-center gap-3 border border-secondary/30 text-secondary font-title-md py-4 rounded-xl hover:bg-secondary/5 transition-all duration-300" type="button">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"></path>
            </svg>
            Sign up with Google
          </button>
        </div>
      </form>
      <footer className="text-center pt-6">
        <p className="text-on-surface-variant font-body-sm">
          Already have an account? 
          <Link className="text-primary hover:underline ml-1 font-bold underline-offset-4 transition-all" href="/login">Log in</Link>
        </p>
      </footer>
    </AuthLayout>
  );
}
