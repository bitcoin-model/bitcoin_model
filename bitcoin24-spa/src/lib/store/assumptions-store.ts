import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  MacroAssumptions,
  BTCAssumptions,
  DEFAULT_MACRO_ASSUMPTIONS,
  DEFAULT_BTC_ASSUMPTIONS,
} from '@/types/assumptions';
import { InvestorProfile, DEFAULT_INVESTOR_PROFILES, InvestorType } from '@/types/investor';

/**
 * 假設條件狀態管理
 */
interface AssumptionsState {
  // 狀態
  macro: MacroAssumptions;
  btc: BTCAssumptions;
  investor: InvestorProfile;

  // 操作
  updateMacro: (updates: Partial<MacroAssumptions>) => void;
  updateBTC: (updates: Partial<BTCAssumptions>) => void;
  updateInvestor: (updates: Partial<InvestorProfile>) => void;
  setInvestorType: (type: InvestorType) => void;
  reset: () => void;
  resetMacro: () => void;
  resetBTC: () => void;
  resetInvestor: () => void;
}

export const useAssumptionsStore = create<AssumptionsState>()(
  persist(
    immer((set) => ({
      // 初始狀態
      macro: DEFAULT_MACRO_ASSUMPTIONS,
      btc: DEFAULT_BTC_ASSUMPTIONS,
      investor: DEFAULT_INVESTOR_PROFILES.individual,

      // 更新宏觀假設
      updateMacro: (updates) =>
        set((state) => {
          Object.assign(state.macro, updates);
        }),

      // 更新比特幣假設
      updateBTC: (updates) =>
        set((state) => {
          Object.assign(state.btc, updates);
        }),

      // 更新投資者檔案
      updateInvestor: (updates) =>
        set((state) => {
          Object.assign(state.investor, updates);
        }),

      // 切換投資者類型
      setInvestorType: (type) =>
        set((state) => {
          state.investor = { ...DEFAULT_INVESTOR_PROFILES[type] };
        }),

      // 重設所有假設
      reset: () =>
        set({
          macro: DEFAULT_MACRO_ASSUMPTIONS,
          btc: DEFAULT_BTC_ASSUMPTIONS,
          investor: DEFAULT_INVESTOR_PROFILES.individual,
        }),

      // 重設宏觀假設
      resetMacro: () =>
        set((state) => {
          state.macro = DEFAULT_MACRO_ASSUMPTIONS;
        }),

      // 重設比特幣假設
      resetBTC: () =>
        set((state) => {
          state.btc = DEFAULT_BTC_ASSUMPTIONS;
        }),

      // 重設投資者檔案
      resetInvestor: () =>
        set((state) => {
          state.investor = DEFAULT_INVESTOR_PROFILES.individual;
        }),
    })),
    {
      name: 'bitcoin24-assumptions',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

