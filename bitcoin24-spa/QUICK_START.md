# 🚀 Bitcoin24 快速啟動指南

## ⏱️ 5 分鐘快速開始

### 步驟 1️⃣：安裝 Node.js

**如果尚未安裝 Node.js：**

1. 訪問：https://nodejs.org/
2. 下載 **LTS 版本**（綠色按鈕）
3. 執行安裝程式（一直點「下一步」即可）
4. **重新啟動電腦**

**驗證安裝：**
開啟 PowerShell，執行：
```bash
node --version
```
看到 `v20.x.x` 即代表成功！

---

### 步驟 2️⃣：安裝專案依賴

**方法 A：使用自動化腳本（推薦）**

雙擊 `INSTALL.bat`，等待完成。

**方法 B：手動安裝**

開啟 PowerShell，執行：
```bash
cd C:\Users\dennis.lee\Documents\GitHub\bitcoin_model\bitcoin24-spa
npm install
```

---

### 步驟 3️⃣：啟動開發伺服器

**方法 A：使用自動化腳本（推薦）**

雙擊 `START.bat`

**方法 B：手動啟動**

```bash
npm run dev
```

---

### 步驟 4️⃣：開啟瀏覽器

訪問：**http://localhost:3000/zh-TW**

🎉 **成功！** 您應該會看到 Bitcoin24 的介紹頁面！

---

## 🌍 切換語言

- 繁體中文：http://localhost:3000/zh-TW
- 简体中文：http://localhost:3000/zh-CN
- English：http://localhost:3000/en
- 日本語：http://localhost:3000/ja

---

## 🛠️ 常用命令

```bash
# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build

# 啟動生產伺服器
npm run start

# 執行測試
npm run test

# 程式碼格式化
npm run format

# 型別檢查
npm run type-check
```

---

## ❓ 遇到問題？

### 問題：Port 3000 已被佔用
```bash
npm run dev -- -p 3001
```
然後訪問：http://localhost:3001

### 問題：依賴安裝失敗
```bash
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install
```

### 問題：找不到 npm 命令
確認 Node.js 已正確安裝，並重新啟動電腦。

---

## 📚 更多資訊

- 詳細安裝：[SETUP_GUIDE.md](SETUP_GUIDE.md)
- 專案說明：[README.md](README.md)
- 開發計劃：[../DEVELOPMENT_PLAN.md](../DEVELOPMENT_PLAN.md)

---

**準備好開始開發了嗎？** 🎯

下一步：查看 [DEVELOPMENT_PLAN.md](../DEVELOPMENT_PLAN.md) 了解完整的開發路線圖！

