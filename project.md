# Kazory Profile 架構說明

## 目標

目前是靜態前端，但資料邊界按未來 API／資料庫情境設計：頁面只組合 UI 與互動狀態，不知道資料來自 JSON、HTTP 或資料庫。

## 分層

```text
Presentation
  views / components
        ↓
Application state
  composables（loading、error、filters、site cache）
        ↓
Data access contract
  repositories（list、detail、facets、navigation）
        ↓
Domain boundary
  schema validation / normalization
        ↓
Data source
  local JSON → future HTTP adapter
```

### Presentation

- `views/` 僅負責頁面組合與 route 參數。
- `components/common/` 放跨領域 UI。
- `components/content/` 放作品／文章共用 UI 與安全 content renderer。
- `components/layout/` 放 app shell 級元件。

### Application state

- `useAsyncData`：一次性非同步資料。
- `useAsyncResource`：route identity 改變時重取詳情，包含 race protection。
- `useRepositoryList`：filters 改變時重新查詢列表，包含 race protection。
- `useSiteContent`：跨 Navbar、footer、Home、About 共用 site request/cache。
- `useTheme`：將 theme 與導覽職責分離，mount 前套用已儲存主題。

### Repository

Repository 一律回傳 Promise，使 local JSON 與 HTTP adapter 的使用方式一致。

```js
projectRepository.list(options)
projectRepository.getById(id)
projectRepository.getBySlug(slug)

writingRepository.list(options)
writingRepository.getBySlug(slug)

siteRepository.get()
```

列表回傳：

```js
{
  items,      // summary，不含大型 content
  total,      // 套用 filters 後數量
  available,  // 公開資料總量
  facets      // categories / tags / technologies / statuses
}
```

文章詳情另回傳 `navigation.previous` / `navigation.next`，因此改用 server-side pagination 後仍可保留導航。

## Canonical data

Projects 與 writings 使用明確型別：

- identity 一律字串，不再混用 number / slug fallback。
- status 一律為 `published | draft`，顯示文字留給 UI mapping。
- 日期一律為 ISO `YYYY-MM-DD` 或 `null`。
- tags / technologies 是 array，不使用逗號字串。
- `featuredRank` 與 `sortOrder` 明確表達商業排序，不依賴 ID 或資料回傳順序。
- canonical 只儲存 content blocks，不儲存衍生 HTML。

## 安全界線

舊架構使用 `marked.parse()` 後交給 `v-html`。這在內容改由資料庫或 CMS 維護時會形成 stored XSS 風險。

目前改由 schema 限定的 blocks 與 Vue text binding 呈現：文字自動 escape；URL 僅允許 HTTPS；未知 block type 直接驗證失敗。若未來必須支援 CMS HTML，後端與前端都需使用 allowlist sanitizer，不能直接恢復 `v-html`。

## 建議資料庫形狀

### projects

```text
id (uuid/string PK)
slug (unique)
title
year nullable
category_id
description
source_url nullable
status
sort_order
featured_rank nullable
content_json
created_at / updated_at
```

### writings

```text
id (uuid/string PK)
slug (unique)
title
published_at nullable
category_id
status
excerpt
reading_minutes
featured_rank nullable
content_json
created_at / updated_at
```

`tags` 與 `technologies` 若需要搜尋、統計或後台管理，使用多對多關聯表；內容 blocks 可先放 JSON 欄位。Site profile 變更頻率低，可先保留 schema-versioned JSON document，不需要過早拆成多張表。

## HTTP adapter 路線

1. 新增與 local repository 相同 contract 的 HTTP repository。
2. 以同一組 contract tests 驗證 local / HTTP adapters。
3. 列表 API 處理 search、filters、facets 與 pagination；不要把所有全文送到 browser。
4. 詳情 API 才回傳 content 與相鄰文章。
5. Public API 強制 `status=published`；草稿預覽需獨立且受保護。
6. 保留既有 URL 或提供 redirect，再逐步切換 slug route。

## 品質閘門

`npm run check` 依序執行：

1. canonical JSON validation；
2. schema 與 repository tests；
3. production build。

CI 應在 pull request 執行相同檢查，主分支通過後才部署。
