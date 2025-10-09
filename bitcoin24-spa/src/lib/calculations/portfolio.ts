import Decimal from 'decimal.js';
import {
  AssetAllocation,
  StrategyConfig,
  AssetReturns,
  RebalanceFrequency,
} from '@/types/strategy';
import { MacroAssumptions } from '@/types/assumptions';
import { InvestorProfile } from '@/types/investor';
import { PortfolioValueBreakdown } from '@/types/forecast';

/**
 * 投資組合計算引擎
 * 處理多資產配置、再平衡、稅務計算
 */
export class PortfolioCalculator {
  private macro: MacroAssumptions;
  private investor: InvestorProfile;

  constructor(macro: MacroAssumptions, investor: InvestorProfile) {
    this.macro = macro;
    this.investor = investor;
  }

  /**
   * 計算投資組合在特定年份的價值
   */
  calculateYearlyValue(
    previousValue: number,
    allocation: AssetAllocation,
    btcPrice: number,
    previousBtcPrice: number,
    btcHoldings: number,
    year: number,
    annualContribution: number,
    leverageMultiplier: number = 1
  ): PortfolioValueBreakdown & { btcHoldings: number } {
    // 計算各資產的年度報酬率
    const btcReturn =
      year === 0 || previousBtcPrice === 0
        ? 0
        : (btcPrice - previousBtcPrice) / previousBtcPrice;

    const stockReturn = this.macro.stockMarketReturn / 100;
    const bondReturn = this.macro.bondReturn / 100;
    const realEstateReturn = this.macro.realEstateReturn / 100;
    const cashReturn = this.macro.cashReturn / 100;

    // 使用 Decimal.js 進行精確計算
    let totalValue = new Decimal(previousValue);

    // 加入年度投入
    totalValue = totalValue.plus(annualContribution);

    // 計算各資產配置百分比
    const btcAlloc = new Decimal(allocation.btc).div(100);
    const stockAlloc = new Decimal(allocation.stocks).div(100);
    const bondAlloc = new Decimal(allocation.bonds).div(100);
    const realEstateAlloc = new Decimal(allocation.realEstate).div(100);
    const cashAlloc = new Decimal(allocation.cash).div(100);

    // 計算各資產價值（考慮報酬）
    const btcValue = totalValue
      .times(btcAlloc)
      .times(new Decimal(1).plus(btcReturn))
      .times(leverageMultiplier);

    const stocksValue = totalValue.times(stockAlloc).times(new Decimal(1).plus(stockReturn));

    const bondsValue = totalValue.times(bondAlloc).times(new Decimal(1).plus(bondReturn));

    const realEstateValue = totalValue
      .times(realEstateAlloc)
      .times(new Decimal(1).plus(realEstateReturn));

    const cashValue = totalValue.times(cashAlloc).times(new Decimal(1).plus(cashReturn));

    // 計算新的總價值
    const newTotalValue = btcValue
      .plus(stocksValue)
      .plus(bondsValue)
      .plus(realEstateValue)
      .plus(cashValue);

    // 計算 BTC 持有數量
    const newBtcHoldings = btcPrice > 0 ? btcValue.div(btcPrice).toNumber() : btcHoldings;

    return {
      total: newTotalValue.toNumber(),
      btc: btcValue.toNumber(),
      stocks: stocksValue.toNumber(),
      bonds: bondsValue.toNumber(),
      realEstate: realEstateValue.toNumber(),
      cash: cashValue.toNumber(),
      btcHoldings: newBtcHoldings,
    };
  }

  /**
   * 再平衡投資組合
   */
  rebalance(
    currentValues: PortfolioValueBreakdown,
    targetAllocation: AssetAllocation
  ): PortfolioValueBreakdown {
    const total = currentValues.total;

    return {
      total,
      btc: (total * targetAllocation.btc) / 100,
      stocks: (total * targetAllocation.stocks) / 100,
      bonds: (total * targetAllocation.bonds) / 100,
      realEstate: (total * targetAllocation.realEstate) / 100,
      cash: (total * targetAllocation.cash) / 100,
    };
  }

  /**
   * 判斷是否需要再平衡
   */
  shouldRebalance(year: number, frequency: RebalanceFrequency): boolean {
    if (frequency === 'never') return false;

    switch (frequency) {
      case 'monthly':
        return year % (1 / 12) === 0; // 每月
      case 'quarterly':
        return year % (1 / 4) === 0; // 每季
      case 'yearly':
        return year > 0; // 每年
      default:
        return false;
    }
  }

  /**
   * 計算稅後報酬
   */
  calculateAfterTaxReturn(grossReturn: number, holdingYears: number): number {
    const taxRate = this.investor.taxRate / 100;

    // 長期持有（超過 1 年）可能享有較低稅率
    const effectiveTaxRate = holdingYears >= 1 ? taxRate * 0.5 : taxRate;

    return grossReturn * (1 - effectiveTaxRate);
  }

  /**
   * 計算年度投入金額（含成長率）
   */
  calculateAnnualContribution(year: number): number {
    if (year === 0) return 0; // 第一年不追加投入

    const growthRate = this.investor.contributionGrowthRate / 100;
    return this.investor.annualContribution * Math.pow(1 + growthRate, year - 1);
  }

  /**
   * 計算累計投入金額
   */
  calculateTotalContributions(year: number): number {
    let total = this.investor.initialCapital;

    for (let y = 1; y <= year; y++) {
      total += this.calculateAnnualContribution(y);
    }

    return total;
  }

  /**
   * 計算實質報酬（扣除通膨）
   */
  calculateRealReturn(nominalReturn: number): number {
    const inflationRate = this.macro.inflationRate / 100;
    return ((1 + nominalReturn) / (1 + inflationRate) - 1) * 100;
  }

  /**
   * 計算夏普比率（風險調整後報酬）
   */
  calculateSharpeRatio(returns: number[], riskFreeRate: number): number {
    if (returns.length === 0) return 0;

    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;

    const variance =
      returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;

    const stdDev = Math.sqrt(variance);

    return stdDev === 0 ? 0 : (avgReturn - riskFreeRate) / stdDev;
  }

  /**
   * 計算最大回撤
   */
  calculateMaxDrawdown(portfolioValues: number[]): number {
    let maxDrawdown = 0;
    let peak = portfolioValues[0];

    for (const value of portfolioValues) {
      if (value > peak) {
        peak = value;
      }

      const drawdown = (peak - value) / peak;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    }

    return maxDrawdown * 100; // 轉為百分比
  }

  /**
   * 計算波動率（標準差）
   */
  calculateVolatility(returns: number[]): number {
    if (returns.length === 0) return 0;

    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;

    const variance =
      returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;

    return Math.sqrt(variance);
  }

  /**
   * 計算年化複合成長率 (CAGR)
   */
  calculateCAGR(initialValue: number, finalValue: number, years: number): number {
    if (initialValue <= 0 || years <= 0) return 0;
    return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
  }
}

