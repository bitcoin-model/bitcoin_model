import microFixture from '../../fixtures/micro.json' assert { type: 'json' };
import { z, type Infer } from '../validation/zod';

const ScenarioEntrySchema = z.object({
  id: z.string(),
  label: z.string(),
  netWorth: z.number(),
  cagr: z.number(),
  btc: z.number()
});

const MicroFixtureSchema = z.object({
  individual: z.array(ScenarioEntrySchema),
  corporate: z.array(ScenarioEntrySchema),
  institution: z.array(ScenarioEntrySchema)
});

const parsedMicroFixture = MicroFixtureSchema.parse(microFixture);

export type MicroSegment = keyof typeof parsedMicroFixture;
export type MicroScenario = Infer<typeof ScenarioEntrySchema>;

export function getMicroScenarios(segment: MicroSegment): MicroScenario[] {
  return parsedMicroFixture[segment];
}

export function findMicroScenario(segment: MicroSegment, id: string): MicroScenario | undefined {
  return parsedMicroFixture[segment].find((scenario) => scenario.id === id);
}
