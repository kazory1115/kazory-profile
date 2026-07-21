<template>
  <div class="page-shell">
    <div v-if="project" class="detail-shell">
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
            <span v-for="tech in project.technologies" :key="tech">{{ tech }}</span>
          </div>
        </header>

        <div class="markdown-body" v-html="project.html"></div>

        <div class="project-action-row" v-if="project.link">
          <a
            :href="project.link"
            target="_blank"
            rel="noreferrer"
            class="button-primary"
          >
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
import { projects } from '../data/site.js';

const route = useRoute();

const project = computed(() => projects.find((item) => item.id === Number(route.params.id)));
</script>

<style scoped>
.project-detail {
  max-width: 760px;
  margin-inline: auto;
}

.detail-header {
  display: grid;
  gap: 0.875rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--line);
}

.project-detail__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  color: var(--muted);
}

/* Markdown */
.markdown-body {
  display: grid;
  gap: 0.875rem;
  font-size: 1rem;
  line-height: 1.85;
  padding-block: 0.5rem;
}

.markdown-body :deep(h2) {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  color: var(--text);
  letter-spacing: -0.015em;
}

.markdown-body :deep(h3) {
  margin-top: 1.25rem;
  font-size: 1.1rem;
  color: var(--text);
}

.markdown-body :deep(p),
.markdown-body :deep(li) {
  color: var(--text-secondary);
}

.markdown-body :deep(strong) {
  color: var(--text);
  font-weight: 600;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  display: grid;
  gap: 0.45rem;
  padding-left: 1.5rem;
}

.markdown-body :deep(blockquote) {
  margin: 0.5rem 0;
  padding: 1rem 1.25rem;
  border-left: 3px solid var(--accent);
  background: var(--accent-dim);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.markdown-body :deep(blockquote p) {
  color: var(--text);
}

.markdown-body :deep(pre) {
  overflow-x: auto;
  margin: 0.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--bg-elevated);
  font-size: 0.875rem;
  line-height: 1.65;
}

.markdown-body :deep(code) {
  padding: 0.1rem 0.35rem;
  border-radius: var(--radius-xs);
  background: var(--surface-strong);
  color: var(--accent-strong);
  font-size: 0.875em;
}

.markdown-body :deep(pre code) {
  padding: 0;
  background: none;
  color: var(--text);
  font-size: inherit;
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  padding: 0.75rem;
  border: 1px solid var(--line);
  text-align: left;
}

.markdown-body :deep(th) {
  background: var(--surface-soft);
  font-weight: 600;
}

.markdown-body :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.project-action-row {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}
</style>
