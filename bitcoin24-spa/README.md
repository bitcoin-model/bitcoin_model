# Bitcoin24 SPA ₿

> A modern, interactive Single Page Application for simulating 21-year Bitcoin investment strategies.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

[English](#english) | [繁體中文](#繁體中文) | [简体中文](#简体中文) | [日本語](#日本語)

---

## 🎯 功能特色

- ✅ **8 個互動頁面** - Intro, BTC, Macro, Individual, Corporate, Institution, Nation State, US
- ✅ **5 種投資策略** - Normie, BTC 10%, BTC Maxi, Double Maxi, Triple Maxi
- ✅ **21 年完整預測** - 基於 S2F 模型、採用曲線、減半週期
- ✅ **互動式圖表** - Recharts 驅動的精美圖表
- ✅ **多語言支援** - 繁中、簡中、英文、日文
- ✅ **資料匯出** - CSV 和 JSON 格式
- ✅ **響應式設計** - 完美適配手機、平板、電腦
- ✅ **Dark Mode** - 支援深色模式
- ✅ **即時計算** - 快速的計算引擎

---

## 🚀 快速開始

### 前置需求

- Node.js 18.x 或更高
- npm 9.x 或更高

### 安裝

```bash
# 1. 複製專案
git clone https://github.com/YOUR_USERNAME/bitcoin24-spa.git
cd bitcoin24-spa

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev

# 4. 開啟瀏覽器
# 訪問 http://localhost:3000/zh-TW
```

### Windows 快速安裝

雙擊 `INSTALL.bat` 自動安裝，然後雙擊 `START.bat` 啟動。

---

## 📁 專案結構

```
bitcoin24-spa/
├── src/
│   ├── app/              # Next.js App Router
│   │   └── [locale]/     # 國際化路由（8個頁面）
│   ├── components/       # React 組件（38個）
│   │   ├── ui/          # 基礎 UI 組件
│   │   ├── charts/      # 圖表組件
│   │   ├── forms/       # 表單組件
│   │   ├── layout/      # 佈局組件
│   │   └── shared/      # 共用組件
│   ├── lib/             # 核心函式庫
│   │   ├── calculations/# 計算引擎
│   │   ├── store/       # Zustand 狀態管理
│   │   ├── hooks/       # Custom Hooks
│   │   ├── schemas/     # Zod 驗證
│   │   └── utils/       # 工具函數
│   ├── types/           # TypeScript 型別定義
│   ├── i18n/            # 國際化配置
│   └── styles/          # 全域樣式
├── public/              # 靜態資源
├── tests/               # 測試檔案
│   ├── unit/           # 單元測試
│   └── e2e/            # E2E 測試
└── [配置檔案]
```

---

## 🛠️ 可用腳本

```bash
npm run dev          # 啟動開發伺服器（http://localhost:3000）
npm run build        # 建置生產版本
npm run start        # 啟動生產伺服器
npm run lint         # 執行 ESLint
npm run type-check   # TypeScript 類型檢查
npm run test         # 執行 Jest 單元測試
npm run test:e2e     # 執行 Playwright E2E 測試
npm run format       # Prettier 格式化程式碼
```

---

## 🌍 支援的語言

| 語言 | Locale | 完成度 |
|------|--------|--------|
| 繁體中文 | zh-TW | 100% ✅ |
| 简体中文 | zh-CN | 100% ✅ |
| English | en | 100% ✅ |
| 日本語 | ja | 100% ✅ |

---

## 📊 技術棧

### 前端框架
- **Next.js 14** - React 框架（App Router）
- **React 18** - UI 函式庫
- **TypeScript 5** - 型別安全

### UI 系統
- **Tailwind CSS** - 樣式框架
- **Radix UI** - 無障礙組件
- **Lucide Icons** - 圖示系統
- **Recharts** - 圖表函式庫

### 狀態管理
- **Zustand** - 輕量級狀態管理
- **Immer** - 不可變狀態
- **LocalStorage** - 持久化

### 表單處理
- **React Hook Form** - 表單狀態管理
- **Zod** - Schema 驗證

### 國際化
- **next-intl** - i18n 解決方案

### 測試
- **Jest** - 單元測試
- **Playwright** - E2E 測試
- **React Testing Library** - 組件測試

---

## 🧮 核心功能

### 投資策略

| 策略 | BTC 配置 | 描述 |
|------|---------|------|
| **Normie** | 0% | 傳統 60/40 投資組合 |
| **BTC 10%** | 10% | 平衡型配置 |
| **BTC Maxi** | 80% | 比特幣主導 |
| **Double Maxi** | 100% (2x) | 2倍槓桿 |
| **Triple Maxi** | 100% (3x) | 3倍槓桿 |

### 投資者類型

- **Individual** - 個人投資者（$100K 起始）
- **Corporate** - 企業（$10M 起始）
- **Institution** - 機構（$100M 起始）
- **Nation-State** - 國家（$10B 起始）

### 計算模型

- **Stock-to-Flow (S2F)** - 稀缺性價格模型
- **Adoption Curves** - 技術採用曲線（Linear/Exponential/S-Curve）
- **Halving Cycles** - 減半週期影響
- **Multi-Asset Portfolio** - 5種資產配置

---

## 📈 績效指標

系統會計算以下指標：

- **Final Value** - 最終投資組合價值
- **CAGR** - 年化複合成長率
- **Total Return** - 總報酬率
- **Max Drawdown** - 最大回撤
- **Sharpe Ratio** - 夏普比率（風險調整後報酬）
- **Volatility** - 波動率
- **Best/Worst Year** - 最佳/最差年度

---

## 🧪 測試

```bash
# 執行所有單元測試
npm run test

# Watch 模式
npm run test:watch

# 測試覆蓋率
npm run test -- --coverage

# E2E 測試
npm run test:e2e

# E2E 測試（UI 模式）
npx playwright test --ui
```

---

## 📦 建置生產版本

```bash
# 建置
npm run build

# 啟動生產伺服器
npm run start

# 或部署到 Vercel
vercel --prod
```

---

## 🤝 貢獻

歡迎貢獻！請遵循以下步驟：

1. Fork 本專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

---

## 📄 授權

MIT License - 詳見 [LICENSE](LICENSE) 檔案

---

## 🙏 致謝

### 原始貢獻者
- [Michael J. Saylor](https://x.com/saylor)
- [Shirish Jajodia](https://x.com/shirishjajodia)
- [Chaitanya Jain (CJ)](https://x.com/_ChaitanyaJ)

### 技術貢獻
感謝所有開源社群的貢獻者

---

## 📞 聯絡方式

- **GitHub**: [bitcoin24-spa](https://github.com/YOUR_USERNAME/bitcoin24-spa)
- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/bitcoin24-spa/issues)
- **Twitter**: [@bitcoin24app](https://twitter.com/bitcoin24app)

---

## ⚠️ 免責聲明

此處提供的資訊僅供一般參考，不應被視為財務建議。它包含本質上無法預知的前瞻性資訊。在採取任何行動之前，您應該向專業財務顧問和其他可信來源尋求建議。

---

**Built with Next.js 14, TypeScript, and ❤️**

*Helping you drive Bitcoin adoption* 🚀
