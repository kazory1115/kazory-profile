---
id: 1
title: Easy CRM
year: 2026
category: 全端開發案例
description: 以 Vue 3 + Laravel 12 建立可延伸的 CRM 骨架，聚焦模組切分、API 設計、狀態管理與容器化流程。
technologies: Vue 3, Vite, Pinia, Laravel 12, Sanctum, MySQL, Docker Compose
link: https://github.com/kazory1115/easy-crm
---

## 專案背景

這個專案的目標不是再完成一套 CRUD demo，而是驗證一套 side project 能否從第一天就具備可延伸的工程結構。除了功能本身，也把權限、模組邊界、README 與啟動流程視為產品的一部分。

## 要解決的問題

許多練習專案可以操作，卻很難繼續發展。當報價、庫存、報表等需求加入後，頁面、狀態與 API 很快互相纏繞。

> 真正的挑戰不是把 CRM 做出來，而是讓下一個功能進來時，不需要推翻原有結構。

## 實作方式

- 前端以 Vue 3、Vite、Pinia 與 Vue Router 分離頁面、狀態與 API 呼叫。
- 後端以 Laravel 12 與 Sanctum 管理認證、API route 與資料操作。
- 使用 Docker Compose 建立一致的本地環境。
- 補齊環境設定、模組說明與常用指令，降低重新接手成本。

## 結果與反思

現有模組可以繼續承接報價、庫存或報表需求。這個案例也確認了一件事：作品集不應只展示畫面，更要能說清楚資料如何流動，以及架構為什麼這樣選。
