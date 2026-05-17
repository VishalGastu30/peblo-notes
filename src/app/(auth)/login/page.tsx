'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/auth-layout';
import { GoogleButton } from '@/components/auth/google-button';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations';
import { z } from 'zod';
import { signIn } from 'next-auth/react';

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
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
    <AuthLayout
      title="Welcome back."
      subtitle="Continue your intellectual journey."
    >
      <form className="space-y-6 mt-8" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="p-3 bg-error/10 border border-error/20 text-error text-sm rounded-xl">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-label-caps text-outline uppercase" htmlFor="email">
              Email Address
            </label>
            <input
              {...register('email')}
              className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-3 text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline/50"
              id="email"
              placeholder="julian@peblo.ai"
              type="email"
              disabled={isLoading || isGoogleLoading}
            />
            {errors.email && (
              <p className="text-error text-sm">{errors.email.message}</p>
            )}
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
                {...register('password')}
                className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-3 text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-outline/50"
                id="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                disabled={isLoading || isGoogleLoading}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                disabled={isLoading || isGoogleLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-sm">{errors.password.message}</p>
            )}
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(242,202,80,0.15)] hover:shadow-[0_0_25px_rgba(242,202,80,0.25)] mt-8 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
        </button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink-0 mx-4 text-label-caps text-outline uppercase">
            Or continue with
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <GoogleButton 
          onClick={handleGoogleSignIn}
          isLoading={isGoogleLoading}
          disabled={isLoading || isGoogleLoading}
        />

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
