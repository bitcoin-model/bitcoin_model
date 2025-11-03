'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useScenarioStore, selectActiveScenario, selectScenarioDirty } from '../stores/scenarioStore';

const scenarioLabel: Record<string, string> = {
  btc: 'BTC Model',
  macro: 'Macro Model',
  individual: 'Individual Strategy',
  corporate: 'Corporate Strategy',
  institution: 'Institution Model',
  nation: 'Nation-State Model'
};

export const ScenarioIndicator = () => {
  const active = useScenarioStore(selectActiveScenario);
  const dirty = useScenarioStore(selectScenarioDirty);

  const label = useMemo(() => {
    if (!active) {
      return 'Select a scenario to begin';
    }
    const base = scenarioLabel[active.model] ?? 'Scenario';
    return `${base}: ${active.name}`;
  }, [active]);

  return (
    <div className="flex flex-col gap-4 text-sm">
      <div>
        <p className="font-semibold text-[var(--color-text-primary)]">Scenario Status</p>
        <p className="text-[var(--color-text-secondary)]">{label}</p>
      </div>
      <div className="flex flex-col gap-2 text-[var(--color-text-secondary)]">
        <span className="text-xs uppercase tracking-wide text-[var(--color-text-secondary)]">Actions</span>
        <Link className="rounded-md border border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-text-primary)] hover:border-[var(--color-primary)]" href="/protected/scenarios">
          Manage Scenarios
        </Link>
        {dirty && <span className="text-xs text-[var(--color-warning)]">Unsaved changes</span>}
      </div>
    </div>
  );
};
