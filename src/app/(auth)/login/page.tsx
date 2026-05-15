'use client';

import React from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/auth-layout';

export default function LoginPage() {
  return (
    <AuthLayout
      heading="Welcome back."
      subheading="Continue your intellectual journey."
    >
      <form className="space-y-6 mt-8" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-label-caps text-outline uppercase" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-3 text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline/50"
              id="email"
              placeholder="julian@peblo.ai"
              type="email"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-label-caps text-outline uppercase" htmlFor="password">
                Password
              </label>
              <Link className="text-body-sm text-secondary hover:text-secondary-fixed transition-colors" href="/forgot-password">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-3 text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline/50"
                id="password"
                placeholder="••••••••"
                type="password"
                required
              />
              <button 
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">visibility</span>
              </button>
            </div>
          </div>
        </div>

        <button className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(242,202,80,0.15)] hover:shadow-[0_0_25px_rgba(242,202,80,0.25)] mt-8">
          Sign In
        </button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink-0 mx-4 text-label-caps text-outline uppercase">
            Or continue with
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <button 
          type="button"
          className="w-full py-3 bg-transparent border border-white/10 text-on-surface font-medium rounded-xl hover:bg-white/5 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <p className="text-center text-body-sm text-on-surface-variant pt-6">
          Don't have an account?{' '}
          <Link className="text-primary hover:underline font-medium" href="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
