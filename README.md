# Vue 3 + Vite 專案

[![繁體中文](https://img.shields.io/badge/語言-繁體中文-blue)](https://github.com/kazory1115/vue_app/blob/main/README.md)
[![English](https://img.shields.io/badge/Language-English-blue)](https://github.com/kazory1115/vue_app/blob/main/README.en.md)




本專案使用 Vue 3 和 Vite 構建，為您的個人網頁與作品集提供快速且現代化的開發環境。
https://github.com/kazory1115/vue-profile

## 特色功能

- ⚡️ 使用 [Vite](https://vitejs.dev/) 實現**極速本地開發與建置體驗**
- 🎨 **現代簡約排版** 搭配細緻的自訂 CSS 變數（支援深色/淺色模式切換）
- 📝 **動態 Markdown 載入與解析**，新增專案與文章不需手動修改元件與路由
- 🚦 使用 **Vue Router** 實現無縫導航與流暢的頁面切換動畫

## 專案結構

```
kazory-profile/
├─ public/                 # 靜態資源（直接複製到 dist/ 目錄）
├─ src/                    # 原始碼
│  ├─ assets/              # 圖片、CSS（包含全新 index.css、custom.css 樣式系統）
│  ├─ components/          # 可重用組件（Navbar 等）
│  ├─ views/               # 路由頁面（首頁、關於我、專案列表、文章列表、詳細頁等）
│  ├─ router/              # Vue Router 配置
│  ├─ content/             # Markdown 文章與專案原始內容 🚀
│  │  ├─ projects/         # 專案 Markdown 檔案
│  │  └─ writings/         # 技術文章 Markdown 檔案
│  ├─ data/                # 資料解析器與靜態定義
│  │  ├─ markdown.js       # Markdown 與 Frontmatter 解析器
│  │  ├─ projects.js       # 自動匯入並排序專案
│  │  ├─ writings.js       # 自動匯入並排序文章
│  │  └─ site.js           # 個人資訊與靜態配置
│  ├─ App.vue              # 主要組件與 Layout 佈局
│  └─ main.js              # 應用程式入口點
├─ index.html              # 主要 HTML 文件
├─ vite.config.js          # Vite 配置
└─ package.json            # 相依套件和腳本
```

## 如何新增文章與專案經歷

本專案高度自動化，您只需要在 `src/content/` 對應的資料夾下新增 Markdown 檔案，頁面便會自動載入、解析並渲染。

### 1. 新增技術文章

在 `src/content/writings/` 資料夾下，新增 `.md` 檔案（例如 `my-new-post.md`），並在頂部加入 Frontmatter：

```markdown
---
title: 這裡輸入文章標題
date: 2026-07-21
category: 效能優化
status: 已發布
excerpt: 這裡輸入文章的一句話摘要，會顯示在文章卡片上。
tags: Laravel, Batch, Performance
---

這裡是文章的 Markdown 內文。
您可以使用 `## 標題`，或是程式碼區塊等。
```

- **status**: 可設為 `已發布`（會以綠色標記）或 `Draft`（會以橘色標記）。

### 2. 新增專案經歷

在 `src/content/projects/` 資料夾下，新增 `.md` 檔案（例如 `my-new-project.md`），並在頂部加入 Frontmatter：

```markdown
---
id: 5
title: 專案名稱
year: 2026
category: 全端開發案例
description: 這裡輸入專案的簡短描述。
technologies: Vue 3, Laravel, TailwindCSS
link: https://github.com/your-username/repo-name
---

這裡是專案的詳細介紹。
您可以寫專案背景、要解決的問題、實作方式與反思。
```

- **id**: 專案排序依據（數字越小越前面）。
- **link**: 填入 GitHub 連結或專案連結，詳細頁會自動產生「查看原始碼」按鈕；若不填則不會顯示該按鈕。

---

## 開始使用

### 前置需求

- [Node.js](https://nodejs.org/) (v16+)
- npm 或 yarn

### 安裝步驟

1. 複製儲存庫：
   ```bash
   git clone <repository-url>
   cd kazory-profile
   ```

2. 安裝相依套件：
   ```bash
   npm install
   ```

3. 啟動開發伺服器：
   ```bash
   npm run dev
   ```

4. 建置生產版本：
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

