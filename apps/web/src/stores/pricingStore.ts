import { create } from 'zustand';

export type PricePoint = {
  timestamp: string;
  priceUsd: number;
  source: string;
};

export type PricingState = {
  latest: PricePoint | null;
  history: PricePoint[];
  isLoading: boolean;
  error?: string;
  setLatest: (point: PricePoint) => void;
  setHistory: (points: PricePoint[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (message?: string) => void;
};

export const usePricingStore = create<PricingState>((set) => ({
  latest: null,
  history: [],
  isLoading: false,
  setLatest: (point) => set({ latest: point }),
  setHistory: (points) => set({ history: points }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (message) => set({ error: message })
}));

export const selectLatestPrice = (state: PricingState) => state.latest;
export const selectPriceHistory = (state: PricingState) => state.history;
