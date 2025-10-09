import { create } from 'zustand';
import { ForecastResult } from '@/types/forecast';
import { StrategyName } from '@/types/strategy';
import { ForecastCalculator } from '@/lib/calculations';
import { useAssumptionsStore } from './assumptions-store';

/**
 * 計算結果狀態管理
 */
interface ResultsState {
  // 狀態
  forecast: ForecastResult | null;
  isCalculating: boolean;
  progress: number; // 0-100
  error: string | null;
  lastCalculated: Date | null;

  // 操作
  calculate: (strategies?: StrategyName[]) => Promise<void>;
  clear: () => void;
  exportCSV: () => string | null;
  exportJSON: () => string | null;
}

export const useResultsStore = create<ResultsState>((set, get) => ({
  // 初始狀態
  forecast: null,
  isCalculating: false,
  progress: 0,
  error: null,
  lastCalculated: null,

  // 執行計算
  calculate: async (strategies) => {
    set({ isCalculating: true, progress: 0, error: null });

    try {
      // 從 assumptions store 獲取假設條件
      const { macro, btc, investor } = useAssumptionsStore.getState();

      // 創建計算器
      const calculator = new ForecastCalculator(macro, btc, investor);

      // 更新進度
      set({ progress: 25 });

      // 執行計算
      const forecast = await calculator.calculate(strategies);

      // 更新進度
      set({ progress: 100 });

      // 儲存結果
      set({
        forecast,
        isCalculating: false,
        progress: 100,
        lastCalculated: new Date(),
        error: null,
      });
    } catch (error) {
      console.error('Calculation error:', error);
      set({
        isCalculating: false,
        progress: 0,
        error: error instanceof Error ? error.message : '計算失敗',
      });
    }
  },

  // 清除結果
  clear: () =>
    set({
      forecast: null,
      error: null,
      progress: 0,
      lastCalculated: null,
    }),

  // 匯出 CSV
  exportCSV: () => {
    const { forecast } = get();
    if (!forecast) return null;

    const { macro, btc, investor } = forecast.assumptions;
    const calculator = new ForecastCalculator(macro, btc, investor);

    return calculator.exportToCSV(forecast);
  },

  // 匯出 JSON
  exportJSON: () => {
    const { forecast } = get();
    if (!forecast) return null;

    const { macro, btc, investor } = forecast.assumptions;
    const calculator = new ForecastCalculator(macro, btc, investor);

    return calculator.exportToJSON(forecast);
  },
}));

