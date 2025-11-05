<template>
  <div class="home-wrapper bg-gray-900 text-white">
    <!-- Hero Section -->
    <section
      class="min-h-screen flex flex-col items-center justify-center bg-gray-900 py-16"
    >
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-3xl mx-auto animate-fade-in-up">
          <h1 class="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            {{ name }}
          </h1>
          <h2 class="text-xl md:text-2xl font-light text-gray-400 mb-8">
            {{ role }}
          </h2>

          <!-- Terminal Window -->
          <div
            class="bg-black bg-opacity-50 rounded-lg shadow-lg p-4 font-mono text-left text-sm border border-gray-700"
          >
            <div class="flex items-center mb-3">
              <div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="text-green-400">
              <span class="text-gray-500">$</span>
              <span class="text-gray-300">{{ typedText }}</span>
              <span
                class="animate-pulse inline-block w-2 h-4 bg-gray-300 ml-1"
              ></span>
            </div>
          </div>

          <div class="mt-10 flex justify-center space-x-4">
            <router-link
              to="/project"
              class="px-8 py-3 bg-orange-300 text-gray-900 rounded-full text-lg font-semibold hover:bg-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {{ projectButtonText }}
            </router-link>
            <router-link
              to="/about"
              class="px-8 py-3 bg-gray-700 rounded-full text-lg font-semibold hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {{ aboutButtonText }}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <div class="bg-gray-900 pb-20">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-extrabold text-white mb-12 text-center">
          精選作品
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(item, index) in featuredItems"
            :key="item.id"
            class="transition-transform duration-300 ease-in-out"
          >
            <ProjectItem :project="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { allItems } from '../data/items.js';
import ProjectItem from '../components/ProjectItem.vue';
import { useTypewriter } from '../composables/useTypewriter.js';

const name = ref('蘇建維 (Kazory)');
const role = ref('Backend Engineer & Full-Stack Enthusiast');
const projectButtonText = ref('查看專案');
const aboutButtonText = ref('關於我');

const { typedText } = useTypewriter(
  '歡迎來到我的作品集，這裡紀錄了我的學習與實踐。',
  80
);

const featuredItems = computed(() => allItems.value.slice(0, 6));
</script>
