import { z } from 'zod';

/**
 * 宏觀假設驗證 Schema
 */
export const macroAssumptionsSchema = z.object({
  startYear: z.number().int().min(2000).max(2100),
  forecastYears: z.number().int().min(1).max(50),
  inflationRate: z.number().min(0).max(100),
  stockMarketReturn: z.number().min(-50).max(100),
  bondReturn: z.number().min(-50).max(100),
  realEstateReturn: z.number().min(-50).max(100),
  cashReturn: z.number().min(-50).max(100),
});

/**
 * 比特幣假設驗證 Schema
 */
export const btcAssumptionsSchema = z.object({
  currentPrice: z.number().positive(),
  halvingYears: z.array(z.number().int()).min(1),
  adoptionCurve: z.enum(['linear', 'exponential', 's-curve']),
  maxAdoptionRate: z.number().min(0).max(100),
  institutionalAdoption: z.number().min(0).max(100),
  retailAdoption: z.number().min(0).max(100),
  priceFloor: z.number().positive(),
  priceCeiling: z.number().positive(),
  s2fMultiplier: z.number().min(-5).max(5),
});

/**
 * 驗證宏觀假設
 */
export function validateMacroAssumptions(data: unknown) {
  return macroAssumptionsSchema.safeParse(data);
}

/**
 * 驗證比特幣假設
 */
export function validateBTCAssumptions(data: unknown) {
  return btcAssumptionsSchema.safeParse(data);
}

