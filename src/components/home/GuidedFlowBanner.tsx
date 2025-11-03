'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useGuidedFlowStore } from '@/src/state/guidedFlowStore';

const steps = [
  { key: 'btc', label: 'BTC assumptions', href: '/models/btc' },
  { key: 'macro', label: 'Macro expansion', href: '/models/macro' },
  { key: 'model', label: 'Sector model', href: '/models/individual' }
] as const;

export function GuidedFlowBanner() {
  const { completion } = useGuidedFlowStore();

  return (
    <section className="glass-card flex flex-col gap-6 px-8 py-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent-secondary">Guided flow</p>
        <h3 className="mt-1 text-2xl font-display font-semibold">BTC → Macro → Model</h3>
        <p className="text-sm text-text-secondary">
          Progress auto-saves every few seconds. Validation warnings surface in the stepper below.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        {steps.map((step) => {
          const status = completion[step.key];
          const isDone = status?.status === 'complete';
          return (
            <Link key={step.key} href={step.href} className="group">
              <div className="flex items-center gap-3 rounded-full border border-border-subtle px-4 py-2 text-sm text-text-secondary transition group-hover:border-accent-primary group-hover:text-text-primary">
                {isDone ? <CheckCircle2 className="h-4 w-4 text-accent-secondary" /> : <Clock className="h-4 w-4" />}
                <span>{step.label}</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
