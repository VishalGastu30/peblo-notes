'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AuthLayout } from '@/components/auth/auth-layout';
import { CheckCircle2, Key, Eye, EyeOff, Check, X, Loader2 } from 'lucide-react';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password strength logic
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password) || /[0-9]/.test(password);
  
  let strength = 0;
  if (hasLength) strength++;
  if (hasUpper) strength++;
  if (hasSpecial) strength++;

  const isValid = strength === 3 && password === confirmPassword && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !token) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token && !isSuccess) {
    return (
      <AuthLayout
        title="Invalid link."
        subtitle="This password reset link is invalid or has expired."
      >
        <div className="flex flex-col items-center justify-center text-center space-y-8 mt-12">
          <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center border border-error/20">
            <X className="text-error w-10 h-10" />
          </div>
          <Link href="/forgot-password" title="Forgot Password" className="w-full">
            <button className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all">
              Request new link
            </button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  if (isSuccess) {
    return (
      <AuthLayout
        title="All set."
        subtitle="Your password has been updated. You can now sign in with your new credentials."
      >
        <div className="flex flex-col items-center justify-center text-center space-y-8 mt-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(242,202,80,0.15)] animate-pulse">
            <CheckCircle2 className="text-primary w-10 h-10" />
          </div>
          
          <Link href="/login" title="Login" className="w-full">
            <button className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(242,202,80,0.15)]">
              Back to Login
            </button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Set a new password."
      subtitle="Make it strong. Make it yours."
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
          <Key className="text-primary w-8 h-8" />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-label-caps text-outline uppercase" htmlFor="new-password">
              New Password
            </label>
            <div className="relative">
              <input
                className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-3 text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline/50"
                id="new-password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Password Strength Indicator */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-2 h-1.5">
              <div className={`flex-1 rounded-full transition-colors ${strength >= 1 ? (strength === 1 ? 'bg-error' : strength === 2 ? 'bg-primary' : 'bg-[#55d699]') : 'bg-surface-variant'}`}></div>
              <div className={`flex-1 rounded-full transition-colors ${strength >= 2 ? (strength === 2 ? 'bg-primary' : 'bg-[#55d699]') : 'bg-surface-variant'}`}></div>
              <div className={`flex-1 rounded-full transition-colors ${strength >= 3 ? 'bg-[#55d699]' : 'bg-surface-variant'}`}></div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-body-sm">
                <span className={hasLength ? 'text-secondary' : 'text-outline'}>
                  {hasLength ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </span>
                <span className={hasLength ? 'text-on-surface' : 'text-outline'}>At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2 text-body-sm">
                <span className={hasUpper ? 'text-secondary' : 'text-outline'}>
                  {hasUpper ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </span>
                <span className={hasUpper ? 'text-on-surface' : 'text-outline'}>One uppercase letter</span>
              </div>
              <div className="flex items-center gap-2 text-body-sm">
                <span className={hasSpecial ? 'text-secondary' : 'text-outline'}>
                  {hasSpecial ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </span>
                <span className={hasSpecial ? 'text-on-surface' : 'text-outline'}>One number or symbol</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-label-caps text-outline uppercase" htmlFor="confirm-password">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-3 text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline/50"
                id="confirm-password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {password !== confirmPassword && confirmPassword.length > 0 && (
              <p className="text-error text-xs">Passwords do not match</p>
            )}
          </div>
        </div>

        <button 
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(242,202,80,0.15)] hover:shadow-[0_0_25px_rgba(242,202,80,0.25)] mt-8 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update Password'}
        </button>
      </form>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
