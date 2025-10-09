import { BTCAssumptions } from '@/types/assumptions';

/**
 * 比特幣價格計算引擎
 * 基於多種模型：S2F、採用曲線、減半週期、機構採用
 */
export class BTCPriceCalculator {
  private assumptions: BTCAssumptions;

  constructor(assumptions: BTCAssumptions) {
    this.assumptions = assumptions;
  }

  /**
   * 計算未來 N 年的比特幣價格
   */
  calculatePrices(years: number): number[] {
    const prices: number[] = [];

    for (let year = 0; year < years; year++) {
      const price = this.calculateYearPrice(year);
      prices.push(price);
    }

    return prices;
  }

  /**
   * 計算特定年份的比特幣價格
   */
  private calculateYearPrice(year: number): number {
    const basePrice = this.assumptions.currentPrice;
    const adoptionMultiplier = this.getAdoptionMultiplier(year);
    const halvingMultiplier = this.getHalvingMultiplier(year);
    const institutionalMultiplier = this.getInstitutionalMultiplier(year);

    let price =
      basePrice * adoptionMultiplier * halvingMultiplier * institutionalMultiplier;

    // 應用價格上下限
    price = Math.max(this.assumptions.priceFloor, price);
    price = Math.min(this.assumptions.priceCeiling, price);

    return Math.round(price);
  }

  /**
   * 採用曲線影響（S-curve, Linear, Exponential）
   */
  private getAdoptionMultiplier(year: number): number {
    const { adoptionCurve, maxAdoptionRate } = this.assumptions;
    const maxYears = 21;
    const t = year / maxYears; // 標準化時間 0-1

    let adoptionRate: number;

    switch (adoptionCurve) {
      case 'linear':
        // 線性增長
        adoptionRate = maxAdoptionRate * t;
        break;

      case 'exponential':
        // 指數增長
        adoptionRate = maxAdoptionRate * ((Math.exp(t * 2) - 1) / (Math.exp(2) - 1));
        break;

      case 's-curve':
      default:
        // Logistic S-curve (最常見的採用模式)
        const k = 10; // 曲線陡度
        adoptionRate = maxAdoptionRate / (1 + Math.exp(-k * (t - 0.5)));
        break;
    }

    // 將採用率轉換為價格倍數
    // 假設從 0% 到最大採用率，價格增長 20 倍
    const priceMultiplier = 1 + (adoptionRate / maxAdoptionRate) * 19;

    return priceMultiplier;
  }

  /**
   * 減半週期影響
   */
  private getHalvingMultiplier(year: number): number {
    const currentYear = new Date().getFullYear();
    const targetYear = currentYear + year;
    const { halvingYears } = this.assumptions;

    // 計算到目標年份為止經過了幾次減半
    const halvingsCount = halvingYears.filter((y) => y <= targetYear).length;

    // 每次減半後，供應增長率減半，歷史上價格約增長 2-3 倍
    // 使用保守估計 2.5 倍
    const multiplierPerHalving = 2.5;

    return Math.pow(multiplierPerHalving, halvingsCount);
  }

  /**
   * 機構採用影響
   */
  private getInstitutionalMultiplier(year: number): number {
    const { institutionalAdoption, retailAdoption } = this.assumptions;
    const maxYears = 21;
    const progress = year / maxYears;

    // 機構採用逐年增加
    const currentInstitutional = institutionalAdoption * progress;
    const currentRetail = retailAdoption * progress;

    // 機構買入力度是散戶的 10 倍（因為資金量大）
    const institutionalWeight = 10;
    const totalAdoption = currentRetail + currentInstitutional * institutionalWeight;

    // 轉換為價格倍數
    return 1 + totalAdoption / 100;
  }

  /**
   * Stock-to-Flow 模型計算
   * @param stockToFlowRatio S2F 比率
   */
  calculateS2FPrice(stockToFlowRatio: number): number {
    // S2F 模型: ln(price) = a * ln(SF) + b
    // 基於 PlanB 的研究，a ≈ 3.0, b ≈ -1.5
    const a = 3.0 + this.assumptions.s2fMultiplier;
    const b = -1.5;

    const lnPrice = a * Math.log(stockToFlowRatio) + b;
    return Math.exp(lnPrice);
  }

  /**
   * 計算特定年份的 Stock-to-Flow 比率
   */
  private calculateS2FRatio(year: number): number {
    // BTC 總供應量接近 21M
    const maxSupply = 21000000;

    // 計算當年的年度新增供應（考慮減半）
    const halvingsCount = this.getHalvingCount(year);
    const initialBlockReward = 50;
    const currentBlockReward = initialBlockReward / Math.pow(2, halvingsCount);
    const blocksPerYear = 365.25 * 24 * 6; // 每 10 分鐘一個區塊
    const annualFlow = currentBlockReward * blocksPerYear;

    // 當前總供應（Stock）
    const currentStock = maxSupply * 0.9; // 約 90% 已被挖出

    // S2F = Stock / Flow
    return annualFlow > 0 ? currentStock / annualFlow : Infinity;
  }

  /**
   * 計算到特定年份經過的減半次數
   */
  private getHalvingCount(year: number): number {
    const currentYear = new Date().getFullYear();
    const targetYear = currentYear + year;
    return this.assumptions.halvingYears.filter((y) => y <= targetYear).length;
  }

  /**
   * 獲取年度價格變化率
   */
  getYearlyReturns(prices: number[]): number[] {
    const returns: number[] = [0]; // 第一年沒有報酬率

    for (let i = 1; i < prices.length; i++) {
      const returnRate = ((prices[i] - prices[i - 1]) / prices[i - 1]) * 100;
      returns.push(returnRate);
    }

    return returns;
  }

  /**
   * 計算價格波動率
   */
  calculateVolatility(prices: number[]): number {
    const returns = this.getYearlyReturns(prices);
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;

    const variance =
      returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;

    return Math.sqrt(variance);
  }
}

