/**
 * 投資策略名稱型別
 */
export type StrategyName = 'normie' | 'btc10' | 'btcMaxi' | 'doubleMaxi' | 'tripleMaxi';

/**
 * 資產配置型別
 */
export interface AssetAllocation {
  btc: number; // 比特幣配置 (%)
  stocks: number; // 股票配置 (%)
  bonds: number; // 債券配置 (%)
  realEstate: number; // 房地產配置 (%)
  cash: number; // 現金配置 (%)
}

/**
 * 再平衡頻率型別
 */
export type RebalanceFrequency = 'never' | 'monthly' | 'quarterly' | 'yearly';

/**
 * 投資策略配置型別
 */
export interface StrategyConfig {
  name: StrategyName;
  displayName: string;
  allocation: AssetAllocation;
  rebalanceFrequency: RebalanceFrequency;
  leverageMultiplier?: number; // 槓桿倍數（可選）
  description: string;
  color: string; // 圖表顏色
}

/**
 * 資產報酬型別
 */
export interface AssetReturns {
  btc: number;
  stocks: number;
  bonds: number;
  realEstate: number;
  cash: number;
}

/**
 * 預設投資策略配置
 */
export const STRATEGIES: Record<StrategyName, StrategyConfig> = {
  normie: {
    name: 'normie',
    displayName: 'Normie',
    allocation: { btc: 0, stocks: 60, bonds: 30, realEstate: 5, cash: 5 },
    rebalanceFrequency: 'yearly',
    description: '傳統 60/40 投資組合',
    color: '#8884d8',
  },
  btc10: {
    name: 'btc10',
    displayName: 'BTC 10%',
    allocation: { btc: 10, stocks: 50, bonds: 25, realEstate: 10, cash: 5 },
    rebalanceFrequency: 'yearly',
    description: '10% 比特幣配置',
    color: '#82ca9d',
  },
  btcMaxi: {
    name: 'btcMaxi',
    displayName: 'BTC Maxi',
    allocation: { btc: 80, stocks: 10, bonds: 0, realEstate: 5, cash: 5 },
    rebalanceFrequency: 'never',
    description: '比特幣最大化者',
    color: '#F7931A',
  },
  doubleMaxi: {
    name: 'doubleMaxi',
    displayName: 'Double Maxi',
    allocation: { btc: 100, stocks: 0, bonds: 0, realEstate: 0, cash: 0 },
    rebalanceFrequency: 'never',
    leverageMultiplier: 2,
    description: '2x 槓桿全押比特幣',
    color: '#FF6B00',
  },
  tripleMaxi: {
    name: 'tripleMaxi',
    displayName: 'Triple Maxi',
    allocation: { btc: 100, stocks: 0, bonds: 0, realEstate: 0, cash: 0 },
    rebalanceFrequency: 'never',
    leverageMultiplier: 3,
    description: '3x 槓桿全押比特幣',
    color: '#FF0000',
  },
};

/**
 * 獲取策略配置
 */
export function getStrategy(name: StrategyName): StrategyConfig {
  return STRATEGIES[name];
}

/**
 * 獲取所有策略名稱
 */
export function getAllStrategyNames(): StrategyName[] {
  return Object.keys(STRATEGIES) as StrategyName[];
}

/**
 * 驗證資產配置總和是否為 100%
 */
export function validateAllocation(allocation: AssetAllocation): boolean {
  const total = allocation.btc + allocation.stocks + allocation.bonds + 
                allocation.realEstate + allocation.cash;
  return Math.abs(total - 100) < 0.01; // 允許浮點數誤差
}

