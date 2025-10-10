# Bitcoin24 SPA 開發階段

## 📋 階段總覽

```mermaid
graph LR
    A[階段1: 分析] --> B[階段2: 初始化]
    B --> C[階段3: 資料層]
    C --> D[階段4: UI組件]
    D --> E[階段5: 功能實現]
    E --> F[階段6: i18n]
    F --> G[階段7: 測試]
    G --> H[階段8: 部署]
```

---

## 🎯 階段 1：需求分析與架構設計
**時程**: 3-5 天

### 目標
- 深入理解 Bitcoin24 Excel 模型邏輯
- 設計資料模型與系統架構
- 定義 8 個頁面的功能需求

### 交付物
- [x] 資料模型設計文件
- [x] 系統架構圖
- [x] UI/UX 流程圖
- [x] 技術選型文件

### 關鍵決策
- ✅ 採用 Next.js 14 App Router
- ✅ 使用 Zustand 進行狀態管理
- ✅ Recharts 作為圖表庫
- ✅ next-intl 處理國際化

---

## 🛠️ 階段 2：專案初始化
**時程**: 2-3 天

### 目標
- 建立開發環境
- 安裝並配置所有依賴
- 設置專案結構

### 任務清單
```bash
# 1. 建立 Next.js 專案
npx create-next-app@latest bitcoin24-spa --typescript --tailwind --app

# 2. 安裝 UI 組件庫
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input label select tabs slider

# 3. 安裝核心依賴
npm install recharts zustand immer
npm install react-hook-form zod @hookform/resolvers
npm install next-intl
npm install date-fns clsx tailwind-merge
npm install mathjs decimal.js

# 4. 安裝開發依賴
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
npm install -D eslint-config-next
```

### 配置檔案
- ✅ `next.config.js` - Next.js 配置
- ✅ `tailwind.config.ts` - Tailwind CSS 自訂主題
- ✅ `tsconfig.json` - TypeScript 路徑別名
- ✅ `.eslintrc.json` - ESLint 規則
- ✅ `jest.config.js` - 測試配置

---

## 💾 階段 3：資料層開發
**時程**: 10-14 天

### 目標
- 實現核心計算引擎
- 建立狀態管理系統
- 定義所有 TypeScript 型別

### 3.1 計算引擎模組

#### A. 比特幣價格計算 (`btc-price.ts`)
```typescript
- calculateS2FPrice()          // Stock-to-Flow 模型
- calculateExponentialGrowth() // 指數增長模型
- applyHalvingEffect()         // 減半週期影響
- applyInstitutionalAdoption() // 機構採用影響
```

#### B. 投資組合計算 (`portfolio.ts`)
```typescript
- calculatePortfolioValue()    // 多資產組合價值
- rebalancePortfolio()         // 再平衡策略
- calculateAfterTaxReturn()    // 稅後報酬
- calculateSharpeRatio()       // 風險調整報酬
```

#### C. 複利計算 (`compound.ts`)
```typescript
- calculateCompoundReturn()    // 複利計算
- calculateCAGR()              // 年化成長率
- calculateRealReturn()        // 實質報酬（扣除通膨）
```

#### D. 報酬分析 (`returns.ts`)
```typescript
- calculateDrawdown()          // 最大回撤
- calculateVolatility()        // 波動率
- calculateCorrelation()       // 相關性分析
```

### 3.2 狀態管理

#### Store 架構
```typescript
stores/
├── assumptions-store.ts   // 假設條件（macro, BTC, investor）
├── results-store.ts       // 計算結果
├── ui-store.ts           // UI 狀態（語言、主題）
└── preferences-store.ts   // 使用者偏好設定
```

### 3.3 型別定義

```typescript
types/
├── assumptions.ts        // MacroAssumptions, BTCAssumptions
├── strategy.ts          // StrategyConfig, StrategyName
├── investor.ts          // InvestorProfile
├── forecast.ts          // ForecastResult
└── index.ts             // 統一匯出
```

---

## 🎨 階段 4：UI 組件開發
**時程**: 7-10 天

### 目標
- 建立可重用的 UI 組件庫
- 實現響應式佈局
- 開發圖表視覺化組件

### 4.1 圖表組件

| 組件名稱 | 用途 | 圖表類型 |
|---------|------|---------|
| `PortfolioComparisonChart` | 投資組合對比 | 折線圖 |
| `BTCPriceChart` | BTC 價格預測 | 對數尺度折線圖 |
| `AllocationPieChart` | 資產配置 | 餅圖 |
| `ReturnsBarChart` | 報酬率對比 | 柱狀圖 |
| `PerformanceMetricsCard` | 績效指標 | 卡片 |

### 4.2 表單組件

| 組件名稱 | 用途 |
|---------|------|
| `MacroAssumptionsForm` | 宏觀經濟假設輸入 |
| `BTCAssumptionsForm` | 比特幣假設輸入 |
| `InvestorProfileForm` | 投資者檔案輸入 |
| `StrategySelector` | 策略選擇器 |

### 4.3 佈局組件

```typescript
layout/
├── Navigation.tsx        // 主導航列
├── Sidebar.tsx          // 側邊欄
├── Footer.tsx           // 頁尾
├── PageLayout.tsx       // 頁面容器
└── LanguageSwitcher.tsx // 語言切換器
```

### 4.4 共用組件

```typescript
shared/
├── Logo.tsx             // Bitcoin24 Logo
├── QuoteSection.tsx     // Satoshi 引言
├── ContributorsCard.tsx // 貢獻者卡片
├── DisclaimerBanner.tsx // 免責聲明
├── VideoGallery.tsx     // 影片畫廊
└── ResultsTable.tsx     // 數據表格
```

---

## ⚙️ 階段 5：核心功能實現
**時程**: 14-21 天

### 目標
- 實現 8 個主要頁面
- 整合計算引擎與 UI
- 實現資料流轉

### 5.1 頁面開發順序

#### Week 1: 基礎頁面
1. **Intro** (`/page.tsx`)
   - ✅ 展示專案介紹
   - ✅ 策略對比表格
   - ✅ 影片連結
   - ✅ 貢獻者資訊

2. **BTC** (`/btc/page.tsx`)
   - ✅ BTC 假設輸入表單
   - ✅ 價格預測預覽
   - ✅ 即時計算反饋

3. **Macro** (`/macro/page.tsx`)
   - ✅ 宏觀經濟假設
   - ✅ 通膨、利率、資產報酬率
   - ✅ 預設值管理

#### Week 2: 投資策略頁面
4. **Individual** (`/individual/page.tsx`)
   - ✅ 個人投資者檔案
   - ✅ 策略選擇與對比
   - ✅ 21 年預測圖表
   - ✅ 詳細數據表格
   - ✅ 匯出功能

5. **Corporate** (`/corporate/page.tsx`)
   - ✅ 企業資產負債表輸入
   - ✅ 股東權益影響分析
   - ✅ 企業稅率處理

#### Week 3: 進階場景
6. **Institution** (`/institution/page.tsx`)
   - ✅ 機構投資組合管理
   - ✅ 法規遵循考量
   - ✅ 風險調整指標

7. **Nation State** (`/nation-state/page.tsx`)
   - ✅ 國家儲備配置
   - ✅ GDP 影響分析
   - ✅ 主權財富管理

8. **United States** (`/united-states/page.tsx`)
   - ✅ 美國特定場景
   - ✅ 國債影響
   - ✅ 戰略儲備建議

### 5.2 共用功能

#### 資料匯出
```typescript
- exportToCSV()    // 匯出 CSV
- exportToJSON()   // 匯出 JSON
- exportToExcel()  // 匯出 Excel（可選）
- exportToPDF()    // 匯出報告 PDF（可選）
```

#### 情境管理
```typescript
- saveScenario()   // 儲存場景到 localStorage
- loadScenario()   // 載入場景
- compareScenarios() // 比較多個場景
```

---

## 🌍 階段 6：國際化（i18n）
**時程**: 5-7 天

### 目標
- 實現完整的多語言支援
- 支援 4 種語言
- 處理數字、貨幣、日期格式化

### 6.1 語言支援

| 語言 | Locale | 進度 |
|-----|--------|-----|
| 繁體中文 | `zh-TW` | 主要語言 |
| 簡體中文 | `zh-CN` | 必須支援 |
| 英文 | `en` | 必須支援 |
| 日文 | `ja` | 必須支援 |

### 6.2 翻譯內容結構

```json
{
  "navigation": {},      // 導航選單
  "intro": {},          // 介紹頁面
  "strategies": {},     // 策略名稱
  "forms": {},          // 表單標籤
  "charts": {},         // 圖表標籤
  "buttons": {},        // 按鈕文字
  "messages": {},       // 訊息提示
  "tooltips": {},       // 工具提示
  "disclaimers": {}     // 免責聲明
}
```

### 6.3 格式化處理

#### 貨幣格式化
```typescript
// 美元: $1,234,567.89
// 台幣: NT$1,234,567.89
// 日圓: ¥1,234,567
```

#### 百分比格式化
```typescript
// 英文: 12.5%
// 中文: 12.5%
```

#### 日期格式化
```typescript
// 英文: Jan 17, 2009
// 中文: 2009年1月17日
// 日文: 2009年1月17日
```

---

## 🧪 階段 7：測試與優化
**時程**: 7-10 天

### 目標
- 達到 80% 以上測試覆蓋率
- 確保跨瀏覽器相容性
- 優化效能

### 7.1 單元測試

#### 計算引擎測試
```typescript
tests/unit/calculations/
├── btc-price.test.ts       // BTC 價格計算
├── portfolio.test.ts       // 投資組合計算
├── compound.test.ts        // 複利計算
└── returns.test.ts         // 報酬計算
```

#### 組件測試
```typescript
tests/unit/components/
├── charts/                 // 圖表組件
├── forms/                  // 表單組件
└── shared/                 // 共用組件
```

### 7.2 整合測試

```typescript
tests/integration/
├── strategy-flow.test.ts   // 完整策略流程
├── data-export.test.ts     // 資料匯出
└── i18n.test.ts           // 多語言切換
```

### 7.3 E2E 測試

```typescript
tests/e2e/
├── individual-flow.spec.ts    // 個人投資流程
├── corporate-flow.spec.ts     // 企業投資流程
├── navigation.spec.ts         // 導航測試
└── responsive.spec.ts         // 響應式測試
```

### 7.4 效能優化

#### 優化清單
- [ ] 代碼分割（Code Splitting）
- [ ] 圖片優化（Next.js Image）
- [ ] 延遲載入（Lazy Loading）
- [ ] Web Worker（密集計算）
- [ ] 記憶化（useMemo, useCallback）
- [ ] 虛擬滾動（長列表）

#### 效能指標目標
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: > 90

---

## 🚀 階段 8：部署與 CI/CD
**時程**: 2-3 天

### 目標
- 部署到生產環境
- 設置自動化流程
- 配置監控

### 8.1 部署平台

#### 推薦：Vercel
- ✅ 零配置部署
- ✅ 自動 SSL
- ✅ 全球 CDN
- ✅ 自動預覽部署
- ✅ 內建 Analytics

#### 替代方案
- Netlify
- AWS Amplify
- Cloudflare Pages

### 8.2 環境設定

```bash
# 開發環境
NEXT_PUBLIC_ENV=development

# 測試環境
NEXT_PUBLIC_ENV=staging
NEXT_PUBLIC_APP_URL=https://staging.bitcoin24.app

# 生產環境
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_APP_URL=https://bitcoin24.app
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 8.3 CI/CD Pipeline

```yaml
# GitHub Actions
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    - Lint
    - Type Check
    - Unit Tests
    - E2E Tests
  
  build:
    - Build Next.js
    - Check bundle size
  
  deploy:
    - Deploy to Vercel
    - Run smoke tests
```

### 8.4 監控設置

#### 效能監控
- Vercel Analytics
- Google Analytics 4
- Web Vitals

#### 錯誤追蹤
- Sentry（可選）
- LogRocket（可選）

#### 正常運行時間監控
- Uptime Robot
- Better Uptime

---

## 📊 進度追蹤

### 整體進度
```
階段 1: 需求分析        ████████████████████ 100%
階段 2: 專案初始化      ░░░░░░░░░░░░░░░░░░░░   0%
階段 3: 資料層開發      ░░░░░░░░░░░░░░░░░░░░   0%
階段 4: UI 組件開發     ░░░░░░░░░░░░░░░░░░░░   0%
階段 5: 核心功能實現    ░░░░░░░░░░░░░░░░░░░░   0%
階段 6: 國際化實現      ░░░░░░░░░░░░░░░░░░░░   0%
階段 7: 測試與優化      ░░░░░░░░░░░░░░░░░░░░   0%
階段 8: 部署與 CI/CD    ░░░░░░░░░░░░░░░░░░░░   0%
```

### 里程碑

| 里程碑 | 目標日期 | 狀態 |
|-------|---------|------|
| M1: 專案設置完成 | Week 2 | 🟡 進行中 |
| M2: 核心計算引擎完成 | Week 4 | ⚪ 未開始 |
| M3: 基礎頁面完成 | Week 6 | ⚪ 未開始 |
| M4: 所有功能完成 | Week 8 | ⚪ 未開始 |
| M5: 測試完成 | Week 10 | ⚪ 未開始 |
| M6: 生產環境上線 | Week 11 | ⚪ 未開始 |

---

## 🎯 成功標準

### 功能完整性
- ✅ 所有 8 個頁面正常運作
- ✅ 5 種策略對比功能完整
- ✅ 計算結果準確無誤
- ✅ 4 種語言完整翻譯

### 效能指標
- ✅ Lighthouse Score > 90
- ✅ 頁面載入時間 < 3 秒
- ✅ 計算響應時間 < 1 秒

### 品質標準
- ✅ 測試覆蓋率 > 80%
- ✅ 零重大 bug
- ✅ 響應式設計完美支援

### 使用者體驗
- ✅ 直覺的操作流程
- ✅ 清晰的視覺呈現
- ✅ 有意義的錯誤提示

---

## 📚 下一步行動

### 立即開始
1. ✅ 審查此開發計劃
2. ⏳ 準備開發環境
3. ⏳ 建立 GitHub Repository
4. ⏳ 執行階段 2：專案初始化

### 需要決定的事項
- [ ] 確認部署域名
- [ ] 選擇 Analytics 工具
- [ ] 決定是否需要後端 API
- [ ] 確認團隊成員與分工

---

**建立日期**: 2025-10-09  
**最後更新**: 2025-10-09  
**版本**: 1.0.0

