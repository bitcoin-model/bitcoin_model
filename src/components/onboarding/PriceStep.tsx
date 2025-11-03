'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDays, Loader2, TrendingUp } from 'lucide-react';
import { useLivePrice } from '@/src/hooks/useLivePrice';
import { useOnboardingStore } from '@/src/state/onboardingStore';
import { formatCurrency } from '@/src/lib/calculations';

const schema = z
  .object({
    mode: z.union([z.literal('live'), z.literal('historical'), z.literal('custom')]),
    customPrice: z.number().optional(),
    historicalDate: z.string().optional()
  })
  .refine((values) => {
    if (values.mode === 'custom') {
      return typeof values.customPrice === 'number' && values.customPrice > 0;
    }
    if (values.mode === 'historical') {
      return Boolean(values.historicalDate);
    }
    return true;
  }, 'Please complete your selection');

type Values = z.infer<typeof schema>;

interface PriceStepProps {
  onConfirm: (selection: Values) => void;
}

export function PriceStep({ onConfirm }: PriceStepProps) {
  const { data, isFetching, refetch } = useLivePrice();
  const { priceSelection } = useOnboardingStore();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      mode: priceSelection.mode,
      customPrice: priceSelection.customPrice,
      historicalDate: priceSelection.historicalDate
    }
  });

  useEffect(() => {
    if (data && !form.getValues('customPrice')) {
      form.setValue('customPrice', Math.round(data.price));
    }
  }, [data, form]);

  const values = form.watch();

  return (
    <form
      className="space-y-8"
      onSubmit={form.handleSubmit((values) => {
        onConfirm(values);
      })}
    >
      <div className="space-y-4">
        <h3 className="text-2xl font-display font-semibold">Select your starting price</h3>
        <p className="text-text-secondary">
          BTC projections will anchor to this price. You can always revisit this choice from the home dashboard or guided flow.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <label className="glass-card cursor-pointer px-6 py-5">
          <input
            type="radio"
            className="sr-only"
            value="live"
            {...form.register('mode')}
            defaultChecked={priceSelection.mode === 'live'}
          />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Use live price</p>
              <p className="text-sm text-text-secondary">Updated every minute from CoinGecko.</p>
            </div>
            <TrendingUp className="h-6 w-6 text-accent-primary" />
          </div>
          <p className="mt-4 text-3xl font-display">
            {data ? formatCurrency(data.price, { maximumFractionDigits: 0 }) : 'Fetching…'}
          </p>
          <p className="text-xs text-text-secondary">
            {data ? `As of ${new Date(data.timestamp).toLocaleTimeString()}` : 'Automatic retry with exponential backoff'}
          </p>
        </label>
        <label className="glass-card cursor-pointer px-6 py-5">
          <input type="radio" className="sr-only" value="historical" {...form.register('mode')} />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Pick historical</p>
              <p className="text-sm text-text-secondary">Choose a prior date for retro analysis.</p>
            </div>
            <CalendarDays className="h-6 w-6 text-accent-secondary" />
          </div>
          <input
            type="date"
            className="mt-4 w-full rounded-xl border border-border-subtle bg-transparent px-4 py-3 text-sm focus:border-accent-secondary focus:outline-none"
            {...form.register('historicalDate')}
            disabled={values.mode !== 'historical'}
          />
          <p className="text-xs text-text-secondary">We&apos;ll backfill pricing via cached historical feed.</p>
        </label>
        <label className="glass-card cursor-pointer px-6 py-5">
          <input type="radio" className="sr-only" value="custom" {...form.register('mode')} />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Enter custom</p>
              <p className="text-sm text-text-secondary">Ideal for what-if sensitivity testing.</p>
            </div>
          </div>
          <input
            type="number"
            step="100"
            className="mt-4 w-full rounded-xl border border-border-subtle bg-transparent px-4 py-3 text-sm focus:border-accent-primary focus:outline-none"
            {...form.register('customPrice', { valueAsNumber: true })}
            disabled={values.mode !== 'custom'}
          />
          <p className="text-xs text-text-secondary">We&apos;ll validate ranges before saving to your scenario.</p>
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
        >
          {isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Loader2 className="h-4 w-4" />} Refresh price
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-3 rounded-full bg-accent-primary px-8 py-4 font-semibold text-bg-base shadow-lg shadow-accent-primary/30 transition hover:scale-[1.01]"
        >
          Confirm &amp; enter dashboard
        </button>
      </div>
      {form.formState.errors.root && <p className="text-sm text-accent-error">{form.formState.errors.root.message}</p>}
    </form>
  );
}
