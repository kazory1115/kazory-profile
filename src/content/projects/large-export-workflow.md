---
id: 3
title: 大型匯出流程與 timeout 問題整理
year: 2026
category: 效能優化
description: 將大量資料匯出與壓縮流程拆成可追蹤、可重試的批次處理路徑。
technologies: PHP, MySQL, Batch Processing, Zip, Large File Export
---

## 問題背景

匯出功能在資料量小時通常運作正常；當資料逐步累積，一次全撈、大量 join、檔案寫入與壓縮會全部堆在同一個 HTTP request。

## 症狀背後的原因

Timeout 只是最後看到的現象，根本原因包含記憶體尖峰、SQL 負載、I/O 阻塞，以及流程缺少可觀測的階段。

## 改造方式

- 將查詢改為 chunk / batch，控制單次記憶體用量。
- 拆開資料生成、暫存、壓縮與下載。
- 重新檢查索引、join 成本與不必要的資料搬運。
- 為未來 Queue / Worker 保留明確的切入點。

## 結果與反思

大型匯出不該靠提高 `max_execution_time` 維持。穩定的流程必須能知道目前做到哪裡、失敗在哪裡，以及能否從中斷的位置重新執行。
