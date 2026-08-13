# JSON 內容維護指南

內容位於：

- `src/content/projects.json`
- `src/content/writings.json`
- `src/content/site.json`

修改後執行：

```bash
npm run validate:content
```

驗證器會檢查必填欄位、資料型別、日期、狀態、URL、重複 ID／slug，以及 content block 結構。

## 新增文章

```json
{
  "slug": "repository-pattern-notes",
  "title": "Repository Pattern 實作筆記",
  "publishedAt": "2026-08-13",
  "category": "系統設計",
  "status": "published",
  "excerpt": "列表使用的一句話摘要。",
  "tags": ["Repository", "API"],
  "readingMinutes": 5,
  "featuredRank": null,
  "content": [
    { "type": "heading", "level": 2, "text": "問題背景" },
    { "type": "paragraph", "text": "文章段落。" },
    { "type": "list", "ordered": false, "items": ["項目一", "項目二"] }
  ]
}
```

- `slug`：唯一且穩定的文章網址識別。
- `publishedAt`：`YYYY-MM-DD`；草稿尚未決定日期時可用 `null`。
- `status`：只能是 `published` 或 `draft`。公開列表預設隱藏草稿。
- `featuredRank`：精選排序；不精選填 `null`。
- `readingMinutes`：正整數，由資料層轉成顯示文字。

## 新增專案

```json
{
  "id": "5",
  "slug": "new-project",
  "title": "專案名稱",
  "year": 2026,
  "category": "系統重構",
  "description": "列表使用的專案摘要。",
  "technologies": ["PHP", "Vue 3", "MySQL"],
  "sourceUrl": "https://github.com/example/repository",
  "status": "published",
  "sortOrder": 5,
  "featuredRank": null,
  "content": [
    { "type": "heading", "level": 2, "text": "專案背景" },
    { "type": "paragraph", "text": "案例內容。" }
  ]
}
```

- `id` 與 `slug` 都必須唯一；`id` 一律使用字串。
- `sourceUrl` 只能是 HTTPS URL，沒有連結時填 `null`。
- `sortOrder` 控制完整列表順序，不再把資料庫 ID 當排序規則。

## Content blocks

支援下列 block：

```json
{ "type": "heading", "level": 2, "text": "標題" }
{ "type": "paragraph", "text": "段落" }
{ "type": "quote", "text": "引用" }
{ "type": "list", "ordered": true, "items": ["第一項"] }
{ "type": "code", "language": "js", "code": "console.log('ok')" }
{ "type": "table", "headers": ["欄位", "用途"], "rows": [["id", "識別"]] }
```

所有文字由 Vue escape 後呈現；不要在文字欄位放 HTML。若未來接 CMS，API 也應回傳相同 block shape，避免重新引入未清洗的 HTML。
