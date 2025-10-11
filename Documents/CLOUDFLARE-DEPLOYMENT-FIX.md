# Cloudflare Pages 部署修復指南

## 問題診斷

### 錯誤訊息
```
Error: Output directory "bitcoin24-spa/out" not found.
Failed: build output directory not found
```

### 原因分析
Next.js 建置成功了，但輸出目錄配置不正確。Next.js 預設輸出目錄是 `.next`，而 Cloudflare Pages 設定中指定的是 `bitcoin24-spa/out`。

---

## 解決方案

### 方案 1: 修改 Cloudflare Pages 設定（推薦）

1. 登入 Cloudflare Dashboard
2. 進入 Pages 專案設定
3. 修改 **Build settings**:

```yaml
Build command: npx next build
Build output directory: .next
Framework preset: Next.js
```

### 方案 2: 使用 Next.js Static Export

如果你需要靜態輸出，修改 `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 啟用靜態導出
  distDir: 'out',    // 輸出到 out 目錄
  images: {
    unoptimized: true  // Static export 需要
  }
};

module.exports = nextConfig;
```

然後在 Cloudflare Pages 設定：
```yaml
Build command: npx next build
Build output directory: out
```

### 方案 3: 創建 wrangler.toml（針對 Cloudflare）

在專案根目錄創建 `wrangler.toml`:

```toml
name = "bitcoin-model"
compatibility_date = "2025-10-11"

[site]
bucket = ".next"

[build]
command = "npm run build"
```

---

## 完整部署流程

### 1. 本地測試

```bash
# 安裝依賴
npm install

# 本地開發
npm run dev

# 測試建置
npm run build

# 檢查輸出目錄
ls -la .next/     # 或 out/ 如果使用 static export
```

### 2. 修改 package.json

確保有正確的建置腳本：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next export"  // 如果需要靜態導出
  }
}
```

### 3. Cloudflare Pages 設定

#### 環境變數（如需要）
```
NODE_VERSION=22.16.0
NPM_VERSION=10.9.2
```

#### 建置設定
```yaml
Build command: npm run build
Build output directory: .next
Root directory: (empty or /)
```

---

## 針對你的專案

根據日誌顯示，你的專案已經成功建置：

```
✓ Generating static pages (35/35)
Route (app)                              Size     First Load JS
┌ ○ /_not-found                          876 B          88.3 kB
├ ● /[locale]                            187 B          97.4 kB
...
```

**問題只是輸出目錄配置錯誤。**

### 快速修復步驟：

1. **檢查你的專案結構**
   ```bash
   # 你的專案應該是這樣
   bitcoin_model/
   ├── .next/          # Next.js 建置輸出
   ├── src/
   ├── public/
   ├── package.json
   └── next.config.js
   ```

2. **在 Cloudflare Pages 修改設定**
   - Build output directory: `.next` → 改為 `.next`
   - 或刪除 `bitcoin24-spa/` 前綴

3. **檢查 next.config.js**
   ```javascript
   // 如果有這行，移除它
   // distDir: 'bitcoin24-spa/out'
   
   // 改為使用預設或
   distDir: '.next'
   ```

---

## 常見錯誤排解

### 錯誤 1: 找不到 pages 目錄
**解決**: 確認使用 App Router (`app/` 目錄) 或 Pages Router (`pages/` 目錄)

### 錯誤 2: 建置超時
**解決**: 
```javascript
// next.config.js
module.exports = {
  experimental: {
    workerThreads: false,
    cpus: 1
  }
}
```

### 錯誤 3: 動態路由問題
**解決**: 使用 `generateStaticParams` 預先生成路由

---

## 驗證步驟

### 本地驗證
```bash
npm run build
ls -la .next/
# 應該看到 .next/standalone 或 .next/server
```

### Cloudflare 驗證
1. 推送代碼到 GitHub
2. Cloudflare 自動觸發建置
3. 檢查建置日誌
4. 確認部署成功

---

## 參考資源

- [Next.js Cloudflare Pages 部署](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Cloudflare Pages 配置](https://developers.cloudflare.com/pages/configuration/)

---

**更新日期**: 2025-10-11

