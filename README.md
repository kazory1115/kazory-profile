# Kazory Profile

以 Vue 3 與 Vite 建置的個人作品集。內容目前由版本控制內的 JSON 提供，但頁面不直接依賴 JSON；所有讀取都經過非同步 Repository，因此後續可換成 REST API 與資料庫，而不必重寫頁面。

## 技術與設計重點

- Vue 3、Vue Router、Vite、Tailwind CSS 4
- 專案、文章與網站設定採明確 JSON schema
- Repository 統一列表、篩選、詳情、facets 與文章導航
- Runtime validation 在建置前攔截缺欄位、重複 ID／slug 與不安全 URL
- 文章內文使用結構化 content blocks 與 Vue text binding，不使用 `v-html`
- 已發布與草稿是固定 enum；公開頁面預設不回傳草稿

## 資料流

```text
Vue Views
    ↓ async contract
Repositories
    ↓ validate / map / filter
Local JSON adapter（目前）
    ↓ 未來只替換 adapter
REST API → Service → Database
```

JSON 的價值是先固定前後端資料契約；真正降低資料庫遷移成本的是 Repository 邊界，而不是檔案副檔名本身。

## 專案結構

```text
src/
├── components/
│   ├── common/          # 載入狀態、篩選工具等通用 UI
│   ├── content/         # 內容 renderer 與列表項目
│   └── layout/          # Layout 級元件
├── composables/         # 非同步狀態、Repository list、主題與 site cache
├── content/             # projects.json、writings.json、site.json
├── domain/              # canonical schema 與 runtime validator
├── repositories/        # 頁面唯一允許依賴的資料存取介面
├── router/              # 路由設定
├── views/               # 路由頁面與頁面組合
├── App.vue              # 應用程式 shell
└── main.js              # 啟動與全域設定
scripts/                 # 內容驗證指令
tests/                   # Repository contract / schema tests
```

## 開發

需求：Node.js 20 以上。

```bash
npm ci
npm run dev
```

提交前執行完整檢查：

```bash
npm run check
```

也可分開執行：

```bash
npm run validate:content
npm test
npm run build
```

若在 Windows 與 WSL 間切換，請勿共用同一份 `node_modules`；Vite、Rollup、esbuild 與 Tailwind 包含 OS-specific optional packages，應在實際執行的環境重新 `npm ci`。

## 維護內容

請參考 [JSON 內容維護指南](docs/writing-guide.md)。新增資料後先執行 `npm run validate:content`，確認 schema、唯一性與 URL 安全性。

## 未來接 API／資料庫

維持現有 Repository method 與回傳 shape，再新增 HTTP adapter：

- `GET /api/v1/projects`
- `GET /api/v1/projects/:id`
- `GET /api/v1/writings`
- `GET /api/v1/writings/:slug`
- `GET /api/v1/site`

列表 API 應回傳 `items`、`total`、`available`、`facets`；詳情才回傳 `content`。資料庫建議將 projects / writings 放主表，tags / technologies 用關聯表，內容 blocks 可先使用 JSON 欄位。公開 API 預設僅回傳 `published`。
