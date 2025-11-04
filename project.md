# 專案結構

- `src`
  - `App.vue`: 根組件，包含導航欄和路由視圖。
  - `main.js`: 應用程式入口，初始化 Vue、路由、FontAwesome 圖標和 particles.js。
  - `index.css`: 全局樣式 (目前為空)。
  - `assets`: 靜態資源
    - `custom.css`: 自定義樣式，如 `.modern-card` 和動畫。
    - `vue.svg`: Vue 的 Logo。
  - `components`: 可重用組件
    - `Navbar.vue`: 頂部導航欄。
    - `ProjectItem.vue`: 專案列表中的單個專案。
    - `SkillBar.vue`: 技能進度條。
    - `TimelineItem.vue`: 時間線項目 (用於經驗和學歷)。
    - `HelloWorld.vue`: 預設的歡迎組件 (未使用)。
  - `composables`: 可組合函數
    - `useIntersectionObserver.js`: 處理元素可見性的 Intersection Observer API。
    - `useTypewriter.js`: 一個打字機效果的可組合函數。
  - `data`: 數據
    - `items.js`: 包含專案和筆記的數據。
  - `router`: 路由配置
    - `index.js`: 定義所有頁面路由。
  - `views`: 頁面級組件
    - `Home.vue`: 首頁。
    - `About.vue`: 關於我頁面。
    - `Project.vue`: 專案列表頁面。
    - `ProjectDetail.vue`: 單個專案的詳細信息頁面。
    - `Contact.vue`: 聯繫我頁面。

---

## 資料庫種子資料 (SQL)

為了方便您將現有網站內容無痛轉移至後端資料庫，以下提供可用於初始化資料庫的 SQL `INSERT` 腳本。

### 1. `personal_infos` (個人資訊)

```sql
INSERT INTO `personal_infos` (`id`, `name`, `job_title`, `avatar_url`, `email`, `phone`, `cv_url`, `about_me`) VALUES
(1, '蘇建維', '後端工程師', '/images/avatar.png', 'jay86888688@gmail.com', '0930-118-867', 'https://www.cakeresume.com/s--5_oWGY1-GzBwX44-Y8aP6A--/kazo-1d5a76', '我是一位具備 1-2 年經驗的後端工程師，專注於打造穩健、可擴展的網頁應用程式。\n我擁有執行複雜系統遷移與重構 (CodeIgniter 3 至 4) 的實戰經驗，並成功將舊有程式碼重構成符合現代標準的分層式架構，顯著提升了系統的可維護性與效能。\n我對乾淨的程式碼、自動化流程 (CI/CD) 以及運用技術解決真實世界問題充滿熱情。期待能為一個具前瞻性的團隊貢獻所長，共同打造高品質的軟體產品。');
```

### 2. `socials` (社群連結)

```sql
INSERT INTO `socials` (`id`, `name`, `url`, `icon`) VALUES
(1, 'GitHub', 'https://github.com/kazo-dev', 'fab,github'),
(2, 'Resume', 'https://www.cakeresume.com/s--5_oWGY1-GzBwX44-Y8aP6A--/kazo-1d5a76', 'fas,file-alt');
```

### 3. `items` (專案與筆記)

```sql
INSERT INTO `items` (`id`, `type`, `title`, `summary`, `image_url`, `description`, `long_description`, `link`, `technologies`) VALUES
(1, 'project', 'SPA 租屋平台 (個人專案)', '使用 Vue3 搭配 Laravel 開發的 SPA 租屋平台，並透過 Docker 建立開發環境與 GitHub Actions 自動部署。', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', '前後端分離的 SPA 租屋平台，前端採用 Vue3，後端採用 Laravel API。', '<div class="space-y-4">...</div>', 'https://github.com/kazory1115/web_house', '[\"Vue.js\",\"Laravel\",\"Docker\",\"GitHub Actions\",\"MySQL\",\"RESTful API\"]'),
(2, 'project', 'ESG系統升級與重構 (公司專案)', '將大型專案由 CodeIgniter 3 升級至 CodeIgniter 4，並導入分層式架構重構程式碼。', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', '主導公司核心 ESG 系統從 CodeIgniter 3 到 CodeIgniter 4 的遷移與現代化重構。', '<div class="space-y-4">...</div>', '#', '[\"CodeIgniter 4\",\"PHP\",\"分層式架構\",\"SonarQube\",\"MySQL\",\"jQuery\"]'),
(3, 'project', '網路購物平台 (實習專案)', '參與網路購物平台的實習，累積前後端開發、多人協作以及 API 設計與整合的經驗。', 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', '在大型電商平台團隊中，負責新功能開發與 API 設計。', '<div class="space-y-4">...</div>', '#', '[\"AngularJS\",\"Laravel\",\"PHP\",\"API Design\",\"Git\",\"Team Collaboration\"]'),
(4, 'project', '物聯網應用專案 (大學專題)', '使用 Python 與樹莓派開發的物聯網控制應用，並將後端服務部署於 AWS EC2。', 'https://plus.unsplash.com/premium_photo-1670678203548-f6ad7b39ef11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', '使用 Python 與樹莓派開發的物聯網控制應用，並將後端服務部署於 AWS EC2。', '<div class="space-y-4">...</div>', '#', '[\"Python\",\"Raspberry Pi\",\"AWS EC2\",\"PHP\",\"LAMP Stack\"]'),
(101, 'note', '關於 Clean Code 的筆記', '紀錄一些關於代碼整潔與重構的實踐心得。', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', '這是一篇關於 Clean Code 的筆記，探討了如何撰寫更具可讀性、可維護性的程式碼。', '<p>詳細的筆記內容...</p>', 'NULL', '[\"Clean Code\",\"Refactoring\"]'),
(102, 'note', 'Vue 3 Composition API 學習', '深入理解 Vue 3 的 Composition API 如何改善代碼組織與重用性。', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', '這是一篇關於 Vue 3 Composition API 的學習筆記。', '<p>詳細的筆記內容...</p>', 'NULL', '[\"Vue.js\",\"Composition API\"]');
```

### 4. `skills` (專業技能)

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

### 5. `timelines` (時間軸項目)

```sql
INSERT INTO `timelines` (`id`, `type`, `period`, `title`, `subtitle`, `description`) VALUES
(1, 'experience', '2025/1 - 至今', '全端工程師', '成創永續股份有限公司', '<li>主導核心專案從 CI3 至 CI4 的升級與重構，引入服務化架構，提升系統可維護性。</li>...'),
(2, 'experience', '2023/8 - 2024/7', '軟體工程師', '紅崴科技股份有限公司', '<li>在大型電商平台中，使用 AngularJS 與 PHP 開發與維護多個核心模組。</li>...'),
(3, 'education', '2020/9 - 2024/6', '資訊管理學系 學士', '南臺科技大學', '<li>畢業專題研究：使用 Python 與樹莓派，開發物聯網應用，並將服務部署於 AWS EC2。</li>');
```