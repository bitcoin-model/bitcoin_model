'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type PriceSelectionMode = 'live' | 'historical' | 'custom';

export interface OnboardingState {
  step: number;
  mode: 'signup' | 'login';
  priceSelection: {
    mode: PriceSelectionMode;
    customPrice?: number;
    historicalDate?: string;
  };
  completed: boolean;
  setStep: (step: number) => void;
  setMode: (mode: 'signup' | 'login') => void;
  setPriceSelection: (selection: OnboardingState['priceSelection']) => void;
  complete: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: 0,
      mode: 'signup',
      priceSelection: {
        mode: 'live'
      },
      completed: false,
      setStep: (step) => set({ step }),
      setMode: (mode) => set({ mode }),
      setPriceSelection: (priceSelection) => set({ priceSelection }),
      complete: () => set({ completed: true }),
      reset: () =>
        set({
          step: 0,
          mode: 'signup',
          priceSelection: { mode: 'live' },
          completed: false
        })
    }),
    {
      name: 'onboarding-store',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
