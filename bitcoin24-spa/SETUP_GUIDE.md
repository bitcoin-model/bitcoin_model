# Bitcoin24 SPA 安裝指南

## ⚠️ 重要：Node.js 安裝

在開始之前，您需要先安裝 Node.js。

### Windows 安裝步驟

1. **下載 Node.js**
   - 訪問 https://nodejs.org/
   - 下載 LTS 版本（推薦 v20.x）
   - 選擇 Windows Installer (.msi)

2. **執行安裝程式**
   - 雙擊下載的 `.msi` 檔案
   - 按照安裝嚮導進行
   - ✅ 勾選「Automatically install necessary tools」
   - 完成安裝

3. **驗證安裝**
   
   開啟新的 PowerShell 或 Command Prompt，執行：
   
   ```bash
   node --version
   # 應該顯示: v20.x.x
   
   npm --version
   # 應該顯示: 10.x.x
   ```

   如果顯示版本號，表示安裝成功！

---

## 📦 專案安裝步驟

### 步驟 1：進入專案目錄

```bash
cd C:\Users\dennis.lee\Documents\GitHub\bitcoin_model\bitcoin24-spa
```

### 步驟 2：安裝依賴

```bash
npm install
```

這個步驟會安裝所有必要的套件，可能需要 3-5 分鐘。

### 步驟 3：啟動開發伺服器

```bash
npm run dev
```

看到以下訊息表示成功：

```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

  ✓ Ready in 2.3s
```

### 步驟 4：開啟瀏覽器

訪問：http://localhost:3000/zh-TW

您應該會看到 Bitcoin24 的介紹頁面！

---

## 🔧 常見問題排解

### 問題 1：「npm 不是內部或外部命令」

**解決方法：**
1. 確認 Node.js 已正確安裝
2. 重新啟動電腦
3. 檢查環境變數中是否有 Node.js 路徑
4. 重新安裝 Node.js

### 問題 2：安裝過程中出現 EACCES 或權限錯誤

**解決方法：**
```bash
# 以管理員身份執行 PowerShell
```

### 問題 3：Port 3000 已被佔用

**解決方法：**
```bash
# 使用不同的 port
npm run dev -- -p 3001
```

### 問題 4：依賴安裝失敗

**解決方法：**
```bash
# 清除快取並重新安裝
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install
```

---

## 📱 下一步

安裝完成後，您可以：

1. **修改語言**
   - 訪問 http://localhost:3000/en （英文）
   - 訪問 http://localhost:3000/zh-CN （簡體中文）
   - 訪問 http://localhost:3000/ja （日文）

2. **開始開發**
   - 修改 `src/app/[locale]/page.tsx` 查看即時變更
   - 所有更改會自動熱重載

3. **建置生產版本**
   ```bash
   npm run build
   npm run start
   ```

---

## 📞 需要協助？

如果遇到任何問題，請檢查：
1. Node.js 版本是否 >= 18.0.0
2. npm 版本是否 >= 9.0.0
3. 所有檔案是否正確下載
4. 防火牆是否阻擋 port 3000

---

**祝您開發順利！** 🚀

