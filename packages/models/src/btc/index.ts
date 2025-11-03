import btcFixture from '../../fixtures/btc.json' assert { type: 'json' };
import { getTotalAssetsForYear } from '../macro';
import { generateGrowthSeries } from '../time-series';
import { z, type Infer } from '../validation/zod';

const ScenarioAssumptionSchema = z.object({
  arrStart: z.number(),
  arrReduction: z.number(),
  steadyStateArr: z.number(),
  startPriceK: z.number()
});

const ScenarioSummarySchema = z.object({
  price2045Million: z.number(),
  marketCap2045Trillion: z.number(),
  twentyOneYearArr: z.number(),
  assetShare: z.number()
});

const SupplyEntrySchema = z.object({
  year: z.number(),
  supply: z.number()
});

const BtcFixtureSchema = z.object({
  assumptions: z.object({
    base: ScenarioAssumptionSchema,
    bear: ScenarioAssumptionSchema,
    bull: ScenarioAssumptionSchema
  }),
  summary: z.object({
    base: ScenarioSummarySchema,
    bear: ScenarioSummarySchema,
    bull: ScenarioSummarySchema
  }),
  supplyMillions: z.array(SupplyEntrySchema)
});

const parsedBtcFixture = BtcFixtureSchema.parse(btcFixture);

export type BtcScenario = keyof typeof parsedBtcFixture.assumptions;
export type ScenarioAssumptions = Infer<typeof ScenarioAssumptionSchema>;
export type ScenarioSummary = Infer<typeof ScenarioSummarySchema>;

const SUPPLY_MAP = new Map(parsedBtcFixture.supplyMillions.map((entry) => [entry.year, entry.supply]));
const START_YEAR = 2024;
const END_YEAR = 2045;
const YEARS_ELAPSED = END_YEAR - START_YEAR;

function getSupplyForYear(year: number): number {
  const supply = SUPPLY_MAP.get(year);
  if (supply === undefined) {
    throw new RangeError(`No BTC supply projection available for ${year}.`);
  }
  return supply;
}

export function getScenarioAssumptions(name: BtcScenario): ScenarioAssumptions {
  return parsedBtcFixture.assumptions[name];
}

export function getScenarioSummaryFromFixture(name: BtcScenario): ScenarioSummary {
  return parsedBtcFixture.summary[name];
}

export function projectScenario(name: BtcScenario) {
  const assumptions = getScenarioAssumptions(name);
  const priceSeries = generateGrowthSeries({
    startYear: START_YEAR,
    endYear: END_YEAR,
    initialValue: assumptions.startPriceK / 1000,
    arrStart: assumptions.arrStart,
    arrReduction: assumptions.arrReduction,
    steadyStateArr: assumptions.steadyStateArr
  });

  const first = priceSeries[0];
  const last = priceSeries[priceSeries.length - 1];
  if (!first || !last) {
    throw new Error('Failed to compute BTC price series.');
  }

  const marketCapTrillion = (last.priceMillion * getSupplyForYear(END_YEAR)) / 1000;
  const totalAssets = getTotalAssetsForYear(END_YEAR);
  const assetShare = marketCapTrillion / totalAssets;
  const twentyOneYearArr = Math.pow(last.priceMillion / first.priceMillion, 1 / YEARS_ELAPSED) - 1;

  const summary: ScenarioSummary = {
    price2045Million: last.priceMillion,
    marketCap2045Trillion: marketCapTrillion,
    twentyOneYearArr,
    assetShare
  };

  return { assumptions, priceSeries, summary };
}
