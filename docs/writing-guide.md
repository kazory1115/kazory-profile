# Markdown 文章撰寫指南

每篇文章都是 `src/content/writings/` 下的獨立 `.md` 檔。檔名會自動成為網址 slug：

```text
src/content/writings/my-new-note.md
                         └─ #/writing/my-new-note
```

## 基本格式

```md
---
title: 文章標題
date: 2026-07-21
category: Refactoring
status: Published
excerpt: 顯示在文章列表的摘要。
tags: PHP, CodeIgniter, Refactoring
---

## 第一個段落

文章內容支援一般 Markdown、GFM 表格、清單、引用、連結與 fenced code block。
```

## 欄位規則

- `title`：文章標題。
- `date`：使用 `YYYY-MM-DD`，文章列表會依日期由新到舊排序。
- `category`：建議沿用 `Refactoring`、`Performance`、`Realtime`、`Workflow`；新增分類時也要更新 `src/data/site.js` 的 `noteCollections`。
- `status`：省略時預設為 `Published`。
- `excerpt`：文章卡片摘要，也會納入搜尋。
- `tags`：以半形逗號分隔。
- `readTime`：選填；未填時會依內文字數自動估算。

新增或刪除 Markdown 檔後，不需修改 JavaScript、router 或文章列表。

## 專案案例

專案放在 `src/content/projects/`，檔名只用於辨識，route 目前沿用 front matter 的 `id`：

```md
---
id: 5
title: 專案名稱
year: 2026
category: Refactoring
description: 顯示在專案列表的簡短說明。
technologies: PHP, CodeIgniter, MySQL
link: https://github.com/example/repository
---

## 專案背景

以一般 Markdown 撰寫完整案例。
```

`link` 可以省略；新增案例不需要修改 `site.js` 或專案列表。
