import Head from 'next/head';
import { Button } from '@bitcoin24/ui';
import { defaultGrowthScenarios } from '@bitcoin24/models';

export default function Home() {
  const scenario = defaultGrowthScenarios[0];

  return (
    <>
      <Head>
        <title>Bitcoin24 Portal</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-8 text-white">
        <section className="max-w-2xl space-y-4 text-center">
          <h1 className="text-4xl font-bold">Bitcoin24 Modeling Portal</h1>
          <p className="text-lg text-slate-200">
            Prototype workspace scaffolding the web experience described in the Shared Application
            Foundation blueprint.
          </p>
          <div className="rounded-lg border border-brand-500/40 bg-slate-900 p-6 shadow-lg">
            <p className="text-sm uppercase tracking-widest text-brand-300">Active Scenario</p>
            <h2 className="text-2xl font-semibold text-brand-100">{scenario.name}</h2>
            <p className="text-slate-300">{scenario.description}</p>
            <Button className="mt-6">Open scenario</Button>
          </div>
        </section>
      </main>
    </>
  );
}
