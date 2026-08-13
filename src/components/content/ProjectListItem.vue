<template>
  <router-link
    :to="{ name: 'ProjectDetail', params: { id: project.id } }"
    class="project-item"
  >
    <div class="project-item__year">{{ project.year }}</div>
    <div class="project-item__main">
      <h3 class="project-item__title">{{ project.title }}</h3>
      <p class="project-item__desc">{{ project.description }}</p>
      <div class="tag-list">
        <span v-for="technology in project.technologies.slice(0, technologyLimit)" :key="technology">
          {{ technology }}
        </span>
      </div>
    </div>
    <div class="project-item__meta">
      <span class="project-item__category">{{ project.category }}</span>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  project: { type: Object, required: true },
  technologyLimit: { type: Number, default: 5 },
});
</script>
