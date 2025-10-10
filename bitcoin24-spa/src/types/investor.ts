/**
 * 投資者類型
 */
export type InvestorType = 'individual' | 'corporate' | 'institution' | 'nation-state';

/**
 * 風險承受度
 */
export type RiskTolerance = 'low' | 'medium' | 'high';

/**
 * 投資者檔案型別
 */
export interface InvestorProfile {
  type: InvestorType;
  name: string;
  initialCapital: number; // 初始資本
  annualContribution: number; // 年度投入金額
  contributionGrowthRate: number; // 投入增長率 (%)
  taxRate: number; // 資本利得稅率 (%)
  riskTolerance: RiskTolerance;
}

/**
 * 預設投資者檔案
 */
export const DEFAULT_INVESTOR_PROFILES: Record<InvestorType, InvestorProfile> = {
  individual: {
    type: 'individual',
    name: '個人投資者',
    initialCapital: 100000,
    annualContribution: 12000,
    contributionGrowthRate: 3,
    taxRate: 20,
    riskTolerance: 'medium',
  },
  corporate: {
    type: 'corporate',
    name: '企業',
    initialCapital: 10000000,
    annualContribution: 1000000,
    contributionGrowthRate: 5,
    taxRate: 25,
    riskTolerance: 'medium',
  },
  institution: {
    type: 'institution',
    name: '機構',
    initialCapital: 100000000,
    annualContribution: 10000000,
    contributionGrowthRate: 7,
    taxRate: 15,
    riskTolerance: 'low',
  },
  'nation-state': {
    type: 'nation-state',
    name: '國家',
    initialCapital: 10000000000,
    annualContribution: 1000000000,
    contributionGrowthRate: 10,
    taxRate: 0,
    riskTolerance: 'medium',
  },
};

/**
 * 獲取投資者預設檔案
 */
export function getDefaultInvestorProfile(type: InvestorType): InvestorProfile {
  return { ...DEFAULT_INVESTOR_PROFILES[type] };
}

/**
 * 驗證投資者檔案
 */
export function validateInvestorProfile(profile: InvestorProfile): boolean {
  return (
    profile.initialCapital > 0 &&
    profile.annualContribution >= 0 &&
    profile.contributionGrowthRate >= 0 &&
    profile.taxRate >= 0 &&
    profile.taxRate <= 100
  );
}

