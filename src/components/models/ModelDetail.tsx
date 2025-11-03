'use client';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useScenarioStore } from '@/src/state/scenarioStore';
import { useGuidedFlowStore } from '@/src/state/guidedFlowStore';
import { ModelKind } from '@/src/types/scenario';
import { useEffect, useMemo } from 'react';
import { formatCurrency } from '@/src/lib/calculations';

const schema = z.object({
  allocation: z.number().min(0).max(1),
  treasuryShare: z.number().min(0).max(1),
  cashflows: z.number().min(0),
  leverage: z.number().min(0).max(2)
});

type Values = z.infer<typeof schema>;

const copy: Record<ModelKind, { title: string; description: string }> = {
  individual: {
    title: 'Individual runway planning',
    description: 'Track BTC holdings and cashflow coverage for personal accumulation strategies.'
  },
  corporate: {
    title: 'Corporate treasury strategy',
    description: 'Balance treasury allocations, leverage, and coverage ratios for resilient balance sheets.'
  },
  institution: {
    title: 'Institutional portfolio design',
    description: 'Model endowment, pension, or fund exposure with disciplined allocation guardrails.'
  },
  nation: {
    title: 'Nation-state reserve planning',
    description: 'Evaluate sovereign reserve adoption, FX buffers, and productivity boosts.'
  }
};

interface ModelDetailProps {
  model: ModelKind;
}

export function ModelDetail({ model }: ModelDetailProps) {
  const { scenarioId } = useGuidedFlowStore();
  const scenario = useScenarioStore((state) => (scenarioId ? state.scenarios[scenarioId] : undefined));
  const updateModelInputs = useScenarioStore((state) => state.updateModelInputs);
  const markStep = useGuidedFlowStore((state) => state.markStep);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    values: scenario?.modelInputs[model] ?? {
      allocation: 0.1,
      treasuryShare: 0.1,
      cashflows: 1000000,
      leverage: 0.2
    }
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (!scenarioId || !form.formState.isValid) return;
      updateModelInputs(scenarioId, model, (draft) => {
        Object.assign(draft, values);
      });
      markStep('model', { status: 'in-progress' });
    });
    return () => subscription.unsubscribe();
  }, [form, markStep, model, scenarioId, updateModelInputs]);

  const outputs = useMemo(() => {
    if (!scenario) return null;
    const result = scenario.modelOutputs[model];
    const terminal = formatCurrency(result.terminalValue);
    const latestCoverage = result.cashflowCoverage[result.cashflowCoverage.length - 1]?.toFixed(1) ?? '0.0';
    return { terminal, latestCoverage };
  }, [scenario, model]);

  if (!scenario) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-display font-semibold">{copy[model].title}</h3>
        <p className="text-sm text-text-secondary">{copy[model].description}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Controller
          name="allocation"
          control={form.control}
          render={({ field }) => (
            <ModelField
              label="Allocation"
              suffix="%"
              step={0.5}
              value={field.value * 100}
              onChange={(value) => field.onChange(Number(value) / 100)}
            />
          )}
        />
        <Controller
          name="treasuryShare"
          control={form.control}
          render={({ field }) => (
            <ModelField
              label="Treasury growth"
              suffix="%"
              step={0.5}
              value={field.value * 100}
              onChange={(value) => field.onChange(Number(value) / 100)}
            />
          )}
        />
        <Controller
          name="cashflows"
          control={form.control}
          render={({ field }) => (
            <ModelField label="Annual cashflows" suffix="$" step={1000} value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          name="leverage"
          control={form.control}
          render={({ field }) => (
            <ModelField label="Leverage" step={0.05} value={field.value} onChange={field.onChange} />
          )}
        />
      </div>
      {outputs && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border-subtle bg-black/30 px-6 py-4">
            <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">Terminal value</p>
            <p className="mt-2 text-xl font-display font-semibold">{outputs.terminal}</p>
          </div>
          <div className="rounded-2xl border border-border-subtle bg-black/30 px-6 py-4">
            <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">Coverage ratio</p>
            <p className="mt-2 text-xl font-display font-semibold">{outputs.latestCoverage}×</p>
          </div>
        </div>
      )}
      {!form.formState.isValid && (
        <p className="rounded-2xl border border-accent-error/40 bg-accent-error/10 px-4 py-3 text-sm text-accent-error">
          Double-check allocation, leverage, and treasury growth percentages. Critical errors prevent completion.
        </p>
      )}
    </div>
  );
}

interface ModelFieldProps {
  label: string;
  suffix?: string;
  step?: number;
  value: number;
  onChange: (value: number | string) => void;
}

function ModelField({ label, suffix, step = 1, value, onChange }: ModelFieldProps) {
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
