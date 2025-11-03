'use client';

import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="space-y-6 text-center">
      <header className="space-y-2">
        <h1 className="font-display text-2xl text-[var(--color-text-primary)]">Request Access</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Signup is invite-only while we finalize pricing tiers.
        </p>
      </header>
      <p className="text-sm text-[var(--color-text-secondary)]">
        Reach out to <a href="mailto:hello@bitcoin24.app" className="text-[var(--color-accent)]">hello@bitcoin24.app</a> to request an early access code.
      </p>
      <Link className="text-xs text-[var(--color-accent)]" href="/auth/login">
        Back to login
      </Link>
    </div>
  );
}
