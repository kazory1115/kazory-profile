<template>
  <div class="relative pl-8 sm:pl-12 py-4 group">
    <!-- Vertical line -->
    <div
      class="absolute left-2 sm:left-4 top-0 h-full w-0.5 bg-gray-700 group-last:h-0"
    ></div>
    <!-- Dot -->
    <div
      class="absolute left-0 sm:left-2 top-6 w-4 h-4 rounded-full bg-gray-700 border-2 border-gray-800 group-hover:bg-orange-300 transition-colors duration-300 flex items-center justify-center"
    >
      <font-awesome-icon :icon="icon" class="text-gray-900 text-xs" />
    </div>

    <p class="text-sm text-gray-400 mb-1">{{ period }}</p>
    <h3 class="text-xl font-bold text-white">{{ title }}</h3>
    <p class="text-md text-gray-300 mb-2">{{ subtitle }}</p>
    <ul
      class="prose prose-sm max-w-none text-gray-400 prose-invert list-disc pl-5"
      v-html="description"
    ></ul>
  </div>
</template>

<script setup>
defineProps({
  period: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: Array,
    required: true,
  },
});
</script>
