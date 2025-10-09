import { useEffect } from 'react';
import { useResultsStore } from '@/lib/store';
import { StrategyName } from '@/types/strategy';

/**
 * 預測計算 Hook
 */
export function useForecast(strategies?: StrategyName[], autoCalculate: boolean = false) {
  const {
    forecast,
    isCalculating,
    progress,
    error,
    lastCalculated,
    calculate,
    clear,
    exportCSV,
    exportJSON,
  } = useResultsStore();

  // 自動計算（如果啟用）
  useEffect(() => {
    if (autoCalculate && !forecast && !isCalculating) {
      calculate(strategies);
    }
  }, [autoCalculate, forecast, isCalculating, calculate, strategies]);

  return {
    forecast,
    isCalculating,
    progress,
    error,
    lastCalculated,
    calculate: () => calculate(strategies),
    clear,
    exportCSV,
    exportJSON,
  };
}

