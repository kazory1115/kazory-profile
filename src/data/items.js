import { ref } from 'vue';

export const allItems = ref([
  {
    id: 1,
    type: 'project',
    title: 'SPA 租屋平台 (個人專案)',
    summary: '使用 Vue3 搭配 Laravel 開發的 SPA 租屋平台，並透過 Docker 建立開發環境與 GitHub Actions 自動部署。',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    description: '前後端分離的 SPA 租屋平台，前端採用 Vue3，後端採用 Laravel API。',
    link: 'https://github.com/kazory1115/web_house',
    longDescription: `<div class="space-y-4">
      <div><h4 class="text-xl font-bold text-white mt-4 mb-2">情境 (Situation)</h4><p>為了深化並實踐全端開發技能，我獨立發起此專案，目標是從零到一打造一個功能完整的現代化網頁應用。</p></div>
      <div><h4 class="text-xl font-bold text-white mt-4 mb-2">任務 (Task)</h4><p>開發一個前後端分離的 SPA 租屋平台，涵蓋使用者驗證、房源列表、搜尋篩選及地圖整合等核心功能，並實現自動化部署。</p></div>
      <div><h4 class="text-xl font-bold text-white mt-4 mb-2">行動 (Action)</h4><ul class="list-disc pl-6 text-gray-300"><li><b>前端：</b>使用 Vue 3 Composition API 及 Vue Router 打造互動式介面，並以 Tailwind CSS 進行客製化樣式設計。</li>
      <li><b>後端：</b>以 Laravel 建構 RESTful API，並透過 Sanctum 實現 SPA 的使用者身份驗證。</li><li><b>開發與部署：</b>全程使用 Docker 容器化開發環境，並設定 GitHub Actions 在推送到主分支時，自動部署至遠端主機。</li></ul></div>
      <div><h4 class="text-xl font-bold text-white mt-4 mb-2">成果 (Result)</h4><p>成功完成一個功能完善的 SPA 應用，不僅證明了獨立開發全端專案的能力，更完整體現了從開發、測試到自動化部署的現代化 DevOps 工作流程。</p></div>
      <div class="mt-6"><h4 class="text-xl font-bold text-white mt-4 mb-2">自動化部署流程 (CI/CD)</h4><div class="font-mono text-sm text-gray-400 bg-gray-900 p-4 rounded-lg"><code><span class="text-orange-400">Git Push (main)</span> &rarr; 
      <span class="text-purple-400">GitHub Actions</span> &rarr; [Build & Test] &rarr; <span class="text-green-400">SSH & Deploy to VPS</span></code></div></div>
      </div>`,
    technologies: [
      'Vue.js',
      'Laravel',
      'Docker',
      'GitHub Actions',
      'MySQL',
      'RESTful API',
    ],
  },
  {
    id: 2,
    type: 'project',
    title: 'ESG系統升級與重構 (公司專案)',
    summary: '將大型專案由 CodeIgniter 3 升級至 CodeIgniter 4，並導入分層式架構重構程式碼。',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: '主導公司核心 ESG 系統從 CodeIgniter 3 到 CodeIgniter 4 的遷移與現代化重構。',
    link: '#',
    longDescription: '<div class="space-y-4">' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">情境 (Situation)</h4><p>公司既有的 ERP 系統因架構老舊、程式碼耦合度高，導致新功能開發困難、維護成本高昂。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">任務 (Task)</h4><p>我的核心任務是主導系統升級，將專案從 CodeIgniter 3 遷移至 4，並藉此機會進行架構重構，以解決長期的技術債。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">行動 (Action)</h4><ul class="list-disc pl-6 text-gray-300"><li><b>架構設計：</b>引入 Service 與 Trait 的分層式架構，將商業邏輯從控制器中分離，實現了關注點分離 (SoC)。</li><li><b>程式碼品質：</b>整合 SonarQube 進行靜態程式碼分析，建立團隊的 Code Review 與品質標準，並成功修復數十個主要程式碼異味。</li><li><b>遷移執行：</b>規劃並執行 CI3 至 CI4 的升級路徑，解決了框架版本間的相容性問題與依賴性衝突。</li><li><b>效能優化：</b>針對高負載模組進行資料庫查詢優化，提升系統整體回應速度。</li></ul></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">成果 (Result)</h4><ul class="list-disc pl-6 text-gray-300"><li><b>提升開發效率：</b>新架構使模組邊界更清晰，預估新功能的開發時間縮短了 20%。</li><li><b>提高程式碼品質：</b>程式碼重複率降低了 15%，大幅提升了程式碼的可讀性與可維護性。</li><li><b>賦能團隊：</b>建立了可遵循的開發規範，降低了新進人員的學習曲線。</li></ul></div>' +
      '</div>',
    technologies: [
      'CodeIgniter 4',
      'PHP',
      '分層式架構',
      'SonarQube',
      'MySQL',
      'jQuery',
    ],
  },
  {
    id: 4,
    type: 'project',
    title: '物聯網應用專案 (大學專題)',
    summary: '使用 Python 與樹莓派開發的物聯網控制應用，並將後端服務部署於 AWS EC2。',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1670678203548-f6ad7b39ef11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: '使用 Python 與樹莓派開發的物聯網控制應用，並將後端服務部署於 AWS EC2。',
    link: '#',
    longDescription: '<div class="space-y-4">' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">情境 (Situation)</h4><p>此為大學畢業專題，目標是整合硬體控制、後端開發與雲端部署，打造一個完整的物聯網 (IoT) 應用。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">任務 (Task)</h4><p>開發一個可以透過網頁介面遠端控制樹莓派上硬體元件 (如：LED 燈、感測器) 的系統。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">行動 (Action)</h4><ul class="list-disc pl-6 text-gray-300"><li><b>硬體層：</b>在樹莓派上使用 Python 撰寫腳本，以控制 GPIO 接腳上的硬體元件。</li><li><b>後端服務：</b>開發 PHP 後端應用程式，提供 API 讓前端呼叫以觸發硬體操作。</li><li><b>雲端部署：</b>在 AWS EC2 虛擬主機上，從零開始架設 LAMP (Linux, Apache, MySQL, PHP) 伺服器環境，並將後端服務部署於此。</li></ul></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">成果 (Result)</h4><p>成功打造出一個功能性的物聯網應用原型，並獲得了寶貴的雲端基礎設施 (AWS) 管理與完整 LAMP Stack 部署經驗。</p></div>' +
      '</div>',
    technologies: ['Python', 'Raspberry Pi', 'AWS EC2', 'PHP', 'LAMP Stack'],
  },
  {
    id: 3,
    type: 'project',
    title: '網路購物平台 (實習專案)',
    summary: '參與網路購物平台的實習，累積前後端開發、多人協作以及 API 設計與整合的經驗。',
    imageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: '在大型電商平台團隊中，負責新功能開發與 API 設計。',
    link: '#',
    longDescription: '<div class="space-y-4">' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">情境 (Situation)</h4><p>在快速迭代的電商環境中，團隊需要開發新功能以滿足市場需求，並為行動端應用提供穩定的 API 服務。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">任務 (Task)</h4><p>作為實習生，我的任務是支援前端模組開發，並在後期參與後端 API 的設計與開發。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">行動 (Action)</h4><ul class="list-disc pl-6 text-gray-300"><li><b>前端開發：</b>使用 AngularJS 開發與維護商品、訂單等管理模組，並處理與後端 API 的資料綁定。</li><li><b>後端開發：</b>學習並使用 Laravel 為 App 設計與開發 RESTful API，涵蓋使用者、商品與購物車等核心功能。</li><li><b>團隊協作：</b>透過 Git 參與團隊的開發流程，並使用 Postman 進行 API 測試與除錯。</li></ul></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">成果 (Result)</h4><p>這次實習讓我從校園專案過渡到大型商業專案的開發，不僅讓我對 MVC 架構與 API 設計有了深入的實務理解，更為我後來的全職工作奠定了穩固的技術基礎。</p></div>' +
      '</div>',
    technologies: [
      'AngularJS',
      'Laravel',
      'PHP',
      'API Design',
      'Git',
      'Team Collaboration',
    ],
  },
  {
    id: 101,
    type: 'note',
    title: '關於 Clean Code 的筆記',
    summary: '紀錄一些關於代碼整潔與重構的實踐心得。',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: '這是一篇關於 Clean Code 的筆記，探討了如何撰寫更具可讀性、可維護性的程式碼。',
    longDescription: '<p>詳細的筆記內容...</p>',
    technologies: ['Clean Code', 'Refactoring'],
  },
  {
    id: 102,
    type: 'note',
    title: 'Vue 3 Composition API 學習',
    summary: '深入理解 Vue 3 的 Composition API 如何改善代碼組織與重用性。',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: '這是一篇關於 Vue 3 Composition API 的學習筆記。',
    longDescription: '<p>詳細的筆記內容...</p>',
    technologies: ['Vue.js', 'Composition API'],
  },
]);
