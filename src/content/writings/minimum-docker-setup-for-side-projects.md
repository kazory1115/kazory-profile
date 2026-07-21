---
title: Side project 的 Docker 骨架，我會先準備哪些東西
date: 2026-03-02
category: 開發流程
status: 已發布
excerpt: Docker 不只是方便啟動，而是讓環境、README 與部署流程有一致基準。
tags: Docker, DX, Laravel
---

## Minimum Setup

至少要有 app、db、web server 與 env 說明，讓另一個工程師不靠口頭說明也能把專案跑起來。

```text
project/
├── compose.yaml
├── .env.example
├── docker/
└── README.md
```

## Why It Matters

很多 side project 不是不能做，而是幾個月後自己都忘了怎麼啟動。沒有一致骨架，作品就很難累積。

## What I Include

- 可直接複製的 `.env.example`
- ports 與 volume 用途
- 啟動、停止、重建與 migration 指令
- 最小資料初始化方式
- 常見問題與平台差異

README 不是完成後才補的裝飾，而是開發介面的一部分。
