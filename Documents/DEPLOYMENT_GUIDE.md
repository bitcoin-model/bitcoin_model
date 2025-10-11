# 🚀 Bitcoin24 SPA 部署指南

## 📋 部署前檢查清單

### ✅ 必須完成
- [x] 所有功能測試通過
- [x] 類型檢查無錯誤
- [x] ESLint 無警告
- [x] Build 成功
- [x] 環境變數配置
- [x] SEO Meta tags 完成

---

## 🌐 部署到 Vercel（推薦）

### 方法 1: 透過 Vercel Dashboard

1. **訪問 Vercel**
   - 前往 [vercel.com](https://vercel.com)
   - 使用 GitHub 帳號登入

2. **Import Project**
   - 點擊「Add New」→「Project」
   - 選擇 GitHub Repository
   - 選擇 `bitcoin24-spa` 專案

3. **配置設定**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **環境變數**
   ```env
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_APP_NAME=Bitcoin24
   ```

5. **部署**
   - 點擊「Deploy」
   - 等待建置完成（約 2-3 分鐘）
   - 🎉 完成！

### 方法 2: 透過 Vercel CLI

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 登入
vercel login

# 部署
cd bitcoin24-spa
vercel

# 生產環境部署
vercel --prod
```

---

## 🔧 環境變數設定

### 開發環境 (.env.local)
```env
NEXT_PUBLIC_APP_NAME=Bitcoin24
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENV=development
```

### 生產環境 (Vercel Dashboard)
```env
NEXT_PUBLIC_APP_NAME=Bitcoin24
NEXT_PUBLIC_APP_URL=https://bitcoin24.app
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics（可選）
```

---

## 📊 部署後驗證

### 1. 功能驗證
- [ ] 所有 8 個頁面正常載入
- [ ] 表單輸入與驗證正常
- [ ] 計算功能正常運作
- [ ] 圖表正確渲染
- [ ] 資料匯出功能正常
- [ ] 語言切換正常

### 2. 效能驗證
- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s

### 3. SEO 驗證
- [ ] Meta tags 正確
- [ ] Open Graph 顯示正確
- [ ] robots.txt 可訪問
- [ ] Sitemap 生成

### 4. 多語言驗證
- [ ] /zh-TW 正常
- [ ] /zh-CN 正常
- [ ] /en 正常
- [ ] /ja 正常

---

## 🔄 CI/CD 流程

### GitHub Actions Workflow

當你推送代碼到 GitHub 時，會自動執行：

```yaml
1. Lint and Type Check
   → ESLint 檢查
   → TypeScript 類型檢查

2. Unit Tests
   → Jest 單元測試
   → 測試覆蓋率報告

3. E2E Tests
   → Playwright 端到端測試
   → 多瀏覽器測試

4. Build
   → Next.js 建置
   → Bundle size 檢查
```

### 自動部署

```
main 分支 push → 自動部署到生產環境
develop 分支 push → 自動部署到預覽環境
Pull Request → 自動建立預覽部署
```

---

## 📱 自訂域名設定

### 在 Vercel 設定自訂域名

1. 前往 Project Settings → Domains
2. 輸入您的域名（例如：bitcoin24.app）
3. 依照指示設定 DNS：
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. 等待 DNS 生效（可能需要 24-48 小時）

---

## 🔒 安全設定

### 已配置的安全標頭

在 `vercel.json` 中已設定：

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 📊 監控設置

### Vercel Analytics（免費）

在專案中已自動啟用：
- Page Views
- Unique Visitors
- Top Pages
- Referrers

### Google Analytics（可選）

1. 建立 GA4 Property
2. 獲取 Measurement ID
3. 添加到環境變數：
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. 在 layout 中添加 GA 腳本

### Web Vitals 監控

已內建在 Next.js 中，Vercel Dashboard 可查看：
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)

---

## 🐛 錯誤追蹤（可選）

### Sentry 整合

```bash
# 安裝 Sentry
npm install @sentry/nextjs

# 初始化
npx @sentry/wizard@latest -i nextjs
```

配置環境變數：
```env
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

---

## 🔄 更新部署

### 自動更新
```bash
# 推送到 main 分支自動部署
git add .
git commit -m "Update feature"
git push origin main

# Vercel 會自動偵測並部署
```

### 手動部署
```bash
# 使用 Vercel CLI
vercel --prod
```

### 回滾
```bash
# 在 Vercel Dashboard 中
# Deployments → 選擇舊版本 → Promote to Production
```

---

## 📈 效能優化建議

### 已實現
- ✅ Next.js Image 優化
- ✅ Font 優化
- ✅ Code Splitting
- ✅ Tree Shaking
- ✅ Production console.log 移除

### 建議追加
- [ ] 圖表懶加載
- [ ] Web Worker（密集計算）
- [ ] Service Worker（PWA）
- [ ] CDN 配置

---

## 🌍 多地區部署

### Vercel Edge Network

自動在全球部署：
- 🇺🇸 美國（多個節點）
- 🇪🇺 歐洲（多個節點）
- 🇯🇵 日本（Tokyo）
- 🇸🇬 新加坡
- 🇦🇺 澳洲

使用者會自動連接到最近的節點。

---

## 📞 常見問題

### Q: 部署需要多久？
A: 首次部署約 2-3 分鐘，後續更新約 1-2 分鐘。

### Q: 費用如何計算？
A: Vercel Hobby 方案免費，包含：
- 100 GB 頻寬
- 無限部署
- 自動 SSL
- 全球 CDN

### Q: 如何查看部署日誌？
A: Vercel Dashboard → Deployments → 選擇部署 → View Function Logs

### Q: 支援自訂域名嗎？
A: 支援！可以在 Project Settings → Domains 添加。

---

## 🎯 部署檢查清單

### 部署前
- [x] 執行 `npm run build` 確認建置成功
- [x] 執行 `npm run lint` 無錯誤
- [x] 執行 `npm run type-check` 無錯誤
- [x] 執行 `npm run test` 所有測試通過
- [x] 檢查 `.gitignore` 正確
- [x] 移除敏感資訊
- [x] 更新 README.md

### 部署後
- [ ] 驗證所有頁面載入
- [ ] 測試所有功能
- [ ] 測試語言切換
- [ ] 檢查 Lighthouse Score
- [ ] 測試響應式設計
- [ ] 測試 Dark Mode
- [ ] 設定監控
- [ ] 設定錯誤追蹤

---

## 🎉 恭喜！

按照此指南，您可以輕鬆將 Bitcoin24 部署到生產環境！

**預估部署時間**: 15-30 分鐘  
**難度**: ⭐⭐ (簡單)

---

**準備好部署了嗎？讓我們開始！** 🚀

