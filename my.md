# 我的技能樹（詳細版）

> 偏好語言：繁體中文｜角色定位：後端工程師（偏架構/資料流程）｜主要領域：ESG / 碳足跡系統

---

## 0) 概覽

* **後端核心**：PHP、Laravel 12、CodeIgniter 3、CodeIgniter 4、MVC、Service Layer、Repository Pattern、交易控制（Transaction）
* **資料庫**：MySQL / MariaDB、Schema 設計、索引與效能(略懂)、批次處理、資料同步
* **前端**：Vue 3 + Vite、RWD、Bootstrap / Tailwind 基礎、基本 jQuery/AJAX、Vue + Leaflet 地圖初始化
* **DevOps**：Docker（本機環境建置）、linode vps 、多資料庫連線設定、環境變數管理
* **處理流程**：批次匯入/匯出、差異比對、自動化腳本
* **品質/紀錄**：Trait 封裝操作紀錄（Action Log）、錯誤處理與回報

---

## 1) 語言與基礎

### 1.1 PHP

* 語法、標準函式庫、OOP（抽象類別、介面、Trait、命名空間）
* Composer 套件管理、PSR-\* 基礎（命名/自動載入/程式風格概念）
* 例外處理（try/catch/自訂例外）、型別提示、嚴格模式觀念

### 1.2 SQL（MySQL / MariaDB）

* DDL / DML 基礎（CREATE / SELECT / INSERT / UPDATE / DELETE）
* JOIN / 子查詢 / 聚合（COUNT/SUM/AVG…）、GROUP BY / HAVING
* 交易（BEGIN/COMMIT/ROLLBACK）、鎖定與隔離級別概念
* 索引設計（單欄/複合）、EXPLAIN 分析與查詢調優
* 批次操作：`INSERT ... ON DUPLICATE KEY UPDATE` / `INSERT BATCH`

### 1.3 JavaScript / 前端基礎

* ES 基礎語法、AJAX / Fetch、模組化
* HTML / CSS、RWD 概念、表單驗證

---

## 2) 後端框架

### 2.1 Laravel 12

* 路由 / 控制器 / Middleware / Request 驗證
* Eloquent ORM（關聯、Query Builder、Scope）、Migration / Seeder
* 交易控制、批次寫入與更新（`insert`, `upsert`, `update`）
* 分層架構：Service Layer、Repository Pattern（維護共用存取邏輯）
* 錯誤處理與例外拋出、全域錯誤攔截與標準回應格式
* API 設計：資源路由、分頁、排序、過濾、回應封裝（Resource / Transformer 概念）
* （可延伸/熟悉度提升）事件/佇列、快取、授權（Policies/Gates）、認證（Sanctum/Passport）

### 2.2 CodeIgniter 4

* 路由 / 控制器 / 模型、Filters（類 Middleware）
* Query Builder、交易（`transStart/Complete` 或 `transBegin/Commit`）
* Migration / Seeder、Validation 規則、上傳/檔案處理
* 服務容器（Services）
* 錯誤訊息處理與統一回傳格式

---

## 3) 架構與程式設計實務

* **MVC 分層**：Controller 輕量化，商業邏輯進 Service，資料存取進 Repository
* **多資料庫**：跨 DB 讀寫、連線設定、交易邏輯邊界劃分
* **交易控制**：複合操作（新增/更新/刪除）的一致性與回復機制
* **Trait 封裝**：LoggerTrait（操作紀錄、稽核、追蹤）
* **錯誤處理**：可定位的錯誤碼與訊息、回傳結構（title/message/detail）
* **批次與同步**：大量資料匯入/匯出、差異比對（toAdd/toUpdate/toDelete）
* **效能優化**：N+1 查詢避免、索引檢查、批次寫入、Lazy vs Eager Loading
* **程式可讀性**：方法切分、命名一致、重構共用邏輯、單一責任

---

## 4) 資料庫與資料設計

* **Schema 設計**：正規化與必要反正規化、主鍵/外鍵、參照完整性
* **索引策略**：查詢路徑分析、複合索引、選擇性與排序匹配
* **查詢範本**：統計彙總、分頁查詢、條件過濾（AND/OR/IN/EXISTS）
* **交易案例**：多表異動（產品、排放源、階段資料…）的一致性
* **資料稽核**：操作日誌表、錯誤紀錄表、資料版本/時間戳

---

## 5) 前端與使用者介面

* **Vue 3 + Vite**：Composition API、元件化、Props/Emit、生命週期
* **路由與狀態**：Vue Router、（可用）Pinia 基本概念
* **資料串接**：Axios/Fetch、錯誤攔截、Loading/空狀態處理
* **UI / RWD**：Bootstrap、Tailwind 基礎、Grid/Flex、表單與驗證
* **地圖**：Vue + Leaflet 地圖初始化與基本互動
* **舊技術互通**：jQuery/AJAX 與現代框架共存策略

---

## 6) DevOps / 環境

* **Docker**：本機環境建置、Docker Compose、服務（Web/PHP-FPM/DB）分離
* **設定管理**：.env、機密參數、不同環境（dev/test/prod）切換觀念
* **日誌/監控（可延伸）**：集中式日誌、Sentry/Elastic Stack 導入規劃
* **CI/CD（可延伸）**：GitHub Actions / GitLab CI 基礎流水線

---

## 9) 安全性與權限

* **輸入驗證**：後端驗證規則、白名單/黑名單、錯誤訊息回饋
* **常見攻擊防護**：SQL Injection、XSS、CSRF 基礎防護
* **CORS / 認證**：API CORS 設定、Token 概念（JWT/Sanctum 可導入）
* **Bot 驗證（規劃/整合）**：Google reCAPTCHA v2/v3 整合流程與成本認知

---

## 10) 代表性功能/專案（片段）

* **大型專案複製**：`copyProductFun`（多資料表/檔案/關聯重建、可讀性與模組化優化）
* **階段資料複製**：`copyCyStage`（cy01\~cy05、數據品質、GHG 連動）
* **欄位對應匯出**：`getColArray`（依情境回傳欄位對應陣列、支援匯入/匯出/儲存）
* **操作紀錄**：`LoggerTrait`（多資料庫環境下的操作行為紀錄）
* **資料同步服務**：將交易控制移出 Controller，集中在 Service 管理
* **PDF 目錄抽取**：本地 Python 自動化流程、頁碼偏移對齊
* **點餐系統**：QR Code 掃碼點餐、直接送單流程設計（後端 API + 前端畫面）

---

## 11) 工具鏈與工作方法

* **版本控制**：Git（分支策略、PR、Code Review、rebase/merge）
* **開發工具**：VS Code、Postman/Insomnia、php-cs-fixer（可導入）
* **封裝管理**：Composer / npm、Vite 打包
* **除錯**：錯誤堆疊解析、日誌查詢、（可導入）Xdebug/Blackfire

---

## 12) 能力等級（自評框架）

> ✅ 已熟練｜🧩 可實作/熟悉｜🌱 正在強化｜🎯 待學/可導入

* **PHP / SQL**：✅
* **Laravel 12**：🧩→✅（持續擴充事件/佇列/快取/授權）
* **CodeIgniter 4**：✅
* **資料庫設計/效能**：🧩→✅（持續索引調優/查詢分析）
* **資料同步/批次處理**：✅
* **Vue 3 + Vite（前端）**：🧩
* **Docker（本機）**：🧩
* **PDF 解析（Python）**：🧩
* **日誌/監控/可觀測性**：🌱
* **CI/CD**：🌱
* **事件/佇列/非同步**：🌱

---

## 13) 強化與下一步建議

1. **非同步與可用性**：導入 Laravel Queue（如 Redis + Horizon）/ CI4 Task Runner，將長任務（匯入、PDF 解析、批次同步）移出同步請求，降低 504 風險。
2. **快取層**：針對查詢頻繁/統計類 API 加上快取與失效策略。
3. **觀測性**：集中式日誌（結構化 JSON）、錯誤追蹤（Sentry）、基本 APM（請求時間、DB 查詢數）。
4. **自動化測試**：從關鍵 Service/Repository 開始的單元測試與整合測試，建立迭代安全網。
5. **API 治理**：統一回應格式、錯誤碼、版本化（/v1、/v2）、速率限制與金鑰管理。
6. **資料庫治理**：索引健檢、慢查詢觀測、Schema 變更策略（遷移與回滾流程）。
7. **模組化**：以領域邊界（Domain）拆分模組，降低跨模組耦合，提升可維護性。

---


