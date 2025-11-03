'use client';

import { Card } from '@bitcoin24/ui';
import { useAuthStore, selectUserProfile } from '../../src/stores/authStore';
import { useScenarioStore } from '../../src/stores/scenarioStore';
import { useQuery } from '@tanstack/react-query';
import { fetchLatestPrice } from '../../src/lib/pricing';
import { usePricingStore } from '../../src/stores/pricingStore';

export default function ProtectedHome() {
  const user = useAuthStore(selectUserProfile);
  const { upsertScenario } = useScenarioStore();
  const setLatest = usePricingStore((state) => state.setLatest);

  useQuery({
    queryKey: ['pricing', 'latest', 'prefetch'],
    queryFn: fetchLatestPrice,
    refetchInterval: 60_000,
    onSuccess: (price) => setLatest(price)
  });

  return (
    <div className="grid gap-6 lg:grid-cols-dashboard">
      <Card title="Welcome back" description={user ? `Logged in as ${user.email}` : 'Guest session'}>
        <div className="space-y-3 text-sm text-[var(--color-text-secondary)]">
          <p>Use the navigation rail to switch between macro, micro, and nation-state models.</p>
          <button
            className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-xs font-semibold text-black shadow-glass transition hover:opacity-90"
            onClick={() =>
              upsertScenario({
                id: 'demo',
                name: 'BTC Maxi',
                model: 'btc',
                updatedAt: new Date().toISOString()
              })
            }
          >
            Load Demo Scenario
          </button>
        </div>
      </Card>
      <Card title="Guided Journey" description="BTC → Macro → Strategy">
        <ol className="space-y-2 text-sm text-[var(--color-text-secondary)]">
          <li>1. Review macro assumptions and adjust base year inputs.</li>
          <li>2. Configure your preferred strategy (individual, corporate, etc.).</li>
          <li>3. Compare outcomes and export summaries.</li>
        </ol>
      </Card>
    </div>
  );
}
