import { renderHook, act } from '@testing-library/react';
import { useAssumptionsStore } from '@/lib/store/assumptions-store';
import { DEFAULT_MACRO_ASSUMPTIONS, DEFAULT_BTC_ASSUMPTIONS } from '@/types/assumptions';

describe('AssumptionsStore', () => {
  beforeEach(() => {
    // 重設 store
    useAssumptionsStore.getState().reset();
  });

  describe('initial state', () => {
    it('should have default macro assumptions', () => {
      const { result } = renderHook(() => useAssumptionsStore());
      expect(result.current.macro).toEqual(DEFAULT_MACRO_ASSUMPTIONS);
    });

    it('should have default BTC assumptions', () => {
      const { result } = renderHook(() => useAssumptionsStore());
      expect(result.current.btc).toEqual(DEFAULT_BTC_ASSUMPTIONS);
    });
  });

  describe('updateMacro', () => {
    it('should update macro assumptions', () => {
      const { result } = renderHook(() => useAssumptionsStore());

      act(() => {
        result.current.updateMacro({ inflationRate: 5 });
      });

      expect(result.current.macro.inflationRate).toBe(5);
    });

    it('should merge updates with existing state', () => {
      const { result } = renderHook(() => useAssumptionsStore());

      act(() => {
        result.current.updateMacro({ inflationRate: 5 });
      });

      expect(result.current.macro.stockMarketReturn).toBe(
        DEFAULT_MACRO_ASSUMPTIONS.stockMarketReturn
      );
    });
  });

  describe('updateBTC', () => {
    it('should update BTC assumptions', () => {
      const { result } = renderHook(() => useAssumptionsStore());

      act(() => {
        result.current.updateBTC({ currentPrice: 60000 });
      });

      expect(result.current.btc.currentPrice).toBe(60000);
    });
  });

  describe('setInvestorType', () => {
    it('should change investor type', () => {
      const { result } = renderHook(() => useAssumptionsStore());

      act(() => {
        result.current.setInvestorType('corporate');
      });

      expect(result.current.investor.type).toBe('corporate');
      expect(result.current.investor.initialCapital).toBe(10000000);
    });
  });

  describe('reset', () => {
    it('should reset all assumptions to defaults', () => {
      const { result } = renderHook(() => useAssumptionsStore());

      act(() => {
        result.current.updateMacro({ inflationRate: 10 });
        result.current.updateBTC({ currentPrice: 100000 });
        result.current.reset();
      });

      expect(result.current.macro).toEqual(DEFAULT_MACRO_ASSUMPTIONS);
      expect(result.current.btc).toEqual(DEFAULT_BTC_ASSUMPTIONS);
    });
  });
});

