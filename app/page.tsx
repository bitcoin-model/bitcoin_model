import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CoverPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="max-w-5xl w-full space-y-12 text-center">
        <p className="text-accent-secondary uppercase tracking-[0.3em] text-sm">Bitcoin24 Modeling Platform</p>
        <h1 className="text-4xl md:text-6xl font-display font-semibold leading-tight">
          Model Bitcoin adoption scenarios with cinematic clarity.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-text-secondary">
          Guided onboarding, live pricing, and persistent scenarios help you explore Bitcoin&apos;s 21-year trajectory for
          individuals, corporations, institutions, and nation states—all inspired by the Bitcoin24 open workbook.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-3 rounded-full bg-accent.primary px-8 py-4 font-semibold text-bg-base shadow-lg shadow-accent.primary/30 transition hover:scale-105"
          >
            Get started
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-3 rounded-full border border-border-subtle px-8 py-4 font-semibold text-text-secondary hover:text-text-primary hover:border-text-secondary"
          >
            I already have an account
          </Link>
        </div>
        <div className="glass-card mx-auto flex max-w-3xl flex-col gap-4 px-8 py-6 text-left">
          <div className="flex items-center gap-3 text-text-secondary">
            <ShieldCheck className="h-5 w-5 text-accent-secondary" />
            Secure scenario persistence with local-first resilience and optimistic auto-save.
          </div>
          <div className="flex items-center gap-3 text-text-secondary">
            <Sparkles className="h-5 w-5 text-accent-primary" />
            Guided BTC → Macro → Model flows keep your assumptions aligned across every screen.
          </div>
        </div>
      </div>
    </main>
  );
}
