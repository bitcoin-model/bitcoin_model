import { ForecastCalculator } from '@/lib/calculations/forecast';
import { DEFAULT_MACRO_ASSUMPTIONS, DEFAULT_BTC_ASSUMPTIONS } from '@/types/assumptions';
import { DEFAULT_INVESTOR_PROFILES } from '@/types/investor';

describe('ForecastCalculator', () => {
  let calculator: ForecastCalculator;

  beforeEach(() => {
    calculator = new ForecastCalculator(
      DEFAULT_MACRO_ASSUMPTIONS,
      DEFAULT_BTC_ASSUMPTIONS,
      DEFAULT_INVESTOR_PROFILES.individual
    );
  });

  describe('calculate', () => {
    it('should calculate forecast for all strategies', async () => {
      const result = await calculator.calculate();

      expect(result.strategies).toHaveLength(5);
      expect(result.btcPrices).toHaveLength(21);
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should calculate specific strategies only', async () => {
      const result = await calculator.calculate(['normie', 'btcMaxi']);

      expect(result.strategies).toHaveLength(2);
      expect(result.strategies[0].strategy).toBe('normie');
      expect(result.strategies[1].strategy).toBe('btcMaxi');
    });

    it('should have yearly data for each strategy', async () => {
      const result = await calculator.calculate(['btcMaxi']);

      expect(result.strategies[0].yearlyData).toHaveLength(21);
      expect(result.strategies[0].yearlyData[0].year).toBe(DEFAULT_MACRO_ASSUMPTIONS.startYear);
    });

    it('should include performance metrics', async () => {
      const result = await calculator.calculate(['btcMaxi']);
      const metrics = result.strategies[0].metrics;

      expect(metrics.finalValue).toBeGreaterThan(0);
      expect(metrics.cagr).toBeGreaterThan(0);
      expect(typeof metrics.maxDrawdown).toBe('number');
      expect(typeof metrics.sharpeRatio).toBe('number');
    });
  });

  describe('exportToCSV', () => {
    it('should export forecast to CSV format', async () => {
      const result = await calculator.calculate(['normie']);
      const csv = calculator.exportToCSV(result);

      expect(csv).toContain('Year,Strategy,Portfolio Value');
      expect(csv).toContain('normie');
    });
  });

  describe('exportToJSON', () => {
    it('should export forecast to JSON format', async () => {
      const result = await calculator.calculate(['normie']);
      const json = calculator.exportToJSON(result);
      const parsed = JSON.parse(json);

      expect(parsed.strategies).toBeDefined();
      expect(parsed.btcPrices).toBeDefined();
      expect(parsed.assumptions).toBeDefined();
    });
  });
});

