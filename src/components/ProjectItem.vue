<template>
  <div class="group relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
    <router-link :to="{ name: 'ProjectDetail', params: { id: project.id } }">
      <div class="w-full h-48 bg-gray-700 overflow-hidden">
        <img :src="project.imageUrl" :alt="project.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div class="p-6">
        <h3 class="text-xl font-semibold text-white">{{ project.title }}</h3>
        <p class="mt-2 text-gray-400">{{ project.summary }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup>


defineProps({
  project: Object,
});
</script>
