import macroFixture from '../../fixtures/macro.json' assert { type: 'json' };
import { z, type Infer } from '../validation/zod';

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

export type MacroAssetKey = keyof typeof parsedMacroFixture.assetValues;
export type MacroProjections = Infer<typeof MacroFixtureSchema>;

export function getMacroProjections(): MacroProjections {
  return parsedMacroFixture;
}

export function getTotalAssetsForYear(year: number): number {
  const { years, totals } = parsedMacroFixture;
  const index = years.indexOf(year);
  if (index === -1) {
    throw new RangeError(`Year ${year} is outside the projection window.`);
  }
  return totals.nominal[index];
}

export function getAssetShare(year: number, asset: MacroAssetKey): number {
  const { years, assetValues, totals } = parsedMacroFixture;
  const index = years.indexOf(year);
  if (index === -1) {
    throw new RangeError(`Year ${year} is outside the projection window.`);
  }

  return assetValues[asset][index] / totals.nominal[index];
}
