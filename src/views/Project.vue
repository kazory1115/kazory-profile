<template>
  <div class="bg-gray-900 min-h-screen">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-12 animate-fade-in-down">
        <h1 class="text-5xl font-extrabold text-white mb-4">
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300"
          >
            我的專案
          </span>
        </h1>
        <p class="text-xl text-gray-400">
          探索我精心打造的專案，從 Web 應用到雲端部署。
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="transform hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
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
  {
    id: 1,
    title: 'SPA 租屋平台 (個人專案)',
    summary:
      '使用 Vue3 搭配 Laravel 開發的 SPA 租屋平台，並透過 Docker 建立開發環境與 GitHub Actions 自動部署。',
    imageUrl:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
  },
  {
    id: 2,
    title: 'ESG系統升級與重構 (公司專案)',
    summary:
      '將大型專案由 CodeIgniter 3 升級至 CodeIgniter 4，並導入分層式架構重構程式碼。',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 4,
    title: '物聯網應用專案 (大學專題)',
    summary:
      '使用 Python 與樹莓派開發的物聯網控制應用，並將後端服務部署於 AWS EC2。',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1670678203548-f6ad7b39ef11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 3,
    title: '網路購物平台 (實習專案)',
    summary:
      '參與網路購物平台的實習，累積前後端開發、多人協作以及 API 設計與整合的經驗。',
    imageUrl:
      'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
]);
</script>

<style scoped>
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.5s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}
</style>
