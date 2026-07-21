---
title: SSE 與 WebSocket：什麼場景該用哪個
date: 2026-03-14
category: 即時通訊
status: 已發布
excerpt: 如果需求只是伺服器單向更新，SSE 常比 WebSocket 更直接；真正需要雙向互動時再承擔額外複雜度。
tags: SSE, WebSocket, Realtime
---

## Decision Rule

先確認需求是否真的需要雙向溝通。

| 情境 | 建議 |
| --- | --- |
| 進度、通知、log stream | SSE |
| 聊天、協作、即時遊戲 | WebSocket |
| 偶爾更新 | Polling 也可能足夠 |

## Trade-offs

WebSocket 更有彈性，但連線管理、狀態同步與重連策略也更複雜。需求沒到那個程度，不需要先把系統做重。

```js
const stream = new EventSource('/events');
stream.onmessage = ({ data }) => console.log(JSON.parse(data));
```

## Practical Notes

選型前先寫出事件方向、頻率、資料量與斷線後的期待行為，答案通常就會清楚很多。
