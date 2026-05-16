'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/auth-layout';
import { MailCheck, KeyRound, ArrowLeft, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check your inbox."
        subtitle={`A password reset link has been sent to ${email}. The link expires in 60 minutes.`}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-8 mt-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(242,202,80,0.15)]">
            <MailCheck className="text-primary w-10 h-10" />
          </div>
          
          <button 
            type="button"
            className="w-full py-4 bg-transparent border border-white/10 text-on-surface font-bold rounded-xl hover:bg-white/5 active:scale-[0.98] transition-all"
            onClick={() => window.open(`mailto:`)}
          >
            Open Email App
          </button>

          <p className="text-body-sm text-on-surface-variant">
            Didn't receive it?{' '}
            <button 
              type="button"
              className="text-secondary hover:underline font-medium"
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
            >
              Try another email
            </button>
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your access."
      subtitle="We'll send a secure link to your inbox."
    >
      <form 
        className="space-y-6 mt-8" 
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="p-3 bg-error/10 border border-error/20 text-error text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        <div className="flex items-center justify-center w-16 h-16 bg-surface-container-low rounded-2xl border border-white/10 mb-8 mx-auto shadow-[0_0_20px_rgba(242,202,80,0.1)]">
          <KeyRound className="text-primary w-8 h-8" />
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading || !email}
          className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(242,202,80,0.15)] hover:shadow-[0_0_25px_rgba(242,202,80,0.25)] mt-8 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
        </button>

        <div className="pt-6 flex justify-center">
          <Link className="text-secondary hover:text-secondary-fixed transition-colors flex items-center gap-2 text-body-sm font-medium w-fit" href="/login">
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
