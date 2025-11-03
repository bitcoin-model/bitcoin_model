'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const models = [
  {
    title: 'BTC Core Model',
    description: 'Adjust ARR, price trajectories, and live pricing anchors.',
    href: '/models/btc'
  },
  {
    title: 'Macro Engine',
    description: 'Translate BTC adoption into global liquidity and GDP effects.',
    href: '/models/macro'
  },
  {
    title: 'Individual Strategy',
    description: 'Plan accumulation and runway for households and individuals.',
    href: '/models/individual'
  },
  {
    title: 'Corporate Treasury',
    description: 'Calibrate treasury allocations, leverage, and coverage ratios.',
    href: '/models/corporate'
  },
  {
    title: 'Institutional Portfolio',
    description: 'Model pension and fund exposure with guardrails and targets.',
    href: '/models/institution'
  },
  {
    title: 'Nation-State Reserves',
    description: 'Simulate sovereign adoption, FX reserves, and productivity boosts.',
    href: '/models/nation'
  }
];

export function ModelCatalog() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="section-heading">Model catalog</h3>
        <Link href="/models/btc" className="inline-flex items-center gap-2 text-sm text-accent-secondary">
          Start guided flow <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {models.map((model) => (
          <Link key={model.href} href={model.href} className="glass-card group px-6 py-6 transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-display font-semibold">{model.title}</h4>
              <ArrowRight className="h-5 w-5 text-accent-secondary transition group-hover:translate-x-1" />
            </div>
            <p className="mt-3 text-sm text-text-secondary">{model.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
