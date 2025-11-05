<template>
  <div
    ref="sectionRef"
    :class="{ 'fade-in-up-animation': true, 'is-visible': isVisible }"
    class="modern-card p-8"
  >
    <h2 class="text-3xl font-bold text-white mb-6">專業技能</h2>
    <div class="space-y-8">
      <div v-for="category in categories" :key="category.name">
        <h3 class="text-xl font-semibold text-orange-300 mb-2">
          {{ category.name }}
        </h3>
        <p class="text-gray-400 text-sm mb-4">
          {{ category.description }}
        </p>
        <div class="space-y-4">
          <SkillBar
            v-for="skill in category.skills"
            :key="skill.name"
            :name="skill.name"
            :level="skill.level"
            :icon="skill.icon"
            :color="skill.color"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useIntersectionObserver } from '../composables/useIntersectionObserver.js';
import { skillCategories } from '../data/skills.js';
import SkillBar from './SkillBar.vue';

const categories = skillCategories;

const sectionRef = ref(null);
const { isVisible } = useIntersectionObserver(sectionRef, { threshold: 0.3 });
</script>
