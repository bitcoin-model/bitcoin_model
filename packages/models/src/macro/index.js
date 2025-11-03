import macroFixture from '../../fixtures/macro.json' with { type: 'json' };
import { z } from '../validation/zod.js';

const MacroFixtureSchema = z.object({
  years: z.array(z.number()),
  assetValues: z.object({
    BTC: z.array(z.number()),
    Gold: z.array(z.number()),
    Art: z.array(z.number()),
    Equity: z.array(z.number()),
    RealEstate: z.array(z.number()),
    Bonds: z.array(z.number()),
    Currency: z.array(z.number())
  }),
  totals: z.object({
    nominal: z.array(z.number()),
    nominalGrowth: z.array(z.number().nullable()),
    real: z.array(z.number()),
    realGrowth: z.array(z.number().nullable()),
    realCpi2: z.array(z.number()),
    realCpi2Growth: z.array(z.number().nullable())
  }),
  inefficiency: z.object({
    total: z.array(z.number()),
    shareOfAssets: z.array(z.number())
  })
});

const parsedMacroFixture = MacroFixtureSchema.parse(macroFixture);

export function getMacroProjections() {
  return parsedMacroFixture;
}

export function getTotalAssetsForYear(year) {
  const { years, totals } = parsedMacroFixture;
  const index = years.indexOf(year);
  if (index === -1) {
    throw new RangeError(`Year ${year} is outside the projection window.`);
  }
  return totals.nominal[index];
}

export function getAssetShare(year, asset) {
  const { years, assetValues, totals } = parsedMacroFixture;
  const index = years.indexOf(year);
  if (index === -1) {
    throw new RangeError(`Year ${year} is outside the projection window.`);
  }

  const values = assetValues[asset];
  if (!values) {
    throw new RangeError(`Unknown asset key: ${asset}`);
  }

  return values[index] / totals.nominal[index];
}
