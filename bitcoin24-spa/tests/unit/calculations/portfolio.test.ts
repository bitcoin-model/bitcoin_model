import { PortfolioCalculator } from '@/lib/calculations/portfolio';
import { DEFAULT_MACRO_ASSUMPTIONS } from '@/types/assumptions';
import { DEFAULT_INVESTOR_PROFILES } from '@/types/investor';
import { STRATEGIES } from '@/types/strategy';

describe('PortfolioCalculator', () => {
  let calculator: PortfolioCalculator;

  beforeEach(() => {
    calculator = new PortfolioCalculator(
      DEFAULT_MACRO_ASSUMPTIONS,
      DEFAULT_INVESTOR_PROFILES.individual
    );
  });

  describe('calculateYearlyValue', () => {
    it('should calculate portfolio value correctly', () => {
      const result = calculator.calculateYearlyValue(
        100000, // previous value
        STRATEGIES.normie.allocation,
        50000, // btc price
        45000, // previous btc price
        0, // btc holdings
        1, // year
        12000, // annual contribution
        1 // leverage
      );

      expect(result.total).toBeGreaterThan(0);
      expect(result.btc).toBeGreaterThanOrEqual(0);
      expect(result.stocks).toBeGreaterThanOrEqual(0);
    });

    it('should apply leverage correctly', () => {
      const normal = calculator.calculateYearlyValue(
        100000,
        STRATEGIES.btcMaxi.allocation,
        50000,
        45000,
        0,
        1,
        0,
        1 // no leverage
      );

      const leveraged = calculator.calculateYearlyValue(
        100000,
        STRATEGIES.doubleMaxi.allocation,
        50000,
        45000,
        0,
        1,
        0,
        2 // 2x leverage
      );

      // 槓桿組合的 BTC 價值應該約為 2 倍
      expect(leveraged.btc).toBeGreaterThan(normal.btc);
    });
  });

  describe('calculateCAGR', () => {
    it('should calculate CAGR correctly', () => {
      const cagr = calculator.calculateCAGR(100000, 200000, 10);

      // 10 年翻倍的 CAGR 約為 7.18%
      expect(cagr).toBeCloseTo(7.18, 1);
    });

    it('should return 0 for invalid inputs', () => {
      expect(calculator.calculateCAGR(0, 100000, 10)).toBe(0);
      expect(calculator.calculateCAGR(100000, 200000, 0)).toBe(0);
    });
  });

  describe('calculateMaxDrawdown', () => {
    it('should calculate maximum drawdown', () => {
      const values = [100000, 120000, 90000, 110000, 85000];
      const maxDrawdown = calculator.calculateMaxDrawdown(values);

      // 從 120000 跌到 85000，回撤約 29.17%
      expect(maxDrawdown).toBeCloseTo(29.17, 1);
    });

    it('should return 0 for always increasing portfolio', () => {
      const values = [100000, 110000, 120000, 130000];
      const maxDrawdown = calculator.calculateMaxDrawdown(values);

      expect(maxDrawdown).toBe(0);
    });
  });

  describe('calculateSharpeRatio', () => {
    it('should calculate Sharpe ratio', () => {
      const returns = [10, 15, -5, 20, 12];
      const riskFreeRate = 2;

      const sharpeRatio = calculator.calculateSharpeRatio(returns, riskFreeRate);

      expect(typeof sharpeRatio).toBe('number');
      expect(sharpeRatio).toBeGreaterThan(0);
    });
  });

  describe('calculateAnnualContribution', () => {
    it('should calculate growing contributions', () => {
      const year1 = calculator.calculateAnnualContribution(1);
      const year2 = calculator.calculateAnnualContribution(2);

      expect(year1).toBe(DEFAULT_INVESTOR_PROFILES.individual.annualContribution);
      expect(year2).toBeGreaterThan(year1);
    });

    it('should return 0 for year 0', () => {
      expect(calculator.calculateAnnualContribution(0)).toBe(0);
    });
  });

  describe('calculateRealReturn', () => {
    it('should adjust for inflation', () => {
      const nominalReturn = 0.10; // 10%
      const realReturn = calculator.calculateRealReturn(nominalReturn);

      // 扣除 2.5% 通膨後，實質報酬約為 7.3%
      expect(realReturn).toBeLessThan(10);
      expect(realReturn).toBeGreaterThan(0);
    });
  });
});

