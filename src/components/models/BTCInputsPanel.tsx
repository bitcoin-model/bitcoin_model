'use client';

import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useScenarioStore } from '@/src/state/scenarioStore';
import { useGuidedFlowStore } from '@/src/state/guidedFlowStore';
import clsx from 'clsx';

const schema = z.object({
  currentPrice: z.number().min(1000).max(1000000),
  arrStart: z.number().min(-0.5).max(5),
  arrDecay: z.number().min(0).max(1),
  steadyStateArr: z.number().min(0).max(1),
  steadyStateYear: z.number().min(2025).max(2045)
});

type Values = z.infer<typeof schema>;

const presets: Record<string, Partial<Values>> = {
  Bear: {
    currentPrice: 45000,
    arrStart: 0.25,
    arrDecay: 0.08,
    steadyStateArr: 0.05,
    steadyStateYear: 2030
  },
  Base: {
    currentPrice: 68000,
    arrStart: 0.38,
    arrDecay: 0.06,
    steadyStateArr: 0.08,
    steadyStateYear: 2032
  },
  Bull: {
    currentPrice: 85000,
    arrStart: 0.5,
    arrDecay: 0.04,
    steadyStateArr: 0.1,
    steadyStateYear: 2035
  }
};

export function BTCInputsPanel() {
  const { scenarioId } = useGuidedFlowStore();
  const scenario = useScenarioStore((state) => (scenarioId ? state.scenarios[scenarioId] : undefined));
  const updateBTCInputs = useScenarioStore((state) => state.updateBTCInputs);
  const markStep = useGuidedFlowStore((state) => state.markStep);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    values: scenario?.btcAssumptions ?? {
      currentPrice: 68000,
      arrStart: 0.38,
      arrDecay: 0.06,
      steadyStateArr: 0.08,
      steadyStateYear: 2032
    }
  });

  useEffect(() => {
    const subscription = form.watch((values, { name, type }) => {
      if (!scenarioId || !form.formState.isValid) return;
      updateBTCInputs(scenarioId, (draft) => {
        Object.assign(draft, values);
      });
      markStep('btc', { status: 'in-progress' });
    });
    return () => subscription.unsubscribe();
  }, [form, markStep, scenarioId, updateBTCInputs]);

  const activePreset = useMemo(() => {
    if (!scenario) return null;
    return Object.entries(presets).find(([, preset]) => {
      return (
        Math.abs((preset.currentPrice ?? 0) - scenario.btcAssumptions.currentPrice) < 1000 &&
        Math.abs((preset.arrStart ?? 0) - scenario.btcAssumptions.arrStart) < 0.02
      );
    })?.[0];
  }, [scenario]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
        {Object.keys(presets).map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              const presetValues = presets[preset];
              Object.entries(presetValues).forEach(([key, value]) => {
                form.setValue(key as keyof Values, value as number, { shouldValidate: true, shouldDirty: true });
              });
            }}
            className={clsx(
              'rounded-full border px-4 py-2 transition',
              activePreset === preset
                ? 'border-accent-primary text-text-primary'
                : 'border-border-subtle text-text-secondary hover:text-text-primary'
            )}
          >
            {preset}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Controller
          name="currentPrice"
          control={form.control}
          render={({ field }) => <NumberField label="Current price" suffix="$" step={100} {...field} />}
        />
        <Controller
          name="arrStart"
          control={form.control}
          render={({ field }) => <NumberField label="ARR (start)" suffix="%" step={0.01} {...field} />}
        />
        <Controller
          name="arrDecay"
          control={form.control}
          render={({ field }) => <NumberField label="ARR decay" suffix="%" step={0.01} {...field} />}
        />
        <Controller
          name="steadyStateArr"
          control={form.control}
          render={({ field }) => <NumberField label="Steady-state ARR" suffix="%" step={0.01} {...field} />}
        />
        <Controller
          name="steadyStateYear"
          control={form.control}
          render={({ field }) => <NumberField label="Steady-state year" step={1} {...field} />}
        />
      </div>
      {!form.formState.isValid && (
        <p className="text-sm text-accent-warning">Some values are outside recommended bounds. Adjust to continue.</p>
      )}
    </div>
  );
}

interface NumberFieldProps {
  label: string;
  suffix?: string;
  step?: number;
  value: number;
  onChange: (value: number | string) => void;
}

function NumberField({ label, suffix, step = 1, value, onChange }: NumberFieldProps) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block text-text-secondary">{label}</span>
      <div className="relative">
        <input
          type="number"
          step={step}
          className="w-full rounded-xl border border-border-subtle bg-transparent px-4 py-3 text-base focus:border-accent-primary focus:outline-none"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        {suffix && <span className="absolute inset-y-0 right-4 flex items-center text-text-secondary">{suffix}</span>}
      </div>
    </label>
  );
}
