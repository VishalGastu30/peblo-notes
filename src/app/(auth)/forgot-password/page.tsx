'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/auth-layout';

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <AuthLayout
        heading="Check your inbox."
        subheading="A password reset link has been sent to julian@peblo.ai. The link expires in 15 minutes."
      >
        <div className="flex flex-col items-center justify-center text-center space-y-8 mt-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(242,202,80,0.15)]">
            <span className="material-symbols-outlined text-primary text-[40px]">mark_email_read</span>
          </div>
          
          <button className="w-full py-4 bg-transparent border border-white/10 text-on-surface font-bold rounded-xl hover:bg-white/5 active:scale-[0.98] transition-all">
            Open Email App
          </button>

          <p className="text-body-sm text-on-surface-variant">
            Didn't receive it?{' '}
            <button className="text-secondary hover:underline font-medium">
              Resend link
            </button>
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      heading="Reset your access."
      subheading="We'll send a secure link to your inbox."
    >
      <form 
        className="space-y-6 mt-8" 
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitted(true);
        }}
      >
        <div className="flex items-center justify-center w-16 h-16 bg-surface-container-low rounded-2xl border border-white/10 mb-8 mx-auto shadow-[0_0_20px_rgba(242,202,80,0.1)]">
          <span className="material-symbols-outlined text-primary text-[32px]">lock_reset</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-label-caps text-outline uppercase" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-3 text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline/50"
              id="email"
              placeholder="your@email.com"
              type="email"
              required
            />
          </div>
        </div>

        <button className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(242,202,80,0.15)] hover:shadow-[0_0_25px_rgba(242,202,80,0.25)] mt-8">
          Send Reset Link
        </button>

        <div className="pt-6">
          <Link className="text-secondary hover:text-secondary-fixed transition-colors flex items-center gap-2 text-body-sm font-medium w-fit" href="/login">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
