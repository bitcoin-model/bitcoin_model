import { z } from 'zod';

/**
 * 資產配置驗證 Schema
 */
export const assetAllocationSchema = z
  .object({
    btc: z.number().min(0).max(100),
    stocks: z.number().min(0).max(100),
    bonds: z.number().min(0).max(100),
    realEstate: z.number().min(0).max(100),
    cash: z.number().min(0).max(100),
  })
  .refine(
    (data) => {
      const total = data.btc + data.stocks + data.bonds + data.realEstate + data.cash;
      return Math.abs(total - 100) < 0.01;
    },
    {
      message: '資產配置總和必須為 100%',
    }
  );

/**
 * 策略配置驗證 Schema
 */
export const strategyConfigSchema = z.object({
  name: z.enum(['normie', 'btc10', 'btcMaxi', 'doubleMaxi', 'tripleMaxi']),
  displayName: z.string().min(1),
  allocation: assetAllocationSchema,
  rebalanceFrequency: z.enum(['never', 'monthly', 'quarterly', 'yearly']),
  leverageMultiplier: z.number().min(1).max(10).optional(),
  description: z.string(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i),
});

/**
 * 驗證資產配置
 */
export function validateAssetAllocation(data: unknown) {
  return assetAllocationSchema.safeParse(data);
}

/**
 * 驗證策略配置
 */
export function validateStrategyConfig(data: unknown) {
  return strategyConfigSchema.safeParse(data);
}

