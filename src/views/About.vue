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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('Su Jain wei');
const jobTitle = ref('網頁開發者');
const yearsOfExperience = ref('1.5年資');
const avatarUrl = ref('https://picsum.photos/seed/avatar/300/300');
const emailLabel = ref('Email');
const email = ref('your.email@example.com');
const phoneLabel = ref('電話');
const phone = ref('0912-345-678');
const cvButtonText = ref('下載履歷');
const cvUrl = ref('#'); // Replace with your CV URL
const aboutMeTitle = ref('關於我');
const aboutMeParagraphs = ref([
  '我是一名充滿熱情的網頁開發人員，擁有 ' +
    yearsOfExperience.value +
    ' 年的經驗。我專注於使用 Vue.js、React 和 Node.js 等現代技術來建構高效能的 Web 應用程式。',
  '我熱衷於學習新技術，並將其應用於解決實際問題。我相信，一個好的產品不僅要有強大的功能，還要有良好的使用者體驗。',
]);
const skillsTitle = ref('我的技能');

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
      { name: 'React', icon: ['fab', 'react'], color: 'text-blue-500' },
      {
        name: 'JavaScript',
        icon: ['fab', 'js-square'],
        color: 'text-yellow-500',
      },
      { name: 'HTML5', icon: ['fab', 'html5'], color: 'text-orange-500' },
      { name: 'CSS3', icon: ['fab', 'css3-alt'], color: 'text-blue-500' },
    ],
  },
  {
    name: '後端',
    items: [
      { name: 'Node.js', icon: ['fab', 'node-js'], color: 'text-green-500' },
      { name: 'Laravel', icon: ['fab', 'laravel'], color: 'text-red-500' },
    ],
  },
  {
    name: '資料庫',
    items: [
      { name: 'MySQL', icon: ['fas', 'database'], color: 'text-gray-500' },
      { name: 'MongoDB', icon: ['fas', 'database'], color: 'text-green-500' },
    ],
  },
  {
    name: '其他',
    items: [
      { name: 'Git', icon: ['fab', 'git-alt'], color: 'text-red-500' },
      { name: 'Docker', icon: ['fab', 'docker'], color: 'text-blue-500' },
    ],
  },
]);
</script>
