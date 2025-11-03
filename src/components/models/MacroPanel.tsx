'use client';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useScenarioStore } from '@/src/state/scenarioStore';
import { useGuidedFlowStore } from '@/src/state/guidedFlowStore';
import clsx from 'clsx';
import { useEffect } from 'react';

const schema = z.object({
  globalAssetBase: z.number().min(100).max(2000),
  adoptionStart: z.number().min(0).max(1),
  adoptionEnd: z.number().min(0).max(1),
  inflationDrift: z.number().min(-0.02).max(0.15),
  productivityBoost: z.number().min(-0.02).max(0.2)
});

type Values = z.infer<typeof schema>;

export function MacroPanel() {
  const { scenarioId } = useGuidedFlowStore();
  const scenario = useScenarioStore((state) => (scenarioId ? state.scenarios[scenarioId] : undefined));
  const updateMacroInputs = useScenarioStore((state) => state.updateMacroInputs);
  const markStep = useGuidedFlowStore((state) => state.markStep);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    values:
      scenario?.macroAssumptions ?? {
        globalAssetBase: 900,
        adoptionStart: 0.03,
        adoptionEnd: 0.18,
        inflationDrift: 0.025,
        productivityBoost: 0.02
      }
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (!scenarioId || !form.formState.isValid) return;
      updateMacroInputs(scenarioId, (draft) => {
        Object.assign(draft, values);
      });
      markStep('macro', { status: 'in-progress' });
    });
    return () => subscription.unsubscribe();
  }, [form, markStep, scenarioId, updateMacroInputs]);

  if (!scenario) {
    return <p className="text-sm text-text-secondary">Create a scenario via onboarding to configure macro assumptions.</p>;
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-text-secondary">
        Macro assumptions cascade from BTC outcomes. Adjust adoption curves, inflation drift, and productivity boosts to see
        downstream effects.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <Controller
          name="globalAssetBase"
          control={form.control}
          render={({ field }) => <MacroField label="Global asset base (T)" step={10} {...field} />}
        />
        <Controller
          name="adoptionStart"
          control={form.control}
          render={({ field }) => (
            <MacroField
              label="Adoption start"
              suffix="%"
              step={0.5}
              value={field.value * 100}
              onChange={(value) => field.onChange(Number(value) / 100)}
            />
          )}
        />
        <Controller
          name="adoptionEnd"
          control={form.control}
          render={({ field }) => (
            <MacroField
              label="Adoption end"
              suffix="%"
              step={0.5}
              value={field.value * 100}
              onChange={(value) => field.onChange(Number(value) / 100)}
            />
          )}
        />
        <Controller
          name="inflationDrift"
          control={form.control}
          render={({ field }) => (
            <MacroField
              label="Inflation drift"
              suffix="%"
              step={0.1}
              value={field.value * 100}
              onChange={(value) => field.onChange(Number(value) / 100)}
            />
          )}
        />
        <Controller
          name="productivityBoost"
          control={form.control}
          render={({ field }) => (
            <MacroField
              label="Productivity boost"
              suffix="%"
              step={0.1}
              value={field.value * 100}
              onChange={(value) => field.onChange(Number(value) / 100)}
            />
          )}
        />
      </div>
      {!form.formState.isValid && (
        <div className="rounded-2xl border border-accent-warning/40 bg-accent-warning/10 px-4 py-3 text-sm text-accent-warning">
          Adoption end must exceed start; values remain editable but warnings persist across the stepper.
        </div>
      )}
    </div>
  );
}

interface MacroFieldProps {
  label: string;
  suffix?: string;
  step?: number;
  value: number;
  onChange: (value: number | string) => void;
}

function MacroField({ label, suffix, step = 1, value, onChange }: MacroFieldProps) {
  const isPercent = suffix === '%';
  return (
    <label className="block text-sm">
      <span className="mb-2 block text-text-secondary">{label}</span>
      <div className="relative">
        <input
          type="number"
          step={step}
          className={clsx(
            'w-full rounded-xl border border-border-subtle bg-transparent px-4 py-3 text-base focus:border-accent-secondary focus:outline-none',
            isPercent && 'pr-12'
          )}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        {suffix && <span className="absolute inset-y-0 right-4 flex items-center text-text-secondary">{suffix}</span>}
      </div>
    </label>
  );
}
