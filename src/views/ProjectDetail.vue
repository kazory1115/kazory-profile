<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div v-if="project" class="container mx-auto">
      <div class="mb-8">
        <router-link
          to="/project"
          class="inline-flex items-center text-gray-400 hover:text-white"
        >
          <svg
            class="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          返回專案列表
        </router-link>
      </div>
      <div class="modern-card p-8 md:p-12">
        <h1 class="text-5xl font-extrabold text-white mb-4">
          {{ project.title }}
        </h1>
        <p class="text-xl text-gray-400 mb-8">{{ project.description }}</p>

        <div class="prose prose-lg max-w-none prose-invert" v-html="project.longDescription">
        </div>

        <div class="mt-12">
          <h2 class="text-3xl font-bold text-white mb-4">技術棧</h2>
          <div class="flex flex-wrap">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="bg-gray-700 text-gray-300 text-base font-medium mr-3 mb-3 px-4 py-2 rounded-full"
              >{{ tech }}</span
            >
          </div>
        </div>

        <div v-if="project.link && project.link !== '#'" class="mt-12 text-center">
          <a
            :href="project.link"
            target="_blank"
            class="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            訪問網站
          </a>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center h-screen">
      <div class="text-center">
        <svg
          class="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="text-xl text-gray-500">正在載入專案...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const project = ref(null);

const projects = [
  {
    id: 1,
    title: 'SPA 租屋平台 (個人專案)',
    description: '前後端分離的 SPA 租屋平台，前端採用 Vue3，後端採用 Laravel API。',
    link: 'https://github.com/kazo-dev/laravel-rent-house',
    longDescription:
      '<div class="space-y-4">' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">情境 (Situation)</h4><p>為了深化並實踐全端開發技能，我獨立發起此專案，目標是從零到一打造一個功能完整的現代化網頁應用。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">任務 (Task)</h4><p>開發一個前後端分離的 SPA 租屋平台，涵蓋使用者驗證、房源列表、搜尋篩選及地圖整合等核心功能，並實現自動化部署。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">行動 (Action)</h4><ul class="list-disc pl-6 text-gray-300"><li><b>前端：</b>使用 Vue 3 Composition API 及 Vue Router 打造互動式介面，並以 Tailwind CSS 進行客製化樣式設計。</li><li><b>後端：</b>以 Laravel 建構 RESTful API，並透過 Sanctum 實現 SPA 的使用者身份驗證。</li><li><b>開發與部署：</b>全程使用 Docker 容器化開發環境，並設定 GitHub Actions 在推送到主分支時，自動部署至遠端主機。</li></ul></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">成果 (Result)</h4><p>成功完成一個功能完善的 SPA 應用，不僅證明了獨立開發全端專案的能力，更完整體現了從開發、測試到自動化部署的現代化 DevOps 工作流程。</p></div>' +
      '<div class="mt-6"><h4 class="text-xl font-bold text-white mt-4 mb-2">自動化部署流程 (CI/CD)</h4><div class="font-mono text-sm text-gray-400 bg-gray-900 p-4 rounded-lg"><code><span class="text-blue-400">Git Push (main)</span> &rarr; <span class="text-purple-400">GitHub Actions</span> &rarr; [Build & Test] &rarr; <span class="text-green-400">SSH & Deploy to VPS</span></code></div></div>' +
      '</div>',
    technologies: ['Vue.js', 'Laravel', 'Docker', 'GitHub Actions', 'MySQL', 'RESTful API'],
  },
  {
    id: 2,
    title: 'ERP 系統升級與重構 (公司專案)',
    description: '主導公司核心 ERP 系統從 CodeIgniter 3 到 CodeIgniter 4 的遷移與現代化重構。',
    link: '#',
    longDescription:
      '<div class="space-y-4">' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">情境 (Situation)</h4><p>公司既有的 ERP 系統因架構老舊、程式碼耦合度高，導致新功能開發困難、維護成本高昂。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">任務 (Task)</h4><p>我的核心任務是主導系統升級，將專案從 CodeIgniter 3 遷移至 4，並藉此機會進行架構重構，以解決長期的技術債。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">行動 (Action)</h4><ul class="list-disc pl-6 text-gray-300"><li><b>架構設計：</b>引入 Service 與 Trait 的分層式架構，將商業邏輯從控制器中分離，實現了關注點分離 (SoC)。</li><li><b>程式碼品質：</b>整合 SonarQube 進行靜態程式碼分析，建立團隊的 Code Review 與品質標準，並成功修復數十個主要程式碼異味。</li><li><b>遷移執行：</b>規劃並執行 CI3 至 CI4 的升級路徑，解決了框架版本間的相容性問題與依賴性衝突。</li><li><b>效能優化：</b>針對高負載模組進行資料庫查詢優化，提升系統整體回應速度。</li></ul></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">成果 (Result)</h4><ul class="list-disc pl-6 text-gray-300"><li><b>提升開發效率：</b>新架構使模組邊界更清晰，預估新功能的開發時間縮短了 20%。</li><li><b>提高程式碼品質：</b>程式碼重複率降低了 15%，大幅提升了程式碼的可讀性與可維護性。</li><li><b>賦能團隊：</b>建立了可遵循的開發規範，降低了新進人員的學習曲線。</li></ul></div>' +
      '</div>',
    technologies: ['CodeIgniter 4', 'PHP', 'Service Architecture', 'SonarQube', 'MySQL', 'jQuery'],
  },
  {
    id: 4,
    title: '物聯網應用專案 (大學專題)',
    description: '使用 Python 與樹莓派開發的物聯網控制應用，並將後端服務部署於 AWS EC2。',
    link: '#',
    longDescription:
      '<div class="space-y-4">' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">情境 (Situation)</h4><p>此為大學畢業專題，目標是整合硬體控制、後端開發與雲端部署，打造一個完整的物聯網 (IoT) 應用。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">任務 (Task)</h4><p>開發一個可以透過網頁介面遠端控制樹莓派上硬體元件 (如：LED 燈、感測器) 的系統。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">行動 (Action)</h4><ul class="list-disc pl-6 text-gray-300"><li><b>硬體層：</b>在樹莓派上使用 Python 撰寫腳本，以控制 GPIO 接腳上的硬體元件。</li><li><b>後端服務：</b>開發 PHP 後端應用程式，提供 API 讓前端呼叫以觸發硬體操作。</li><li><b>雲端部署：</b>在 AWS EC2 虛擬主機上，從零開始架設 LAMP (Linux, Apache, MySQL, PHP) 伺服器環境，並將後端服務部署於此。</li></ul></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">成果 (Result)</h4><p>成功打造出一個功能性的物聯網應用原型，並獲得了寶貴的雲端基礎設施 (AWS) 管理與完整 LAMP Stack 部署經驗。</p></div>' +
      '</div>',
    technologies: ['Python', 'Raspberry Pi', 'AWS EC2', 'PHP', 'LAMP Stack'],
  },
  {
    id: 3,
    title: '電商平台功能開發 (實習專案)',
    description: '在大型電商平台團隊中，負責新功能開發與 API 設計。',
    link: '#',
    longDescription:
      '<div class="space-y-4">' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">情境 (Situation)</h4><p>在快速迭代的電商環境中，團隊需要開發新功能以滿足市場需求，並為行動端應用提供穩定的 API 服務。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">任務 (Task)</h4><p>作為實習生，我的任務是支援前端模組開發，並在後期參與後端 API 的設計與開發。</p></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">行動 (Action)</h4><ul class="list-disc pl-6 text-gray-300"><li><b>前端開發：</b>使用 AngularJS 開發與維護商品、訂單等管理模組，並處理與後端 API 的資料綁定。</li><li><b>後端開發：</b>學習並使用 Laravel 為 App 設計與開發 RESTful API，涵蓋使用者、商品與購物車等核心功能。</li><li><b>團隊協作：</b>透過 Git 參與團隊的開發流程，並使用 Postman 進行 API 測試與除錯。</li></ul></div>' +
      '<div><h4 class="text-xl font-bold text-white mt-4 mb-2">成果 (Result)</h4><p>這次實習讓我從校園專案過渡到大型商業專案的開發，不僅讓我對 MVC 架構與 API 設計有了深入的實務理解，更為我後來的全職工作奠定了穩固的技術基礎。</p></div>' +
      '</div>',
    technologies: ['AngularJS', 'Laravel', 'PHP', 'API Design', 'Git', 'Team Collaboration'],
  },
];

onMounted(() => {
  const projectId = parseInt(route.params.id);
  project.value = projects.find((p) => p.id === projectId);
});
</script>
