# Bitcoin24 Next.js SPA 開發計劃 | Development Plan

## 專案概述 | Project Overview

### 繁體中文
將 Bitcoin24 Excel 模型轉換為現代化的 Next.js SPA，提供互動式 21 年比特幣投資策略模擬工具。

### English
Transform the Bitcoin24 Excel model into a modern Next.js SPA, providing an interactive 21-year Bitcoin investment strategy simulation tool.

## 技術棧 | Tech Stack

- **前端框架 | Frontend Framework**: Next.js 14 (App Router)
- **語言 | Language**: TypeScript
- **樣式 | Styling**: Tailwind CSS + shadcn/ui
- **圖表 | Charts**: Recharts / Chart.js
- **狀態管理 | State Management**: Zustand / React Context
- **i18n | Internationalization**: next-intl
- **表單驗證 | Form Validation**: Zod + React Hook Form
- **測試 | Testing**: Jest + React Testing Library + Playwright
- **部署 | Deployment**: Vercel

---

## 第一階段：需求分析與架構設計 | Phase 1: Requirements Analysis & Architecture Design

### 1.1 核心功能分析 | Core Features Analysis

#### 繁體中文
基於 README.md 和 Excel 模型，系統需要包含：

#### English
Based on README.md and Excel model, the system needs to include:

#### 8 個主要模型頁面 | 8 Main Model Pages
1. **Intro** - 介紹頁面 | Introduction Page
2. **BTC** - 比特幣基礎數據與假設 | Bitcoin Fundamentals & Assumptions
3. **Macro** - 宏觀經濟假設 | Macroeconomic Assumptions
4. **Individual** - 個人投資策略 | Individual Investment Strategy
5. **Corporate** - 企業投資策略 | Corporate Investment Strategy
6. **Institution** - 機構投資策略 | Institutional Investment Strategy
7. **Nation State** - 國家級投資策略 | Nation-State Investment Strategy
8. **United States** - 美國特定場景 | United States Specific Scenario

#### 5 種投資策略對比 | 5 Investment Strategy Comparisons
- **Normie** - 傳統投資 | Traditional Investment
- **BTC 10%** - 10% 配置比特幣 | 10% Bitcoin Allocation
- **BTC Maxi** - 比特幣最大化 | Bitcoin Maximalist
- **Double Maxi** - 雙倍配置 | Double Maximalist (2x Leverage)
- **Triple Maxi** - 三倍配置 | Triple Maximalist (3x Leverage)

### 1.2 資料模型設計

```typescript
// 宏觀假設
interface MacroAssumptions {
  startYear: number;
  inflationRate: number;
  stockMarketReturn: number;
  bondReturn: number;
  realEstateReturn: number;
  btcAdoptionRate: number;
  btcVolatilityDecline: boolean;
}

// 比特幣假設
interface BTCAssumptions {
  currentPrice: number;
  halvingCycle: number;
  supplyLimit: number;
  adoptionCurve: 'linear' | 'exponential' | 's-curve';
  institutionalAdoption: number;
  retailAdoption: number;
}

// 策略配置
interface StrategyConfig {
  name: string;
  btcAllocation: number; // 比特幣配置百分比
  stockAllocation: number;
  bondAllocation: number;
  realEstateAllocation: number;
  cashAllocation: number;
  rebalanceFrequency: 'monthly' | 'quarterly' | 'yearly' | 'never';
}

// 投資者檔案
interface InvestorProfile {
  type: 'individual' | 'corporate' | 'institution' | 'nation-state';
  initialCapital: number;
  annualContribution: number;
  taxRate: number;
  riskTolerance: 'low' | 'medium' | 'high';
}

// 預測結果
interface ForecastResult {
  years: number[];
  portfolioValues: {
    normie: number[];
    btc10: number[];
    btcMaxi: number[];
    doubleMaxi: number[];
    tripleMaxi: number[];
  };
  btcPrices: number[];
  realReturns: number[];
  nominalReturns: number[];
}
```

### 1.3 架構設計

```
bitcoin24-spa/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # i18n 路由
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx       # 首頁/Intro
│   │   │   ├── btc/
│   │   │   ├── macro/
│   │   │   ├── individual/
│   │   │   ├── corporate/
│   │   │   ├── institution/
│   │   │   ├── nation-state/
│   │   │   └── united-states/
│   │   └── api/               # API Routes
│   ├── components/
│   │   ├── ui/                # shadcn/ui 組件
│   │   ├── charts/            # 圖表組件
│   │   ├── forms/             # 表單組件
│   │   ├── layout/            # 佈局組件
│   │   └── shared/            # 共用組件
│   ├── lib/
│   │   ├── calculations/      # 計算引擎
│   │   │   ├── btc-price.ts
│   │   │   ├── portfolio.ts
│   │   │   ├── returns.ts
│   │   │   └── compound.ts
│   │   ├── store/             # Zustand stores
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # 工具函數
│   │   └── constants/         # 常數定義
│   ├── types/                 # TypeScript 型別
│   ├── i18n/                  # 國際化配置
│   │   ├── locales/
│   │   │   ├── zh-TW.json
│   │   │   ├── zh-CN.json
│   │   │   ├── en.json
│   │   │   └── ja.json
│   │   └── config.ts
│   └── styles/
├── public/
├── tests/
└── docs/
```

---

## 第二階段：專案初始化

### 2.1 建立 Next.js 專案
```bash
npx create-next-app@latest bitcoin24-spa --typescript --tailwind --app --src-dir
cd bitcoin24-spa
```

### 2.2 安裝核心依賴
```bash
# UI 組件庫
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input label select tabs slider

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
npm install date-fns clsx tailwind-merge

# 數學計算
npm install mathjs decimal.js

# 測試
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
```

### 2.3 配置檔案

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
};

module.exports = withNextIntl(nextConfig);
```

#### `tailwind.config.ts`
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bitcoin: {
          orange: '#F7931A',
          dark: '#FF9500',
          light: '#FFB74D',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
```

#### `tsconfig.json` 路徑別名
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

---

## 第三階段：資料層開發

### 3.1 計算引擎核心

#### `src/lib/calculations/btc-price.ts`
```typescript
/**
 * 比特幣價格預測模型
 * 基於減半週期、採用率、供需模型
 */
export class BTCPriceCalculator {
  // S2F (Stock-to-Flow) 模型
  calculateS2FPrice(stockToFlow: number): number;
  
  // 指數增長模型
  calculateExponentialGrowth(
    currentPrice: number,
    years: number,
    adoptionRate: number
  ): number[];
  
  // 週期性減半影響
  applyHalvingEffect(basePrice: number, yearsSinceHalving: number): number;
  
  // 機構採用影響
  applyInstitutionalAdoption(
    basePrice: number,
    adoptionPercentage: number
  ): number;
}
```

#### `src/lib/calculations/portfolio.ts`
```typescript
/**
 * 投資組合計算引擎
 */
export class PortfolioCalculator {
  // 計算多資產投資組合價值
  calculatePortfolioValue(
    allocations: AssetAllocation,
    assetReturns: AssetReturns,
    years: number
  ): number[];
  
  // 再平衡策略
  rebalancePortfolio(
    currentAllocations: AssetAllocation,
    targetAllocations: AssetAllocation,
    frequency: RebalanceFrequency
  ): AssetAllocation;
  
  // 稅後報酬計算
  calculateAfterTaxReturn(
    grossReturn: number,
    taxRate: number,
    holdingPeriod: number
  ): number;
  
  // 風險調整後報酬
  calculateSharpeRatio(
    returns: number[],
    riskFreeRate: number
  ): number;
}
```

#### `src/lib/calculations/strategies.ts`
```typescript
/**
 * 5 種投資策略定義
 */
export const STRATEGIES: Record<StrategyName, StrategyConfig> = {
  normie: {
    name: 'Normie',
    btcAllocation: 0,
    stockAllocation: 0.6,
    bondAllocation: 0.3,
    realEstateAllocation: 0.05,
    cashAllocation: 0.05,
  },
  btc10: {
    name: 'BTC 10%',
    btcAllocation: 0.1,
    stockAllocation: 0.5,
    bondAllocation: 0.25,
    realEstateAllocation: 0.1,
    cashAllocation: 0.05,
  },
  btcMaxi: {
    name: 'BTC Maxi',
    btcAllocation: 0.8,
    stockAllocation: 0.1,
    bondAllocation: 0,
    realEstateAllocation: 0.05,
    cashAllocation: 0.05,
  },
  doubleMaxi: {
    name: 'Double Maxi',
    btcAllocation: 1.0,
    stockAllocation: 0,
    bondAllocation: 0,
    realEstateAllocation: 0,
    cashAllocation: 0,
    leverageMultiplier: 2,
  },
  tripleMaxi: {
    name: 'Triple Maxi',
    btcAllocation: 1.0,
    stockAllocation: 0,
    bondAllocation: 0,
    realEstateAllocation: 0,
    cashAllocation: 0,
    leverageMultiplier: 3,
  },
};
```

### 3.2 狀態管理

#### `src/lib/store/assumptions-store.ts`
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AssumptionsState {
  macro: MacroAssumptions;
  btc: BTCAssumptions;
  investor: InvestorProfile;
  
  updateMacro: (updates: Partial<MacroAssumptions>) => void;
  updateBTC: (updates: Partial<BTCAssumptions>) => void;
  updateInvestor: (updates: Partial<InvestorProfile>) => void;
  reset: () => void;
}

export const useAssumptionsStore = create<AssumptionsState>()(
  persist(
    (set) => ({
      // 初始值
      macro: DEFAULT_MACRO_ASSUMPTIONS,
      btc: DEFAULT_BTC_ASSUMPTIONS,
      investor: DEFAULT_INVESTOR_PROFILE,
      
      // 更新方法
      updateMacro: (updates) =>
        set((state) => ({
          macro: { ...state.macro, ...updates },
        })),
      
      updateBTC: (updates) =>
        set((state) => ({
          btc: { ...state.btc, ...updates },
        })),
      
      updateInvestor: (updates) =>
        set((state) => ({
          investor: { ...state.investor, ...updates },
        })),
      
      reset: () =>
        set({
          macro: DEFAULT_MACRO_ASSUMPTIONS,
          btc: DEFAULT_BTC_ASSUMPTIONS,
          investor: DEFAULT_INVESTOR_PROFILE,
        }),
    }),
    {
      name: 'bitcoin24-assumptions',
    }
  )
);
```

#### `src/lib/store/results-store.ts`
```typescript
interface ResultsState {
  forecast: ForecastResult | null;
  isCalculating: boolean;
  lastCalculated: Date | null;
  
  calculate: (
    assumptions: AllAssumptions,
    strategies: StrategyName[]
  ) => Promise<void>;
  
  exportData: (format: 'json' | 'csv') => void;
}

export const useResultsStore = create<ResultsState>((set, get) => ({
  forecast: null,
  isCalculating: false,
  lastCalculated: null,
  
  calculate: async (assumptions, strategies) => {
    set({ isCalculating: true });
    
    try {
      const calculator = new ForecastCalculator(assumptions);
      const forecast = await calculator.run(strategies);
      
      set({
        forecast,
        isCalculating: false,
        lastCalculated: new Date(),
      });
    } catch (error) {
      console.error('Calculation error:', error);
      set({ isCalculating: false });
    }
  },
  
  exportData: (format) => {
    const { forecast } = get();
    if (!forecast) return;
    
    if (format === 'json') {
      downloadJSON(forecast);
    } else {
      downloadCSV(forecast);
    }
  },
}));
```

---

## 第四階段：UI 組件開發

### 4.1 圖表組件

#### `src/components/charts/PortfolioComparisonChart.tsx`
```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  data: ForecastResult;
  strategies: StrategyName[];
}

export function PortfolioComparisonChart({ data, strategies }: Props) {
  const chartData = data.years.map((year, index) => ({
    year,
    normie: data.portfolioValues.normie[index],
    btc10: data.portfolioValues.btc10[index],
    btcMaxi: data.portfolioValues.btcMaxi[index],
    doubleMaxi: data.portfolioValues.doubleMaxi[index],
    tripleMaxi: data.portfolioValues.tripleMaxi[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
        {strategies.includes('normie') && (
          <Line type="monotone" dataKey="normie" stroke="#8884d8" />
        )}
        {strategies.includes('btc10') && (
          <Line type="monotone" dataKey="btc10" stroke="#82ca9d" />
        )}
        {strategies.includes('btcMaxi') && (
          <Line type="monotone" dataKey="btcMaxi" stroke="#F7931A" strokeWidth={2} />
        )}
        {strategies.includes('doubleMaxi') && (
          <Line type="monotone" dataKey="doubleMaxi" stroke="#FF6B00" />
        )}
        {strategies.includes('tripleMaxi') && (
          <Line type="monotone" dataKey="tripleMaxi" stroke="#FF0000" />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
```

#### `src/components/charts/BTCPriceChart.tsx`
```typescript
export function BTCPriceChart({ data }: { data: ForecastResult }) {
  // 比特幣價格預測圖表（對數尺度）
}
```

#### `src/components/charts/AllocationPieChart.tsx`
```typescript
export function AllocationPieChart({ strategy }: { strategy: StrategyConfig }) {
  // 資產配置餅圖
}
```

### 4.2 輸入表單組件

#### `src/components/forms/MacroAssumptionsForm.tsx`
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { macroAssumptionsSchema } from '@/lib/schemas';

export function MacroAssumptionsForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(macroAssumptionsSchema),
  });

  const onSubmit = (data: MacroAssumptions) => {
    useAssumptionsStore.getState().updateMacro(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="inflationRate">通膨率 (%)</Label>
        <Input
          id="inflationRate"
          type="number"
          step="0.1"
          {...register('inflationRate', { valueAsNumber: true })}
        />
        {errors.inflationRate && (
          <p className="text-sm text-red-500">{errors.inflationRate.message}</p>
        )}
      </div>
      
      {/* 其他欄位... */}
      
      <Button type="submit">更新假設</Button>
    </form>
  );
}
```

#### `src/components/forms/InvestorProfileForm.tsx`
```typescript
export function InvestorProfileForm() {
  // 投資者檔案輸入表單
}
```

### 4.3 佈局組件

#### `src/components/layout/Navigation.tsx`
```typescript
export function Navigation() {
  const t = useTranslations('navigation');
  
  const navItems = [
    { href: '/intro', label: t('intro') },
    { href: '/btc', label: t('btc') },
    { href: '/macro', label: t('macro') },
    { href: '/individual', label: t('individual') },
    { href: '/corporate', label: t('corporate') },
    { href: '/institution', label: t('institution') },
    { href: '/nation-state', label: t('nationState') },
    { href: '/united-states', label: t('unitedStates') },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-bitcoin-orange"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
```

---

## 第五階段：核心功能實現

### 5.1 頁面結構

#### `src/app/[locale]/page.tsx` (Intro)
```typescript
export default function IntroPage() {
  const t = useTranslations('intro');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
        Bitcoin24 <Image src="/bitcoin.png" alt="Bitcoin" width={40} height={40} />
      </h1>
      <p className="text-xl mb-8">{t('tagline')}</p>
      
      {/* 策略對比表格 */}
      <StrategyComparisonTable />
      
      {/* 說明內容 */}
      <div className="prose max-w-none">
        <p>{t('description')}</p>
      </div>
      
      {/* 視頻連結 */}
      <VideoGallery />
      
      {/* 原始貢獻者 */}
      <ContributorsSection />
      
      {/* Satoshi 引言 */}
      <QuoteSection />
      
      {/* 免責聲明 */}
      <DisclaimerSection />
    </div>
  );
}
```

#### `src/app/[locale]/btc/page.tsx`
```typescript
export default function BTCPage() {
  const assumptions = useAssumptionsStore((state) => state.btc);
  const updateBTC = useAssumptionsStore((state) => state.updateBTC);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">比特幣假設</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側：輸入表單 */}
        <Card>
          <CardHeader>
            <CardTitle>基礎參數</CardTitle>
          </CardHeader>
          <CardContent>
            <BTCAssumptionsForm />
          </CardContent>
        </Card>
        
        {/* 右側：預覽圖表 */}
        <Card>
          <CardHeader>
            <CardTitle>價格預測預覽</CardTitle>
          </CardHeader>
          <CardContent>
            <BTCPricePreviewChart assumptions={assumptions} />
          </CardContent>
        </Card>
      </div>
      
      {/* 說明卡片 */}
      <InfoCards />
    </div>
  );
}
```

#### `src/app/[locale]/macro/page.tsx`
```typescript
export default function MacroPage() {
  // 宏觀經濟假設頁面
}
```

#### `src/app/[locale]/individual/page.tsx`
```typescript
export default function IndividualPage() {
  const [selectedStrategies, setSelectedStrategies] = useState<StrategyName[]>([
    'normie',
    'btc10',
    'btcMaxi',
  ]);
  
  const results = useResultsStore((state) => state.forecast);
  const calculate = useResultsStore((state) => state.calculate);
  
  useEffect(() => {
    const assumptions = useAssumptionsStore.getState();
    calculate(assumptions, selectedStrategies);
  }, [selectedStrategies]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">個人投資策略</h1>
      
      {/* 投資者檔案輸入 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>您的投資檔案</CardTitle>
        </CardHeader>
        <CardContent>
          <InvestorProfileForm type="individual" />
        </CardContent>
      </Card>
      
      {/* 策略選擇器 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>選擇要對比的策略</CardTitle>
        </CardHeader>
        <CardContent>
          <StrategySelector
            selected={selectedStrategies}
            onChange={setSelectedStrategies}
          />
        </CardContent>
      </Card>
      
      {/* 結果圖表 */}
      {results && (
        <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>21 年投資組合價值對比</CardTitle>
            </CardHeader>
            <CardContent>
              <PortfolioComparisonChart
                data={results}
                strategies={selectedStrategies}
              />
            </CardContent>
          </Card>
          
          {/* 詳細數據表格 */}
          <Card>
            <CardHeader>
              <CardTitle>詳細數據</CardTitle>
              <div className="flex gap-2">
                <Button onClick={() => exportData('csv')}>匯出 CSV</Button>
                <Button onClick={() => exportData('json')}>匯出 JSON</Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResultsTable data={results} strategies={selectedStrategies} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
```

#### `src/app/[locale]/corporate/page.tsx`
```typescript
export default function CorporatePage() {
  // 企業投資策略頁面（類似 Individual，但有不同的預設值和稅率）
}
```

#### `src/app/[locale]/institution/page.tsx`
```typescript
export default function InstitutionPage() {
  // 機構投資策略頁面
}
```

#### `src/app/[locale]/nation-state/page.tsx`
```typescript
export default function NationStatePage() {
  // 國家級投資策略頁面
}
```

#### `src/app/[locale]/united-states/page.tsx`
```typescript
export default function UnitedStatesPage() {
  // 美國特定場景頁面
}
```

---

## 第六階段：國際化實現

### 6.1 i18n 配置

#### `src/i18n/config.ts`
```typescript
export const locales = ['zh-TW', 'zh-CN', 'en', 'ja'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh-TW';

export const localeNames: Record<Locale, string> = {
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
  'en': 'English',
  'ja': '日本語',
};
```

#### `src/i18n/request.ts`
```typescript
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./locales/${locale}.json`)).default,
}));
```

### 6.2 翻譯文件結構

#### `src/i18n/locales/zh-TW.json`
```json
{
  "navigation": {
    "intro": "介紹",
    "btc": "比特幣",
    "macro": "宏觀",
    "individual": "個人",
    "corporate": "企業",
    "institution": "機構",
    "nationState": "國家",
    "unitedStates": "美國"
  },
  "intro": {
    "tagline": "幫助您推動比特幣採用",
    "description": "Bitcoin24 旨在模擬針對個人、企業、機構和國家的各種比特幣策略的 21 年結果...",
    "contributors": "原始貢獻者",
    "disclaimer": "免責聲明"
  },
  "strategies": {
    "normie": "傳統投資",
    "btc10": "BTC 10%",
    "btcMaxi": "BTC 最大化",
    "doubleMaxi": "雙倍最大化",
    "tripleMaxi": "三倍最大化"
  },
  "forms": {
    "inflationRate": "通膨率",
    "stockReturn": "股市報酬率",
    "bondReturn": "債券報酬率",
    "initialCapital": "初始資本",
    "annualContribution": "年度投入",
    "taxRate": "稅率",
    "submit": "更新",
    "reset": "重設"
  },
  "charts": {
    "portfolioValue": "投資組合價值",
    "btcPrice": "比特幣價格",
    "returns": "報酬率",
    "year": "年份"
  }
}
```

#### `src/i18n/locales/en.json`
```json
{
  "navigation": {
    "intro": "Intro",
    "btc": "BTC",
    "macro": "Macro",
    "individual": "Individual",
    "corporate": "Corporate",
    "institution": "Institution",
    "nationState": "Nation State",
    "unitedStates": "United States"
  },
  "intro": {
    "tagline": "Helping you drive Bitcoin adoption",
    "description": "Bitcoin24 is designed to simulate 21-year outcomes...",
    "contributors": "Original Contributors",
    "disclaimer": "Disclaimer"
  }
}
```

### 6.3 語言切換器

#### `src/components/LanguageSwitcher.tsx`
```typescript
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames } from '@/i18n/config';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <Select value={locale} onValueChange={switchLocale}>
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {localeNames[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

---

## 第七階段：測試與優化

### 7.1 單元測試

#### `tests/unit/calculations/btc-price.test.ts`
```typescript
import { BTCPriceCalculator } from '@/lib/calculations/btc-price';

describe('BTCPriceCalculator', () => {
  it('should calculate exponential growth correctly', () => {
    const calculator = new BTCPriceCalculator();
    const result = calculator.calculateExponentialGrowth(50000, 5, 0.1);
    
    expect(result).toHaveLength(5);
    expect(result[4]).toBeGreaterThan(result[0]);
  });
  
  it('should apply halving effect', () => {
    const calculator = new BTCPriceCalculator();
    const basePrice = 50000;
    const priceAfterHalving = calculator.applyHalvingEffect(basePrice, 1);
    
    expect(priceAfterHalving).toBeGreaterThan(basePrice);
  });
});
```

#### `tests/unit/calculations/portfolio.test.ts`
```typescript
import { PortfolioCalculator } from '@/lib/calculations/portfolio';

describe('PortfolioCalculator', () => {
  it('should calculate portfolio value over time', () => {
    // 測試投資組合價值計算
  });
  
  it('should rebalance portfolio correctly', () => {
    // 測試再平衡邏輯
  });
});
```

### 7.2 E2E 測試

#### `tests/e2e/individual-flow.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test('complete individual investment flow', async ({ page }) => {
  await page.goto('/zh-TW/individual');
  
  // 填寫投資者檔案
  await page.fill('input[name="initialCapital"]', '100000');
  await page.fill('input[name="annualContribution"]', '12000');
  
  // 選擇策略
  await page.check('input[value="btc10"]');
  await page.check('input[value="btcMaxi"]');
  
  // 等待圖表渲染
  await page.waitForSelector('svg.recharts-surface');
  
  // 驗證圖表顯示
  const chart = await page.locator('.recharts-wrapper');
  await expect(chart).toBeVisible();
  
  // 匯出數據
  await page.click('button:has-text("匯出 CSV")');
  // 驗證下載
});
```

### 7.3 效能優化

1. **代碼分割**
```typescript
// 動態導入大型圖表庫
const PortfolioComparisonChart = dynamic(
  () => import('@/components/charts/PortfolioComparisonChart'),
  { ssr: false }
);
```

2. **記憶化計算**
```typescript
const memoizedForecast = useMemo(() => {
  return calculateForecast(assumptions, strategies);
}, [assumptions, strategies]);
```

3. **Web Worker 進行密集計算**
```typescript
// src/lib/workers/forecast.worker.ts
self.addEventListener('message', (e) => {
  const { assumptions, strategies } = e.data;
  const result = performHeavyCalculation(assumptions, strategies);
  self.postMessage(result);
});
```

4. **圖片優化**
```typescript
import Image from 'next/image';

<Image
  src="/bitcoin.png"
  alt="Bitcoin"
  width={30}
  height={30}
  priority
/>
```

---

## 第八階段：部署與 CI/CD

### 8.1 環境變數

#### `.env.example`
```env
# App
NEXT_PUBLIC_APP_URL=https://bitcoin24.app
NEXT_PUBLIC_APP_NAME=Bitcoin24

# Analytics (optional)
NEXT_PUBLIC_GA_ID=

# API (if needed)
API_BASE_URL=
```

### 8.2 Vercel 部署配置

#### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["hnd1", "sfo1"],
  "github": {
    "silent": true
  }
}
```

### 8.3 GitHub Actions CI/CD

#### `.github/workflows/ci.yml`
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Build
        run: npm run build
```

### 8.4 性能監控

使用 Vercel Analytics 和 Web Vitals：

```typescript
// src/app/[locale]/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## 開發時程估算

| 階段 | 工作天數 | 說明 |
|------|---------|------|
| 第一階段：需求分析 | 3-5 天 | 深入分析 Excel 模型、設計資料結構 |
| 第二階段：專案初始化 | 2-3 天 | 設置開發環境、安裝依賴 |
| 第三階段：資料層開發 | 10-14 天 | 實現核心計算引擎（最複雜） |
| 第四階段：UI 組件 | 7-10 天 | 建立所有可重用組件 |
| 第五階段：核心功能 | 14-21 天 | 實現 8 個頁面及其邏輯 |
| 第六階段：i18n | 5-7 天 | 實現多語言支援 |
| 第七階段：測試 | 7-10 天 | 撰寫測試、修正 bug |
| 第八階段：部署 | 2-3 天 | 設置 CI/CD、部署到生產環境 |
| **總計** | **50-73 天** | **約 2-3.5 個月** |

---

## 開發優先順序

### Sprint 1（Week 1-2）
- ✅ 專案初始化
- ✅ 基礎 UI 框架
- ✅ 導航結構
- ✅ Intro 頁面

### Sprint 2（Week 3-4）
- ✅ 核心計算引擎
- ✅ 狀態管理
- ✅ BTC 和 Macro 頁面

### Sprint 3（Week 5-6）
- ✅ Individual 頁面（含圖表）
- ✅ 資料匯出功能

### Sprint 4（Week 7-8）
- ✅ Corporate、Institution 頁面
- ✅ Nation State、US 頁面

### Sprint 5（Week 9-10）
- ✅ i18n 實現
- ✅ 測試與優化
- ✅ 部署

---

## 技術債務與未來改進

1. **進階功能**
   - 使用者帳戶系統（保存多個場景）
   - 社群分享功能
   - 情境對比功能
   - 匯入 Excel 檔案功能

2. **視覺化增強**
   - 3D 圖表
   - 動畫效果
   - 互動式教學導覽

3. **資料增強**
   - 即時比特幣價格 API
   - 歷史數據回測
   - 蒙地卡羅模擬（加入波動性）

4. **行動端優化**
   - PWA 支援
   - 原生 App（React Native）

---

## 參考資源

### 計算模型參考
- [Stock-to-Flow Model](https://medium.com/@100trillionUSD/modeling-bitcoins-value-with-scarcity-91fa0fc03e25)
- [Bitcoin Rainbow Chart](https://www.blockchaincenter.net/bitcoin-rainbow-chart/)
- [Plan B's Models](https://stats.buybitcoinworldwide.com/stock-to-flow/)

### UI/UX 參考
- [MicroStrategy Bitcoin Tracker](https://www.microstrategy.com/bitcoin)
- [Bitcoin Treasuries](https://bitcointreasuries.net/)
- [Look Into Bitcoin](https://www.lookintobitcoin.com/)

### 技術文件
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Recharts Examples](https://recharts.org/en-US/examples)
- [next-intl Guide](https://next-intl-docs.vercel.app/)

---

## 總結

此開發計劃將 Bitcoin24 Excel 模型轉換為現代化的 Next.js SPA，具備：

✅ **8 個完整的互動式頁面**
✅ **5 種投資策略對比**
✅ **強大的計算引擎**
✅ **美觀的圖表視覺化**
✅ **多語言支援（繁中、簡中、英、日）**
✅ **響應式設計**
✅ **完整的測試覆蓋**
✅ **自動化 CI/CD**

這個計劃提供了清晰的路線圖，可以根據實際開發進度進行調整。建議採用敏捷開發方式，每個 Sprint 都能交付可用的功能。

