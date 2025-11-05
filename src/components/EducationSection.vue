<template>
  <div>
    <!-- 學歷 -->
    <div
      ref="educationRef"
      :class="{
        'fade-in-up-animation': true,
        'is-visible': educationVisible,
      }"
      class="modern-card p-8 mb-12"
    >
      <h2 class="text-3xl font-bold text-white mb-6">學歷</h2>
      <div>
        <TimelineItem
          v-for="edu in educationList"
          :key="edu.title"
          :period="edu.period"
          :title="edu.title"
          :subtitle="edu.subtitle"
          :description="edu.description"
          :icon="edu.icon"
        />
      </div>
    </div>

    <!-- 相關證照 -->
    <div
      ref="certificationsRef"
      :class="{
        'fade-in-up-animation': true,
        'is-visible': certificationsVisible,
      }"
      class="modern-card p-8"
    >
      <h2 class="text-3xl font-bold text-white mb-6">相關證照</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        <p
          v-for="cert in certList"
          :key="cert.name"
          class="text-gray-300 flex items-center"
        >
          <font-awesome-icon
            :icon="['fas', 'check-circle']"
            class="text-green-500 mr-3"
          />
          {{ cert.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useIntersectionObserver } from '../composables/useIntersectionObserver.js';
import { education } from '../data/timeline.js';
import { certifications } from '../data/profile.js';
import TimelineItem from './TimelineItem.vue';

const educationList = education;
const certList = certifications;

const educationRef = ref(null);
const certificationsRef = ref(null);

const { isVisible: educationVisible } = useIntersectionObserver(educationRef, {
  threshold: 0.3,
});
const { isVisible: certificationsVisible } = useIntersectionObserver(
  certificationsRef,
  { threshold: 0.3 }
);
</script>
