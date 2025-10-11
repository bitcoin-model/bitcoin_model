import { z } from 'zod';

/**
 * 投資者檔案驗證 Schema
 */
export const investorProfileSchema = z.object({
  type: z.enum(['individual', 'corporate', 'institution', 'nation-state']),
  name: z.string().min(1).max(100),
  initialCapital: z.number().positive(),
  annualContribution: z.number().min(0),
  contributionGrowthRate: z.number().min(0).max(100),
  taxRate: z.number().min(0).max(100),
  riskTolerance: z.enum(['low', 'medium', 'high']),
});

/**
 * 驗證投資者檔案
 */
export function validateInvestorProfile(data: unknown) {
  return investorProfileSchema.safeParse(data);
}

