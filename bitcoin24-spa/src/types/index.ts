/**
 * 統一匯出所有型別定義
 */

// Assumptions
export type {
  MacroAssumptions,
  BTCAssumptions,
} from './assumptions';

export {
  DEFAULT_MACRO_ASSUMPTIONS,
  DEFAULT_BTC_ASSUMPTIONS,
} from './assumptions';

// Strategy
export type {
  StrategyName,
  AssetAllocation,
  RebalanceFrequency,
  StrategyConfig,
  AssetReturns,
} from './strategy';

export {
  STRATEGIES,
  getStrategy,
  getAllStrategyNames,
  validateAllocation,
} from './strategy';

// Investor
export type {
  InvestorType,
  RiskTolerance,
  InvestorProfile,
} from './investor';

export {
  DEFAULT_INVESTOR_PROFILES,
  getDefaultInvestorProfile,
  validateInvestorProfile,
} from './investor';

// Forecast
export type {
  YearlyData,
  PortfolioValueBreakdown,
  PerformanceMetrics,
  StrategyResult,
  ForecastResult,
  StrategyComparison,
  ExportData,
  CalculationStatus,
} from './forecast';

