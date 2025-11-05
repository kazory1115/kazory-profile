# 📦 Kazory Profile - 專案文件

> 個人作品集網站 - 使用 Vue 3 + Vite + Tailwind CSS 構建的現代化單頁應用程式

---

## 📋 目錄

- [專案概述](#專案概述)
- [技術棧](#技術棧)
- [專案架構](#專案架構)
- [目錄結構](#目錄結構)
- [核心組件說明](#核心組件說明)
- [Composables 可組合函數](#composables-可組合函數)
- [資料管理](#資料管理)
- [路由配置](#路由配置)
- [樣式與動畫](#樣式與動畫)
- [已知問題](#已知問題)
- [優化建議](#優化建議)
- [優化路線圖](#優化路線圖)
- [開發規範](#開發規範)
- [資料庫結構](#資料庫結構)

---

## 🎯 專案概述

這是一個現代化的個人作品集網站，展示個人技能、專案經驗、學經歷與聯絡資訊。

### 主要功能

- ✅ **響應式設計** - 完美適配桌面與行動裝置
- ✅ **單頁應用** - 使用 Vue Router 實現流暢的頁面切換
- ✅ **動態效果** - 打字機效果、滾動動畫、交錯動畫
- ✅ **專案展示** - 支援專案與筆記的分類展示
- ✅ **技能視覺化** - 使用進度條展示技能熟練度
- ✅ **時間軸呈現** - 清晰展示工作經歷與學歷

---

## 🛠️ 技術棧

### 核心技術

| 技術         | 版本   | 用途                             |
| ------------ | ------ | -------------------------------- |
| Vue.js       | 3.x    | 前端框架（使用 Composition API） |
| Vite         | 最新版 | 開發建置工具                     |
| Vue Router   | 4.x    | 路由管理                         |
| Tailwind CSS | 3.x    | CSS 框架                         |

### 第三方套件

| 套件             | 用途                      |
| ---------------- | ------------------------- |
| FontAwesome      | 圖標庫                    |
| tsparticles/vue3 | 粒子背景效果              |
| axios            | HTTP 客戶端（目前未使用） |

### 開發工具

- **ESLint** - 程式碼風格檢查
- **Git** - 版本控制

---

## 🏗️ 專案架構

### 架構模式

採用 **MVVM（Model-View-ViewModel）** 架構：

```
┌─────────────────────────────────────────────┐
│                   Views                     │
│  (Home, About, Project, ProjectDetail, etc) │
└──────────────────┬──────────────────────────┘
                   │
                   │ 使用
                   ▼
┌─────────────────────────────────────────────┐
│               Components                    │
│  (ProjectItem, SkillBar, TimelineItem, etc) │
└──────────────────┬──────────────────────────┘
                   │
                   │ 調用
                   ▼
┌─────────────────────────────────────────────┐
│              Composables                    │
│  (useTypewriter, useIntersectionObserver)   │
└─────────────────────────────────────────────┘
                   │
                   │ 讀取
                   ▼
┌─────────────────────────────────────────────┐
│                  Data                       │
│              (items.js)                     │
└─────────────────────────────────────────────┘
```

### 資料流

1. **靜態資料** → `src/data/items.js` 集中管理
2. **Composables** → 提供可重用的邏輯（動畫、觀察器等）
3. **Components** → 展示資料並處理使用者互動
4. **Views** → 組合多個組件形成完整頁面
5. **Router** → 管理頁面導航

---

## 📁 目錄結構

```
kazory-profile/
├── public/                    # 靜態資源
├── src/
│   ├── App.vue               # 根組件（包含 Navbar + RouterView）
│   ├── main.js               # 應用程式入口
│   ├── index.css             # 全局樣式（目前為空）
│   │
│   ├── assets/               # 靜態資源
│   │   ├── custom.css        # 自定義樣式（動畫、卡片樣式等）
│   │   └── vue.svg           # Vue Logo
│   │
│   ├── components/           # 可重用組件
│   │   ├── Navbar.vue        # ⭐ 頂部導航欄
│   │   ├── ProjectItem.vue   # ⭐ 專案卡片組件（已加入圖片懶加載）
│   │   ├── SkillBar.vue      # ⭐ 技能進度條（使用 composable）
│   │   ├── TimelineItem.vue  # ⭐ 時間軸項目
│   │   ├── ProfileSidebar.vue      # ⭐ 個人資訊側邊欄
│   │   ├── PrinciplesSection.vue   # ⭐ 開發理念區塊
│   │   ├── SkillsSection.vue       # ⭐ 技能展示區塊
│   │   ├── ExperienceSection.vue   # ⭐ 工作經歷區塊
│   │   └── EducationSection.vue    # ⭐ 學歷與證照區塊
│   │
│   ├── composables/          # 可組合函數
│   │   ├── useIntersectionObserver.js  # ⭐ 元素可見性偵測
│   │   └── useTypewriter.js            # ⭐ 打字機效果
│   │
│   ├── data/                 # 資料層
│   │   ├── items.js          # ⭐ 專案與筆記資料
│   │   ├── profile.js        # ⭐ 個人資訊、社群連結、開發理念、證照
│   │   ├── skills.js         # ⭐ 技能分類資料
│   │   └── timeline.js       # ⭐ 工作經歷與學歷資料
│   │
│   ├── router/               # 路由配置
│   │   └── index.js          # ⭐ 路由定義
│   │
│   └── views/                # 頁面級組件
│       ├── Home.vue          # 首頁（Hero + 精選專案）
│       ├── About.vue         # ✅ 關於頁面（24 行，已重構）
│       ├── Project.vue       # 專案列表頁
│       ├── ProjectDetail.vue # 專案詳情頁（已加入 404 處理）
│       ├── Contact.vue       # ✅ 聯絡頁面（使用 mailto 連結）
│       └── NotFound.vue      # ⭐ 404 頁面
│
├── .gitignore
├── index.html                # HTML 入口
├── package.json              # 依賴管理
├── postcss.config.js         # PostCSS 配置
├── tailwind.config.js        # Tailwind CSS 配置
├── vite.config.js            # Vite 配置
└── project.md                # 📄 本文件
```

### 圖示說明

- ⭐ 核心組件/檔案
- ⚠️ 需要注意或優化的項目

---

## 🧩 核心組件說明

### Views (頁面組件)

#### 1. `Home.vue` (107 行)

**位置**: `src/views/Home.vue`

**功能**:

- 英雄區塊（Hero Section）展示
- 打字機效果展示職稱
- 精選專案展示（前 6 個項目）
- CTA 按鈕導向其他頁面

**使用的 Composables**:

- `useTypewriter` - 打字機效果

**優化建議**:

- ✅ 結構清晰，無需大幅修改
- 動畫樣式可抽離至全域

---

#### 2. `About.vue` (24 行) ✅

**位置**: `src/views/About.vue`

**功能**:

- 作為「關於我」頁面的主容器，整合多個子組件。
- 響應式布局，在桌面端顯示為兩欄，行動端為單欄。

**結構**:

- `ProfileSidebar.vue` - 個人資訊側邊欄
- `PrinciplesSection.vue` - 開發理念
- `SkillsSection.vue` - 技能展示
- `ExperienceSection.vue` - 工作經歷
- `EducationSection.vue` - 學歷背景

**評價**: ✅ **已重構**。成功將一個巨大的組件拆分為多個可管理的子組件，並將資料邏輯分離，大幅提升了可維護性。

---

#### 3. `Project.vue` (104 行)

**位置**: `src/views/Project.vue`

**功能**:

- 專案與筆記的過濾切換
- 網格布局展示所有項目
- 交錯動畫效果

**優化建議**:

- ✅ 動畫定義已統一至 `custom.css`。

---

#### 4. `ProjectDetail.vue` (102 行) ✅

**位置**: `src/views/ProjectDetail.vue`

**功能**:

- 顯示單一專案的完整資訊
- 技術棧標籤展示
- 外部連結處理
- ✅ **包含 404 處理** - 當找不到專案 ID 時，會顯示友善的錯誤頁面。
- 載入中狀態顯示

**評價**: ✅ 功能完整，使用者體驗良好。

---

#### 5. `Contact.vue` (58 行) ✅

**位置**: `src/views/Contact.vue`

**功能**:

- ✅ **重構為聯絡資訊頁** - 清晰展示 Email、電話等聯絡方式。
- ✅ **整合 `mailto:`** - 提供快速寄送郵件的按鈕。
- 顯示社群媒體連結。

**評價**: ✅ 已從一個無功能的表單重構為一個實用且直接的聯絡頁面。

---

### Components (可重用組件)

#### 1. `Navbar.vue`

**位置**: `src/components/Navbar.vue`

**功能**:

- 響應式導航欄
- 行動裝置漢堡選單
- 路由切換高亮

---

#### 2. `ProjectItem.vue` ✅

**位置**: `src/components/ProjectItem.vue`

**功能**:

- 專案卡片展示
- ✅ **圖片懶加載** - 使用 `loading="lazy"` 提升效能。
- 懸停效果
- 點擊導向詳情頁

**Props**:

- ✅ **已加入驗證** - `project` prop 現在包含 `required` 與 `validator`。

---

#### 3. `SkillBar.vue` ✅

**位置**: `src/components/SkillBar.vue`

**功能**:

- 技能進度條展示
- ✅ **使用 Composable** - 滾動觸發動畫的邏輯已改用 `useIntersectionObserver`。

---

#### 4. `TimelineItem.vue` ✅

**位置**: `src/components/TimelineItem.vue`

**功能**:

- 時間軸項目展示
- 使用 `v-html` 渲染描述
- ✅ **已加入 Props 驗證**

**⚠️ 安全性警告**:

- 使用 `v-html` 存在 XSS 風險。由於目前資料是靜態的，風險可控。若未來從 API 取得，需加入 DOMPurify 等清理機制。

---

#### 5. `HelloWorld.vue` ✅

**位置**: `src/components/HelloWorld.vue`

**狀態**: **已刪除**

---

## 🔧 Composables 可組合函數

### 1. `useTypewriter.js`

**位置**: `src/composables/useTypewriter.js`

**功能**: 提供打字機效果

**使用範例**:

```javascript
const displayedText = useTypewriter(
  ['後端工程師', '全端開發者'],
  100,
  50,
  2000
);
```

**參數**:

- `texts` - 要輪播的文字陣列
- `typingSpeed` - 打字速度 (ms)
- `deletingSpeed` - 刪除速度 (ms)
- `pauseTime` - 暫停時間 (ms)

**評價**: ✅ 設計良好，可重用性高

---

### 2. `useIntersectionObserver.js`

**位置**: `src/composables/useIntersectionObserver.js`

**功能**: 偵測元素是否進入視窗

**使用範例**:

```javascript
const elementRef = ref(null);
const isVisible = useIntersectionObserver(elementRef, { threshold: 0.3 });
```

**參數**:

- `elementRef` - 要觀察的元素 ref
- `options` - IntersectionObserver 選項

**評價**: ✅ 設計良好，已應用於多個組件中，實現滾動觸發動畫效果。

---

## 💾 資料管理

### `items.js`

**位置**: `src/data/items.js`

**內容**:

- 專案資料（4 個項目）
- 筆記資料（2 個項目）

**資料結構**:

```javascript
{
  id: Number,
  type: 'project' | 'note',
  title: String,
  summary: String,
  image: String,
  description: String,
  longDescription: String,  // HTML 字串
  link: String,
  technologies: Array<String>
}
```

**⚠️ 已知問題**:

1. **大型 HTML 字串** - `longDescription` 使用內嵌 HTML，難以維護
2. **未分離列表與詳情資料** - 列表頁載入了不必要的詳細資料
3. **硬編碼** - 所有資料寫在程式碼中

**優化建議**:

- 改用 Markdown + Markdown 解析器
- 或拆分為 `summary` 和 `detail` 兩個端點（未來後端化）

---

## 🛣️ 路由配置

**位置**: `src/router/index.js`

**路由列表**:

| 路徑            | 組件              | 名稱           |
| --------------- | ----------------- | -------------- |
| `/`             | Home.vue          | home           |
| `/about`        | About.vue         | about          |
| `/projects`     | Project.vue       | projects       |
| `/projects/:id` | ProjectDetail.vue | project-detail |
| `/contact`      | Contact.vue       | contact        |
| `/:pathMatch(.*)*` | NotFound.vue      | NotFound       |

**✅ 效能優化**:

- **已實作路由懶加載** - 所有頁面組件均使用動態導入 (`import()`)，有效減少了初始載入的 JavaScript 體積，提升了首屏載入速度。

---

## 🎨 樣式與動畫

### Tailwind CSS

- 使用 Tailwind 的 Utility-First 方法
- 自定義配置在 `tailwind.config.js`

### 自定義樣式

**位置**: `src/assets/custom.css`

**包含**:

- `.modern-card` - 現代化卡片樣式
- 漸變背景定義
- 動畫定義（部分）

### 動畫定義

**✅ 已統一管理**:

- 所有全局動畫（如 `fade-in-up`, `fade-in-down` 等）的 `@keyframes` 和輔助類別均已統一至 `src/assets/custom.css`。
- 移除了在單一組件中重複定義的樣式，提升了程式碼的整潔度與可維護性。

### 卡片樣式優化

**✅ 卡片等高處理**:

- **問題**: 在專案列表頁，由於每個專案的摘要長度不同，導致 `.modern-card` 卡片高度不一致，影響視覺整齊度。
- **解決方案**: 在 `ProjectItem.vue` 組件中，利用 Tailwind CSS 的 Flexbox 功能 (`flex`, `flex-col`, `h-full`, `flex-grow`)，強制卡片填滿網格單元的高度，並讓內容區域彈性伸展，從而實現完美的等高佈局。

---

## ⚠️ 已知問題

### 高優先級 (P0) ✅ 全部已解決

#### 1. ✅ 缺少路由懶加載（已解決）

**影響**: 首屏載入速度慢，打包體積大
**位置**: `src/router/index.js:3-8`
**解決方案**: ✅ 已使用動態導入實作路由懶加載

#### 2. ✅ About.vue 組件過大（已解決）

**影響**: 難以維護、測試與重構
**位置**: `src/views/About.vue` (從 409 行縮減至 24 行)
**解決方案**: ✅ 已拆分為 5 個子組件，資料層分離至 data 目錄

#### 3. ✅ 動畫樣式重複定義（已解決）

**影響**: 維護困難，增加打包體積
**位置**: `src/assets/custom.css:27-72`
**解決方案**: ✅ 已統一至 `custom.css`，移除重複定義

---

### 中優先級 (P1) ✅ 全部已解決

#### 4. ✅ 硬編碼的個人資訊（已解決）

**影響**: 難以更新與維護
**位置**: 原 `About.vue` 整個檔案
**解決方案**: ✅ 已建立 `src/data/profile.js`、`skills.js`、`timeline.js`

#### 5. ✅ ProjectDetail 缺少錯誤處理（已解決）

**影響**: 找不到專案時使用者體驗差
**位置**: `ProjectDetail.vue:97-109`
**解決方案**: ✅ 已加入 404 狀態與友善錯誤訊息

#### 6. ✅ Props 驗證不足（已解決）

**影響**: 執行時錯誤難以追蹤
**位置**: 所有組件
**解決方案**: ✅ 已加入完整 props 驗證（ProjectItem、SkillBar、TimelineItem）

#### 7. ✅ Contact.vue 功能不完整（已解決）

**影響**: 使用者無法實際發送訊息
**位置**: `Contact.vue`（已完全重構）
**解決方案**: ✅ 改用 mailto 連結與顯示聯絡資訊

---

### 低優先級 (P2)

#### 8. ✅ 圖片未做懶加載（已解決）

**影響**: 影響頁面載入速度
**解決方案**: ✅ 已在 ProjectItem.vue 加入 `loading="lazy"` 屬性

#### 9. ✅ 未使用的程式碼（已解決）

**影響**: 增加打包體積
**項目**: `HelloWorld.vue`, `axios` 套件
**解決方案**: ✅ 已移除 HelloWorld.vue 與卸載 axios

#### 10. 魔術數字與內嵌 HTML（部分解決）

**影響**: 可讀性與維護性
**解決方案**: 資料已分離至 data 目錄，內嵌 HTML 保留（未來可改用 Markdown）

---

## 🚀 優化建議

### 效能優化

1. **實作路由懶加載**

   ```javascript
   const Home = () => import('../views/Home.vue');
   ```

2. **圖片懶加載**

   ```html
   <img :src="project.image" loading="lazy" />
   ```

3. **程式碼分割**

   - 拆分大型組件
   - 使用動態導入載入大型依賴

4. **資料優化**
   - 分離列表與詳情資料
   - 使用 computed 延遲計算

---

### 架構優化

1. **拆分 About.vue**

   ```
   About.vue (容器)
   ├── ProfileSidebar.vue
   ├── PrinciplesSection.vue
   ├── SkillsSection.vue
   ├── ExperienceSection.vue
   └── EducationSection.vue
   ```

2. **建立資料檔案**

   ```
   src/data/
   ├── items.js (現有)
   ├── profile.js (新增 - 個人資訊)
   ├── skills.js (新增 - 技能資料)
   └── timeline.js (新增 - 經歷與學歷)
   ```

3. **建立常數檔案**

   ```
   src/constants/
   ├── animations.js (動畫參數)
   └── config.js (全域配置)
   ```

4. **統一動畫樣式**
   ```
   src/assets/
   ├── custom.css (現有)
   └── animations.css (新增)
   ```

---

### 程式碼品質

1. **強化 Props 驗證**

   ```javascript
   defineProps({
     project: {
       type: Object,
       required: true,
       validator: (value) => {
         return value.id && value.title && value.summary;
       },
     },
   });
   ```

2. **統一使用 Composables**

   - `SkillBar.vue` 改用 `useIntersectionObserver`

3. **錯誤處理**

   - `ProjectDetail.vue` 加入 404 處理
   - 加入全域錯誤邊界

4. **安全性**
   - `v-html` 使用處加入 DOMPurify 清理

---

### 使用者體驗

1. **完善 Contact 頁面**

   - 整合 EmailJS
   - 或改用 `mailto:` 連結與社群連結

2. **改善載入狀態**

   - 加入骨架屏（Skeleton）
   - 改善過渡動畫

3. **加入 404 頁面**
   - 處理無效路由

---

## 📅 優化路線圖

### Phase 1: 快速優化（1-2 小時）✅ 已完成

- [x] 建立 `src/assets/animations.css` 統一動畫定義
- [x] 移除 `HelloWorld.vue`
- [x] 實作路由懶加載
- [x] `ProjectDetail.vue` 加入 404 處理
- [x] 移除未使用的依賴（axios）

---

### Phase 2: 架構重構（4-6 小時）✅ 已完成

- [x] 拆分 About.vue 為 5 個子組件
  - ProfileSidebar.vue（個人資訊側邊欄）
  - PrinciplesSection.vue（關於我與開發理念）
  - SkillsSection.vue（專業技能）
  - ExperienceSection.vue（工作經歷）
  - EducationSection.vue（學歷與證照）
- [x] 建立 `src/data/profile.js`（個人資訊、社群連結、開發理念、證照）
- [x] 建立 `src/data/skills.js`（技能分類資料）
- [x] 建立 `src/data/timeline.js`（工作經歷與學歷）
- [x] SkillBar 改用 `useIntersectionObserver` composable

---

### Phase 3: 功能完善（2-3 小時）✅ 已完成

- [x] 強化所有組件的 Props 驗證
  - ProjectItem.vue（加入完整驗證與 validator）
  - SkillBar.vue（加入型別驗證與範圍檢查）
  - TimelineItem.vue（加入必填與預設值設定）
- [x] 改善 Contact 頁面（改用 mailto 連結與顯示聯絡資訊）
- [x] 圖片懶加載（ProjectItem.vue）
- [x] 改善錯誤處理（ProjectDetail 404 頁面）

---

### Phase 4: 進階優化（選擇性）

- [ ] 引入 TypeScript
- [ ] 建立單元測試
- [ ] 加入骨架屏
- [ ] 改用 Markdown 管理內容
- [ ] 加入 DOMPurify
- [ ] SEO 優化（meta tags、sitemap）

---

## 📖 開發規範

### Vue 3 最佳實踐

1. **使用 Composition API**

   - ✅ 所有組件已使用 `<script setup>`

2. **Props 驗證**

   - ✅ **已實踐** - 主要組件（如 `ProjectItem`, `SkillBar`, `TimelineItem`）均已加入完整的 Props 驗證，包含型別、是否必填及自定義驗證器。

3. **Composables 命名**

   - ✅ 使用 `use` 前綴

4. **響應式資料**
   - ✅ 正確使用 `ref` 和 `reactive`

---

### 程式碼風格

1. **組件命名**: PascalCase
2. **檔案命名**: PascalCase (組件), camelCase (工具函數)
3. **縮排**: 2 空格
4. **引號**: 單引號
5. **分號**: 不使用

---

### 提交規範

建議使用 Conventional Commits:

```
feat: 新增功能
fix: 修復 Bug
refactor: 重構程式碼
style: 樣式調整
docs: 文件更新
test: 測試相關
chore: 建置/工具相關
```

---

## 🗄️ 資料庫結構

> 以下為未來後端化時可使用的資料庫種子資料

### 資料庫設計

#### 資料表清單

1. `personal_infos` - 個人基本資訊
2. `socials` - 社群媒體連結
3. `items` - 專案與筆記
4. `skills` - 專業技能
5. `timelines` - 時間軸項目（經歷與學歷）

---

### 1. `personal_infos` (個人資訊)

**結構**:

```sql
CREATE TABLE `personal_infos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `job_title` VARCHAR(100),
  `avatar_url` VARCHAR(255),
  `email` VARCHAR(255),
  `phone` VARCHAR(50),
  `cv_url` VARCHAR(255),
  `about_me` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**種子資料**:

```sql
INSERT INTO `personal_infos` (`id`, `name`, `job_title`, `avatar_url`, `email`, `phone`, `cv_url`, `about_me`) VALUES
(1, '蘇建維', '後端工程師', '/images/avatar.png', 'jay86888688@gmail.com', '0930-118-867', 'https://www.cakeresume.com/s--5_oWGY1-GzBwX44-Y8aP6A--/kazo-1d5a76', '我是一位具備 1-2 年經驗的後端工程師，專注於打造穩健、可擴展的網頁應用程式。\n我擁有執行複雜系統遷移與重構 (CodeIgniter 3 至 4) 的實戰經驗，並成功將舊有程式碼重構成符合現代標準的分層式架構，顯著提升了系統的可維護性與效能。\n我對乾淨的程式碼、自動化流程 (CI/CD) 以及運用技術解決真實世界問題充滿熱情。期待能為一個具前瞻性的團隊貢獻所長，共同打造高品質的軟體產品。');
```

---

### 2. `socials` (社群連結)

**結構**:

```sql
CREATE TABLE `socials` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(100),
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**種子資料**:

```sql
INSERT INTO `socials` (`id`, `name`, `url`, `icon`) VALUES
(1, 'GitHub', 'https://github.com/kazo-dev', 'fab,github'),
(2, 'Resume', 'https://www.cakeresume.com/s--5_oWGY1-GzBwX44-Y8aP6A--/kazo-1d5a76', 'fas,file-alt');
```

---

### 3. `items` (專案與筆記)

**結構**:

```sql
CREATE TABLE `items` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `type` ENUM('project', 'note') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `summary` TEXT,
  `image_url` VARCHAR(255),
  `description` TEXT,
  `long_description` LONGTEXT,
  `link` VARCHAR(255),
  `technologies` JSON,
  `is_featured` BOOLEAN DEFAULT FALSE,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**種子資料**:

```sql
INSERT INTO `items` (`id`, `type`, `title`, `summary`, `image_url`, `description`, `long_description`, `link`, `technologies`) VALUES
(1, 'project', 'SPA 租屋平台 (個人專案)', '使用 Vue3 搭配 Laravel 開發的 SPA 租屋平台，並透過 Docker 建立開發環境與 GitHub Actions 自動部署。', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', '前後端分離的 SPA 租屋平台，前端採用 Vue3，後端採用 Laravel API。', '<div class="space-y-4"><h3 class="text-xl font-bold text-blue-600">專案簡介</h3><p>這是一個前後端分離的單頁應用 (SPA) 租屋平台。前端使用 Vue 3 與 Composition API 開發，後端採用 Laravel 提供 RESTful API。整個專案透過 Docker 容器化，並使用 GitHub Actions 實現 CI/CD 自動化部署。</p><h3 class="text-xl font-bold text-blue-600 mt-6">技術亮點</h3><ul class="list-disc list-inside space-y-2"><li><strong>前端架構</strong>：採用 Vue 3 Composition API，搭配 Vue Router 與 Pinia 狀態管理。</li><li><strong>後端 API</strong>：Laravel 10 提供 RESTful API，使用 JWT 進行身份驗證。</li><li><strong>容器化部署</strong>：透過 Docker Compose 建立開發環境，包含 Nginx、PHP-FPM、MySQL。</li><li><strong>CI/CD</strong>：使用 GitHub Actions 自動執行測試與部署。</li><li><strong>資料庫設計</strong>：設計了租屋物件、用戶、收藏等資料表，並透過 Migration 管理。</li></ul><h3 class="text-xl font-bold text-blue-600 mt-6">功能特色</h3><ul class="list-disc list-inside space-y-2"><li>會員註冊與登入 (JWT Token)</li><li>租屋物件瀏覽與搜尋</li><li>收藏物件功能</li><li>物件詳情頁面</li><li>響應式設計，支援行動裝置</li></ul></div>', 'https://github.com/kazory1115/web_house', '["Vue.js","Laravel","Docker","GitHub Actions","MySQL","RESTful API"]'),

(2, 'project', 'ESG系統升級與重構 (公司專案)', '將大型專案由 CodeIgniter 3 升級至 CodeIgniter 4，並導入分層式架構重構程式碼。', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', '主導公司核心 ESG 系統從 CodeIgniter 3 到 CodeIgniter 4 的遷移與現代化重構。', '<div class="space-y-4"><h3 class="text-xl font-bold text-blue-600">專案背景</h3><p>接手一個使用 CodeIgniter 3 開發的大型 ESG (環境、社會與公司治理) 管理系統。系統已運行多年，但因技術債累積、程式碼耦合嚴重，維護困難且效能低下。公司決定進行系統升級與重構，我負責主導這項計畫。</p><h3 class="text-xl font-bold text-blue-600 mt-6">技術挑戰</h3><ul class="list-disc list-inside space-y-2"><li><strong>框架升級</strong>：從 CI3 升級到 CI4，語法與架構差異大，需大量重寫。</li><li><strong>架構重構</strong>：將原本的 MVC 改造為分層式架構 (Controller → Service → Repository)。</li><li><strong>程式碼品質</strong>：導入 SonarQube 進行程式碼檢測，逐步降低技術債。</li><li><strong>資料庫優化</strong>：重構 SQL 查詢，加入索引，提升查詢效能 30%。</li><li><strong>測試覆蓋</strong>：撰寫單元測試，確保重構不影響現有功能。</li></ul><h3 class="text-xl font-bold text-blue-600 mt-6">成果與影響</h3><ul class="list-disc list-inside space-y-2"><li>成功將系統升級至 CI4，無停機時間。</li><li>程式碼可讀性與可維護性大幅提升。</li><li>系統回應速度提升約 30%。</li><li>技術債指標下降 40%。</li><li>為後續新功能開發奠定良好基礎。</li></ul></div>', '#', '["CodeIgniter 4","PHP","分層式架構","SonarQube","MySQL","jQuery"]'),

(3, 'project', '網路購物平台 (實習專案)', '參與網路購物平台的實習，累積前後端開發、多人協作以及 API 設計與整合的經驗。', 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', '在大型電商平台團隊中，負責新功能開發與 API 設計。', '<div class="space-y-4"><h3 class="text-xl font-bold text-blue-600">實習經歷</h3><p>在紅崴科技實習期間，參與大型電商平台的開發與維護工作。這是我第一次參與大型專案的開發，學習到了團隊協作、版本控制、API 設計等實務技能。</p><h3 class="text-xl font-bold text-blue-600 mt-6">負責項目</h3><ul class="list-disc list-inside space-y-2"><li><strong>前端開發</strong>：使用 AngularJS 開發商品瀏覽、購物車、結帳等功能。</li><li><strong>後端開發</strong>：使用 Laravel 開發 RESTful API，處理商品查詢、訂單管理等邏輯。</li><li><strong>資料庫設計</strong>：參與資料庫結構設計與優化。</li><li><strong>Bug 修復</strong>：協助修復系統 Bug，提升系統穩定性。</li></ul><h3 class="text-xl font-bold text-blue-600 mt-6">學習成果</h3><ul class="list-disc list-inside space-y-2"><li>學會使用 Git 進行版本控制與多人協作。</li><li>熟悉 RESTful API 的設計原則。</li><li>了解大型系統的架構與開發流程。</li><li>培養問題分析與解決能力。</li></ul></div>', '#', '["AngularJS","Laravel","PHP","API Design","Git","Team Collaboration"]'),

(4, 'project', '物聯網應用專案 (大學專題)', '使用 Python 與樹莓派開發的物聯網控制應用，並將後端服務部署於 AWS EC2。', 'https://plus.unsplash.com/premium_photo-1670678203548-f6ad7b39ef11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', '使用 Python 與樹莓派開發的物聯網控制應用，並將後端服務部署於 AWS EC2。', '<div class="space-y-4"><h3 class="text-xl font-bold text-blue-600">專題簡介</h3><p>大學畢業專題，開發一個基於樹莓派的物聯網控制系統。系統可以透過網頁介面控制連接的硬體設備 (如 LED 燈、馬達等)，並即時顯示感測器資料 (溫度、濕度等)。</p><h3 class="text-xl font-bold text-blue-600 mt-6">技術架構</h3><ul class="list-disc list-inside space-y-2"><li><strong>硬體</strong>：樹莓派 3B+、DHT11 溫濕度感測器、繼電器模組。</li><li><strong>後端</strong>：Python Flask 開發 API，處理硬體控制邏輯。</li><li><strong>前端</strong>：原生 HTML/CSS/JavaScript 開發網頁控制介面。</li><li><strong>部署</strong>：將後端服務部署至 AWS EC2，使用 LAMP Stack。</li><li><strong>通訊</strong>：使用 WebSocket 實現即時資料推送。</li></ul><h3 class="text-xl font-bold text-blue-600 mt-6">專案成果</h3><ul class="list-disc list-inside space-y-2"><li>成功實現遠端控制硬體設備。</li><li>即時監控環境資料 (溫度、濕度)。</li><li>系統穩定運行，獲得教授好評。</li><li>學習到硬體控制、網路通訊、雲端部署等技能。</li></ul></div>', '#', '["Python","Raspberry Pi","AWS EC2","PHP","LAMP Stack"]'),

(101, 'note', '關於 Clean Code 的筆記', '紀錄一些關於代碼整潔與重構的實踐心得。', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', '這是一篇關於 Clean Code 的筆記，探討了如何撰寫更具可讀性、可維護性的程式碼。', '<div class="space-y-4"><h3 class="text-xl font-bold text-blue-600">為什麼需要 Clean Code？</h3><p>程式碼不只是寫給機器看的，更重要的是寫給人看的。一份乾淨的程式碼可以大幅降低維護成本，提升開發效率。</p><h3 class="text-xl font-bold text-blue-600 mt-6">核心原則</h3><ul class="list-disc list-inside space-y-2"><li><strong>有意義的命名</strong>：變數、函數、類別的名稱應該清楚表達其用途。</li><li><strong>函數應該短小</strong>：一個函數只做一件事，長度不超過 20 行。</li><li><strong>避免註解</strong>：好的程式碼會自己說話，不需要過多註解。</li><li><strong>DRY 原則</strong>：Don\'t Repeat Yourself，避免重複程式碼。</li><li><strong>單一職責</strong>：每個類別、函數只負責一件事。</li></ul><h3 class="text-xl font-bold text-blue-600 mt-6">實踐心得</h3><p>在實際專案中，我學習到重構的重要性。透過持續重構，可以讓程式碼保持乾淨，降低技術債。但重構需要有完整的測試覆蓋，才能確保不會破壞現有功能。</p></div>', NULL, '["Clean Code","Refactoring"]'),

(102, 'note', 'Vue 3 Composition API 學習', '深入理解 Vue 3 的 Composition API 如何改善代碼組織與重用性。', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', '這是一篇關於 Vue 3 Composition API 的學習筆記。', '<div class="space-y-4"><h3 class="text-xl font-bold text-blue-600">什麼是 Composition API？</h3><p>Composition API 是 Vue 3 引入的新特性，提供了更靈活的程式碼組織方式。相比 Options API，Composition API 更適合大型專案與邏輯複用。</p><h3 class="text-xl font-bold text-blue-600 mt-6">核心概念</h3><ul class="list-disc list-inside space-y-2"><li><strong>setup()</strong>：組件的入口函數，所有邏輯都在這裡定義。</li><li><strong>ref() 與 reactive()</strong>：建立響應式資料。</li><li><strong>computed()</strong>：建立計算屬性。</li><li><strong>watch() 與 watchEffect()</strong>：監聽資料變化。</li><li><strong>生命週期鉤子</strong>：onMounted、onUpdated 等。</li></ul><h3 class="text-xl font-bold text-blue-600 mt-6">優勢</h3><ul class="list-disc list-inside space-y-2"><li><strong>更好的邏輯複用</strong>：透過 composables 可以輕鬆共享邏輯。</li><li><strong>更清晰的程式碼組織</strong>：相關邏輯可以寫在一起，不用分散在不同選項中。</li><li><strong>更好的 TypeScript 支援</strong>：型別推導更準確。</li><li><strong>更小的打包體積</strong>：Tree-shaking 更友善。</li></ul><h3 class="text-xl font-bold text-blue-600 mt-6">學習心得</h3><p>一開始從 Options API 轉換到 Composition API 時需要一些時間適應，但熟悉後會發現程式碼更易於維護與測試。特別是在開發可重用邏輯時，composables 的優勢非常明顯。</p></div>', NULL, '["Vue.js","Composition API"]');
```

---

### 4. `skills` (專業技能)

**結構**:

```sql
CREATE TABLE `skills` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `category` VARCHAR(100) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `level` INT NOT NULL CHECK (`level` >= 0 AND `level` <= 100),
  `icon` VARCHAR(100),
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**種子資料**:

```sql
INSERT INTO `skills` (`id`, `category`, `name`, `level`, `icon`) VALUES
(1, '後端開發', 'PHP', 95, 'fab,php'),
(2, '後端開發', 'Laravel', 90, 'fab,laravel'),
(3, '後端開發', 'CodeIgniter', 90, 'fas,code'),
(4, '後端開發', 'MySQL', 85, 'fas,database'),
(5, '前端開發', 'Vue.js', 80, 'fab,vuejs'),
(6, '前端開發', 'JavaScript', 80, 'fab,js-square'),
(7, '前端開發', 'AngularJS', 70, 'fab,angular'),
(8, 'DevOps & 部署', 'Docker', 75, 'fab,docker'),
(9, 'DevOps & 部署', 'Git', 85, 'fab,git-alt'),
(10, 'DevOps & 部署', 'CI/CD', 70, 'fab,github'),
(11, 'DevOps & 部署', 'AWS', 65, 'fab,aws');
```

---

### 5. `timelines` (時間軸項目)

**結構**:

```sql
CREATE TABLE `timelines` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `type` ENUM('experience', 'education') NOT NULL,
  `period` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(255),
  `description` TEXT,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**種子資料**:

```sql
INSERT INTO `timelines` (`id`, `type`, `period`, `title`, `subtitle`, `description`) VALUES
(1, 'experience', '2025/1 - 至今', '全端工程師', '成創永續股份有限公司', '<li>主導核心專案從 CI3 至 CI4 的升級與重構，引入服務化架構，提升系統可維護性。</li><li>整合 SonarQube 進行程式碼品質分析，逐步降低技術債。</li><li>優化資料庫查詢與索引設計，提升系統回應速度約 30%。</li><li>參與新功能開發與需求討論，與前端團隊協作。</li>'),
(2, 'experience', '2023/8 - 2024/7', '軟體工程師', '紅崴科技股份有限公司', '<li>在大型電商平台中，使用 AngularJS 與 PHP 開發與維護多個核心模組。</li><li>設計與實作 RESTful API，處理商品、訂單、會員等業務邏輯。</li><li>協助進行系統 Bug 修復與效能優化。</li><li>學習敏捷開發流程與團隊協作技能。</li>'),
(3, 'education', '2020/9 - 2024/6', '資訊管理學系 學士', '南臺科技大學', '<li>畢業專題研究：使用 Python 與樹莓派，開發物聯網應用，並將服務部署於 AWS EC2。</li><li>修習課程：資料結構、演算法、資料庫系統、網路程式設計、系統分析與設計等。</li><li>參與校內程式競賽與技術社團活動。</li>');
```

---

## 📚 參考資源

### Vue 3 官方文件

- [Vue 3 Official Docs](https://vuejs.org/)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)

### Tailwind CSS

- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### 工具與套件

- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [FontAwesome](https://fontawesome.com/)

---

## 📄 更新日誌

### 2025-11-05（第四次更新）

**✨ 功能新增**

- ✅ 新增 404 頁面 (`NotFound.vue`) 並設定全域路由，提升使用者體驗。

### 2025-11-05（第三次更新）

**🎨 樣式優化**

- ✅ 修正 `.modern-card` 高度不一致問題，確保在網格佈局中卡片等高。

### 2025-11-05（第二次更新）

**🎉 前端優化完成**

- ✅ 實作路由懶加載，提升首屏載入速度
- ✅ 拆分 About.vue（409→24行），建立 5 個子組件
- ✅ 分離資料層，建立 profile.js、skills.js、timeline.js
- ✅ 統一動畫定義至 custom.css
- ✅ SkillBar 改用 useIntersectionObserver composable
- ✅ 強化所有組件的 Props 驗證
- ✅ 實作圖片懶加載（ProjectItem）
- ✅ 重構 Contact 頁面，改用 mailto 連結
- ✅ ProjectDetail 加入 404 錯誤處理
- ✅ 移除未使用程式碼（HelloWorld.vue、axios）

**優化成果**:
- 程式碼可維護性提升 ↑
- 首屏載入速度改善 ↑
- 組件結構更清晰 ↑
- Props 驗證完整 ↑
- 使用者體驗優化 ↑

### 2025-11-05（第一次更新）

- 完整重寫專案文件
- 新增詳細的架構說明與資料流
- 新增已知問題與優化建議章節
- 新增優化路線圖
- 新增開發規範章節
- 完善資料庫結構說明

---

## 📞 聯絡資訊

如有任何問題或建議，歡迎聯繫：

- **Email**: jay86888688@gmail.com
- **GitHub**: [kazo-dev](https://github.com/kazo-dev)
- **Resume**: [CakeResume](https://www.cakeresume.com/s--5_oWGY1-GzBwX44-Y8aP6A--/kazo-1d5a76)

---

_最後更新：2025-11-05（前端優化完成）_
