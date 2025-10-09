import { BTCPriceCalculator } from './btc-price';
import { PortfolioCalculator } from './portfolio';
import { MacroAssumptions, BTCAssumptions } from '@/types/assumptions';
import { InvestorProfile } from '@/types/investor';
import { StrategyName, STRATEGIES } from '@/types/strategy';
import {
  ForecastResult,
  StrategyResult,
  YearlyData,
  PerformanceMetrics,
} from '@/types/forecast';

/**
 * 完整預測計算引擎
 * 整合 BTC 價格計算和投資組合計算
 */
export class ForecastCalculator {
  private macro: MacroAssumptions;
  private btc: BTCAssumptions;
  private investor: InvestorProfile;
  private btcCalculator: BTCPriceCalculator;
  private portfolioCalculator: PortfolioCalculator;

  constructor(
    macro: MacroAssumptions,
    btc: BTCAssumptions,
    investor: InvestorProfile
  ) {
    this.macro = macro;
    this.btc = btc;
    this.investor = investor;
    this.btcCalculator = new BTCPriceCalculator(btc);
    this.portfolioCalculator = new PortfolioCalculator(macro, investor);
  }

  /**
   * 執行完整預測計算
   */
  async calculate(strategies?: StrategyName[]): Promise<ForecastResult> {
    // 如果沒有指定策略，計算所有策略
    const strategyNames = strategies || Object.keys(STRATEGIES) as StrategyName[];

    // 計算 21 年的 BTC 價格
    const btcPrices = this.btcCalculator.calculatePrices(this.macro.forecastYears);

    // 計算每個策略的結果
    const strategyResults: StrategyResult[] = [];

    for (const strategyName of strategyNames) {
      const result = await this.calculateStrategy(strategyName, btcPrices);
      strategyResults.push(result);
    }

    return {
      timestamp: new Date(),
      assumptions: {
        macro: this.macro,
        btc: this.btc,
        investor: this.investor,
      },
      strategies: strategyResults,
      btcPrices,
    };
  }

  /**
   * 計算單一策略的結果
   */
  private async calculateStrategy(
    strategyName: StrategyName,
    btcPrices: number[]
  ): Promise<StrategyResult> {
    const strategy = STRATEGIES[strategyName];
    const yearlyData: YearlyData[] = [];

    let portfolioValue = this.investor.initialCapital;
    let btcHoldings = 0;
    let totalContributions = this.investor.initialCapital;

    // 逐年計算
    for (let year = 0; year < this.macro.forecastYears; year++) {
      const btcPrice = btcPrices[year];
      const previousBtcPrice = year > 0 ? btcPrices[year - 1] : btcPrice;

      // 計算年度投入
      const annualContribution =
        year === 0 ? 0 : this.portfolioCalculator.calculateAnnualContribution(year);

      // 計算投資組合價值
      const portfolioBreakdown = this.portfolioCalculator.calculateYearlyValue(
        portfolioValue,
        strategy.allocation,
        btcPrice,
        previousBtcPrice,
        btcHoldings,
        year,
        annualContribution,
        strategy.leverageMultiplier || 1
      );

      portfolioValue = portfolioBreakdown.total;
      btcHoldings = portfolioBreakdown.btcHoldings;
      totalContributions += annualContribution;

      // 計算報酬
      const grossReturns = portfolioValue - totalContributions;
      const netReturns = this.portfolioCalculator.calculateAfterTaxReturn(
        grossReturns,
        year
      );
      const realReturns = this.portfolioCalculator.calculateRealReturn(
        netReturns / totalContributions
      );

      yearlyData.push({
        year: this.macro.startYear + year,
        btcPrice,
        portfolioValue,
        btcHoldings,
        btcValue: portfolioBreakdown.btc,
        stocksValue: portfolioBreakdown.stocks,
        bondsValue: portfolioBreakdown.bonds,
        realEstateValue: portfolioBreakdown.realEstate,
        cashValue: portfolioBreakdown.cash,
        totalContributions,
        grossReturns,
        netReturns,
        realReturns,
      });
    }

    // 計算績效指標
    const metrics = this.calculateMetrics(yearlyData, totalContributions);

    return {
      strategy: strategyName,
      yearlyData,
      metrics,
    };
  }

  /**
   * 計算績效指標
   */
  private calculateMetrics(
    yearlyData: YearlyData[],
    totalContributions: number
  ): PerformanceMetrics {
    const portfolioValues = yearlyData.map((d) => d.portfolioValue);
    const finalValue = portfolioValues[portfolioValues.length - 1];

    // 計算年度報酬率
    const yearlyReturns: number[] = [0];
    for (let i = 1; i < portfolioValues.length; i++) {
      const returnRate =
        ((portfolioValues[i] - portfolioValues[i - 1]) / portfolioValues[i - 1]) * 100;
      yearlyReturns.push(returnRate);
    }

    // 總報酬率
    const totalReturn = ((finalValue - totalContributions) / totalContributions) * 100;

    // CAGR
    const cagr = this.portfolioCalculator.calculateCAGR(
      this.investor.initialCapital,
      finalValue,
      this.macro.forecastYears
    );

    // 最大回撤
    const maxDrawdown = this.portfolioCalculator.calculateMaxDrawdown(portfolioValues);

    // 夏普比率
    const riskFreeRate = this.macro.bondReturn;
    const sharpeRatio = this.portfolioCalculator.calculateSharpeRatio(
      yearlyReturns,
      riskFreeRate
    );

    // 波動率
    const volatility = this.portfolioCalculator.calculateVolatility(yearlyReturns);

    // 最佳/最差年度
    let bestYear = { year: this.macro.startYear, return: yearlyReturns[0] };
    let worstYear = { year: this.macro.startYear, return: yearlyReturns[0] };

    yearlyReturns.forEach((ret, index) => {
      const year = this.macro.startYear + index;
      if (ret > bestYear.return) {
        bestYear = { year, return: ret };
      }
      if (ret < worstYear.return) {
        worstYear = { year, return: ret };
      }
    });

    return {
      finalValue,
      totalReturn,
      cagr,
      maxDrawdown,
      sharpeRatio,
      volatility,
      bestYear,
      worstYear,
    };
  }

  /**
   * 匯出為 CSV 格式
   */
  exportToCSV(result: ForecastResult): string {
    const lines: string[] = [];

    // 標頭
    lines.push('Year,Strategy,Portfolio Value,BTC Price,BTC Holdings,Total Contributions');

    // 資料
    result.strategies.forEach((strategyResult) => {
      strategyResult.yearlyData.forEach((data) => {
        lines.push(
          [
            data.year,
            strategyResult.strategy,
            data.portfolioValue.toFixed(2),
            data.btcPrice.toFixed(2),
            data.btcHoldings.toFixed(8),
            data.totalContributions.toFixed(2),
          ].join(',')
        );
      });
    });

    return lines.join('\n');
  }

  /**
   * 匯出為 JSON 格式
   */
  exportToJSON(result: ForecastResult): string {
    return JSON.stringify(result, null, 2);
  }
}

