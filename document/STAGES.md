# Bitcoin24 SPA 開發 Stages（詳細步驟）| Development Stages (Detailed Steps)

## 🗂️ Stage 架構總覽 | Stage Architecture Overview

### 繁體中文
每個 **Phase（階段）** 包含多個 **Stage（步驟）**，每個 Stage 都是一個可執行的具體任務。

### English
Each **Phase** contains multiple **Stages**, where each Stage is a specific executable task.

---

# PHASE 1: 需求分析與架構設計 | Requirements Analysis & Architecture Design

## Stage 1.1: Excel 模型分析 | Excel Model Analysis
**負責人 | Owner**: 產品經理 + 技術主管 | Product Manager + Tech Lead  
**時程 | Duration**: 1 天 | 1 Day

### 任務
1. 開啟 `Bitcoin24 v1.0.xlsm`
2. 識別所有工作表（sheets）
3. 記錄每個工作表的用途：
   - Intro
   - BTC
   - Macro
   - Individual
   - Corporate
   - Institution
   - Nation State
   - United States
4. 分析每個策略的計算邏輯：
   - Normie
   - BTC 10%
   - BTC Maxi
   - Double Maxi
   - Triple Maxi

### 交付物
- [ ] Excel 模型結構文件
- [ ] 計算公式清單
- [ ] 輸入參數列表
- [ ] 輸出結果列表

---

## Stage 1.2: 資料模型設計
**負責人**: 後端工程師  
**時程**: 1 天

### 任務
1. 定義 TypeScript 介面：
   - `MacroAssumptions`
   - `BTCAssumptions`
   - `InvestorProfile`
   - `StrategyConfig`
   - `ForecastResult`
2. 設計資料流：
   ```
   User Input → Assumptions Store → Calculator → Results Store → UI
   ```
3. 定義預設值與驗證規則

### 交付物
- [ ] `src/types/` 目錄中的所有型別定義
- [ ] 資料流程圖
- [ ] Zod schema 驗證規則

---

## Stage 1.3: UI/UX 設計
**負責人**: UI/UX 設計師  
**時程**: 2 天

### 任務
1. 設計 8 個頁面的 Wireframe
2. 定義配色方案（以 Bitcoin Orange #F7931A 為主色）
3. 設計響應式斷點：
   - Mobile: < 640px
   - Tablet: 640px - 1024px
   - Desktop: > 1024px
4. 設計圖表樣式
5. 設計表單 UI

### 交付物
- [ ] Figma 設計檔
- [ ] 設計系統（Design System）
- [ ] 組件庫規範

---

## Stage 1.4: 技術架構設計
**負責人**: 技術主管  
**時程**: 1 天

### 任務
1. 確認技術棧：
   - ✅ Next.js 14
   - ✅ TypeScript
   - ✅ Tailwind CSS
   - ✅ Zustand
   - ✅ Recharts
2. 定義資料夾結構
3. 設計狀態管理架構
4. 規劃部署策略

### 交付物
- [ ] 技術架構文件
- [ ] 專案資料夾結構
- [ ] 依賴清單

---

# PHASE 2: 專案初始化

## Stage 2.1: 建立 Next.js 專案
**負責人**: 前端工程師  
**時程**: 0.5 天

### 步驟
```bash
# 1. 建立專案
npx create-next-app@latest bitcoin24-spa \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd bitcoin24-spa

# 2. 初始化 Git
git init
git add .
git commit -m "Initial commit: Next.js project setup"

# 3. 建立遠端 Repository
gh repo create bitcoin24-spa --public
git remote add origin https://github.com/YOUR_USERNAME/bitcoin24-spa.git
git push -u origin main
```

### 驗證
- [ ] `npm run dev` 正常啟動
- [ ] TypeScript 編譯無錯誤
- [ ] Tailwind CSS 正常運作

---

## Stage 2.2: 安裝 UI 組件庫
**負責人**: 前端工程師  
**時程**: 0.5 天

### 步驟
```bash
# 1. 安裝 shadcn/ui
npx shadcn-ui@latest init

# 選擇：
# - Style: Default
# - Color: Slate
# - CSS variables: Yes

# 2. 安裝常用組件
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add tooltip
```

### 自訂主題
編輯 `tailwind.config.ts`：
```typescript
theme: {
  extend: {
    colors: {
      bitcoin: {
        50: '#FFF5E6',
        100: '#FFE8CC',
        200: '#FFD199',
        300: '#FFBA66',
        400: '#FFA333',
        500: '#F7931A',  // 主色
        600: '#E07800',
        700: '#B36000',
        800: '#804400',
        900: '#4D2900',
      },
    },
  },
}
```

### 驗證
- [ ] 所有組件正常導入
- [ ] 主題色正確應用

---

## Stage 2.3: 安裝核心依賴
**負責人**: 前端工程師  
**時程**: 0.5 天

### 步驟
```bash
# 圖表庫
npm install recharts
npm install @types/recharts -D

# 狀態管理
npm install zustand immer

# 表單處理
npm install react-hook-form zod @hookform/resolvers

# i18n
npm install next-intl

# 工具庫
npm install date-fns
npm install clsx tailwind-merge

# 數學計算
npm install mathjs
npm install decimal.js
npm install @types/mathjs -D
```

### 驗證
- [ ] `package.json` 包含所有依賴
- [ ] `npm install` 無錯誤

---

## Stage 2.4: 配置開發環境
**負責人**: 前端工程師  
**時程**: 0.5 天

### 配置檔案

#### `next.config.js`
```javascript
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com'],
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = withNextIntl(nextConfig);
```

#### `.env.local`
```env
NEXT_PUBLIC_APP_NAME=Bitcoin24
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### `.eslintrc.json`
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

#### `.prettierrc`
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### 驗證
- [ ] ESLint 正常運作
- [ ] Prettier 格式化正常

---

## Stage 2.5: 建立專案結構
**負責人**: 前端工程師  
**時程**: 0.5 天

### 步驟
```bash
# 建立資料夾結構
mkdir -p src/{components,lib,types,i18n}
mkdir -p src/components/{ui,charts,forms,layout,shared}
mkdir -p src/lib/{calculations,store,hooks,utils,constants}
mkdir -p src/i18n/locales
mkdir -p tests/{unit,integration,e2e}
mkdir -p public/images
```

### 建立基礎檔案
```bash
# 型別定義
touch src/types/{assumptions,strategy,investor,forecast,index}.ts

# Store
touch src/lib/store/{assumptions-store,results-store,ui-store}.ts

# 計算引擎
touch src/lib/calculations/{btc-price,portfolio,compound,returns}.ts

# i18n
touch src/i18n/{config,request}.ts
touch src/i18n/locales/{zh-TW,zh-CN,en,ja}.json
```

### 驗證
- [ ] 資料夾結構正確
- [ ] 路徑別名可正常使用

---

# PHASE 3: 資料層開發

## Stage 3.1: 定義 TypeScript 型別
**負責人**: 前端工程師  
**時程**: 1 天

### `src/types/assumptions.ts`
```typescript
export interface MacroAssumptions {
  startYear: number;
  forecastYears: number;
  inflationRate: number; // 年通膨率 (%)
  stockMarketReturn: number; // 股市報酬率 (%)
  bondReturn: number; // 債券報酬率 (%)
  realEstateReturn: number; // 房地產報酬率 (%)
  cashReturn: number; // 現金報酬率 (%)
}

export interface BTCAssumptions {
  currentPrice: number;
  halvingYears: number[]; // 減半年份
  adoptionCurve: 'linear' | 'exponential' | 's-curve';
  maxAdoptionRate: number; // 最大採用率 (%)
  institutionalAdoption: number; // 機構採用率 (%)
  retailAdoption: number; // 零售採用率 (%)
  priceFloor: number; // 價格下限
  priceCeiling: number; // 價格上限
}

export const DEFAULT_MACRO_ASSUMPTIONS: MacroAssumptions = {
  startYear: new Date().getFullYear(),
  forecastYears: 21,
  inflationRate: 2.5,
  stockMarketReturn: 10,
  bondReturn: 4,
  realEstateReturn: 6,
  cashReturn: 0.5,
};

export const DEFAULT_BTC_ASSUMPTIONS: BTCAssumptions = {
  currentPrice: 50000,
  halvingYears: [2024, 2028, 2032, 2036, 2040],
  adoptionCurve: 's-curve',
  maxAdoptionRate: 10,
  institutionalAdoption: 5,
  retailAdoption: 3,
  priceFloor: 30000,
  priceCeiling: 10000000,
};
```

### `src/types/strategy.ts`
```typescript
export type StrategyName = 'normie' | 'btc10' | 'btcMaxi' | 'doubleMaxi' | 'tripleMaxi';

export interface AssetAllocation {
  btc: number;
  stocks: number;
  bonds: number;
  realEstate: number;
  cash: number;
}

export interface StrategyConfig {
  name: string;
  displayName: string;
  allocation: AssetAllocation;
  rebalanceFrequency: 'never' | 'monthly' | 'quarterly' | 'yearly';
  leverageMultiplier?: number;
  description: string;
  color: string; // 圖表顏色
}

export const STRATEGIES: Record<StrategyName, StrategyConfig> = {
  normie: {
    name: 'normie',
    displayName: 'Normie',
    allocation: { btc: 0, stocks: 60, bonds: 30, realEstate: 5, cash: 5 },
    rebalanceFrequency: 'yearly',
    description: '傳統 60/40 投資組合',
    color: '#8884d8',
  },
  btc10: {
    name: 'btc10',
    displayName: 'BTC 10%',
    allocation: { btc: 10, stocks: 50, bonds: 25, realEstate: 10, cash: 5 },
    rebalanceFrequency: 'yearly',
    description: '10% 比特幣配置',
    color: '#82ca9d',
  },
  btcMaxi: {
    name: 'btcMaxi',
    displayName: 'BTC Maxi',
    allocation: { btc: 80, stocks: 10, bonds: 0, realEstate: 5, cash: 5 },
    rebalanceFrequency: 'never',
    description: '比特幣最大化者',
    color: '#F7931A',
  },
  doubleMaxi: {
    name: 'doubleMaxi',
    displayName: 'Double Maxi',
    allocation: { btc: 100, stocks: 0, bonds: 0, realEstate: 0, cash: 0 },
    rebalanceFrequency: 'never',
    leverageMultiplier: 2,
    description: '2x 槓桿全押比特幣',
    color: '#FF6B00',
  },
  tripleMaxi: {
    name: 'tripleMaxi',
    displayName: 'Triple Maxi',
    allocation: { btc: 100, stocks: 0, bonds: 0, realEstate: 0, cash: 0 },
    rebalanceFrequency: 'never',
    leverageMultiplier: 3,
    description: '3x 槓桿全押比特幣',
    color: '#FF0000',
  },
};
```

### `src/types/investor.ts`
```typescript
export type InvestorType = 'individual' | 'corporate' | 'institution' | 'nation-state';

export interface InvestorProfile {
  type: InvestorType;
  name: string;
  initialCapital: number;
  annualContribution: number;
  contributionGrowthRate: number; // 年增長率 (%)
  taxRate: number; // 資本利得稅率 (%)
  riskTolerance: 'low' | 'medium' | 'high';
}

export const DEFAULT_INVESTOR_PROFILES: Record<InvestorType, InvestorProfile> = {
  individual: {
    type: 'individual',
    name: '個人投資者',
    initialCapital: 100000,
    annualContribution: 12000,
    contributionGrowthRate: 3,
    taxRate: 20,
    riskTolerance: 'medium',
  },
  corporate: {
    type: 'corporate',
    name: '企業',
    initialCapital: 10000000,
    annualContribution: 1000000,
    contributionGrowthRate: 5,
    taxRate: 25,
    riskTolerance: 'medium',
  },
  institution: {
    type: 'institution',
    name: '機構',
    initialCapital: 100000000,
    annualContribution: 10000000,
    contributionGrowthRate: 7,
    taxRate: 15,
    riskTolerance: 'low',
  },
  'nation-state': {
    type: 'nation-state',
    name: '國家',
    initialCapital: 10000000000,
    annualContribution: 1000000000,
    contributionGrowthRate: 10,
    taxRate: 0,
    riskTolerance: 'medium',
  },
};
```

### `src/types/forecast.ts`
```typescript
export interface YearlyData {
  year: number;
  btcPrice: number;
  portfolioValue: number;
  btcHoldings: number;
  stocksValue: number;
  bondsValue: number;
  realEstateValue: number;
  cashValue: number;
  totalContributions: number;
  totalReturns: number;
  realReturns: number; // 扣除通膨
}

export interface StrategyResult {
  strategy: StrategyName;
  yearlyData: YearlyData[];
  finalValue: number;
  totalReturn: number;
  cagr: number; // 年化成長率
  maxDrawdown: number;
  sharpeRatio: number;
  volatility: number;
}

export interface ForecastResult {
  timestamp: Date;
  assumptions: {
    macro: MacroAssumptions;
    btc: BTCAssumptions;
    investor: InvestorProfile;
  };
  strategies: StrategyResult[];
}
```

### 驗證
- [ ] 所有型別定義完成
- [ ] 無 TypeScript 錯誤
- [ ] 導出正確

---

## Stage 3.2: 實現比特幣價格計算引擎
**負責人**: 前端工程師  
**時程**: 2-3 天

### `src/lib/calculations/btc-price.ts`
```typescript
import { create, all, MathJsStatic } from 'mathjs';
import { BTCAssumptions } from '@/types/assumptions';

const math: MathJsStatic = create(all);

export class BTCPriceCalculator {
  private assumptions: BTCAssumptions;

  constructor(assumptions: BTCAssumptions) {
    this.assumptions = assumptions;
  }

  /**
   * 計算未來 N 年的 BTC 價格
   */
  calculatePrices(years: number): number[] {
    const prices: number[] = [];
    
    for (let year = 0; year < years; year++) {
      const price = this.calculateYearPrice(year);
      prices.push(price);
    }
    
    return prices;
  }

  /**
   * 計算特定年份的 BTC 價格
   */
  private calculateYearPrice(year: number): number {
    const basePrice = this.assumptions.currentPrice;
    const adoptionMultiplier = this.getAdoptionMultiplier(year);
    const halvingMultiplier = this.getHalvingMultiplier(year);
    const institutionalMultiplier = this.getInstitutionalMultiplier(year);
    
    let price = basePrice * adoptionMultiplier * halvingMultiplier * institutionalMultiplier;
    
    // 應用價格上下限
    price = Math.max(this.assumptions.priceFloor, price);
    price = Math.min(this.assumptions.priceCeiling, price);
    
    return Math.round(price);
  }

  /**
   * S 曲線採用率影響
   */
  private getAdoptionMultiplier(year: number): number {
    const { adoptionCurve, maxAdoptionRate } = this.assumptions;
    const maxYears = 21;
    const t = year / maxYears;
    
    let adoptionRate: number;
    
    switch (adoptionCurve) {
      case 'linear':
        adoptionRate = maxAdoptionRate * t;
        break;
      
      case 'exponential':
        adoptionRate = maxAdoptionRate * (Math.exp(t * 2) - 1) / (Math.exp(2) - 1);
        break;
      
      case 's-curve':
      default:
        // Logistic S-curve
        const k = 10; // 曲線陡度
        adoptionRate = maxAdoptionRate / (1 + Math.exp(-k * (t - 0.5)));
        break;
    }
    
    // 價格 = f(採用率)
    // 假設採用率從 0% 到 10%，價格增長 20 倍
    const priceMultiplier = 1 + (adoptionRate / maxAdoptionRate) * 19;
    
    return priceMultiplier;
  }

  /**
   * 減半週期影響
   */
  private getHalvingMultiplier(year: number): number {
    const currentYear = new Date().getFullYear();
    const targetYear = currentYear + year;
    const { halvingYears } = this.assumptions;
    
    // 計算到目標年份為止經過了幾次減半
    const halvingsCount = halvingYears.filter(y => y <= targetYear).length;
    
    // 每次減半假設價格增長 2-3 倍（歷史平均）
    const multiplierPerHalving = 2.5;
    
    return Math.pow(multiplierPerHalving, halvingsCount);
  }

  /**
   * 機構採用影響
   */
  private getInstitutionalMultiplier(year: number): number {
    const { institutionalAdoption, retailAdoption } = this.assumptions;
    const maxYears = 21;
    const progress = year / maxYears;
    
    // 機構採用逐年增加
    const currentInstitutional = institutionalAdoption * progress;
    const currentRetail = retailAdoption * progress;
    
    // 機構買入力度是散戶的 10 倍
    const institutionalWeight = 10;
    const totalAdoption = currentRetail + (currentInstitutional * institutionalWeight);
    
    // 轉換為價格倍數
    return 1 + (totalAdoption / 100);
  }

  /**
   * Stock-to-Flow 模型（可選）
   */
  calculateS2FPrice(stockToFlowRatio: number): number {
    // S2F 模型: Price = exp(a * ln(SF) + b)
    const a = 3.0; // 係數
    const b = -1.5; // 常數
    
    return Math.exp(a * Math.log(stockToFlowRatio) + b);
  }
}
```

### 單元測試: `tests/unit/calculations/btc-price.test.ts`
```typescript
import { BTCPriceCalculator } from '@/lib/calculations/btc-price';
import { DEFAULT_BTC_ASSUMPTIONS } from '@/types/assumptions';

describe('BTCPriceCalculator', () => {
  it('should calculate prices for 21 years', () => {
    const calculator = new BTCPriceCalculator(DEFAULT_BTC_ASSUMPTIONS);
    const prices = calculator.calculatePrices(21);
    
    expect(prices).toHaveLength(21);
    expect(prices[0]).toBe(DEFAULT_BTC_ASSUMPTIONS.currentPrice);
    expect(prices[20]).toBeGreaterThan(prices[0]);
  });

  it('should respect price floor and ceiling', () => {
    const calculator = new BTCPriceCalculator({
      ...DEFAULT_BTC_ASSUMPTIONS,
      priceFloor: 40000,
      priceCeiling: 1000000,
    });
    
    const prices = calculator.calculatePrices(21);
    
    prices.forEach(price => {
      expect(price).toBeGreaterThanOrEqual(40000);
      expect(price).toBeLessThanOrEqual(1000000);
    });
  });

  it('should apply halving effect', () => {
    // 測試減半影響
  });

  it('should apply adoption curve', () => {
    // 測試採用曲線
  });
});
```

### 驗證
- [ ] 價格計算邏輯正確
- [ ] 所有測試通過
- [ ] 符合 S2F 模型趨勢

---

## Stage 3.3: 實現投資組合計算引擎
**負責人**: 前端工程師  
**時程**: 2-3 天

### `src/lib/calculations/portfolio.ts`
```typescript
import { AssetAllocation, StrategyConfig } from '@/types/strategy';
import { MacroAssumptions } from '@/types/assumptions';
import { InvestorProfile } from '@/types/investor';
import Decimal from 'decimal.js';

export class PortfolioCalculator {
  private macro: MacroAssumptions;
  private investor: InvestorProfile;

  constructor(macro: MacroAssumptions, investor: InvestorProfile) {
    this.macro = macro;
    this.investor = investor;
  }

  /**
   * 計算投資組合在特定年份的價值
   */
  calculatePortfolioValue(
    allocation: AssetAllocation,
    btcPrices: number[],
    year: number,
    previousValue: number
  ): {
    totalValue: number;
    btcValue: number;
    stocksValue: number;
    bondsValue: number;
    realEstateValue: number;
    cashValue: number;
  } {
    // 使用 Decimal.js 進行精確計算
    let totalValue = new Decimal(previousValue);
    
    // 計算各資產的報酬
    const btcReturn = year === 0 ? 0 : (btcPrices[year] - btcPrices[year - 1]) / btcPrices[year - 1];
    const stockReturn = this.macro.stockMarketReturn / 100;
    const bondReturn = this.macro.bondReturn / 100;
    const realEstateReturn = this.macro.realEstateReturn / 100;
    const cashReturn = this.macro.cashReturn / 100;
    
    // 計算各資產價值
    const btcAlloc = allocation.btc / 100;
    const stockAlloc = allocation.stocks / 100;
    const bondAlloc = allocation.bonds / 100;
    const realEstateAlloc = allocation.realEstate / 100;
    const cashAlloc = allocation.cash / 100;
    
    const btcValue = totalValue.times(btcAlloc).times(1 + btcReturn);
    const stocksValue = totalValue.times(stockAlloc).times(1 + stockReturn);
    const bondsValue = totalValue.times(bondAlloc).times(1 + bondReturn);
    const realEstateValue = totalValue.times(realEstateAlloc).times(1 + realEstateReturn);
    const cashValue = totalValue.times(cashAlloc).times(1 + cashReturn);
    
    const newTotalValue = btcValue.plus(stocksValue).plus(bondsValue).plus(realEstateValue).plus(cashValue);
    
    return {
      totalValue: newTotalValue.toNumber(),
      btcValue: btcValue.toNumber(),
      stocksValue: stocksValue.toNumber(),
      bondsValue: bondsValue.toNumber(),
      realEstateValue: realEstateValue.toNumber(),
      cashValue: cashValue.toNumber(),
    };
  }

  /**
   * 再平衡投資組合
   */
  rebalance(
    currentValues: {
      btc: number;
      stocks: number;
      bonds: number;
      realEstate: number;
      cash: number;
    },
    targetAllocation: AssetAllocation
  ): {
    btc: number;
    stocks: number;
    bonds: number;
    realEstate: number;
    cash: number;
  } {
    const total = currentValues.btc + currentValues.stocks + currentValues.bonds + 
                  currentValues.realEstate + currentValues.cash;
    
    return {
      btc: total * (targetAllocation.btc / 100),
      stocks: total * (targetAllocation.stocks / 100),
      bonds: total * (targetAllocation.bonds / 100),
      realEstate: total * (targetAllocation.realEstate / 100),
      cash: total * (targetAllocation.cash / 100),
    };
  }

  /**
   * 計算稅後報酬
   */
  calculateAfterTaxReturn(grossReturn: number, holdingYears: number): number {
    const taxRate = this.investor.taxRate / 100;
    
    // 長期持有可能有稅務優惠
    const effectiveTaxRate = holdingYears >= 1 ? taxRate * 0.5 : taxRate;
    
    return grossReturn * (1 - effectiveTaxRate);
  }

  /**
   * 計算夏普比率（風險調整後報酬）
   */
  calculateSharpeRatio(returns: number[], riskFreeRate: number): number {
    const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    const stdDev = Math.sqrt(variance);
    
    return stdDev === 0 ? 0 : (avgReturn - riskFreeRate) / stdDev;
  }

  /**
   * 計算最大回撤
   */
  calculateMaxDrawdown(portfolioValues: number[]): number {
    let maxDrawdown = 0;
    let peak = portfolioValues[0];
    
    for (const value of portfolioValues) {
      if (value > peak) {
        peak = value;
      }
      
      const drawdown = (peak - value) / peak;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    }
    
    return maxDrawdown * 100; // 轉為百分比
  }
}
```

### 驗證
- [ ] 投資組合計算正確
- [ ] 再平衡邏輯正確
- [ ] 測試通過

---

## Stage 3.4: 實現狀態管理
**負責人**: 前端工程師  
**時程**: 1-2 天

### `src/lib/store/assumptions-store.ts`
```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { 
  MacroAssumptions, 
  BTCAssumptions, 
  DEFAULT_MACRO_ASSUMPTIONS, 
  DEFAULT_BTC_ASSUMPTIONS 
} from '@/types/assumptions';
import { InvestorProfile, DEFAULT_INVESTOR_PROFILES } from '@/types/investor';

interface AssumptionsState {
  macro: MacroAssumptions;
  btc: BTCAssumptions;
  investor: InvestorProfile;
  
  updateMacro: (updates: Partial<MacroAssumptions>) => void;
  updateBTC: (updates: Partial<BTCAssumptions>) => void;
  updateInvestor: (updates: Partial<InvestorProfile>) => void;
  setInvestorType: (type: InvestorProfile['type']) => void;
  reset: () => void;
}

export const useAssumptionsStore = create<AssumptionsState>()(
  persist(
    immer((set) => ({
      macro: DEFAULT_MACRO_ASSUMPTIONS,
      btc: DEFAULT_BTC_ASSUMPTIONS,
      investor: DEFAULT_INVESTOR_PROFILES.individual,
      
      updateMacro: (updates) =>
        set((state) => {
          Object.assign(state.macro, updates);
        }),
      
      updateBTC: (updates) =>
        set((state) => {
          Object.assign(state.btc, updates);
        }),
      
      updateInvestor: (updates) =>
        set((state) => {
          Object.assign(state.investor, updates);
        }),
      
      setInvestorType: (type) =>
        set((state) => {
          state.investor = DEFAULT_INVESTOR_PROFILES[type];
        }),
      
      reset: () =>
        set({
          macro: DEFAULT_MACRO_ASSUMPTIONS,
          btc: DEFAULT_BTC_ASSUMPTIONS,
          investor: DEFAULT_INVESTOR_PROFILES.individual,
        }),
    })),
    {
      name: 'bitcoin24-assumptions',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### `src/lib/store/results-store.ts`
```typescript
import { create } from 'zustand';
import { ForecastResult } from '@/types/forecast';
import { ForecastCalculator } from '@/lib/calculations/forecast';
import { useAssumptionsStore } from './assumptions-store';

interface ResultsState {
  forecast: ForecastResult | null;
  isCalculating: boolean;
  error: string | null;
  lastCalculated: Date | null;
  
  calculate: () => Promise<void>;
  clear: () => void;
}

export const useResultsStore = create<ResultsState>((set, get) => ({
  forecast: null,
  isCalculating: false,
  error: null,
  lastCalculated: null,
  
  calculate: async () => {
    set({ isCalculating: true, error: null });
    
    try {
      const assumptions = useAssumptionsStore.getState();
      const calculator = new ForecastCalculator(
        assumptions.macro,
        assumptions.btc,
        assumptions.investor
      );
      
      const forecast = await calculator.calculate();
      
      set({
        forecast,
        isCalculating: false,
        lastCalculated: new Date(),
      });
    } catch (error) {
      set({
        isCalculating: false,
        error: error instanceof Error ? error.message : 'Calculation failed',
      });
    }
  },
  
  clear: () => set({ forecast: null, error: null, lastCalculated: null }),
}));
```

### 驗證
- [ ] Store 正常運作
- [ ] 資料持久化正確
- [ ] 狀態更新無誤

---

繼續完成剩餘 Stages...

（由於篇幅限制，這裡提供了前 3 個 Phase 的詳細 Stages。其他 Phases 4-8 的 Stages 會遵循類似的詳細程度，包含具體的程式碼、步驟和驗證項目。）

---

**總計**: 約 **80+ 個 Stages**  
**預估時程**: **50-73 工作天**

