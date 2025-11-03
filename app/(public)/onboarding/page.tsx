'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { WizardLayout } from '@/src/components/onboarding/WizardLayout';
import { WelcomeStep } from '@/src/components/onboarding/WelcomeStep';
import { AuthStep } from '@/src/components/onboarding/AuthStep';
import { PriceStep } from '@/src/components/onboarding/PriceStep';
import { useOnboardingStore } from '@/src/state/onboardingStore';
import { useAuthStore } from '@/src/state/authStore';
import { useScenarioStore } from '@/src/state/scenarioStore';
import { useGuidedFlowStore } from '@/src/state/guidedFlowStore';

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const auth = useAuthStore();
  const onboarding = useOnboardingStore();
  const scenarioStore = useScenarioStore();
  const guidedFlow = useGuidedFlowStore();

  useEffect(() => {
    if (auth.user && onboarding.step === 0) {
      onboarding.setStep(1);
      onboarding.setMode('login');
    }
  }, [auth.user, onboarding]);

  useEffect(() => {
    if (auth.user && auth.onboardingComplete) {
      router.replace('/home');
    }
  }, [auth.user, auth.onboardingComplete, router]);

  const step = onboarding.step;
  const title = useMemo(() => {
    switch (step) {
      case 0:
        return 'Let\u2019s set the stage';
      case 1:
        return onboarding.mode === 'signup' ? 'Create your account' : 'Welcome back';
      case 2:
        return 'Lock in your starting price';
      default:
        return 'Onboarding';
    }
  }, [step, onboarding.mode]);

  const description = useMemo(() => {
    switch (step) {
      case 0:
        return 'Three guided steps connect you to the modeling platform. Progress auto-saves in case you need to pause.';
      case 1:
        return onboarding.mode === 'signup'
          ? 'Securely create your account with inline validation and password guidance.'
          : 'Sign back in to resume your modeling scenarios with everything preserved.';
      case 2:
        return 'Choose a price anchor that will inform BTC projections across every screen.';
      default:
        return '';
    }
  }, [step, onboarding.mode]);

  function handlePriceConfirm(selection: { mode: 'live' | 'historical' | 'custom'; customPrice?: number; historicalDate?: string }) {
    onboarding.setPriceSelection(selection);
    onboarding.complete();
    auth.markOnboardingComplete();
    const scenario = scenarioStore.createScenario('My Bitcoin Thesis', 'individual');
    if (selection.customPrice) {
      scenarioStore.updateBTCInputs(scenario.id, (draft) => {
        draft.currentPrice = selection.customPrice ?? draft.currentPrice;
      });
    }
    guidedFlow.setScenario(scenario.id);
    guidedFlow.markStep('btc', { status: 'in-progress' });
    router.push('/home?onboarding=complete');
  }

  return (
    <WizardLayout step={step} totalSteps={TOTAL_STEPS} title={title} description={description}>
      {step === 0 && (
        <WelcomeStep
          onContinue={() => onboarding.setStep(1)}
          onLogin={() => {
            onboarding.setMode('login');
            onboarding.setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <AuthStep
          mode={onboarding.mode}
          onModeChange={(mode) => onboarding.setMode(mode)}
          onSuccess={() => onboarding.setStep(2)}
        />
      )}
      {step === 2 && <PriceStep onConfirm={handlePriceConfirm} />}
    </WizardLayout>
  );
}
