<template>
  <div class="bg-gray-900 min-h-screen">
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div class="lg:col-span-1 lg:sticky top-16 self-start">
          <div class="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center">
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
              >
                <font-awesome-icon :icon="social.icon" class="text-2xl" />
              </a>
            </div>
            <div class="text-left space-y-4">
              <div>
                <h3 class="text-lg font-semibold text-blue-400">
                  {{ emailLabel }}
                </h3>
                <p class="text-gray-300">{{ email }}</p>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-blue-400">
                  {{ phoneLabel }}
                </h3>
                <p class="text-gray-300">{{ phone }}</p>
              </div>
            </div>
            <div class="mt-8">
              <a
                :href="cvUrl"
                target="_blank"
                class="inline-block w-full px-6 py-3 bg-blue-600 rounded-full text-lg font-semibold text-white hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {{ cvButtonText }}
              </a>
            </div>
          </div>
        </div>
        <div class="lg:col-span-2">
          <div class="bg-gray-800 p-8 rounded-2xl shadow-2xl mb-12">
            <h2 class="text-3xl font-bold text-white mb-4">
              {{ aboutMeTitle }}
            </h2>
            <div class="prose prose-lg max-w-none text-gray-300 prose-invert">
              <p v-for="(paragraph, index) in aboutMeParagraphs" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>
          <div class="bg-gray-800 p-8 rounded-2xl shadow-2xl">
            <h2 class="text-3xl font-bold text-white mb-6">
              {{ skillsTitle }}
            </h2>
            <div class="space-y-6">
              <div v-for="category in skills" :key="category.name">
                <h3 class="text-xl font-semibold text-blue-400 mb-3">
                  {{ category.name }}
                </h3>
                <div class="flex flex-wrap gap-3">
                  <div
                    v-for="skill in category.items"
                    :key="skill.name"
                    class="flex items-center bg-gray-700 px-4 py-2 rounded-full"
                  >
                    <font-awesome-icon
                      :icon="skill.icon"
                      class="text-lg"
                      :class="skill.color"
                    />
                    <span class="ml-3 text-base text-gray-200">{{
                      skill.name
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-800 p-8 rounded-2xl shadow-2xl mt-12">
            <h2 class="text-3xl font-bold text-white mb-6">能力等級</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="(skill, index) in skillLevels"
                :key="index"
                class="bg-gray-700 p-4 rounded-lg shadow-md flex items-center transform hover:scale-105 transition-transform duration-300"
              >
                <div class="flex-shrink-0 mr-4">
                  <font-awesome-icon
                    :icon="
                      skill.status === 'mastered'
                        ? ['fas', 'check-circle']
                        : skill.status === 'familiar'
                        ? ['fas', 'star-half-alt']
                        : skill.status === 'learning'
                        ? ['fas', 'hourglass-half']
                        : ['fas', 'question-circle']
                    "
                    class="text-2xl"
                    :class="skill.color"
                  />
                </div>
                <div>
                  <p class="text-lg font-medium text-gray-200">
                    {{ skill.name }}
                  </p>
                  <p class="text-sm text-gray-400">{{ skill.level }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('Su Jain wei');
const jobTitle = ref('後端工程師（偏架構/資料流程）');
const yearsOfExperience = ref('1.5年資');
const avatarUrl = ref('./images/avatar.png');
const emailLabel = ref('Email');
const email = ref('your.email@example.com');
const phoneLabel = ref('電話');
const phone = ref('0912-345-678');
const cvButtonText = ref('下載履歷');
const cvUrl = ref('#'); // Replace with your CV URL
const aboutMeTitle = ref('關於我');
const aboutMeParagraphs = ref([
  '我是一名充滿熱情的網頁開發人員，專注於後端核心技術 (PHP, Laravel, CodeIgniter)、資料庫設計與管理 (MySQL/MariaDB)、前端開發 (Vue 3, Vite, RWD)、以及 DevOps (Docker) 等領域。',
  '我擅長處理批次資料、自動化腳本，並注重程式品質與錯誤處理。我熱衷於學習新技術，並將其應用於解決實際問題，致力於打造高效能且使用者體驗良好的應用程式。',
]);
const skillsTitle = ref('我的技能');

const skillLevels = ref([
  {
    name: 'PHP / SQL',
    level: '✅',
    status: 'mastered',
    color: 'text-green-500',
  },
  {
    name: 'Laravel 12',
    level: '🧩→✅',
    status: 'familiar',
    color: 'text-blue-400',
  },
  {
    name: 'CodeIgniter 4',
    level: '✅',
    status: 'mastered',
    color: 'text-green-500',
  },
  {
    name: '資料庫設計/效能',
    level: '🧩→✅',
    status: 'familiar',
    color: 'text-blue-400',
  },
  {
    name: '資料同步/批次處理',
    level: '✅',
    status: 'mastered',
    color: 'text-green-500',
  },
  {
    name: 'Vue 3 + Vite（前端）',
    level: '🧩',
    status: 'familiar',
    color: 'text-blue-400',
  },
  {
    name: 'Docker（本機）',
    level: '🧩',
    status: 'familiar',
    color: 'text-blue-400',
  },
  {
    name: 'PDF 解析（Python）',
    level: '🧩',
    status: 'familiar',
    color: 'text-blue-400',
  },
  {
    name: '日誌/監控/可觀測性',
    level: '🌱',
    status: 'learning',
    color: 'text-yellow-500',
  },
  { name: 'CI/CD', level: '🌱', status: 'learning', color: 'text-yellow-500' },
  {
    name: '事件/佇列/非同步',
    level: '🌱',
    status: 'learning',
    color: 'text-yellow-500',
  },
]);

const socials = ref([
  { name: 'GitHub', url: '#', icon: ['fab', 'github'] },
  { name: 'LinkedIn', url: '#', icon: ['fab', 'linkedin'] },
  { name: '104', url: '#', icon: ['fas', 'file-alt'] },
]);

const skills = ref([
  {
    name: '前端',
    items: [
      { name: 'Vue.js', icon: ['fab', 'vuejs'], color: 'text-green-500' },
      { name: 'HTML/CSS', icon: ['fab', 'html5'], color: 'text-orange-500' },
      {
        name: 'JavaScript',
        icon: ['fab', 'js-square'],
        color: 'text-yellow-500',
      },
      { name: 'RWD', icon: ['fas', 'mobile-alt'], color: 'text-blue-500' },
      {
        name: 'Tailwind CSS',
        icon: ['fab', 'css3-alt'],
        color: 'text-blue-500',
      },
    ],
  },
  {
    name: '後端',
    items: [
      { name: 'PHP', icon: ['fab', 'php'], color: 'text-indigo-500' },
      { name: 'Laravel', icon: ['fab', 'laravel'], color: 'text-red-500' },
      { name: 'CodeIgniter', icon: ['fas', 'code'], color: 'text-gray-500' },
      { name: 'Node.js', icon: ['fab', 'node-js'], color: 'text-green-500' },
      { name: 'MVC', icon: ['fas', 'cogs'], color: 'text-gray-500' },
    ],
  },
  {
    name: '資料庫',
    items: [
      {
        name: 'MySQL/MariaDB',
        icon: ['fas', 'database'],
        color: 'text-gray-500',
      },
      { name: 'SQL', icon: ['fas', 'database'], color: 'text-blue-500' },
      {
        name: 'Schema 設計',
        icon: ['fas', 'project-diagram'],
        color: 'text-purple-500',
      },
      { name: '索引優化', icon: ['fas', 'search'], color: 'text-yellow-500' },
    ],
  },
  {
    name: '其他',
    items: [
      { name: 'Docker', icon: ['fab', 'docker'], color: 'text-blue-500' },
      { name: 'Git', icon: ['fab', 'git-alt'], color: 'text-red-500' },
      { name: 'DevOps', icon: ['fas', 'cloud'], color: 'text-cyan-500' },
      { name: '錯誤處理', icon: ['fas', 'bug'], color: 'text-red-500' },
      {
        name: '效能優化',
        icon: ['fas', 'tachometer-alt'],
        color: 'text-green-500',
      },
    ],
  },
]);
</script>
