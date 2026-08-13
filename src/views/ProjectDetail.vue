<template>
  <div class="page-shell">
    <AsyncState v-if="isLoading" />
    <AsyncState v-else-if="error" is-error :message="error.message" @retry="reload" />

    <div v-else-if="project" class="detail-shell">
      <router-link to="/project" class="back-link">回到專案列表</router-link>

      <article class="project-detail">
        <header class="detail-header">
          <p class="card-kicker">{{ project.category }}</p>
          <h1>{{ project.title }}</h1>
          <div class="project-detail__meta">
            <span v-if="project.year">{{ project.year }} 年</span>
          </div>
          <p class="body-copy">{{ project.description }}</p>
          <div class="tag-list">
            <span v-for="technology in project.technologies" :key="technology">{{ technology }}</span>
          </div>
        </header>

        <ContentRenderer :blocks="project.content" />

        <div v-if="project.sourceUrl" class="project-action-row">
          <a :href="project.sourceUrl" target="_blank" rel="noreferrer" class="button-primary">
            查看原始碼
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
          </a>
        </div>
      </article>
    </div>

    <div v-else class="empty-state card-surface">
      <p class="eyebrow">404</p>
      <h1>找不到這個專案。</h1>
      <p>請回到專案列表重新選擇。</p>
      <router-link to="/project" class="button-primary">返回專案列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AsyncState from '../components/common/AsyncState.vue';
import ContentRenderer from '../components/content/ContentRenderer.vue';
import { useAsyncResource } from '../composables/useAsyncResource.js';
import { projectRepository } from '../repositories/index.js';

const route = useRoute();
const projectIdentity = computed(() => String(route.params.id ?? ''));
const { data: project, error, isLoading, reload } = useAsyncResource(
  projectIdentity,
  async (identity) => {
    const projectById = await projectRepository.getById(identity);
    return projectById ?? projectRepository.getBySlug(identity);
  },
);
</script>

<style scoped>
.project-detail {
  max-width: 760px;
  margin-inline: auto;
}

.project-action-row {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}
</style>
