'use client';

import { ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onContinue: () => void;
  onLogin: () => void;
}

export function WelcomeStep({ onContinue, onLogin }: WelcomeStepProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-3xl font-display font-semibold">Welcome to Bitcoin24</h3>
        <p className="text-lg text-text-secondary">
          In three steps you&apos;ll create your account, lock in a starting price, and enter the guided modeling experience.
        </p>
      </div>
      <div className="space-y-6">
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-3 rounded-full bg-accent-primary px-8 py-4 font-semibold text-bg-base shadow-lg shadow-accent-primary/30 transition hover:scale-[1.02]"
        >
          Create my account
          <ArrowRight className="h-5 w-5" />
        </button>
        <button onClick={onLogin} className="block text-sm font-semibold text-accent-secondary underline">
          I already have an account
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 text-sm text-text-secondary">
        <p>• Persist scenarios locally with resilient auto-save and draft recovery.</p>
        <p>• Guided flow keeps BTC, macro, and sector models synchronized.</p>
        <p>• Live price integration ensures you model from today&apos;s market reality.</p>
        <p>• Accessibility-first experience ready for keyboard and screen readers.</p>
      </div>
    </div>
  );
}
