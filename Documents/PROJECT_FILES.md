# 📁 Bitcoin24 SPA 專案檔案清單

## 根目錄檔案

```
bitcoin24-spa/
├── 📄 package.json                # 專案依賴與腳本配置
├── 📄 tsconfig.json               # TypeScript 配置
├── 📄 next.config.js              # Next.js 配置
├── 📄 tailwind.config.ts          # Tailwind CSS 配置
├── 📄 postcss.config.js           # PostCSS 配置
├── 📄 components.json             # shadcn/ui 配置
├── 📄 .eslintrc.json              # ESLint 規則
├── 📄 .prettierrc                 # Prettier 格式化規則
├── 📄 .gitignore                  # Git 忽略清單
├── 📄 .npmrc                      # npm 配置
├── 📄 jest.config.js              # Jest 測試配置
├── 📄 jest.setup.js               # Jest 設置檔
├── 📄 playwright.config.ts        # Playwright E2E 測試配置
├── 📄 vercel.json                 # Vercel 部署配置
├── 📄 README.md                   # 專案說明文件
├── 📄 SETUP_GUIDE.md              # 詳細安裝指南
├── 📄 QUICK_START.md              # 快速啟動指南
├── 📄 PHASE2_COMPLETE.md          # 第二階段完成報告
├── 📄 INSTALL.bat                 # Windows 安裝腳本
└── 📄 START.bat                   # Windows 啟動腳本
```

## src/ 目錄結構

```
src/
├── 📁 app/                        # Next.js App Router
│   ├── layout.tsx                 # 根佈局
│   └── [locale]/                  # 國際化路由
│       ├── layout.tsx             # 語言佈局
│       └── page.tsx               # Intro 頁面
│
├── 📁 components/                 # React 組件
│   ├── 📁 ui/                    # shadcn/ui 基礎組件（待添加）
│   ├── 📁 charts/                # 圖表組件（待開發）
│   ├── 📁 forms/                 # 表單組件（待開發）
│   ├── 📁 layout/                # 佈局組件（待開發）
│   └── 📁 shared/                # 共用組件（待開發）
│
├── 📁 lib/                        # 函式庫與工具
│   ├── 📁 calculations/          # 計算引擎（待開發）
│   ├── 📁 store/                 # 狀態管理（待開發）
│   ├── 📁 hooks/                 # 自訂 Hooks（待開發）
│   ├── 📁 schemas/               # Zod schemas（待開發）
│   ├── 📁 constants/             # 常數定義（待開發）
│   └── 📁 utils/                 # 工具函數
│       ├── cn.ts                  # Tailwind class 合併
│       ├── format.ts              # 格式化函數
│       └── index.ts               # 統一匯出
│
├── 📁 types/                      # TypeScript 型別定義（待開發）
│
├── 📁 i18n/                       # 國際化
│   ├── config.ts                  # i18n 配置
│   ├── request.ts                 # 請求處理
│   └── 📁 locales/               # 翻譯檔案
│       ├── zh-TW.json            # 繁體中文
│       ├── zh-CN.json            # 簡體中文
│       ├── en.json               # 英文
│       └── ja.json               # 日文
│
├── 📁 styles/                     # 樣式檔案
│   └── globals.css                # 全域 CSS
│
└── middleware.ts                  # Next.js 中介軟體
```

## public/ 目錄

```
public/
└── bitcoin.png                    # Bitcoin Logo
```

## tests/ 目錄結構

```
tests/
├── 📁 unit/                      # 單元測試（待開發）
├── 📁 integration/               # 整合測試（待開發）
└── 📁 e2e/                       # E2E 測試（待開發）
```

## 📊 檔案統計

### 已完成檔案
- **配置檔案**: 15 個
- **應用程式檔案**: 9 個
- **i18n 檔案**: 6 個
- **文件檔案**: 5 個
- **腳本檔案**: 2 個

**總計**: 37 個檔案

### 待開發檔案（第三階段及以後）

#### 型別定義 (src/types/)
- [ ] assumptions.ts
- [ ] strategy.ts
- [ ] investor.ts
- [ ] forecast.ts
- [ ] index.ts

#### 計算引擎 (src/lib/calculations/)
- [ ] btc-price.ts
- [ ] portfolio.ts
- [ ] compound.ts
- [ ] returns.ts
- [ ] forecast.ts

#### 狀態管理 (src/lib/store/)
- [ ] assumptions-store.ts
- [ ] results-store.ts
- [ ] ui-store.ts
- [ ] preferences-store.ts

#### Zod Schemas (src/lib/schemas/)
- [ ] assumptions.ts
- [ ] investor.ts
- [ ] strategy.ts

#### UI 組件 (src/components/)
待添加約 30+ 個組件

#### 頁面 (src/app/[locale]/)
- [ ] btc/page.tsx
- [ ] macro/page.tsx
- [ ] individual/page.tsx
- [ ] corporate/page.tsx
- [ ] institution/page.tsx
- [ ] nation-state/page.tsx
- [ ] united-states/page.tsx

## 🎯 第三階段預計新增檔案

預計新增 **50+ 個檔案**：
- 型別定義：5 個
- 計算引擎：5 個
- 狀態管理：4 個
- Schemas：3 個
- 測試檔案：15+ 個
- 其他：20+ 個

---

**當前進度**: 2/8 階段完成 (25%)  
**下一階段**: 第三階段 - 資料層開發

*更新日期: 2025-10-09*

