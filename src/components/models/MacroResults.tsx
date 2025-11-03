'use client';

import { useMemo } from 'react';
import { useScenarioStore } from '@/src/state/scenarioStore';
import { useGuidedFlowStore } from '@/src/state/guidedFlowStore';
import { formatPercent } from '@/src/lib/calculations';

export function MacroResults() {
  const { scenarioId } = useGuidedFlowStore();
  const scenario = useScenarioStore((state) => (scenarioId ? state.scenarios[scenarioId] : undefined));

  const summaries = useMemo(() => {
    if (!scenario) return [];
    const latestLiquidity = scenario.macroOutputs.liquidity[scenario.macroOutputs.liquidity.length - 1];
    const adoption = scenario.macroOutputs.adoptionShare[scenario.macroOutputs.adoptionShare.length - 1];
    return [
      { label: '2045 liquidity support', value: `$${latestLiquidity.toLocaleString('en-US')}` },
      { label: '2045 adoption share', value: formatPercent(adoption) },
      { label: 'Years modelled', value: scenario.macroOutputs.gdp.length }
    ];
  }, [scenario]);

  if (!scenario) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {summaries.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border-subtle bg-black/30 px-6 py-4">
            <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">{item.label}</p>
            <p className="mt-2 text-xl font-display font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border border-border-subtle bg-black/20 p-6 text-sm text-text-secondary">
        <p>
          Adoption curves interpolate linearly between start and end assumptions. Liquidity estimates multiply BTC market cap by
          adoption share, echoing workbook heuristics. Outputs stream to sector models for terminal value calculations.
        </p>
      </div>
    </div>
  );
}
