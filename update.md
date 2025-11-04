好的，這是一個將您的專案從靜態資料轉換為由後端 API 驅動的評估與開發計畫。

### 總體思路

目前的專案是純前端應用，所有資料都寫死在 `src/data/items.js` 中。為了使其更具動態性與可擴展性，我們將採用**前後端分離**的架構。

- **後端 (Backend):** 建立一個新的 PHP (例如 Laravel) 專案，負責提供 RESTful API 來管理與提供所有資料。
- **前端 (Frontend):** 修改現有的 Vue.js 專案，移除靜態資料，改為在頁面載入時透過 API 從後端獲取資料。

---

### 1. 資料庫設計 (Database Design)

我們需要為您的個人作品集設計幾張核心的資料表。

#### `personal_infos` (個人資訊)
儲存「關於我」頁面的基本資料。

| 欄位 | 類型 | 備註 |
| :--- | :--- | :--- |
| `id` | `INT` (PK) | 主鍵 |
| `name` | `VARCHAR(255)` | 姓名 |
| `job_title`| `VARCHAR(255)` | 職稱 |
| `avatar_url`| `VARCHAR(255)` | 頭像圖片 URL |
| `email` | `VARCHAR(255)` | 電子郵件 |
| `phone` | `VARCHAR(255)` | 電話 |
| `cv_url` | `VARCHAR(255)` | 線上履歷 URL |
| `about_me`| `TEXT` | 關於我段落 |

#### `socials` (社群連結)
儲存社群媒體連結。

| 欄位 | 類型 | 備註 |
| :--- | :--- | :--- |
| `id` | `INT` (PK) | 主鍵 |
| `name` | `VARCHAR(255)` | 平台名稱 (e.g., GitHub) |
| `url` | `VARCHAR(255)` | 連結 URL |
| `icon` | `VARCHAR(255)` | FontAwesome 圖標 |

#### `items` (專案與筆記)
統一儲存專案和筆記。

| 欄位 | 類型 | 備註 |
| :--- | :--- | :--- |
| `id` | `INT` (PK) | 主鍵 |
| `type` | `ENUM('project', 'note')` | 類型 |
| `title` | `VARCHAR(255)` | 標題 |
| `summary` | `TEXT` | 摘要 |
| `image_url`| `VARCHAR(255)` | 圖片 URL |
| `long_description` | `TEXT` | 詳細描述 (HTML) |
| `link` | `VARCHAR(255)` | 專案連結 |
| `technologies` | `JSON` | 技術棧 (e.g., `["Vue.js", "Laravel"]`) |

#### `skills` (專業技能)
儲存技能，並按類別分組。

| 欄位 | 類型 | 備註 |
| :--- | :--- | :--- |
| `id` | `INT` (PK) | 主鍵 |
| `category` | `VARCHAR(255)` | 技能類別 (e.g., 後端開發) |
| `name` | `VARCHAR(255)` | 技能名稱 (e.g., PHP) |
| `level` | `INT` | 熟練度 (0-100) |
| `icon` | `VARCHAR(255)` | FontAwesome 圖標 |

#### `timelines` (時間軸項目)
統一儲存工作經歷和學歷。

| 欄位 | 類型 | 備註 |
| :--- | :--- | :--- |
| `id` | `INT` (PK) | 主鍵 |
| `type` | `ENUM('experience', 'education')` | 類型 |
| `period` | `VARCHAR(255)` | 時間區間 |
| `title` | `VARCHAR(255)` | 標題 |
| `subtitle` | `VARCHAR(255)` | 副標題 (公司/學校) |
| `description`| `TEXT` | 描述 (HTML) |

---

### 2. 後端 API 設計 (API Endpoints)

後端需要提供以下 RESTful API 端點：

- `GET /api/personal-info`: 獲取個人資訊 (`personal_infos`, `socials`)。
- `GET /api/items`: 獲取所有專案與筆記。
- `GET /api/items/{id}`: 獲取單一專案或筆記的詳細資料。
- `GET /api/skills`: 獲取所有技能，按類別分組。
- `GET /api/timelines`: 獲取所有時間軸項目 (工作經歷 & 學歷)。
- `POST /api/contact`: 接收聯絡表單提交的資料。

---

### 3. 前端改造計畫 (Frontend Modifications)

1.  **安裝 HTTP 客戶端:**
    在 Vue 專案中，我們需要一個工具來發送 API 請求。推薦使用 `axios`。
    ```bash
    npm install axios
    ```

2.  **建立 API 服務層:**
    在 `src` 目錄下建立一個新檔案 `src/api/index.js`，用於統一管理所有對後端 API 的請求。

3.  **移除靜態資料:**
    刪除 `src/data/items.js` 檔案。

4.  **改造 Vue 組件:**
    - **`About.vue`:** 在 `onMounted` 生命週期鉤子中，呼叫 API (`/api/personal-info`, `/api/skills`, `/api/timelines`) 來獲取頁面所需的資料，並將它們存儲在 `ref` 中。
    - **`Project.vue` / `Home.vue`:** 改造 `computed` 屬性，改為在 `onMounted` 中呼叫 `/api/items` 來獲取專案和筆記列表。
    - **`ProjectDetail.vue`:** 在 `onMounted` 中，根據路由參數 `:id` 呼叫 `/api/items/{id}` 來獲取特定專案的詳細資料。
    - **`Contact.vue`:** 修改 `submitForm` 方法，使用 `axios.post` 將表單資料發送到 `/api/contact` 端點。

---

### 4. 建議開發順序

1.  **後端先行 (Backend First):**
    a. 建立一個新的 Laravel (或您熟悉的 PHP 框架) 專案。
    b. 根據上面的資料庫設計，建立對應的 `migration` 檔案來生成資料表。
    c. 建立 `Model` (模型) 來對應每個資料表。
    d. 建立 `Controller` (控制器) 和 `Route` (路由)，實現所有 API 端點的邏輯。
    e. 建立 `Seeder` (資料填充)，將您現有 `items.js` 的內容預先填入資料庫，以便測試。
    f. 使用 Postman 或類似工具測試所有 API 端點，確保它們能正確回傳資料。

2.  **前端整合 (Frontend Integration):**
    a. 安裝 `axios`。
    b. 建立 `src/api/index.js` 並封裝 API 請求函數。
    c. **從 `About.vue` 開始改造**，因為它需要串接最多的 API，可以一次性驗證大部分後端端點。
    d. 接著改造 `Project.vue` 和 `ProjectDetail.vue`。
    e. 最後改造 `Contact.vue` 的表單提交功能。
    f. 刪除 `src/data/items.js` 檔案，並清理所有相關的 `import`。

3.  **部署 (Deployment):**
    a. 將後端 API 專案部署到您的伺服器上。
    b. 在前端專案的環境變數 (`.env`) 中設定後端 API 的 URL。
    c. 重新建置並部署您的前端 Vue 專案。
