<template>
  <div class="group relative">
    <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
      <img :src="project.imageUrl" :alt="project.title" class="w-full h-full object-center object-cover lg:w-full lg:h-full" />
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <router-link :to="{ name: 'ProjectDetail', params: { id: project.id } }">
            <span aria-hidden="true" class="absolute inset-0"></span>
            {{ project.title }}
          </router-link>
        </h3>
        <p class="mt-1 text-sm text-gray-500">{{ project.summary }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>


defineProps({
  project: Object,
});
</script>
