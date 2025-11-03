'use client';

import { useMemo, useState } from 'react';
import { useScenarioStore } from '@/src/state/scenarioStore';
import { useGuidedFlowStore } from '@/src/state/guidedFlowStore';
import { ArrowUpRight, Copy, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

export function ScenarioLibrary() {
  const scenarios = useScenarioStore((state) => Object.values(state.scenarios));
  const duplicateScenario = useScenarioStore((state) => state.duplicateScenario);
  const deleteScenario = useScenarioStore((state) => state.deleteScenario);
  const setActiveScenario = useScenarioStore((state) => state.setActiveScenario);
  const setFlowScenario = useGuidedFlowStore((state) => state.setScenario);
  const markStep = useGuidedFlowStore((state) => state.markStep);
  const [filter, setFilter] = useState<'all' | 'individual' | 'corporate' | 'institution' | 'nation'>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return scenarios;
    return scenarios.filter((scenario) => scenario.model === filter);
  }, [scenarios, filter]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="section-heading">Saved scenarios</h3>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-text-secondary">
          {(['all', 'individual', 'corporate', 'institution', 'nation'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={clsx('rounded-full px-3 py-1 transition', filter === option ? 'bg-accent-primary text-bg-base' : 'hover:text-text-primary')}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="glass-card divide-y divide-border-subtle overflow-hidden">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-xs uppercase tracking-[0.3em] text-text-secondary">
              <th className="px-6 py-4">Scenario</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Updated</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-text-secondary">
                  No scenarios yet. Start with the guided flow to create your first projection.
                </td>
              </tr>
            ) : (
              filtered.map((scenario) => (
                <tr key={scenario.id} className="transition hover:bg-white/5">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-text-primary">{scenario.name}</p>
                    <p className="text-xs text-text-secondary">{scenario.model.toUpperCase()} MODEL</p>
                  </td>
                  <td className="px-6 py-4 capitalize text-text-secondary">{scenario.status.replace('-', ' ')}</td>
                  <td className="px-6 py-4 text-text-secondary">
                    {formatDistanceToNow(new Date(scenario.updatedAt), { addSuffix: true })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-text-secondary">
                      <Link
                        href={`/models/${scenario.model}`}
                        className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-3 py-1 text-xs uppercase tracking-[0.3em]"
                        onClick={() => {
                          setActiveScenario(scenario.id);
                          setFlowScenario(scenario.id);
                          markStep('btc', { status: 'in-progress' });
                        }}
                      >
                        Open <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        onClick={() => duplicateScenario(scenario.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-3 py-1 text-xs uppercase tracking-[0.3em]"
                      >
                        <Copy className="h-3.5 w-3.5" /> Duplicate
                      </button>
                      <button
                        onClick={() => deleteScenario(scenario.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-3 py-1 text-xs uppercase tracking-[0.3em] text-accent-error"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
