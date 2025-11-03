'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Bitcoin, LogOut } from 'lucide-react';
import { useAuthStore } from '@/src/state/authStore';
import { ScenarioContextBar } from '@/src/components/layout/ScenarioContextBar';

export function AuthenticatedShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.replace('/onboarding');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const navItems = [
    { href: '/home', label: 'Home' },
    { href: '/models/btc', label: 'BTC' },
    { href: '/models/macro', label: 'Macro' },
    { href: '/models/individual', label: 'Individual' },
    { href: '/models/corporate', label: 'Corporate' },
    { href: '/models/institution', label: 'Institution' },
    { href: '/models/nation', label: 'Nation-State' }
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-[rgba(11,14,17,0.9)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/home" className="flex items-center gap-3 text-lg font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/20 text-accent-primary">
              <Bitcoin className="h-6 w-6" />
            </span>
            Bitcoin24
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-text-secondary md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition hover:text-text-primary ${pathname?.startsWith(item.href) ? 'text-text-primary' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
        <ScenarioContextBar />
      </header>
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10">{children}</main>
    </div>
  );
}
