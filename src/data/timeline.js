import { ref } from 'vue';

// 工作經歷
export const experiences = ref([
  {
    period: '2025/1 - 至今',
    title: '全端工程師',
    subtitle: '成創永續股份有限公司',
    icon: ['fas', 'briefcase'],
    description: `<li>主導核心專案從 CI3 至 CI4 的升級與重構，引入服務化架構，提升系統可維護性。</li>
      <li>並透過 SonarQube 進行程式碼品質管理，增加產出優良程式碼品質。</li>
      <li>負責 API 設計與開發，實現前後端分離，優化前端使用者體驗。</li>`,
  },
  {
    period: '2023/8 - 2024/7',
    title: '軟體工程師',
    subtitle: '紅崴科技股份有限公司',
    icon: ['fas', 'briefcase'],
    description:
      '<li>在大型電商平台中，使用 AngularJS 與 PHP 開發與維護多個核心模組。</li><li>參與團隊 Git-flow 開發流程，並使用 Laravel 開發與串接多支後端 API。</li>',
  },
]);

// 學歷背景
export const education = ref([
  {
    period: '2020/9 - 2024/6',
    title: '資訊管理學系 學士',
    subtitle: '南臺科技大學',
    icon: ['fas', 'graduation-cap'],
    description:
      '<li>畢業專題研究：使用 Python 與樹莓派，開發物聯網應用，並將服務部署於 AWS EC2。</li>',
  },
]);
