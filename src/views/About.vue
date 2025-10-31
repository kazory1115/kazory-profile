<template>
  <div class="p-8">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
      <!-- Left Column -->
      <div class="modern-card p-8 lg:col-span-1 lg:sticky top-16 self-start">
        <div class="text-center">
          <img
            class="w-48 h-48 rounded-full mx-auto mb-6 shadow-lg border-4 border-gray-700"
            :src="avatarUrl"
            alt="Your Name"
          />
          <h1 class="text-4xl font-extrabold text-white">{{ name }}</h1>
          <p class="text-xl text-blue-400 mt-2 mb-6">{{ jobTitle }}</p>

          <div class="flex justify-center space-x-4 mb-6">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              class="text-gray-400 hover:text-white transition-colors"
              :title="social.name"
            >
              <font-awesome-icon :icon="social.icon" class="text-2xl" />
            </a>
          </div>

          <div class="text-left space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-blue-400">Email</h3>
              <p class="text-gray-300">{{ email }}</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-blue-400">電話</h3>
              <p class="text-gray-300">{{ phone }}</p>
            </div>
          </div>

          <div class="mt-8">
            <a
              :href="cvUrl"
              target="_blank"
              class="inline-block w-full px-6 py-3 bg-blue-600 rounded-full text-lg font-semibold text-white hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              查看線上履歷
            </a>
          </div>
        </div>
      </div>

      <!-- Right Column (Linear Layout) -->
      <div class="lg:col-span-3 space-y-12">
        <!-- About Me -->
        <div
          ref="aboutMeRef"
          :class="{
            'fade-in-up-animation': true,
            'is-visible': aboutMeVisible,
          }"
          class="modern-card p-8"
        >
          <h2 class="text-3xl font-bold text-white mb-4">關於我</h2>
          <div
            class="prose prose-lg max-w-none text-gray-300 prose-invert space-y-4"
          >
            <p v-for="(paragraph, index) in aboutMeParagraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>

        <!-- Principles -->
        <div
          ref="principlesRef"
          :class="{
            'fade-in-up-animation': true,
            'is-visible': principlesVisible,
          }"
          class="modern-card p-8"
        >
          <h2 class="text-3xl font-bold text-white mb-6">開發理念</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="p in principles"
              :key="p.title"
              class="bg-gray-700/50 p-4 rounded-lg transform hover:scale-105 transition-transform duration-300"
            >
              <h4
                class="text-lg font-semibold text-blue-400 flex items-center mb-2"
              >
                <font-awesome-icon :icon="p.icon" class="mr-3 w-5" />
                {{ p.title }}
              </h4>
              <p class="text-gray-400 text-sm">{{ p.text }}</p>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div
          ref="skillsRef"
          :class="{ 'fade-in-up-animation': true, 'is-visible': skillsVisible }"
          class="modern-card p-8"
        >
          <h2 class="text-3xl font-bold text-white mb-6">專業技能</h2>
          <div class="space-y-8">
            <div v-for="category in skillCategories" :key="category.name">
              <h3 class="text-xl font-semibold text-blue-400 mb-2">
                {{ category.name }}
              </h3>
              <p class="text-gray-400 text-sm mb-4">
                {{ category.description }}
              </p>
              <div class="space-y-4">
                <SkillBar
                  v-for="skill in category.skills"
                  :key="skill.name"
                  :name="skill.name"
                  :level="skill.level"
                  :icon="skill.icon"
                  :color="skill.color"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Experience -->
        <div
          ref="experienceRef"
          :class="{
            'fade-in-up-animation': true,
            'is-visible': experienceVisible,
          }"
          class="modern-card p-8"
        >
          <h2 class="text-3xl font-bold text-white mb-6">工作經歷</h2>
          <div>
            <TimelineItem
              v-for="exp in experiences"
              :key="exp.title"
              :period="exp.period"
              :title="exp.title"
              :subtitle="exp.subtitle"
              :description="exp.description"
              :icon="exp.icon"
            />
          </div>
        </div>

        <!-- Education -->
        <div
          ref="educationRef"
          :class="{
            'fade-in-up-animation': true,
            'is-visible': educationVisible,
          }"
          class="modern-card p-8"
        >
          <h2 class="text-3xl font-bold text-white mb-6">學歷</h2>
          <div>
            <TimelineItem
              v-for="edu in education"
              :key="edu.title"
              :period="edu.period"
              :title="edu.title"
              :subtitle="edu.subtitle"
              :description="edu.description"
              :icon="edu.icon"
            />
          </div>
        </div>

        <!-- Certifications -->
        <div
          ref="certificationsRef"
          :class="{
            'fade-in-up-animation': true,
            'is-visible': certificationsVisible,
          }"
          class="modern-card p-8"
        >
          <h2 class="text-3xl font-bold text-white mb-6">相關證照</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <p
              v-for="cert in certifications"
              :key="cert.name"
              class="text-gray-300 flex items-center"
            >
              <font-awesome-icon
                :icon="['fas', 'check-circle']"
                class="text-green-500 mr-3"
              />
              {{ cert.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TimelineItem from '../components/TimelineItem.vue';
import SkillBar from '../components/SkillBar.vue';
import avatarImg from '/images/avatar.png';
import { useIntersectionObserver } from '../composables/useIntersectionObserver.js';

const name = ref('蘇建維');
const jobTitle = ref('後端工程師');
const avatarUrl = ref(avatarImg);
const email = ref('jay86888688@gmail.com');
const phone = ref('0930-118-867');
const cvUrl = ref(
  'https://www.cakeresume.com/s--5_oWGY1-GzBwX44-Y8aP6A--/kazo-1d5a76'
);

const socials = ref([
  {
    name: 'GitHub',
    url: 'https://github.com/kazo-dev',
    icon: ['fab', 'github'],
  },
  {
    name: 'Resume',
    url: 'https://www.cakeresume.com/s--5_oWGY1-GzBwX44-Y8aP6A--/kazo-1d5a76',
    icon: ['fas', 'file-alt'],
  },
]);

const aboutMeParagraphs = ref([
  '我是一位具備 1-2 年經驗的後端工程師，專注於打造穩健、可擴展的網頁應用程式。',
  '我擁有執行複雜系統遷移與重構 (CodeIgniter 3 至 4) 的實戰經驗，並成功將舊有程式碼重構成符合現代標準的分層式架構，顯著提升了系統的可維護性與效能。',
  '我對乾淨的程式碼、自動化流程 (CI/CD) 以及運用技術解決真實世界問題充滿熱情。期待能為一個具前瞻性的團隊貢獻所長，共同打造高品質的軟體產品。',
]);

const principles = ref([
  {
    title: 'Clean Code',
    text: '致力於撰寫可讀性高、易於維護的現代化程式碼，相信好的程式碼本身就是最好的文件。',
    icon: ['fas', 'code'],
  },
  {
    title: '持續學習',
    text: '對新技術抱有濃厚興趣，並持續學習，將新知應用於解決實際問題。',
    icon: ['fas', 'lightbulb'],
  },
]);

const experiences = ref([
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

const education = ref([
  {
    period: '2020/9 - 2024/6',
    title: '資訊管理學系 學士',
    subtitle: '南臺科技大學',
    icon: ['fas', 'graduation-cap'],
    description:
      '<li>畢業專題研究：使用 Python 與樹莓派，開發物聯網應用，並將服務部署於 AWS EC2。</li>',
  },
]);

const skillCategories = ref([
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
        color: 'text-blue-400',
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

const certifications = ref([
  { name: 'TQC+ 網頁編輯製作 Dreamweaver' },
  { name: 'TQC-DK 資訊科技 python (專業級)' },
  { name: 'TQC-DK 專案管理概論 (專業級)' },
  { name: 'Planner of Enterprise Resource Planning' },
  { name: 'EEC-EEP 企業電子化規劃師' },
]);

const aboutMeRef = ref(null);
const principlesRef = ref(null);
const skillsRef = ref(null);
const experienceRef = ref(null);
const educationRef = ref(null);
const certificationsRef = ref(null);

const { isVisible: aboutMeVisible } = useIntersectionObserver(aboutMeRef, {
  threshold: 0.3,
});
const { isVisible: principlesVisible } = useIntersectionObserver(
  principlesRef,
  { threshold: 0.3 }
);
const { isVisible: skillsVisible } = useIntersectionObserver(skillsRef, {
  threshold: 0.3,
});
const { isVisible: experienceVisible } = useIntersectionObserver(
  experienceRef,
  { threshold: 0.3 }
);
const { isVisible: educationVisible } = useIntersectionObserver(educationRef, {
  threshold: 0.3,
});
const { isVisible: certificationsVisible } = useIntersectionObserver(
  certificationsRef,
  { threshold: 0.3 }
);
</script>
