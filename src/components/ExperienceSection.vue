<template>
  <div
    ref="sectionRef"
    :class="{
      'fade-in-up-animation': true,
      'is-visible': isVisible,
    }"
    class="modern-card p-8"
  >
    <h2 class="text-3xl font-bold text-white mb-6">工作經歷</h2>
    <div>
      <TimelineItem
        v-for="exp in experienceList"
        :key="exp.title"
        :period="exp.period"
        :title="exp.title"
        :subtitle="exp.subtitle"
        :description="exp.description"
        :icon="exp.icon"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useIntersectionObserver } from '../composables/useIntersectionObserver.js';
import { experiences } from '../data/timeline.js';
import TimelineItem from './TimelineItem.vue';

const experienceList = experiences;

const sectionRef = ref(null);
const { isVisible } = useIntersectionObserver(sectionRef, { threshold: 0.3 });
</script>
