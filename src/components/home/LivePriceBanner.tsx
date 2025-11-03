'use client';

import { useLivePrice } from '@/src/hooks/useLivePrice';
import { formatCurrency } from '@/src/lib/calculations';
import { AlertTriangle, Loader2, RefreshCcw } from 'lucide-react';

export function LivePriceBanner() {
  const { data, isFetching, error, refetch } = useLivePrice();

  return (
    <section className="glass-card flex flex-col gap-4 px-8 py-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent-secondary">Live price</p>
        <h3 className="mt-2 text-3xl font-display font-semibold">
          {data ? formatCurrency(data.price, { maximumFractionDigits: 0 }) : 'Loading price…'}
        </h3>
        <p className="text-xs text-text-secondary">
          {data ? `Sourced from ${data.source} at ${new Date(data.timestamp).toLocaleTimeString()}` : 'Fetching price feed'}
        </p>
      </div>
      <div className="flex items-center gap-4 text-sm text-text-secondary">
        {error && (
          <span className="inline-flex items-center gap-2 text-accent-warning">
            <AlertTriangle className="h-4 w-4" /> Using cached fallback
          </span>
        )}
        <button onClick={() => refetch()} className="inline-flex items-center gap-2">
          {isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          Refresh
        </button>
      </div>
    </section>
  );
}
