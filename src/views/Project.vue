<template>
  <div class="bg-gray-900 min-h-screen">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-12 animate-fade-in-down">
        <h1 class="text-5xl font-extrabold text-white mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
            我的專案
          </span>
        </h1>
        <p class="text-xl text-gray-400">探索我精心打造的專案，從 Web 應用到行動 App。</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(project, index) in projects" :key="project.id"
             class="transform hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in-up"
             :style="{ animationDelay: `${index * 100}ms` }">
          <ProjectItem :project="project" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProjectItem from '../components/ProjectItem.vue';

const projects = ref([
  { id: 1, title: '專案一', summary: '這是專案一的簡短描述。', imageUrl: '/images/project1.jpg' },
  { id: 2, title: '專案二', summary: '這是專案二的簡短描述。', imageUrl: '/images/project2.jpg' },
  { id: 3, title: '專案三', summary: '這是專案三的簡短描述。', imageUrl: '/images/project3.jpg' },
]);
</script>

<style scoped>
@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-down {
  animation: fade-in-down 0.5s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}
</style>
