/**
 * 宏觀經濟假設型別定義
 */
export interface MacroAssumptions {
  startYear: number;
  forecastYears: number;
  inflationRate: number; // 年通膨率 (%)
  stockMarketReturn: number; // 股市年報酬率 (%)
  bondReturn: number; // 債券年報酬率 (%)
  realEstateReturn: number; // 房地產年報酬率 (%)
  cashReturn: number; // 現金年報酬率 (%)
}

/**
 * 比特幣假設型別定義
 */
export interface BTCAssumptions {
  currentPrice: number;
  halvingYears: number[]; // 減半年份陣列
  adoptionCurve: 'linear' | 'exponential' | 's-curve';
  maxAdoptionRate: number; // 最大採用率 (%)
  institutionalAdoption: number; // 機構採用率 (%)
  retailAdoption: number; // 零售採用率 (%)
  priceFloor: number; // 價格下限
  priceCeiling: number; // 價格上限
  s2fMultiplier: number; // Stock-to-Flow 倍數
}

/**
 * 預設宏觀假設
 */
export const DEFAULT_MACRO_ASSUMPTIONS: MacroAssumptions = {
  startYear: new Date().getFullYear(),
  forecastYears: 21,
  inflationRate: 2.5,
  stockMarketReturn: 10,
  bondReturn: 4,
  realEstateReturn: 6,
  cashReturn: 0.5,
};

/**
 * 預設比特幣假設
 */
export const DEFAULT_BTC_ASSUMPTIONS: BTCAssumptions = {
  currentPrice: 50000,
  halvingYears: [2024, 2028, 2032, 2036, 2040, 2044],
  adoptionCurve: 's-curve',
  maxAdoptionRate: 10,
  institutionalAdoption: 5,
  retailAdoption: 3,
  priceFloor: 30000,
  priceCeiling: 10000000,
  s2fMultiplier: 0.4,
};

