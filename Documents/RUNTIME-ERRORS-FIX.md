# 運行時錯誤修復 | Runtime Errors Fix

## 🎉 好消息 | Good News

**部署已成功！** | **Deployment Successful!**

```
✓ Generating static pages (35/35)
Success: Assets published!
Success: Your site was deployed!
```

你的網站已經部署到 Cloudflare Pages，但有一些運行時錯誤需要修復。

---

## 🐛 錯誤分析 | Error Analysis

### 錯誤 1: React Hydration Mismatch

**錯誤訊息 | Error Messages**:
```
Minified React error #418
Minified React error #423
HierarchyRequestError: Only one element on document allowed
```

**完整錯誤 | Full Errors**:
- **#418**: Hydration failed because the server rendered HTML didn't match the client
- **#423**: There was an error while hydrating this Suspense boundary

**原因 | Root Cause**: 
next-intl 的 `getRequestConfig` 沒有返回 `locale`，導致伺服器端和客戶端渲染不一致。

---

## ✅ 修復方案 | Fix Solutions

### 修復 1: 更新 i18n/request.ts ✅

**檔案位置 | File Location**: `src/i18n/request.ts`

**修改前 | Before**:
```typescript
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./locales/${locale}.json`)).default,
}));
```

**修改後 | After**:
```typescript
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['zh-TW', 'zh-CN', 'en', 'ja'];

export default getRequestConfig(async ({ locale }) => {
  // Validate locale
  if (!locales.includes(locale as string)) notFound();

  return {
    locale,  // CRITICAL: Must return locale
    messages: (await import(`./locales/${locale}.json`)).default,
    timeZone: 'Asia/Taipei',
    now: new Date(),
  };
});
```

**關鍵變更 | Key Changes**:
1. ✅ 返回 `locale` 屬性 | Return `locale` property
2. ✅ 添加 locale 驗證 | Add locale validation
3. ✅ 設定時區 | Set timezone
4. ✅ 提供當前時間 | Provide current time

---

### 修復 2: 清理 next.config.js ✅

**問題 | Issue**: `images` 配置重複定義

**修改前 | Before**:
```javascript
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,  // 第一次定義
  },
  reactStrictMode: true,
  images: {
    domains: ['github.com'],  // 重複定義！
  },
};
```

**修改後 | After**:
```javascript
const nextConfig = {
  output: 'export',
  distDir: 'out',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['github.com'],  // 合併到一起
  },
};
```

---

## 🚀 部署修復步驟 | Deployment Fix Steps

### Step 1: 更新檔案

```bash
cd C:\Users\pclee\Documents\GitHub\bitcoin_model\bitcoin24-spa

# 1. 更新 i18n/request.ts（已完成）
# 2. 更新 next.config.js（已完成）
```

### Step 2: 本地測試

```bash
# 清除舊的建置
Remove-Item -Recurse -Force .next, out

# 重新建置
npm run build
```

**預期輸出 | Expected Output**:
```
✓ Generating static pages (35/35)
Export successful. Files written to out/
```

**不應該有 | Should NOT see**:
- ❌ next-intl locale warnings
- ❌ Hydration warnings

### Step 3: 測試靜態檔案

```bash
# 使用 serve 測試
npx serve out

# 或使用 Python
cd out
python -m http.server 3000
```

訪問 `http://localhost:3000/zh-TW` 檢查是否有錯誤。

### Step 4: 推送到 GitHub

```bash
git add src/i18n/request.ts next.config.js
git commit -m "fix: resolve React hydration errors and next-intl locale warnings"
git push
```

Cloudflare Pages 會自動重新部署，錯誤應該消失。

---

## 🔍 驗證修復 | Verify Fix

### 瀏覽器檢查 | Browser Check

部署後，開啟瀏覽器開發者工具 (F12)：

**不應該看到 | Should NOT see**:
- ❌ React error #418
- ❌ React error #423  
- ❌ HierarchyRequestError
- ❌ next-intl warnings

**應該看到 | Should see**:
- ✅ 頁面正常渲染 | Page renders correctly
- ✅ 無控制台錯誤 | No console errors
- ✅ 語言切換正常 | Language switching works

### 功能測試 | Functional Tests

- [ ] 所有 8 個頁面可訪問 | All 8 pages accessible
- [ ] 語言切換（zh-TW, zh-CN, en, ja）| Language switching works
- [ ] 圖表顯示正常 | Charts display correctly
- [ ] 表單輸入正常 | Forms work correctly
- [ ] 無控制台錯誤 | No console errors

---

## 📝 額外建議 | Additional Recommendations

### 1. 修復 TypeScript `any` 警告

**檔案 | Files**:
- `src/app/[locale]/page.tsx:61`
- `src/components/charts/PortfolioComparisonChart.tsx:28`
- `src/components/forms/InvestorProfileForm.tsx:157`
- `src/components/layout/LanguageSwitcher.tsx:26`
- `src/components/layout/Navigation.tsx:30,44`

**建議修復 | Suggested Fix**:
```typescript
// Before
const data: any = getData();

// After
const data: DataType = getData();
// 或 | or
const data: unknown = getData();
```

### 2. 添加 favicon.ico

**錯誤 | Error**: `Failed to load resource: /favicon.ico 404`

**修復 | Fix**:
```bash
# 添加 favicon 到 public 目錄
# 或在 layout.tsx 中指定
```

```typescript
// src/app/[locale]/layout.tsx
export const metadata = {
  icons: {
    icon: '/images/bitcoin-icon.png',
  },
};
```

### 3. 優化 bundle 大小

**當前狀態 | Current Status**:
- Individual 頁面: 291 kB
- Corporate/Institution 頁面: 281 kB

**優化建議 | Optimization Suggestions**:
```typescript
// 動態導入大型組件
const PortfolioChart = dynamic(
  () => import('@/components/charts/PortfolioComparisonChart'),
  { ssr: false, loading: () => <div>Loading chart...</div> }
);
```

---

## 🎯 快速參考 | Quick Reference

### 修復的檔案 | Files Fixed

1. **src/i18n/request.ts**
   ```typescript
   return {
     locale,  // 添加這行 | Add this line
     messages: (await import(`./locales/${locale}.json`)).default,
   };
   ```

2. **next.config.js**
   ```javascript
   images: {
     unoptimized: true,  // 合併配置 | Merge config
     domains: ['github.com'],
   }
   ```

### 測試命令 | Test Commands

```bash
# 清除並重建 | Clean and rebuild
Remove-Item -Recurse .next, out -Force
npm run build

# 本地測試 | Local test
npx serve out

# 檢查輸出 | Check output
ls out/zh-TW
ls out/en
```

---

## 🌟 預期結果 | Expected Results

### 建置成功 | Build Success
```
✓ Generating static pages (35/35)
Export successful
No warnings about locale
```

### 部署成功 | Deployment Success
```
Success: Assets published!
Success: Your site was deployed!
```

### 運行正常 | Runtime Success
```
✅ 無 React hydration 錯誤
✅ 無 next-intl 警告
✅ 無控制台錯誤
✅ 所有頁面正常載入
```

---

## 📞 如果還有問題 | If Issues Persist

### 進階除錯 | Advanced Debugging

1. **啟用開發模式 | Enable dev mode**:
   ```bash
   npm run dev
   ```
   在開發模式下錯誤訊息會更詳細。

2. **檢查瀏覽器控制台 | Check browser console**:
   - 完整的錯誤堆疊 | Full error stack
   - React DevTools | React DevTools
   - 網路請求 | Network requests

3. **查看詳細錯誤 | View detailed errors**:
   - Visit: https://react.dev/errors/418
   - Visit: https://react.dev/errors/423

---

## ✨ 總結 | Summary

### 中文
1. ✅ 部署已成功（Cloudflare Pages）
2. ⚠️ 有運行時 React 錯誤需要修復
3. 🔧 已提供完整修復方案
4. 📝 修復 `src/i18n/request.ts` 即可解決

### English
1. ✅ Deployment successful (Cloudflare Pages)
2. ⚠️ Runtime React errors need fixing
3. 🔧 Complete fix solution provided
4. 📝 Fixing `src/i18n/request.ts` will resolve the issue

**修復後推送，問題即可解決！** | **Push after fixing, issues will be resolved!**

---

**建立時間 | Created**: 2025-10-11  
**優先級 | Priority**: 🔴 High (影響用戶體驗 | Affects UX)

