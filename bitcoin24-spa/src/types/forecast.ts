import { MacroAssumptions, BTCAssumptions } from './assumptions';
import { InvestorProfile } from './investor';
import { StrategyName } from './strategy';

/**
 * 單年度資料型別
 */
export interface YearlyData {
  year: number;
  btcPrice: number;
  portfolioValue: number;
  btcHoldings: number; // BTC 持有數量
  btcValue: number; // BTC 價值
  stocksValue: number;
  bondsValue: number;
  realEstateValue: number;
  cashValue: number;
  totalContributions: number; // 累計投入
  grossReturns: number; // 總報酬
  netReturns: number; // 淨報酬（扣稅後）
  realReturns: number; // 實質報酬（扣除通膨）
}

/**
 * 投資組合價值明細
 */
export interface PortfolioValueBreakdown {
  total: number;
  btc: number;
  stocks: number;
  bonds: number;
  realEstate: number;
  cash: number;
}

/**
 * 績效指標型別
 */
export interface PerformanceMetrics {
  finalValue: number; // 最終價值
  totalReturn: number; // 總報酬率 (%)
  cagr: number; // 年化複合成長率 (%)
  maxDrawdown: number; // 最大回撤 (%)
  sharpeRatio: number; // 夏普比率
  volatility: number; // 波動率 (%)
  bestYear: { year: number; return: number };
  worstYear: { year: number; return: number };
}

/**
 * 單一策略結果型別
 */
export interface StrategyResult {
  strategy: StrategyName;
  yearlyData: YearlyData[];
  metrics: PerformanceMetrics;
}

/**
 * 完整預測結果型別
 */
export interface ForecastResult {
  timestamp: Date;
  assumptions: {
    macro: MacroAssumptions;
    btc: BTCAssumptions;
    investor: InvestorProfile;
  };
  strategies: StrategyResult[];
  btcPrices: number[]; // 21 年的 BTC 價格預測
}

/**
 * 策略比較資料型別
 */
export interface StrategyComparison {
  strategies: StrategyName[];
  years: number[];
  values: Record<StrategyName, number[]>;
}

/**
 * 匯出資料格式
 */
export interface ExportData {
  metadata: {
    exportDate: string;
    forecastPeriod: string;
    strategies: string[];
  };
  assumptions: {
    macro: MacroAssumptions;
    btc: BTCAssumptions;
    investor: InvestorProfile;
  };
  results: {
    strategy: string;
    finalValue: number;
    cagr: number;
    maxDrawdown: number;
    yearlyData: Array<{
      year: number;
      portfolioValue: number;
      btcPrice: number;
    }>;
  }[];
}

/**
 * 計算狀態型別
 */
export interface CalculationStatus {
  isCalculating: boolean;
  progress: number; // 0-100
  currentStep?: string;
  error?: string;
}

