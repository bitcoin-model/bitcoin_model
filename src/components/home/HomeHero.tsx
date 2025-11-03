'use client';

import { format } from 'date-fns';
import { useAuthStore } from '@/src/state/authStore';
import { useScenarioStore } from '@/src/state/scenarioStore';
import { useGuidedFlowStore } from '@/src/state/guidedFlowStore';

export function HomeHero() {
  const user = useAuthStore((state) => state.user);
  const { scenarioId } = useGuidedFlowStore();
  const scenario = useScenarioStore((state) => (scenarioId ? state.scenarios[scenarioId] : undefined));

  return (
    <section className="glass-card grid gap-10 px-8 py-10 md:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-accent-secondary">Welcome back</p>
        <h2 className="text-4xl font-display font-semibold">
          {user ? `${user.username}, your Bitcoin thesis awaits.` : 'Your Bitcoin thesis awaits.'}
        </h2>
        <p className="max-w-xl text-text-secondary">
          Resume where you left off or jump into a new guided flow. Your scenarios auto-save with validation cues to keep
          assumptions in sync.
        </p>
        {scenario && (
          <div className="rounded-2xl border border-border-subtle bg-black/30 px-6 py-4 text-sm text-text-secondary">
            <p className="text-text-primary">Last scenario</p>
            <p className="text-lg font-display text-text-primary">{scenario.name}</p>
            <p className="text-xs uppercase tracking-[0.3em]">Updated {format(new Date(scenario.updatedAt), 'MMM d, yyyy h:mma')}</p>
          </div>
        )}
      </div>
      <div className="rounded-3xl border border-border-subtle bg-noise-gradient px-6 py-8">
        <h3 className="text-lg font-semibold">Fast actions</h3>
        <ul className="mt-4 space-y-3 text-sm text-text-secondary">
          <li>• Start guided BTC → Macro → Model flow</li>
          <li>• Compare scenarios in the library</li>
          <li>• Update live price anchor from onboarding</li>
        </ul>
      </div>
    </section>
  );
}
