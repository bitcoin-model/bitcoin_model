# Cloudflare Pages 部署成功檢查清單 | Deployment Success Checklist

## 🎯 快速修復步驟 | Quick Fix Steps

### Step 1: 更新 next.config.js

```bash
# 備份原檔案 | Backup original file
cp next.config.js next.config.backup.js

# 使用修復版本 | Use fixed version
cp next.config.fixed.js next.config.js
```

**或手動編輯 | Or manually edit** `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',      // 添加這行 | Add this line
  distDir: 'out',        // 添加這行 | Add this line
  images: {
    unoptimized: true,   // 添加這行 | Add this line
  },
  // ... 其他設定保持不變 | ... keep other settings
};
```

### Step 2: 本地測試 | Local Test

```bash
npm run build
```

**成功訊息 | Success message**:
```
✓ Generating static pages (35/35)
✓ Exporting (35/35)
Export successful. Files written to out/
```

**檢查輸出 | Check output**:
```bash
ls out/
# 應該看到 | Should see:
# - _next/
# - zh-TW/
# - zh-CN/
# - en/
# - ja/
```

### Step 3: 提交變更 | Commit Changes

```bash
git add next.config.js
git commit -m "fix: enable static export for Cloudflare Pages deployment"
git push origin main
```

### Step 4: 等待 Cloudflare 重新部署 | Wait for Cloudflare Redeploy

- 推送後 Cloudflare Pages 會自動觸發建置 | Automatic build triggered after push
- 預計 2-3 分鐘完成 | Expected 2-3 minutes to complete
- 訪問部署日誌查看進度 | Check deployment logs for progress

---

## ✅ 驗證清單 | Verification Checklist

### 建置驗證 | Build Verification
- [ ] 本地建置成功 | Local build successful
- [ ] `out/` 目錄存在 | `out/` directory exists
- [ ] 所有路由檔案都在 `out/` 中 | All route files in `out/`
- [ ] 無建置錯誤或警告 | No build errors or warnings

### Cloudflare 驗證 | Cloudflare Verification
- [ ] 建置日誌顯示成功 | Build logs show success
- [ ] 部署狀態為 "Active" | Deployment status is "Active"
- [ ] 取得部署 URL | Obtained deployment URL

### 功能驗證 | Functional Verification
- [ ] 首頁可訪問 | Homepage accessible
- [ ] 所有 8 個頁面可訪問 | All 8 pages accessible
- [ ] 語言切換正常 | Language switching works
- [ ] 圖表顯示正常 | Charts display correctly
- [ ] 表單輸入正常 | Forms work correctly
- [ ] 響應式設計正常 | Responsive design works

---

## 📊 預期結果 | Expected Results

### 建置輸出 | Build Output

```
Route (app)                              Size     First Load JS
┌ ○ /_not-found                          876 B          88.3 kB
├ ● /[locale]                            187 B          97.4 kB
├ ● /[locale]/btc                        2.22 kB         168 kB
├ ● /[locale]/corporate                  1.29 kB         281 kB
├ ● /[locale]/individual                 11.5 kB         291 kB
├ ● /[locale]/institution                1.3 kB          281 kB
├ ● /[locale]/macro                      1.08 kB         142 kB
├ ● /[locale]/nation-state               1.32 kB         281 kB
└ ● /[locale]/united-states              1.82 kB         281 kB

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML
```

### Cloudflare 成功訊息 | Cloudflare Success Message

```
✓ Deploying your site to Cloudflare's global network...
✓ Deployment complete!
✓ Success! Deployed to https://your-site.pages.dev
```

---

## 🔧 Cloudflare Pages 設定 | Cloudflare Pages Settings

### 建置設定 | Build Settings

```yaml
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Root directory: (leave empty)
Environment variables:
  NODE_VERSION: 18
```

### 自訂域名 | Custom Domain (Optional)

1. 前往 Cloudflare Pages Dashboard
2. 選擇專案
3. 點擊 "Custom domains"
4. 添加你的域名 | Add your domain
5. 配置 DNS 記錄 | Configure DNS records

---

## 🐛 故障排除 | Troubleshooting

### 問題 1: 仍然找不到 out 目錄

**檢查**:
```bash
# 確認 next.config.js 已更新
cat next.config.js | grep "output"
# 應該看到: output: 'export',

# 清理並重新建置
rm -rf .next out
npm run build
```

### 問題 2: 圖片無法顯示

**解決**:
- 確認 `images: { unoptimized: true }` 已設定
- 使用相對路徑: `/images/logo.png`
- 檢查 `public/` 目錄結構

### 問題 3: 動態路由問題

**解決**: 確保使用 `generateStaticParams` 預先生成所有路由

```typescript
export async function generateStaticParams() {
  return [
    { locale: 'zh-TW' },
    { locale: 'zh-CN' },
    { locale: 'en' },
    { locale: 'ja' },
  ];
}
```

### 問題 4: next-intl 警告

**解決**: 更新 `src/i18n/request.ts`:

```typescript
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  return {
    locale,  // 添加這行 | Add this line
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
```

---

## 📞 取得幫助 | Get Help

### 文檔資源 | Documentation Resources

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Cloudflare Pages Next.js Guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

### 社群支援 | Community Support

- [Next.js Discord](https://discord.gg/nextjs)
- [Cloudflare Community](https://community.cloudflare.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

## ✨ 部署成功後的下一步 | Next Steps After Successful Deployment

### 中文
1. 配置自訂域名
2. 啟用 Cloudflare Analytics
3. 設置 Auto Minify 和快取
4. 配置 HTTPS 和 SSL
5. 測試所有功能

### English
1. Configure custom domain
2. Enable Cloudflare Analytics
3. Set up Auto Minify and caching
4. Configure HTTPS and SSL
5. Test all functionalities

---

**建立時間 | Created**: 2025-10-11  
**更新時間 | Updated**: 2025-10-11  
**狀態 | Status**: ✅ Ready to use

