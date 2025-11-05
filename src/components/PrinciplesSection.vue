<template>
  <div
    ref="sectionRef"
    :class="{
      'fade-in-up-animation': true,
      'is-visible': isVisible,
    }"
    class="modern-card p-8"
  >
    <!-- 關於我 -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white mb-4">關於我</h2>
      <div
        class="prose prose-lg max-w-none text-gray-300 prose-invert space-y-4"
      >
        <p v-for="(paragraph, index) in profile.aboutMe" :key="index">
          {{ paragraph }}
        </p>
      </div>
    </div>

    <!-- 開發理念 -->
    <div>
      <h2 class="text-3xl font-bold text-white mb-6">開發理念</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="p in principlesList"
          :key="p.title"
          class="bg-gray-700/50 p-4 rounded-lg transition-transform duration-300"
        >
          <h4
            class="text-lg font-semibold text-orange-300 flex items-center mb-2"
          >
            <font-awesome-icon :icon="p.icon" class="mr-3 w-5" />
            {{ p.title }}
          </h4>
          <p class="text-gray-400 text-sm">{{ p.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useIntersectionObserver } from '../composables/useIntersectionObserver.js';
import { profileData, principles } from '../data/profile.js';

const profile = profileData;
const principlesList = principles;

const sectionRef = ref(null);
const { isVisible } = useIntersectionObserver(sectionRef, { threshold: 0.3 });
</script>
