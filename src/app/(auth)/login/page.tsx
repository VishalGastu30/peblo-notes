'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/auth-layout';
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
        router.push('/workspace');
        router.refresh();
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

        <button 
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading || isGoogleLoading}
          className="w-full py-3 bg-transparent border border-white/10 text-on-surface font-medium rounded-xl hover:bg-white/5 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-outline" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"></path>
              </svg>
              Sign in with Google
            </>
          )}
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
