'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/auth-layout';
import { GoogleButton } from '@/components/auth/google-button';
import { PasswordStrength } from '@/components/auth/password-strength';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/lib/validations';
import { z } from 'zod';
import { signIn } from 'next-auth/react';

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error || 'Something went wrong');
        setIsLoading(false);
        return;
      }

      // Auto login after successful signup
      const loginResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (loginResult?.error) {
        // If login fails for some reason, redirect to login page
        router.push('/login');
      } else {
        window.location.href = '/workspace';
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    signIn('google', { callbackUrl: '/workspace' });
  };

  return (
    <AuthLayout title="Begin your journey" subtitle="Precision workspace for the modern mind.">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="p-3 bg-error/10 border border-error/20 text-error text-sm rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="font-label-caps text-on-surface-variant block uppercase tracking-wider" htmlFor="name">Full Name</label>
            <input 
              {...register('name')}
              id="name"
              className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary text-on-surface placeholder:text-outline/40 transition-all outline-none" 
              placeholder="Julian Thorne" 
              type="text" 
              disabled={isLoading || isGoogleLoading}
            />
            {errors.name && (
              <p className="text-error text-sm">{errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="font-label-caps text-on-surface-variant block uppercase tracking-wider" htmlFor="email">Email Address</label>
            <input 
              {...register('email')}
              id="email"
              className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary text-on-surface placeholder:text-outline/40 transition-all outline-none" 
              placeholder="julian@peblo.ai" 
              type="email" 
              disabled={isLoading || isGoogleLoading}
            />
            {errors.email && (
              <p className="text-error text-sm">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="font-label-caps text-on-surface-variant block uppercase tracking-wider" htmlFor="password">Password</label>
            <div className="relative">
              <input 
                {...register('password')}
                id="password"
                className="w-full bg-surface-container-lowest border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary text-on-surface placeholder:text-outline/40 transition-all outline-none" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"} 
                disabled={isLoading || isGoogleLoading}
              />
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors" 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading || isGoogleLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-sm">{errors.password.message}</p>
            )}
            <div className="pt-2">
              <PasswordStrength password={passwordValue} />
            </div>
          </div>
        </div>
        
        <div className="pt-4 space-y-4">
          <button 
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full flex items-center justify-center bg-primary-container text-on-primary-container font-title-md py-4 rounded-xl hover:bg-primary transition-all duration-300 shadow-[0_0_40px_-10px_rgba(212,175,55,0.15)] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </button>
          
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 font-label-caps text-outline uppercase tracking-widest">or continue with</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>
          
          <GoogleButton 
            onClick={handleGoogleSignIn}
            isLoading={isGoogleLoading}
            disabled={isLoading || isGoogleLoading}
          />
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
