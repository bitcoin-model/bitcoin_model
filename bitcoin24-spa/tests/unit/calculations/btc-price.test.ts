import { BTCPriceCalculator } from '@/lib/calculations/btc-price';
import { DEFAULT_BTC_ASSUMPTIONS } from '@/types/assumptions';

describe('BTCPriceCalculator', () => {
  let calculator: BTCPriceCalculator;

  beforeEach(() => {
    calculator = new BTCPriceCalculator(DEFAULT_BTC_ASSUMPTIONS);
  });

  describe('calculatePrices', () => {
    it('should calculate 21 years of prices', () => {
      const prices = calculator.calculatePrices(21);

      expect(prices).toHaveLength(21);
      expect(prices[0]).toBe(DEFAULT_BTC_ASSUMPTIONS.currentPrice);
    });

    it('should return increasing prices over time', () => {
      const prices = calculator.calculatePrices(21);

      // 最後一年的價格應該高於第一年
      expect(prices[20]).toBeGreaterThan(prices[0]);
    });

    it('should respect price floor', () => {
      const calculator = new BTCPriceCalculator({
        ...DEFAULT_BTC_ASSUMPTIONS,
        priceFloor: 40000,
        currentPrice: 30000, // 低於 floor
      });

      const prices = calculator.calculatePrices(21);

      prices.forEach((price) => {
        expect(price).toBeGreaterThanOrEqual(40000);
      });
    });

    it('should respect price ceiling', () => {
      const calculator = new BTCPriceCalculator({
        ...DEFAULT_BTC_ASSUMPTIONS,
        priceCeiling: 1000000,
      });

      const prices = calculator.calculatePrices(21);

      prices.forEach((price) => {
        expect(price).toBeLessThanOrEqual(1000000);
      });
    });
  });

  describe('getYearlyReturns', () => {
    it('should calculate yearly returns correctly', () => {
      const prices = [50000, 55000, 60000];
      const returns = calculator.getYearlyReturns(prices);

      expect(returns).toHaveLength(3);
      expect(returns[0]).toBe(0); // 第一年沒有報酬
      expect(returns[1]).toBeCloseTo(10, 1); // (55000-50000)/50000 * 100 = 10%
      expect(returns[2]).toBeCloseTo(9.09, 1); // (60000-55000)/55000 * 100 ≈ 9.09%
    });
  });

  describe('calculateVolatility', () => {
    it('should calculate volatility', () => {
      const prices = [50000, 55000, 48000, 60000];
      const volatility = calculator.calculateVolatility(prices);

      expect(volatility).toBeGreaterThan(0);
      expect(typeof volatility).toBe('number');
    });
  });

  describe('calculateS2FPrice', () => {
    it('should calculate S2F price', () => {
      const s2fRatio = 50;
      const price = calculator.calculateS2FPrice(s2fRatio);

      expect(price).toBeGreaterThan(0);
      expect(typeof price).toBe('number');
    });
  });
});

