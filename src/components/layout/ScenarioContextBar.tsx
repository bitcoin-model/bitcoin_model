'use client';

import { Clock, Edit, FolderOpen } from 'lucide-react';
import { useScenarioStore } from '@/src/state/scenarioStore';
import { useGuidedFlowStore } from '@/src/state/guidedFlowStore';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export function ScenarioContextBar() {
  const { scenarioId, completion } = useGuidedFlowStore();
  const scenario = useScenarioStore((state) => (scenarioId ? state.scenarios[scenarioId] : undefined));

  if (!scenario) {
    return null;
  }

  const completionStatus = Object.entries(completion).map(([key, value]) => (
    <div key={key} className="flex items-center gap-2 text-xs">
      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent-secondary" />
      <span className="uppercase tracking-[0.3em] text-text-secondary">{key.toUpperCase()}</span>
      <span className="text-text-secondary">{value.status}</span>
    </div>
  ));

  return (
    <div className="border-t border-border-subtle bg-[rgba(12,16,21,0.86)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-accent-secondary">
            Active scenario
            <Link href="/home" className="text-xs lowercase text-text-secondary underline">
              switch
            </Link>
          </div>
          <h3 className="mt-1 text-2xl font-display font-semibold">{scenario.name}</h3>
          <div className="mt-1 flex items-center gap-4 text-xs text-text-secondary">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> Updated {formatDistanceToNow(new Date(scenario.updatedAt), { addSuffix: true })}
            </span>
            <span className="inline-flex items-center gap-1">
              <FolderOpen className="h-3.5 w-3.5" /> {scenario.model.toUpperCase()} MODEL
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">{completionStatus}</div>
        <button className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-4 py-2 text-xs uppercase tracking-[0.35em] text-text-secondary hover:text-text-primary">
          <Edit className="h-4 w-4" /> Rename
        </button>
      </div>
    </div>
  );
}
