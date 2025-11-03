'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { useAuthStore } from '@/src/state/authStore';
import toast from 'react-hot-toast';

const signupSchema = z
  .object({
    email: z.string().email('Enter a valid email'),
    username: z.string().min(3, 'Minimum 3 characters'),
    password: z.string().min(8, 'Use at least 8 characters'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password required')
});

interface AuthStepProps {
  mode: 'signup' | 'login';
  onModeChange: (mode: 'signup' | 'login') => void;
  onSuccess: () => void;
}

type SignupValues = z.infer<typeof signupSchema>;
type LoginValues = z.infer<typeof loginSchema>;

export function AuthStep({ mode, onModeChange, onSuccess }: AuthStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const signupForm = useForm<SignupValues>({ resolver: zodResolver(signupSchema), mode: 'onChange' });
  const loginForm = useForm<LoginValues>({ resolver: zodResolver(loginSchema), mode: 'onChange' });
  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);
  const [loading, setLoading] = useState(false);

  async function handleSignup(values: SignupValues) {
    setLoading(true);
    try {
      await signup({ email: values.email, password: values.password, username: values.username });
      toast.success('Account created. Welcome aboard!');
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to create account');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(values: LoginValues) {
    setLoading(true);
    try {
      await login({ email: values.email, password: values.password });
      toast.success('Signed in successfully');
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button
          className={clsx('rounded-full px-6 py-2 text-sm font-semibold transition',
            mode === 'signup' ? 'bg-accent-primary text-bg-base' : 'bg-transparent text-text-secondary hover:text-text-primary')}
          onClick={() => onModeChange('signup')}
        >
          Create account
        </button>
        <button
          className={clsx('rounded-full px-6 py-2 text-sm font-semibold transition',
            mode === 'login' ? 'bg-accent-primary text-bg-base' : 'bg-transparent text-text-secondary hover:text-text-primary')}
          onClick={() => onModeChange('login')}
        >
          Sign in
        </button>
      </div>
      {mode === 'signup' ? (
        <form className="space-y-6" onSubmit={signupForm.handleSubmit(handleSignup)}>
          <FormField label="Email" error={signupForm.formState.errors.email?.message}>
            <input
              type="email"
              className="w-full rounded-xl border border-border-subtle bg-transparent px-4 py-3 text-base focus:border-accent-primary focus:outline-none"
              {...signupForm.register('email')}
              autoComplete="email"
            />
          </FormField>
          <FormField label="Username" error={signupForm.formState.errors.username?.message}>
            <input
              type="text"
              className="w-full rounded-xl border border-border-subtle bg-transparent px-4 py-3 text-base focus:border-accent-primary focus:outline-none"
              {...signupForm.register('username')}
              autoComplete="username"
            />
          </FormField>
          <FormField label="Password" error={signupForm.formState.errors.password?.message}>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full rounded-xl border border-border-subtle bg-transparent px-4 py-3 text-base focus:border-accent-primary focus:outline-none"
                {...signupForm.register('password')}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-text-secondary"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </FormField>
          <FormField label="Confirm password" error={signupForm.formState.errors.confirmPassword?.message}>
            <input
              type="password"
              className="w-full rounded-xl border border-border-subtle bg-transparent px-4 py-3 text-base focus:border-accent-primary focus:outline-none"
              {...signupForm.register('confirmPassword')}
              autoComplete="new-password"
            />
          </FormField>
          <button
            type="submit"
            disabled={!signupForm.formState.isValid || loading}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent-primary px-8 py-4 font-semibold text-bg-base shadow-lg shadow-accent-primary/30 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue'}
          </button>
        </form>
      ) : (
        <form className="space-y-6" onSubmit={loginForm.handleSubmit(handleLogin)}>
          <FormField label="Email" error={loginForm.formState.errors.email?.message}>
            <input
              type="email"
              className="w-full rounded-xl border border-border-subtle bg-transparent px-4 py-3 text-base focus:border-accent-primary focus:outline-none"
              {...loginForm.register('email')}
              autoComplete="email"
            />
          </FormField>
          <FormField label="Password" error={loginForm.formState.errors.password?.message}>
            <input
              type="password"
              className="w-full rounded-xl border border-border-subtle bg-transparent px-4 py-3 text-base focus:border-accent-primary focus:outline-none"
              {...loginForm.register('password')}
              autoComplete="current-password"
            />
          </FormField>
          <button
            type="submit"
            disabled={!loginForm.formState.isValid || loading}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent-primary px-8 py-4 font-semibold text-bg-base shadow-lg shadow-accent-primary/30 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign in'}
          </button>
        </form>
      )}
      <p className="text-sm text-text-secondary">
        By proceeding you agree to the Bitcoin24 modeling terms. Validation occurs inline and unsaved progress is preserved until completion.
      </p>
    </div>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block text-text-secondary">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-accent-error">{error}</span>}
    </label>
  );
}
