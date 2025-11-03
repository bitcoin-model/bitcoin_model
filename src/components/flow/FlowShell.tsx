'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useGuidedFlowStore, FlowStep } from '@/src/state/guidedFlowStore';
import { ArrowLeft, ArrowRight, CheckCircle2, Save, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

const stepOrder: FlowStep[] = ['btc', 'macro', 'model'];

const stepCopy: Record<FlowStep, { title: string; description: string }> = {
  btc: {
    title: 'BTC assumptions',
    description: 'Adjust ARR decay, live price anchors, and preset templates.'
  },
  macro: {
    title: 'Macro expansion',
    description: 'Translate BTC adoption into GDP, liquidity, and capital flows.'
  },
  model: {
    title: 'Sector model',
    description: 'Apply assumptions to your chosen micro or nation-state model.'
  }
};

interface FlowShellProps {
  step: FlowStep;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
}

export function FlowShell({ step, children, onBack, onNext, nextLabel = 'Next', backLabel = 'Back' }: FlowShellProps) {
  const router = useRouter();
  const { markStep, completion } = useGuidedFlowStore();

  return (
    <section className="space-y-8">
      <div className="glass-card px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-secondary">Guided flow</p>
            <h2 className="text-3xl font-display font-semibold">{stepCopy[step].title}</h2>
            <p className="text-sm text-text-secondary">{stepCopy[step].description}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => markStep(step, { status: 'in-progress' })}
              className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-4 py-2 text-xs uppercase tracking-[0.3em] text-text-secondary"
            >
              <Save className="h-4 w-4" /> Save draft
            </button>
            <div className="flex gap-3 text-xs uppercase tracking-[0.3em] text-text-secondary">
              {stepOrder.map((item, index) => (
                <div key={item} className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => router.push(getRouteForStep(item))}
                    className={clsx(
                      'flex h-10 w-10 items-center justify-center rounded-full border transition',
                      step === item ? 'border-accent-primary text-text-primary' : 'border-border-subtle text-text-secondary'
                    )}
                    aria-current={step === item ? 'step' : undefined}
                  >
                    {completion[item]?.status === 'complete' ? (
                      <CheckCircle2 className="h-5 w-5 text-accent-secondary" />
                    ) : completion[item]?.status === 'attention' ? (
                      <AlertTriangle className="h-5 w-5 text-accent-warning" />
                    ) : (
                      index + 1
                    )}
                  </button>
                  <span className="text-[0.6rem] text-text-secondary">{stepCopy[item].title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="glass-card px-8 py-8 space-y-8">{children}</div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          disabled={!onBack}
          className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-6 py-3 text-sm text-text-secondary transition hover:text-text-primary disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> {backLabel}
        </button>
        <button
          onClick={onNext}
          disabled={!onNext}
          className="inline-flex items-center gap-2 rounded-full bg-accent-primary px-6 py-3 text-sm font-semibold text-bg-base shadow-lg shadow-accent-primary/30 transition hover:scale-[1.02] disabled:opacity-60"
        >
          {nextLabel} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function getRouteForStep(step: FlowStep): string {
  switch (step) {
    case 'btc':
      return '/models/btc';
    case 'macro':
      return '/models/macro';
    case 'model':
      return '/models/individual';
  }
}
