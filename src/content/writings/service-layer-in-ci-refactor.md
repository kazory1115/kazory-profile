---
title: CodeIgniter 重構時，Service Layer 要怎麼拆才不會再長歪
date: 2026-03-30
category: 系統重構
status: 草稿
excerpt: 整理舊專案時，最大的坑通常不是框架版本，而是流程散在 Controller 與 Model。這篇聚焦 Service Layer 的切法與邊界。
tags: CodeIgniter, Refactoring, Service Layer
---

## Problem Statement

很多人說要抽 Service，但如果沒有明確邊界，只是把 Controller 裡的流程搬家，最後只會得到另一個更大的 Service。

> Service 應負責商業流程編排，而不是同時吞下查詢細節、格式轉換、權限判斷與所有例外處理。

## Design Approach

- 找出真正跨 Model、跨流程的商業規則。
- 用 use case 命名，例如 `CreateQuoteService`。
- 讓 transaction 邊界由 application service 掌握。
- 避免 `CommonService`、`BaseService` 這類容易失控的容器。

## Implementation Notes

Controller 只負責接收輸入與回傳結果，Service 編排流程，Repository 專注資料存取。

```php
$result = $createQuoteService->execute($command);
return $this->respondCreated($result);
```

這樣拆分的價值不是檔案變多，而是需求變更時能快速判斷應該修改哪一層。
