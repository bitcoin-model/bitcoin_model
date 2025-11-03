'use client';

import { useMemo } from 'react';
import { useScenarioStore } from '@/src/state/scenarioStore';
import { useGuidedFlowStore } from '@/src/state/guidedFlowStore';
import { formatCurrency, formatPercent } from '@/src/lib/calculations';

export function BTCResults() {
  const { scenarioId } = useGuidedFlowStore();
  const scenario = useScenarioStore((state) => (scenarioId ? state.scenarios[scenarioId] : undefined));

  const kpis = useMemo(() => {
    if (!scenario) return [];
    const terminal = scenario.btcOutputs[scenario.btcOutputs.length - 1];
    const marketCapShare = terminal.marketCap / (scenario.macroAssumptions.globalAssetBase * 1e12);
    return [
      { label: 'Current price', value: formatCurrency(scenario.btcAssumptions.currentPrice) },
      { label: '2045 price', value: formatCurrency(terminal.price) },
      { label: '2045 market cap', value: formatCurrency(terminal.marketCap) },
      { label: 'Asset share', value: formatPercent(marketCapShare) }
    ];
  }, [scenario]);

  if (!scenario) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-border-subtle bg-black/30 px-6 py-4">
            <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">{kpi.label}</p>
            <p className="mt-2 text-2xl font-display font-semibold">{kpi.value}</p>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-3xl border border-border-subtle">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-text-secondary">
            <tr>
              <th className="px-6 py-4">Year</th>
              <th className="px-6 py-4">ARR</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Market cap</th>
            </tr>
          </thead>
          <tbody>
            {scenario.btcOutputs.map((row) => (
              <tr key={row.year} className="border-t border-border-subtle/60">
                <td className="px-6 py-3 text-text-secondary">{row.year}</td>
                <td className="px-6 py-3 text-text-secondary">{formatPercent(row.arr)}</td>
                <td className="px-6 py-3 text-text-secondary">{formatCurrency(row.price)}</td>
                <td className="px-6 py-3 text-text-secondary">{formatCurrency(row.marketCap)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
