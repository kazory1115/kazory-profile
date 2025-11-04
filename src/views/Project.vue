<template>
  <div class="bg-gray-900 min-h-screen">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-12 animate-fade-in-down">
        <h1 class="text-5xl font-extrabold text-white mb-4">
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-400"
          >
            我的專案
          </span>
        </h1>
        <p class="text-xl text-gray-400">
          探索我精心打造的專案，從 Web 應用到雲端部署。
        </p>
      </div>

      <!-- Filter Buttons -->
      <div class="flex justify-center space-x-4 mb-12 animate-fade-in-down">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="setFilter(filter.value)"
          :class="[
            'px-6 py-2 rounded-full text-base font-medium transition-colors duration-300',
            activeFilter === filter.value
              ? 'bg-orange-300 text-gray-900'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
          ]"
        >
          {{ filter.label }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(item, index) in filteredItems"
          :key="item.id"
          class="transition-transform duration-300 ease-in-out animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <ProjectItem :project="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProjectItem from '../components/ProjectItem.vue';
import { allItems } from '../data/items.js';

const filters = [
  { label: '全部', value: 'all' },
  { label: '專案', value: 'project' },
  { label: '筆記', value: 'note' },
];

const activeFilter = ref('all');

const setFilter = (filter) => {
  activeFilter.value = filter;
};

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') {
    return allItems.value;
  }
  return allItems.value.filter(item => item.type === activeFilter.value);
});
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
