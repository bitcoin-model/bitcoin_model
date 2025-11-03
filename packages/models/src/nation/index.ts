import nationFixture from '../../fixtures/nation.json' assert { type: 'json' };
import { z, type Infer } from '../validation/zod';

const NationScenarioSchema = z.object({
  id: z.string(),
  label: z.string(),
  netWorth: z.number(),
  cagr: z.number(),
  btc: z.number()
});

const NationFixtureSchema = z.object({
  indebted: z.array(NationScenarioSchema),
  wealthy: z.array(NationScenarioSchema),
  united_states: z.array(NationScenarioSchema)
});

const parsedNationFixture = NationFixtureSchema.parse(nationFixture);

export type NationType = keyof typeof parsedNationFixture;
export type NationScenario = Infer<typeof NationScenarioSchema>;

export function getNationScenarios(type: NationType): NationScenario[] {
  return parsedNationFixture[type];
}

export function findNationScenario(type: NationType, id: string): NationScenario | undefined {
  return parsedNationFixture[type].find((scenario) => scenario.id === id);
}
