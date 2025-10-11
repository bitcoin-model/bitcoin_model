# Cloudflare Pages 部署修復方案 | Cloudflare Pages Deployment Fix

## 問題診斷 | Problem Diagnosis

### 錯誤訊息 | Error Message
```
Error: Output directory "bitcoin24-spa/out" not found.
Failed: build output directory not found
```

### 建置狀態 | Build Status
✅ **建置成功** | **Build Successful**
```
✓ Generating static pages (35/35)
✓ Compiled successfully
```

### 問題原因 | Root Cause
**中文**: Next.js 成功建置到 `.next` 目錄，但 Cloudflare Pages 配置中指定了錯誤的輸出目錄 `bitcoin24-spa/out`。

**English**: Next.js successfully built to `.next` directory, but Cloudflare Pages configuration specifies incorrect output directory `bitcoin24-spa/out`.

---

## 解決方案 | Solutions

### 方案 1: 使用 Static Export（推薦 | Recommended）

#### 步驟 | Steps

**1. 修改 `next.config.js`**

```javascript
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Enable static export
  distDir: 'out',    // Output to 'out' directory
  images: {
    unoptimized: true,  // Required for static export
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = withNextIntl(nextConfig);
```

**2. 更新 Cloudflare Pages 設定**

```yaml
Build command: npm run build
Build output directory: out
Root directory: (leave empty)
```

**3. 測試本地建置**

```bash
npm run build
ls out/  # 確認 out 目錄存在
```

---

### 方案 2: 修改 Cloudflare 配置使用 .next

**不推薦**: Cloudflare Pages 不完全支援 Next.js SSR 功能。

如果你的專案不需要 SSR，使用方案 1 的 Static Export 更適合。

---

## 完整修復流程 | Complete Fix Process

### Step 1: 修改 next.config.js

```bash
cd bitcoin_model
```

編輯 `next.config.js`，添加以下設定：
```javascript
output: 'export',
distDir: 'out',
images: { unoptimized: true },
```

### Step 2: 本地測試建置

```bash
npm run build
```

**預期輸出 | Expected Output**:
```
✓ Generating static pages (35/35)
✓ Exporting (35/35)
Export successful. Files written to out/
```

### Step 3: 確認輸出目錄

```bash
ls out/
# 應該看到:
# _next/
# en/
# zh-TW/
# zh-CN/
# ja/
# index.html
# ...
```

### Step 4: 推送到 GitHub

```bash
git add next.config.js
git commit -m "fix: configure Next.js for static export to Cloudflare Pages"
git push
```

### Step 5: Cloudflare Pages 會自動重新部署

等待 2-3 分鐘，部署應該成功。

---

## 替代方案：使用 Cloudflare Workers + Next.js

如果你需要 SSR 功能，可以使用 `@cloudflare/next-on-pages`：

```bash
npm install @cloudflare/next-on-pages
```

創建 `wrangler.toml`:
```toml
name = "bitcoin24"
compatibility_date = "2025-10-11"
pages_build_output_dir = ".vercel/output/static"
```

---

## 快速參考 | Quick Reference

### next.config.js 完整配置

```javascript
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  basePath: '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = withNextIntl(nextConfig);
```

### Cloudflare Pages 設定

```
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Root directory: (empty)
Node version: 18 or higher
```

---

## 驗證部署成功 | Verify Deployment

### 檢查清單 | Checklist

- [ ] 建置日誌顯示 "Export successful"
- [ ] `out/` 目錄包含所有靜態檔案
- [ ] Cloudflare 部署成功
- [ ] 網站可以訪問
- [ ] 所有路由正常工作
- [ ] 多語言切換正常
- [ ] 圖表顯示正常

### 測試 URL | Test URLs

部署成功後測試以下 URL：
```
https://your-site.pages.dev/zh-TW
https://your-site.pages.dev/en
https://your-site.pages.dev/zh-TW/individual
https://your-site.pages.dev/en/btc
```

---

## 常見問題 | Common Issues

### 問題 1: next-intl locale 警告

**錯誤**: `A 'locale' is expected to be returned from 'getRequestConfig'`

**解決**: 更新 `src/i18n/request.ts`:

```typescript
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['zh-TW', 'zh-CN', 'en', 'ja'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
    timeZone: 'Asia/Taipei',
    now: new Date(),
  };
});
```

### 問題 2: TypeScript any 警告

**警告**: `Unexpected any. Specify a different type`

**解決**: 指定具體型別或使用 `unknown`

```typescript
// Before
const handleChange = (e: any) => { }

// After
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { }
```

### 問題 3: 圖片優化問題

**錯誤**: `Image Optimization using the default loader is not compatible with export`

**解決**: 已在 next.config.js 中設定 `images: { unoptimized: true }`

---

## 效能優化建議 | Performance Optimization

### 1. 啟用 Cloudflare 快取

在 `public/_headers` 添加：
```
/*
  Cache-Control: public, max-age=31536000, immutable

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable
```

### 2. 壓縮資產

確保 Cloudflare 自動壓縮已啟用：
- Brotli
- Gzip

### 3. 啟用 Auto Minify

在 Cloudflare Dashboard:
- Speed → Optimization → Auto Minify
- 啟用: JavaScript, CSS, HTML

---

## 監控與分析 | Monitoring & Analytics

### Cloudflare Web Analytics

1. 前往 Cloudflare Dashboard
2. 選擇你的 Pages 專案
3. 啟用 Web Analytics
4. 複製追蹤代碼

在 `src/app/[locale]/layout.tsx` 添加：
```typescript
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' 
                data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 總結 | Summary

### 中文
1. 修改 `next.config.js` 添加 `output: 'export'`
2. 設定 `distDir: 'out'`
3. 在 Cloudflare Pages 設定 Build output directory 為 `out`
4. 推送代碼，Cloudflare 會自動重新部署

### English
1. Modify `next.config.js` to add `output: 'export'`
2. Set `distDir: 'out'`
3. Configure Cloudflare Pages Build output directory to `out`
4. Push code, Cloudflare will automatically redeploy

---

**建立時間 | Created**: 2025-10-11  
**狀態 | Status**: ✅ Ready to implement

