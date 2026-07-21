---
title: 大型匯出避免 timeout，不是調大時間就好
date: 2026-03-22
category: 效能優化
status: 已發布
excerpt: 大量資料與壓縮檔處理真正要拆的是批次、檔案步驟與流程責任，而不是只調整 PHP 設定。
tags: Batch, Export, Performance
---

## Root Cause

Timeout 只是症狀，背後通常伴隨一次全撈、大量 join、檔案 I/O 堆疊，以及 request 長時間佔住 worker。

## Recommended Flow

1. 查詢資料並依固定大小分批。
2. 將結果寫入暫存檔。
3. 完成後再壓縮。
4. 記錄狀態並提供下載。

資料量再大一點時，應直接評估 queue / worker，讓每段可觀測、可重試。

## Operational Notes

Windows / Linux 路徑差異、中文檔名與暫存檔清理策略，都應在一開始設計好。批次大小也需要依記憶體尖峰與查詢時間實測。
