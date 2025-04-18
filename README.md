# Vue 3 + Vite 專案

[![繁體中文](https://img.shields.io/badge/語言-繁體中文-blue)](https://github.com/kazory1115/vue_app/blob/main/README.md)
[![English](https://img.shields.io/badge/Language-English-blue)](https://github.com/kazory1115/vue_app/blob/main/README.en.md)




本專案使用 Vue 3 和 Vite 構建，為您的網頁應用程式提供快速且現代化的開發環境。
https://github.com/kazory1115/vue_app
## 特色功能

- ⚡️ 使用 [Vite](https://vitejs.dev/) 實現**閃電般快速的開發體驗**
- 🛠️ **Vue 3 組合式 API** 搭配 `<script setup>` 語法
- 📱 內建**響應式設計**
- 🚦 使用 **Vue Router** 實現無縫導航

## 專案結構

```
vue_test/
├─ public/                 # 靜態資源（直接複製到 dist/ 目錄）
│  └─ favicon.svg          # 預設網站圖示（可替換）
│
├─ src/                    # 原始碼
│  ├─ assets/              # 圖片、CSS、字型和其他資源
│  ├─ components/          # 可重用組件（按鈕、卡片等）
│  ├─ views/               # 路由組件/頁面（首頁、關於我們等）
│  ├─ router/              # Vue Router 配置
│  │  └─ index.js          # 路由設置和路由定義
│  ├─ App.vue              # 主要組件（佈局和路由視圖）
│  └─ main.js / main.ts    # 應用程式入口點
│
├─ index.html              # 主要 HTML 文件（JS 將被注入）
├─ vite.config.js          # Vite 配置
├─ package.json            # 相依套件和腳本
└─ tsconfig.json           # TypeScript 配置（如適用）
```

## 開始使用

### 前置需求

- [Node.js](https://nodejs.org/) (v14+)
- npm 或 yarn

### 安裝步驟

1. 複製儲存庫：
   ```bash
   git clone <repository-url>
   cd vue_test
   ```

2. 安裝相依套件：
   ```bash
   npm install
   ```

3. 安裝 Vue Router（如果尚未安裝）：
   ```bash
   npm install vue-router
   ```

4. 啟動開發伺服器：
   ```bash
   npm run dev
   ```

5. 建置生產版本：
   ```bash
   npm run build
   ```

## IDE 支援

為獲得最佳開發體驗，我們推薦：
- [VS Code](https://code.visualstudio.com/) 搭配 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 擴充功能
- 若已安裝 Vetur，請停用它
- 查看 [Vue 文件的擴展指南](https://vuejs.org/guide/scaling-up/tooling.html#ide-support) 了解更多 IDE 建議

## 相關資源

- [Vue 3 文件](https://vuejs.org/)
- [Script Setup 文件](https://v3.vuejs.org/api/sfc-script-setup.html)
- [Vite 文件](https://vitejs.dev/)
- [Vue Router 文件](https://router.vuejs.org/)
