import { useUIStore } from '@/lib/store';
import { StrategyName } from '@/types/strategy';

/**
 * 策略選擇 Hook
 */
export function useStrategies() {
  const {
    selectedStrategies,
    toggleStrategy,
    setSelectedStrategies,
    selectAllStrategies,
    clearStrategies,
  } = useUIStore();

  return {
    selectedStrategies,
    isSelected: (strategy: StrategyName) => selectedStrategies.includes(strategy),
    toggleStrategy,
    setSelectedStrategies,
    selectAllStrategies,
    clearStrategies,
  };
}

