import microFixture from '../../fixtures/micro.json' with { type: 'json' };
import { z } from '../validation/zod.js';

const ScenarioSchema = z.object({
  id: z.string(),
  label: z.string(),
  btc: z.number(),
  cagr: z.number(),
  netWorth: z.number()
});

const MicroFixtureSchema = z.object({
  individual: z.array(ScenarioSchema),
  corporate: z.array(ScenarioSchema)
});

const parsedMicroFixture = MicroFixtureSchema.parse(microFixture);

export function getMicroScenarios(segment) {
  return parsedMicroFixture[segment];
}

export function findMicroScenario(segment, id) {
  const scenarios = getMicroScenarios(segment);
  return scenarios.find((scenario) => scenario.id === id);
}
