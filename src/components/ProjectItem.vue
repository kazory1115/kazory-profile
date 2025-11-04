<template>
  <div class="group relative modern-card overflow-hidden transition-all duration-300">
    <router-link :to="{ name: 'ProjectDetail', params: { id: project.id } }">
      <div class="w-full h-48 bg-gray-800 overflow-hidden flex items-center justify-center">
        <img v-if="project.imageUrl" :src="project.imageUrl" :alt="project.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div v-else class="text-gray-500">
          <font-awesome-icon :icon="['fas', 'file-alt']" class="text-6xl" />
        </div>
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