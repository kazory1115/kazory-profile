---
id: 2
title: CodeIgniter 3 升級到 CodeIgniter 4
year: 2026
category: 系統重構
description: 把版本升級與責任分層一起處理，重新整理 Controller、Model、Service 與 API 的邊界。
technologies: PHP, CodeIgniter 3, CodeIgniter 4, Service Layer, RESTful API, SonarQube
---

## 專案背景

既有系統真正困難的通常不是框架版本舊，而是流程與相依關係纏在一起。任何需求都可能同時牽動 Controller、Model、view 與共用 helper。

## 工程挑戰

升級不能只是搬移檔案。除了 CI3 與 CI4 的框架差異，還要同步處理相依套件、route、既有 API 行為，以及正在運行的業務流程。

## 重構策略

1. 盤點可以平移與需要重寫的區塊。
2. 將跨多個 Model 的流程抽到 Service。
3. 標準化 API response，使前端串接行為穩定。
4. 透過 SonarQube 找出最容易惡化的技術債。

## 關鍵取捨

Service Layer 不是萬能收納盒。如果沒有 use case 邊界與命名規則，只會從 fat controller 變成 fat service。因此重構的核心不是多一層 class，而是讓責任與 transaction 邊界可被看見。

## 結果

升級的價值不只在框架版本更新，更在於讓後續需求的影響範圍重新變得可預期。
