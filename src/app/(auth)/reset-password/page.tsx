'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/auth-layout';

export default function ResetPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState('');

  // Password strength logic
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password) || /[0-9]/.test(password);
  
  let strength = 0;
  if (hasLength) strength++;
  if (hasUpper) strength++;
  if (hasSpecial) strength++;

  if (isSuccess) {
    return (
      <AuthLayout
        heading="All set."
        subheading="Your password has been updated. You can now sign in with your new credentials."
      >
        <div className="flex flex-col items-center justify-center text-center space-y-8 mt-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(242,202,80,0.15)] animate-pulse">
            <span className="material-symbols-outlined text-primary text-[40px]">check_circle</span>
          </div>
          
          <Link href="/login" className="w-full">
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
      heading="Set a new password."
      subheading="Make it strong. Make it yours."
    >
      <form 
        className="space-y-6 mt-8" 
        onSubmit={(e) => {
          e.preventDefault();
          setIsSuccess(true);
        }}
      >
        <div className="flex items-center justify-center w-16 h-16 bg-surface-container-low rounded-2xl border border-white/10 mb-8 mx-auto shadow-[0_0_20px_rgba(242,202,80,0.1)]">
          <span className="material-symbols-outlined text-primary text-[32px]">vpn_key</span>
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
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">visibility</span>
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
                <span className={`material-symbols-outlined text-[16px] ${hasLength ? 'text-secondary' : 'text-outline'}`}>
                  {hasLength ? 'check' : 'close'}
                </span>
                <span className={hasLength ? 'text-on-surface' : 'text-outline'}>At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2 text-body-sm">
                <span className={`material-symbols-outlined text-[16px] ${hasUpper ? 'text-secondary' : 'text-outline'}`}>
                  {hasUpper ? 'check' : 'close'}
                </span>
                <span className={hasUpper ? 'text-on-surface' : 'text-outline'}>One uppercase letter</span>
              </div>
              <div className="flex items-center gap-2 text-body-sm">
                <span className={`material-symbols-outlined text-[16px] ${hasSpecial ? 'text-secondary' : 'text-outline'}`}>
                  {hasSpecial ? 'check' : 'close'}
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
                type="password"
                required
              />
            </div>
          </div>
        </div>

        <button 
          className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(242,202,80,0.15)] hover:shadow-[0_0_25px_rgba(242,202,80,0.25)] mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={strength < 3}
        >
          Update Password
        </button>
      </form>
    </AuthLayout>
  );
}
