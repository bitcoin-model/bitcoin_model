'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useAuthStore } from '../../../src/stores/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, setLoading, setError, status, error } = useAuthStore((state) => ({
    login: state.login,
    setLoading: state.setLoading,
    setError: state.setError,
    status: state.status,
    error: state.error
  }));
  const [email, setEmail] = useState('satoshi@bitcoin.org');
  const [password, setPassword] = useState('bitcoin24');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading();

    if (!email || !password) {
      setError('Please provide email and password.');
      return;
    }

    setTimeout(() => {
      login({
        user: {
          id: 'user-1',
          email,
          name: 'Bitcoin Strategist',
          roles: ['admin']
        },
        token: 'mock-jwt-token'
      });
      router.replace('/protected');
    }, 300);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-display text-2xl text-[var(--color-text-primary)]">Welcome back</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Sign in to continue exploring Bitcoin24 scenarios.
        </p>
      </header>
      <div className="space-y-4">
        <label className="block text-sm text-[var(--color-text-secondary)]">
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="mt-2 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-[var(--color-text-primary)] shadow-inner-glow focus:border-[var(--color-primary)] focus:outline-none focus:ring-0"
          />
        </label>
        <label className="block text-sm text-[var(--color-text-secondary)]">
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="mt-2 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 text-[var(--color-text-primary)] shadow-inner-glow focus:border-[var(--color-primary)] focus:outline-none focus:ring-0"
          />
        </label>
      </div>
      {status === 'error' && <p className="text-sm text-[var(--color-danger)]">{error}</p>}
      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-black shadow-glass transition hover:opacity-90"
      >
        {status === 'loading' ? 'Signing in…' : 'Sign in'}
      </button>
      <p className="text-center text-xs text-[var(--color-text-secondary)]">
        Need an account? <Link className="text-[var(--color-accent)]" href="/auth/signup">Sign up</Link>
      </p>
    </form>
  );
}
