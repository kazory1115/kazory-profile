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

        <div
          class="prose prose-lg max-w-none prose-invert"
          v-html="project.longDescription"
        ></div>

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

        <div
          v-if="project.link && project.link !== '#'"
          class="mt-12 text-center"
        >
          <a
            :href="project.link"
            target="_blank"
            class="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-300 hover:bg-orange-400 shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            訪問網站
          </a>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center h-screen">
      <div class="text-center">
        <!-- 404 錯誤訊息 -->
        <div v-if="notFound" class="modern-card p-12">
          <svg
            class="h-20 w-20 text-orange-300 mx-auto mb-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 class="text-4xl font-bold text-white mb-4">找不到專案</h1>
          <p class="text-xl text-gray-400 mb-8">
            抱歉，您請求的專案不存在或已被移除。
          </p>
          <router-link
            to="/project"
            class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-300 hover:bg-orange-400 transition-colors duration-300"
          >
            返回專案列表
          </router-link>
        </div>

        <!-- 載入中訊息 -->
        <div v-else>
          <svg
            class="animate-spin h-10 w-10 text-orange-300 mx-auto mb-4"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { allItems } from '../data/items.js';

const route = useRoute();
const router = useRouter();
const project = ref(null);
const isLoading = ref(true);
const notFound = ref(false);

onMounted(() => {
  const itemId = parseInt(route.params.id);
  project.value = allItems.value.find((p) => p.id === itemId);

  isLoading.value = false;

  // 如果找不到專案，標記為 404
  if (!project.value) {
    notFound.value = true;
  }
});
</script>
