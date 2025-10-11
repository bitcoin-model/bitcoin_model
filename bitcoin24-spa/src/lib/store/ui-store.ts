import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StrategyName } from '@/types/strategy';

/**
 * UI 狀態管理
 */
interface UIState {
  // 選中的策略
  selectedStrategies: StrategyName[];

  // 主題模式
  theme: 'light' | 'dark' | 'system';

  // 側邊欄狀態
  sidebarOpen: boolean;

  // 語言（由 next-intl 管理，這裡只用於追蹤）
  locale: string;

  // 操作
  toggleStrategy: (strategy: StrategyName) => void;
  setSelectedStrategies: (strategies: StrategyName[]) => void;
  selectAllStrategies: () => void;
  clearStrategies: () => void;

  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setLocale: (locale: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // 初始狀態
      selectedStrategies: ['normie', 'btc10', 'btcMaxi'],
      theme: 'system',
      sidebarOpen: true,
      locale: 'zh-TW',

      // 切換單一策略
      toggleStrategy: (strategy) =>
        set((state) => {
          const selected = state.selectedStrategies;
          if (selected.includes(strategy)) {
            // 至少保留一個策略
            if (selected.length > 1) {
              return {
                selectedStrategies: selected.filter((s) => s !== strategy),
              };
            }
          } else {
            return {
              selectedStrategies: [...selected, strategy],
            };
          }
          return state;
        }),

      // 設置選中的策略
      setSelectedStrategies: (strategies) =>
        set({ selectedStrategies: strategies }),

      // 選擇所有策略
      selectAllStrategies: () =>
        set({
          selectedStrategies: [
            'normie',
            'btc10',
            'btcMaxi',
            'doubleMaxi',
            'tripleMaxi',
          ],
        }),

      // 清除所有策略（保留至少一個）
      clearStrategies: () =>
        set({ selectedStrategies: ['btcMaxi'] }),

      // 設置主題
      setTheme: (theme) => set({ theme }),

      // 切換側邊欄
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // 設置側邊欄狀態
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // 設置語言
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'bitcoin24-ui',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

