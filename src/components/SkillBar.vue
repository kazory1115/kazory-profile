<template>
  <div ref="elementRef">
    <div class="flex justify-between mb-1">
      <span class="text-base font-medium text-orange-300 flex items-center">
        <font-awesome-icon :icon="icon" class="mr-2" :class="color" />
        {{ name }}
      </span>
      <span class="text-sm font-medium text-orange-300">{{ level }}%</span>
    </div>
    <div class="w-full bg-gray-700 rounded-full h-2.5">
      <div
        class="bg-orange-300 h-2.5 rounded-full transition-all duration-1000 ease-out"
        :style="{ width: animatedLevel + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useIntersectionObserver } from '../composables/useIntersectionObserver.js';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100,
  },
  icon: {
    type: Array,
    required: true,
  },
  color: {
    type: String,
    default: 'text-orange-300',
  },
});

const animatedLevel = ref(0);
const elementRef = ref(null);

// 使用 composable 偵測元素可見性
const { isVisible } = useIntersectionObserver(elementRef, { threshold: 0.5 });

// 當元素可見時觸發動畫
watch(isVisible, (visible) => {
  if (visible && animatedLevel.value === 0) {
    animatedLevel.value = props.level;
  }
});
</script>