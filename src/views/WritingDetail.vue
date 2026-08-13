<template>
  <div class="page-shell">
    <AsyncState v-if="isLoading" />
    <AsyncState v-else-if="error" is-error :message="error.message" @retry="reload" />

    <div v-else-if="article" class="detail-shell">
      <router-link to="/writing" class="back-link">回到文章列表</router-link>

      <article class="article-detail">
        <header class="detail-header">
          <p class="card-kicker">{{ article.category }}</p>
          <h1>{{ article.title }}</h1>
          <div class="article-detail__meta">
            <span>{{ article.publishedAt }}</span>
            <span>閱讀約 {{ article.readingMinutes }} 分鐘</span>
            <span class="article-status" :class="`status--${article.status}`">
              {{ statusLabels[article.status] }}
            </span>
          </div>
          <p class="body-copy">{{ article.excerpt }}</p>
          <div class="tag-list">
            <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
          </div>
        </header>

        <ContentRenderer :blocks="article.content" />

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
      <p>文章可能尚未發布，或網址已經變更。</p>
      <router-link to="/writing" class="button-primary">返回文章列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AsyncState from '../components/common/AsyncState.vue';
import ContentRenderer from '../components/content/ContentRenderer.vue';
import { useAsyncResource } from '../composables/useAsyncResource.js';
import { writingRepository } from '../repositories/index.js';

const statusLabels = { published: '已發布', draft: '草稿' };
const route = useRoute();
const articleSlug = computed(() => String(route.params.slug ?? ''));
const { data: detail, error, isLoading, reload } = useAsyncResource(
  articleSlug,
  (slug) => writingRepository.getBySlug(slug),
);

const article = computed(() => detail.value?.item ?? null);
const previousArticle = computed(() => detail.value?.navigation?.previous ?? null);
const nextArticle = computed(() => detail.value?.navigation?.next ?? null);
</script>

<style scoped>
.article-detail {
  max-width: 760px;
  margin-inline: auto;
}

.article-status {
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.status--published { color: var(--success); }
.status--draft { color: var(--warning); }
.article-pagination__item--next { text-align: right; }
.article-pagination__item--empty { opacity: 0.45; pointer-events: none; }
</style>
