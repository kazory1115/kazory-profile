<template>
  <div ref="elementRef">
    <div class="flex justify-between mb-1">
      <span class="text-base font-medium text-blue-400 flex items-center">
        <font-awesome-icon :icon="icon" class="mr-2" :class="color" />
        {{ name }}
      </span>
      <span class="text-sm font-medium text-blue-400">{{ level }}%</span>
    </div>
    <div class="w-full bg-gray-700 rounded-full h-2.5">
      <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" :style="{ width: animatedLevel + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  name: String,
  level: Number,
  icon: Array,
  color: String,
});

const animatedLevel = ref(0);
const elementRef = ref(null);

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting) {
        animatedLevel.value = props.level;
        if (elementRef.value) {
          observer.unobserve(elementRef.value);
        }
      }
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is visible
    }
  );

  if (elementRef.value) {
    observer.observe(elementRef.value);
  }
});

onUnmounted(() => {
  if (observer && elementRef.value) {
    observer.unobserve(elementRef.value);
  }
});
</script>