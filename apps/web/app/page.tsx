import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '../src/lib/session';

export default async function LandingPage() {
  const session = await getSession();
  if (session?.user) {
    redirect('/protected');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--color-bg-base)] px-6 text-center">
      <h1 className="font-display text-4xl text-[var(--color-text-primary)]">Bitcoin24 Model</h1>
      <p className="max-w-2xl text-lg text-[var(--color-text-secondary)]">
        Explore macro and micro bitcoin strategies through immersive data visualizations and guided scenarios.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-black shadow-glass transition hover:opacity-90" href="/auth/login">
          Enter Workspace
        </Link>
        <Link className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]" href="/docs/design-system">
          View Documentation
        </Link>
      </div>
    </main>
  );
}
