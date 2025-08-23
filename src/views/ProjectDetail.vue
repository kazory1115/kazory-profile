<template>
  <div class="bg-white">
    <div v-if="project" class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div class="lg:col-span-1">
          <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img :src="project.imageUrl" :alt="project.title" class="w-full h-full object-center object-cover">
          </div>
        </div>
        <div class="mt-10 lg:mt-0 lg:col-span-1">
          <h1 class="text-3xl font-extrabold text-gray-900">{{ project.title }}</h1>
          <div class="mt-3">
            <p class="text-lg text-gray-500">{{ project.description }}</p>
          </div>
          <div class="mt-6">
            <a :href="project.link" target="_blank" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> 查看專案 </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-24">
      <p class="text-lg text-gray-500">正在載入專案...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const project = ref(null);

// In a real application, you would fetch the project data from an API
const projects = [
  { id: 1, title: '專案一', description: '這是專案一的詳細描述。此專案的目標是...', imageUrl: 'https://picsum.photos/seed/project-detail-1/800/400', link: '#' },
  { id: 2, title: '專案二', description: '這是專案二的詳細描述。此專案解決了...', imageUrl: 'https://picsum.photos/seed/project-detail-2/800/400', link: '#' },
  { id: 3, title: '專案三', description: '這是專案三的詳細描述。此專案使用了...', imageUrl: 'https://picsum.photos/seed/project-detail-3/800/400', link: '#' },
];

onMounted(() => {
  const projectId = parseInt(route.params.id);
  project.value = projects.find(p => p.id === projectId);
});
</script>