import nationFixture from '../../fixtures/nation.json' with { type: 'json' };
import { z } from '../validation/zod.js';

const ScenarioSchema = z.object({
  id: z.string(),
  label: z.string(),
  btc: z.number(),
  cagr: z.number(),
  netWorth: z.number()
});

const NationFixtureSchema = z.object({
  indebted: z.array(ScenarioSchema),
  wealthy: z.array(ScenarioSchema),
  united_states: z.array(ScenarioSchema)
});

const parsedNationFixture = NationFixtureSchema.parse(nationFixture);

export function getNationScenarios(segment) {
  return parsedNationFixture[segment];
}

export function findNationScenario(segment, id) {
  const scenarios = getNationScenarios(segment);
  return scenarios.find((scenario) => scenario.id === id);
}
