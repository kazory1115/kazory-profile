import avatarImg from '/images/avatar.png';
export { writings } from './writings.js';
export { projects } from './projects.js';

export const profile = {
  name: '蘇建維',
  englishName: 'Kazory Su',
  title: '後端工程師',
  location: '台灣',
  avatarUrl: avatarImg,
  email: 'jay86888688@gmail.com',
  githubUrl: 'https://github.com/kazory1115',
  intro:
    '專注於 PHP 後端、既有系統重構、API 設計與大型資料流程整理，重視分層清晰、可維護性與實作落地。',
  summary: [
    '主要技術棧為 PHP、CodeIgniter、Laravel、MySQL 與 Vue 3。習慣將 Controller 壓薄，將複雜流程收斂到 Service Layer 或明確的應用層。',
    '實作經驗涵蓋舊系統重構、CodeIgniter 3 升級到 CodeIgniter 4、RESTful API 拆分、大型匯出流程優化，以及 Docker 化的本地開發流程整理。',
    '比起追求表面上的功能完成，更重視資料如何流動、邏輯應該落在哪一層，以及需求持續疊加後專案是否仍可維護。',
  ],
};

export const navItems = [
  { to: '/', text: '首頁' },
  { to: '/about', text: '關於我' },
  { to: '/project', text: '專案' },
  { to: '/writing', text: '文章' },
];

export const heroMetrics = [
  { value: 'PHP', label: '主力語言' },
  { value: 'CI / Laravel', label: '主要框架' },
  { value: '系統重構', label: '核心主題' },
  { value: '10萬+', label: '曾處理資料量級' },
];

export const introTags = [
  'CodeIgniter 3 / 4',
  'Laravel 12',
  'Service Layer',
  'Repository Pattern',
  'RESTful API',
  'MySQL / MariaDB',
  'Vue 3 + Vite',
  'Docker Compose',
];

export const focusAreas = [
  {
    title: '舊系統重構',
    text: '整理 fat controller、共用邏輯散落與模組邊界不清的舊系統，重新建立可維護的責任分層。',
  },
  {
    title: '大型資料流程',
    text: '面對大量資料匯出、批次處理與長流程操作時，優先考慮 chunk、batch、I/O 與 transaction 邊界。',
  },
  {
    title: '開發體驗',
    text: '透過 Docker、README、部署流程與專案約定整理，降低接手成本與環境不一致問題。',
  },
];

export const engineeringPrinciples = [
  'Controller 不直接承擔複雜資料流程，商業邏輯應收斂到 Service 或應用層。',
  '跨多個 Model 的更新需要有清楚的 transaction 邊界與 rollback 策略。',
  '大量資料不做一次全撈，優先考慮 chunk、cursor、batch insert 與索引設計。',
  '每個案例都應能回答問題在哪、為什麼這樣拆、後續如何擴充。',
];

export const architectureHighlights = [
  {
    title: 'Thin Controller',
    description: '將驗證、流程編排與資料存取責任拆開，避免控制器膨脹成不可維護的流程腳本。',
  },
  {
    title: 'Service / Repository',
    description: '區分商業規則與資料存取，讓重構、測試與後續擴充更有邊界。',
  },
  {
    title: 'Operational Thinking',
    description: '除了功能實作，也持續關注 timeout、匯出、檔案處理與部署流程是否穩定。',
  },
];

export const journey = [
  {
    period: '目前重點',
    title: '後端重構、技術整理與可維護性優先',
    description:
      '持續將過去做過的系統與 side project 整理成可閱讀的案例，聚焦 API、資料流、模組邊界與工程決策。',
  },
  {
    period: '系統重構',
    title: '從既有系統整理出可演進的分層架構',
    description:
      '處理過 CodeIgniter 升級、Service Layer 收斂、API 化與前後端責任切分，目標是降低需求疊加後的維護成本。',
  },
  {
    period: '個人專案',
    title: '透過小型專案驗證架構與部署流程',
    description:
      '使用 Vue 3、Laravel、Docker、SSE、WebSocket 等 side project 驗證實作細節，避免停留在概念層。',
  },
];

export const skillGroups = [
  {
    title: '後端開發',
    items: ['PHP', 'CodeIgniter 3 / 4', 'Laravel 12', 'RESTful API', 'Service Layer', 'Repository Pattern'],
  },
  {
    title: '資料與基礎設施',
    items: ['MySQL', 'MariaDB', 'PostgreSQL', 'Docker Compose', 'Nginx', 'GitHub Actions'],
  },
  {
    title: '前端與開發工具',
    items: ['Vue 3', 'Vite', 'Pinia', 'JavaScript', 'DataTables', 'Postman', 'SonarQube'],
  },
];

export const featuredChecklist = [
  '精選案例聚焦問題背景、實作方法、技術決策與結果。',
  '技術筆記涵蓋重構、效能、Realtime 與開發流程整理。',
  '網站內容以可讀性與工程脈絡為主，方便快速理解實作能力。',
];

const archivedProjects = [
  {
    id: 1,
    title: 'Easy CRM',
    category: 'Full-stack Case Study',
    description:
      '以 Vue 3 + Laravel 12 建立 CRM 專案，重點放在模組切分、API 設計、狀態管理與 Docker 化的開發流程。',
    context:
      '目標不只是完成 CRUD，而是驗證自己偏好的工程結構能否在 side project 落地，包含權限、模組切分、README 與部署流程。',
    challenge:
      '若專案只追求功能完成，很容易停留在 demo 層級；真正有作品價值的是把架構理由、資料流與開發體驗整理完整。',
    work: [
      '前端使用 Vue 3、Vite、Pinia、Vue Router，讓頁面、狀態與 API 呼叫維持清楚分工。',
      '後端使用 Laravel 12 與 Sanctum，將認證、API 路由與資料操作分開管理。',
      '以 Docker Compose 建立本地開發環境，降低專案啟動與交接成本。',
      '補上 README、環境設定與模組規劃，使專案具備可閱讀與可延續的基礎。',
    ],
    takeaway: [
      '作品集中的 side project 不應只展示畫面，而應清楚呈現架構與工程取捨。',
      '現有模組切分可支撐後續報價、庫存或報表等需求延伸，不需大改主流程。',
    ],
    technologies: ['Vue 3', 'Vite', 'Pinia', 'Laravel 12', 'Sanctum', 'MySQL', 'Docker Compose'],
    link: 'https://github.com/kazory1115/easy-crm',
  },
  {
    id: 2,
    title: 'CodeIgniter 3 升級到 CodeIgniter 4',
    category: 'Refactoring',
    description:
      '整理既有系統的流程與模組邊界，將 Controller / Model 的責任重新拆分，導入較穩定的 Service Layer 結構。',
    context:
      '既有系統真正困難的通常不是框架版本舊，而是流程與相依關係都纏在一起，任何需求都可能牽動多處程式碼。',
    challenge:
      '升級不是單純搬移檔案，而是要同步處理相依套件、路由、API 行為與長期維護成本。',
    work: [
      '盤點 CI3 與 CI4 之間的相依差異，先整理可平移與不可平移的區塊。',
      '將跨多個 Model 的商業邏輯抽到 Service，避免 Controller 持續膨脹。',
      '逐步標準化 API 輸出，讓 Vue / Nuxt 前端更穩定串接。',
      '搭配 SonarQube 追蹤異味與潛在風險，優先處理最容易惡化的區塊。',
    ],
    takeaway: [
      '升級成功的價值不只在版本更新，而在於把未來開發速度與維護風險拉回可控範圍。',
      'Service Layer 若缺乏命名與邊界規範，很容易從 fat controller 變成 fat service。',
    ],
    technologies: ['PHP', 'CodeIgniter 3', 'CodeIgniter 4', 'Service Layer', 'RESTful API', 'SonarQube'],
  },
  {
    id: 3,
    title: '大型匯出流程與 timeout 問題整理',
    category: 'Performance',
    description:
      '針對大量資料匯出、壓縮檔生成與檔案輸出流程，重構成較穩定的批次處理方式，避免 request 直接卡死。',
    context:
      '匯出功能初期通常可以運作，但資料量一旦放大，就容易因記憶體、I/O 或 SQL 負載失控。',
    challenge:
      '真正困難的不是把檔案吐出來，而是如何在大資料量、長流程與多步驟檔案操作下仍可追蹤、可重試。',
    work: [
      '將一次性處理改成 chunk / batch 流程，降低單次查詢與記憶體壓力。',
      '把檔案生成、壓縮與下載切開，避免 request 直接承受整段流程。',
      '重新檢查索引、查詢方式與 join 成本，減少不必要的資料搬運。',
      '評估導入 Queue / Worker 的切點，讓長流程有更合理的執行模式。',
    ],
    takeaway: [
      '匯出問題表面上像 timeout，根本原因通常是流程責任混亂與資料處理策略不對。',
      '只靠調高 max_execution_time 是延後問題，不是解法。',
    ],
    technologies: ['PHP', 'MySQL', 'Batch Processing', 'Zip', 'Large File Export'],
  },
  {
    id: 4,
    title: 'Vue 3 + Laravel SPA 實驗場',
    category: 'Practice',
    description:
      '以小型 SPA 驗證前後端分離、部署流程與 GitHub Actions 自動化，作為可延伸專案的基礎骨架。',
    context:
      'side project 是驗證技術細節的實驗場，用來觀察哪些做法能長期維護，而不只是短期可跑。',
    challenge:
      '若骨架一開始就鬆散，後續每加一個功能都會變慢，專案很快失去延伸價值。',
    work: [
      '建立 Vue 3 與 Laravel API 的基本協作流程。',
      '導入 Docker 與部署腳本，讓本機與伺服器環境更一致。',
      '搭配 GitHub Actions 簡化部署步驟，減少人工操作。',
    ],
    takeaway: [
      '好的骨架會直接影響 side project 能否從 demo 演進成真正可持續維護的系統。',
    ],
    technologies: ['Vue 3', 'Laravel', 'RESTful API', 'Docker', 'GitHub Actions', 'VPS'],
    link: 'https://github.com/kazory1115/web_house',
  },
];

const archivedWritings = [
  {
    slug: 'service-layer-in-ci-refactor',
    title: 'CodeIgniter 重構時，Service Layer 要怎麼拆才不會再長歪',
    status: 'Draft',
    date: '2026-03-30',
    category: 'Refactoring',
    readTime: '6 min read',
    excerpt:
      '整理舊專案時，最大的坑通常不是框架版本，而是流程散在 Controller 與 Model。這篇筆記聚焦在 Service Layer 的切法與邊界。',
    tags: ['CodeIgniter', 'Refactoring', 'Service Layer'],
    sections: [
      {
        heading: 'Problem Statement',
        paragraphs: [
          '很多人說要抽 Service，但如果沒有明確邊界，只是把 controller 裡的流程搬家，最後只會得到另一個更大的 service。',
          'Service 應該負責商業流程編排，不應同時吞下查詢細節、格式轉換、權限判斷與所有例外處理。',
        ],
      },
      {
        heading: 'Design Approach',
        paragraphs: [
          '先找出真正跨 Model、跨流程的商業規則，再決定哪些責任進 Service，哪些留在 Repository 或 Query Layer。',
          '命名要貼近用例，例如 CreateQuoteService、ExportReportService，而不是 CommonService、BaseService 這類容易失控的命名。',
        ],
      },
      {
        heading: 'Implementation Notes',
        paragraphs: [
          'Transaction 要集中管理，不要散在各個 Model；DTO、request object 與 response shape 也要盡量穩定。',
        ],
      },
    ],
  },
  {
    slug: 'avoid-timeout-in-large-export',
    title: '大型匯出避免 timeout，不是調大時間就好',
    status: 'Draft',
    date: '2026-03-30',
    category: 'Performance',
    readTime: '5 min read',
    excerpt:
      '當匯出流程碰到大量資料與壓縮檔處理時，真正要拆的是資料批次、檔案步驟與流程責任，而不是只調整 PHP 設定。',
    tags: ['Batch', 'Export', 'Performance'],
    sections: [
      {
        heading: 'Root Cause',
        paragraphs: [
          'timeout 只是症狀，通常背後伴隨一次全撈、大量 join、檔案 I/O 堆疊與 request 長時間佔住工作執行緒。',
        ],
      },
      {
        heading: 'Recommended Approach',
        paragraphs: [
          '把查詢、組裝、暫存、壓縮與下載拆成獨立步驟，讓每段可觀測、可重試、可定位瓶頸。',
          '資料量再大一點時，應直接評估 queue / worker，而不是繼續硬撐同步流程。',
        ],
      },
      {
        heading: 'Operational Considerations',
        paragraphs: [
          'Windows / Linux 路徑差異、中文檔名與暫存檔清理策略，都應在一開始設計好。',
        ],
      },
    ],
  },
  {
    slug: 'sse-vs-websocket-notes',
    title: 'SSE 與 WebSocket：什麼場景該用哪個',
    status: 'Draft',
    date: '2026-03-30',
    category: 'Realtime',
    readTime: '4 min read',
    excerpt:
      '從實作 demo 回推，如果需求只是單向更新，SSE 常常比 WebSocket 更直接；雙向互動才值得上 WebSocket。',
    tags: ['SSE', 'WebSocket', 'Realtime'],
    sections: [
      {
        heading: 'Decision Rule',
        paragraphs: [
          '先確認需求是否需要雙向溝通。如果伺服器只需要持續推送狀態、log 或通知，SSE 的維護成本通常更低。',
        ],
      },
      {
        heading: 'Trade-offs',
        paragraphs: [
          'WebSocket 更有彈性，但連線管理、狀態同步與重連策略也更複雜。需求沒到那個程度，不需要先把系統做重。',
        ],
      },
      {
        heading: 'Practical Notes',
        paragraphs: [
          'side project 很適合拿來驗證這類通訊模式，避免在正式專案第一次踩坑。',
        ],
      },
    ],
  },
  {
    slug: 'minimum-docker-setup-for-side-projects',
    title: 'Side project 的 Docker 骨架，我會先準備哪些東西',
    status: 'Draft',
    date: '2026-03-30',
    category: 'Workflow',
    readTime: '4 min read',
    excerpt:
      'Docker 不只是方便啟動，而是讓環境、README 與部署流程有一致基準。這篇整理建立 side project 骨架時會先做的事。',
    tags: ['Docker', 'DX', 'Laravel'],
    sections: [
      {
        heading: 'Minimum Setup',
        paragraphs: [
          '至少要有 app、db、web server 與 env 說明，讓另一個工程師不靠口頭說明也能把專案跑起來。',
        ],
      },
      {
        heading: 'Why It Matters',
        paragraphs: [
          '很多 side project 不是不能做，而是幾個月後自己都忘了怎麼啟動。沒有一致骨架，作品就很難累積。',
        ],
      },
      {
        heading: 'What I Usually Include',
        paragraphs: [
          'README、ports、volume、基本指令與資料初始化方式，這些都應該是作品的一部分。',
        ],
      },
    ],
  },
];

export const githubRepositories = [
  {
    name: 'easy-crm',
    language: 'PHP',
    updatedAt: '2026-03-26',
    url: 'https://github.com/kazory1115/easy-crm',
    note: 'CRM side project，強調模組切分、API 設計與 Docker 化流程。',
  },
  {
    name: 'simple-websocket-server',
    language: 'JavaScript',
    updatedAt: '2026-03-13',
    url: 'https://github.com/kazory1115/simple-websocket-server',
    note: '以最小範例驗證 WebSocket 溝通流程與事件傳遞。',
  },
  {
    name: 'chat_sse_demo',
    language: 'HTML',
    updatedAt: '2026-02-06',
    url: 'https://github.com/kazory1115/chat_sse_demo',
    note: '用小型 demo 驗證 SSE 的實際使用場景。',
  },
  {
    name: 'LaravelDocker',
    language: 'Dockerfile',
    updatedAt: '2025-07-14',
    url: 'https://github.com/kazory1115/LaravelDocker',
    note: 'Laravel + Docker 開發骨架，偏向本地開發體驗整理。',
  },
  {
    name: 'quote_project',
    language: 'Vue',
    updatedAt: '2025-06-27',
    url: 'https://github.com/kazory1115/quote_project',
    note: 'Vue 專案實作，主要觀察元件結構與資料互動方式。',
  },
  {
    name: 'stock_tool',
    language: 'Python',
    updatedAt: '2025-08-19',
    url: 'https://github.com/kazory1115/stock_tool',
    note: '用 Python 寫的小工具，用來驗證資料整理流程。',
  },
];
