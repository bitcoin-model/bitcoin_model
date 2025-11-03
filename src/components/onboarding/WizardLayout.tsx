'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';

const variants = {
  enter: { opacity: 0, x: 60 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 }
};

interface WizardLayoutProps {
  step: number;
  totalSteps: number;
  title: string;
  description: string;
  children: ReactNode;
}

export function WizardLayout({ step, totalSteps, title, description, children }: WizardLayoutProps) {
  const progress = ((step + 1) / totalSteps) * 100;
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[rgba(11,14,17,0.94)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(247,147,26,0.15),transparent_55%)]" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-10 md:py-14">
        <div className="glass-card mb-10 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent-secondary">Onboarding</p>
              <h2 className="mt-2 text-3xl font-display font-semibold">{title}</h2>
              <p className="mt-3 max-w-2xl text-text-secondary">{description}</p>
            </div>
            <div className="hidden text-right md:block">
              <p className="text-sm text-text-secondary">
                Step {step + 1} of {totalSteps}
              </p>
              <div className="mt-2 h-2 w-40 overflow-hidden rounded-full bg-border-subtle">
                <motion.div className="h-full bg-accent-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </div>
        <div className="grid flex-1 gap-10 md:grid-cols-[1fr_320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="glass-card px-8 py-10"
            >
              {children}
            </motion.div>
          </AnimatePresence>
          <div className="glass-card hidden flex-col justify-between px-8 py-10 md:flex">
            <div className="space-y-6">
              <h3 className="text-xl font-display font-semibold">What to expect</h3>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li>✅ Create your secure account</li>
                <li>✅ Choose a starting price (live, historical, or custom)</li>
                <li>✅ Jump straight into the guided modeling flow</li>
              </ul>
            </div>
            <div className="text-sm text-text-secondary">
              Already exploring?{' '}
              <Link href="/" className="text-accent-secondary underline">
                Return to cover
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
