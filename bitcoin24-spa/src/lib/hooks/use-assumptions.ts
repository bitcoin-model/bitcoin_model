import { useAssumptionsStore } from '@/lib/store';
import { MacroAssumptions, BTCAssumptions } from '@/types/assumptions';
import { InvestorProfile, InvestorType } from '@/types/investor';

/**
 * 假設條件 Hook
 */
export function useAssumptions() {
  const {
    macro,
    btc,
    investor,
    updateMacro,
    updateBTC,
    updateInvestor,
    setInvestorType,
    reset,
    resetMacro,
    resetBTC,
    resetInvestor,
  } = useAssumptionsStore();

  return {
    // 狀態
    macro,
    btc,
    investor,

    // 更新方法
    updateMacro: (updates: Partial<MacroAssumptions>) => updateMacro(updates),
    updateBTC: (updates: Partial<BTCAssumptions>) => updateBTC(updates),
    updateInvestor: (updates: Partial<InvestorProfile>) => updateInvestor(updates),
    setInvestorType: (type: InvestorType) => setInvestorType(type),

    // 重設方法
    reset,
    resetMacro,
    resetBTC,
    resetInvestor,
  };
}

