'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ScenarioStatus } from '@/src/types/scenario';

export type FlowStep = 'btc' | 'macro' | 'model';

interface StepState {
  status: ScenarioStatus | 'not-started' | 'attention';
  validationMessage?: string;
}

interface GuidedFlowState {
  currentStep: FlowStep;
  completion: Record<FlowStep, StepState>;
  scenarioId: string | null;
  setScenario: (id: string) => void;
  setStep: (step: FlowStep) => void;
  markStep: (step: FlowStep, state: StepState) => void;
  reset: () => void;
}

const defaultCompletion = (): Record<FlowStep, StepState> => ({
  btc: { status: 'not-started' },
  macro: { status: 'not-started' },
  model: { status: 'not-started' }
});

export const useGuidedFlowStore = create<GuidedFlowState>()(
  persist(
    (set) => ({
      currentStep: 'btc',
      completion: defaultCompletion(),
      scenarioId: null,
      setScenario: (id) =>
        set({
          scenarioId: id,
          completion: defaultCompletion(),
          currentStep: 'btc'
        }),
      setStep: (step) => set({ currentStep: step }),
      markStep: (step, state) =>
        set((current) => ({
          completion: { ...current.completion, [step]: state }
        })),
      reset: () =>
        set({
          currentStep: 'btc',
          completion: defaultCompletion(),
          scenarioId: null
        })
    }),
    {
      name: 'guided-flow-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
