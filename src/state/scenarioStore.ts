'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  ScenarioDetail,
  ScenarioSummary,
  ModelKind,
  ScenarioStatus,
  BTCInputs,
  MacroInputs,
  ModelInputs
} from '@/src/types/scenario';
import {
  createScenarioSummary,
  hydrateScenarioDetail,
  generateBTCProjection,
  deriveMacroOutputs,
  deriveModelOutputs
} from '@/src/lib/calculations';
import { produce } from 'immer';
import { nanoid } from 'nanoid';

interface ScenarioState {
  activeScenarioId: string | null;
  scenarios: Record<string, ScenarioDetail>;
  createScenario: (name: string, model: ModelKind) => ScenarioDetail;
  loadScenario: (id: string) => ScenarioDetail | undefined;
  setActiveScenario: (id: string) => void;
  updateBTCInputs: (id: string, updater: (draft: BTCInputs) => void) => void;
  updateMacroInputs: (id: string, updater: (draft: MacroInputs) => void) => void;
  updateModelInputs: (id: string, model: ModelKind, updater: (draft: ModelInputs) => void) => void;
  markStatus: (id: string, status: ScenarioStatus) => void;
  duplicateScenario: (id: string) => ScenarioDetail | undefined;
  deleteScenario: (id: string) => void;
}

function detailFromSummary(summary: ScenarioSummary): ScenarioDetail {
  return hydrateScenarioDetail(summary);
}

export const useScenarioStore = create<ScenarioState>()(
  persist(
    (set, get) => ({
      activeScenarioId: null,
      scenarios: {},
      createScenario: (name, model) => {
        const summary = createScenarioSummary(name, model);
        const detail = detailFromSummary(summary);
        set((state) => ({
          scenarios: { ...state.scenarios, [detail.id]: detail },
          activeScenarioId: detail.id
        }));
        return detail;
      },
      loadScenario: (id) => get().scenarios[id],
      setActiveScenario: (id) => set({ activeScenarioId: id }),
      updateBTCInputs: (id, updater) =>
        set((state) => {
          const scenario = state.scenarios[id];
          if (!scenario) return state;
          const nextScenario = produce(scenario, (draft) => {
            updater(draft.btcAssumptions);
            draft.btcOutputs = generateBTCProjection(draft.btcAssumptions);
            draft.macroOutputs = deriveMacroOutputs(draft.macroAssumptions, draft.btcOutputs);
            (Object.keys(draft.modelOutputs) as ModelKind[]).forEach((model) => {
              draft.modelOutputs[model] = deriveModelOutputs(model, draft.btcOutputs, draft.modelInputs[model]);
            });
            draft.updatedAt = new Date().toISOString();
          });
          return {
            scenarios: { ...state.scenarios, [id]: nextScenario }
          };
        }),
      updateMacroInputs: (id, updater) =>
        set((state) => {
          const scenario = state.scenarios[id];
          if (!scenario) return state;
          const nextScenario = produce(scenario, (draft) => {
            updater(draft.macroAssumptions);
            draft.macroOutputs = deriveMacroOutputs(draft.macroAssumptions, draft.btcOutputs);
            draft.updatedAt = new Date().toISOString();
          });
          return {
            scenarios: { ...state.scenarios, [id]: nextScenario }
          };
        }),
      updateModelInputs: (id, model, updater) =>
        set((state) => {
          const scenario = state.scenarios[id];
          if (!scenario) return state;
          const nextScenario = produce(scenario, (draft) => {
            updater(draft.modelInputs[model]);
            draft.modelOutputs[model] = deriveModelOutputs(model, draft.btcOutputs, draft.modelInputs[model]);
            draft.updatedAt = new Date().toISOString();
          });
          return {
            scenarios: { ...state.scenarios, [id]: nextScenario }
          };
        }),
      markStatus: (id, status) =>
        set((state) => {
          const scenario = state.scenarios[id];
          if (!scenario) return state;
          return {
            scenarios: {
              ...state.scenarios,
              [id]: {
                ...scenario,
                status,
                updatedAt: new Date().toISOString()
              }
            }
          };
        }),
      duplicateScenario: (id) => {
        const scenario = get().scenarios[id];
        if (!scenario) return undefined;
        const copyId = nanoid();
        const duplicated: ScenarioDetail = {
          ...scenario,
          id: copyId,
          name: `${scenario.name} Copy`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({
          scenarios: { ...state.scenarios, [copyId]: duplicated },
          activeScenarioId: copyId
        }));
        return duplicated;
      },
      deleteScenario: (id) =>
        set((state) => {
          const next = { ...state.scenarios };
          delete next[id];
          const activeScenarioId = state.activeScenarioId === id ? null : state.activeScenarioId;
          return { scenarios: next, activeScenarioId };
        })
    }),
    {
      name: 'scenario-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
