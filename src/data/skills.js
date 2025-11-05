import { ref } from 'vue';

// 技能分類資料
export const skillCategories = ref([
  {
    name: '後端開發',
    description:
      '具備豐富的商業專案開發與架構設計經驗，專注於打造高效能、高可維護性的後端服務。',
    skills: [
      {
        name: 'PHP',
        level: 95,
        icon: ['fab', 'php'],
        color: 'text-indigo-400',
      },
      {
        name: 'Laravel',
        level: 90,
        icon: ['fab', 'laravel'],
        color: 'text-red-500',
      },
      {
        name: 'CodeIgniter',
        level: 90,
        icon: ['fas', 'code'],
        color: 'text-orange-500',
      },
      {
        name: 'MySQL',
        level: 85,
        icon: ['fas', 'database'],
        color: 'text-teal-400',
      },
    ],
  },
  {
    name: '前端開發',
    description:
      '能夠使用現代前端框架打造互動式、響應式的使用者介面，並具備與後端 API 協作的完整經驗。',
    skills: [
      {
        name: 'Vue.js',
        level: 80,
        icon: ['fab', 'vuejs'],
        color: 'text-green-500',
      },
      {
        name: 'JavaScript',
        level: 80,
        icon: ['fab', 'js-square'],
        color: 'text-yellow-400',
      },
      {
        name: 'AngularJS',
        level: 70,
        icon: ['fab', 'angular'],
        color: 'text-red-600',
      },
    ],
  },
  {
    name: 'DevOps & 部署',
    description:
      '熟悉容器化技術與版控流程，並有能力建構與維護 CI/CD 自動化管線與雲端部署。',
    skills: [
      {
        name: 'Docker',
        level: 75,
        icon: ['fab', 'docker'],
        color: 'text-blue-500',
      },
      {
        name: 'Git',
        level: 85,
        icon: ['fab', 'git-alt'],
        color: 'text-red-500',
      },
      {
        name: 'CI/CD',
        level: 70,
        icon: ['fab', 'github'],
        color: 'text-gray-400',
      },
      {
        name: 'AWS',
        level: 65,
        icon: ['fab', 'aws'],
        color: 'text-orange-500',
      },
    ],
  },
]);
