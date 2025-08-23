<template>
  <div class="bg-gray-100">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">我的專案</h2>
        <p class="mt-4 text-lg text-gray-500">這裡是我過去參與過的一些專案。</p>
      </div>
      <div class="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectItem v-for="project in projects" :key="project.id" :project="project" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProjectItem from '../components/ProjectItem.vue';

const projects = ref([
  { id: 1, title: '專案一', summary: '這是專案一的簡短描述。', imageUrl: 'https://picsum.photos/seed/project1/300/200' },
  { id: 2, title: '專案二', summary: '這是專案二的簡短描述。', imageUrl: 'https://picsum.photos/seed/project2/300/200' },
  { id: 3, title: '專案三', summary: '這是專案三的簡短描述。', imageUrl: 'https://picsum.photos/seed/project3/300/200' },
]);
</script>
