import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ScenarioModel = 'btc' | 'macro' | 'individual' | 'corporate' | 'institution' | 'nation';

export type ScenarioState = {
  activeScenarioId: string | null;
  model: ScenarioModel;
  lastSavedAt?: string;
  dirty: boolean;
  scenarios: Record<string, { id: string; name: string; model: ScenarioModel; updatedAt: string }>;
  setActiveScenario: (id: string, model: ScenarioModel) => void;
  upsertScenario: (scenario: { id: string; name: string; model: ScenarioModel; updatedAt: string }) => void;
  markDirty: (dirty?: boolean) => void;
  markSaved: () => void;
};

export const useScenarioStore = create<ScenarioState>()(
  persist(
    (set) => ({
      activeScenarioId: null,
      model: 'btc',
      dirty: false,
      scenarios: {},
      setActiveScenario: (id, model) => set({ activeScenarioId: id, model }),
      upsertScenario: (scenario) =>
        set((state) => ({
          scenarios: { ...state.scenarios, [scenario.id]: scenario },
          activeScenarioId: scenario.id,
          model: scenario.model,
          dirty: false,
          lastSavedAt: scenario.updatedAt
        })),
      markDirty: (dirty = true) => set({ dirty }),
      markSaved: () => set({ dirty: false, lastSavedAt: new Date().toISOString() })
    }),
    { name: 'bitcoin24-scenarios' }
  )
);

export const selectActiveScenario = (state: ScenarioState) =>
  state.activeScenarioId ? state.scenarios[state.activeScenarioId] ?? null : null;
export const selectScenarioDirty = (state: ScenarioState) => state.dirty;
