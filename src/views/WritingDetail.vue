<template>
  <div class="page-shell">
    <div v-if="article" class="detail-shell">
      <router-link to="/writing" class="back-link">回到文章列表</router-link>

      <article class="article-detail">
        <header class="detail-header">
          <p class="card-kicker">{{ article.category }}</p>
          <h1>{{ article.title }}</h1>
          <div class="article-detail__meta">
            <span>{{ article.date }}</span>
            <span>{{ article.readTime }}</span>
            <span
              class="article-status"
              :class="`status--${article.status?.toLowerCase()}`"
            >{{ article.status }}</span>
          </div>
          <p class="body-copy">{{ article.excerpt }}</p>
          <div class="tag-list">
            <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
          </div>
        </header>

        <div class="markdown-body" v-html="article.html"></div>

        <nav class="article-pagination" aria-label="文章導航">
          <router-link
            v-if="previousArticle"
            :to="{ name: 'WritingDetail', params: { slug: previousArticle.slug } }"
            class="article-pagination__item"
          >
            <span>← 上一篇</span>
            <strong>{{ previousArticle.title }}</strong>
          </router-link>
          <div v-else class="article-pagination__item article-pagination__item--empty">
            <span>← 上一篇</span>
            <strong>這是第一篇文章</strong>
          </div>

          <router-link
            v-if="nextArticle"
            :to="{ name: 'WritingDetail', params: { slug: nextArticle.slug } }"
            class="article-pagination__item article-pagination__item--next"
          >
            <span>下一篇 →</span>
            <strong>{{ nextArticle.title }}</strong>
          </router-link>
          <div v-else class="article-pagination__item article-pagination__item--empty article-pagination__item--next">
            <span>下一篇 →</span>
            <strong>目前沒有下一篇</strong>
          </div>
        </nav>
      </article>
    </div>

    <div v-else class="empty-state card-surface">
      <p class="eyebrow">404</p>
      <h1>找不到這篇技術筆記。</h1>
      <p>請回到文章列表重新選擇。</p>
      <router-link to="/writing" class="button-primary">返回文章列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { writings } from '../data/site.js';

const route = useRoute();
const articleIndex = computed(() => writings.findIndex((item) => item.slug === route.params.slug));
const article = computed(() => (articleIndex.value >= 0 ? writings[articleIndex.value] : null));
const previousArticle = computed(() => (articleIndex.value > 0 ? writings[articleIndex.value - 1] : null));
const nextArticle = computed(() =>
  articleIndex.value >= 0 && articleIndex.value < writings.length - 1
    ? writings[articleIndex.value + 1]
    : null,
);
</script>

<style scoped>
.article-detail {
  max-width: 760px;
  margin-inline: auto;
}

.detail-header {
  display: grid;
  gap: 0.875rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--line);
}

.article-status {
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.status--published { color: var(--success); }
.status--draft { color: var(--warning); }

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

.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--line);
  margin: 1rem 0;
}

/* Pagination */
.article-pagination__item--next {
  text-align: right;
}

.article-pagination__item--empty {
  opacity: 0.45;
  pointer-events: none;
}
</style>
