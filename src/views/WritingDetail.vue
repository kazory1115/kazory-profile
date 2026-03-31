<template>
  <div class="page-shell">
    <div v-if="article" class="detail-shell">
      <router-link to="/writing" class="back-link">回到 Writing</router-link>

      <article class="card-surface article-detail">
        <header class="detail-header">
          <p class="card-kicker">{{ article.category }}</p>
          <h1>{{ article.title }}</h1>
          <div class="article-detail__meta">
            <span>{{ article.date }}</span>
            <span>{{ article.readTime }}</span>
            <span>{{ article.status }}</span>
          </div>
          <p class="section-code">Article Summary</p>
          <p class="body-copy">{{ article.excerpt }}</p>
          <div class="tag-list">
            <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
          </div>
        </header>

        <section
          v-for="section in article.sections"
          :key="section.heading"
          class="article-detail__section"
        >
          <p class="section-code">{{ section.heading }}</p>
          <p v-for="paragraph in section.paragraphs" :key="paragraph" class="body-copy">
            {{ paragraph }}
          </p>
        </section>

        <nav class="article-pagination">
          <router-link
            v-if="previousArticle"
            :to="{ name: 'WritingDetail', params: { slug: previousArticle.slug } }"
            class="article-pagination__item"
          >
            <span>上一篇</span>
            <strong>{{ previousArticle.title }}</strong>
          </router-link>

          <div v-else class="article-pagination__item">
            <span>上一篇</span>
            <strong>這是第一篇文章</strong>
          </div>

          <router-link
            v-if="nextArticle"
            :to="{ name: 'WritingDetail', params: { slug: nextArticle.slug } }"
            class="article-pagination__item"
          >
            <span>下一篇</span>
            <strong>{{ nextArticle.title }}</strong>
          </router-link>

          <div v-else class="article-pagination__item">
            <span>下一篇</span>
            <strong>目前沒有下一篇文章</strong>
          </div>
        </nav>
      </article>
    </div>

    <div v-else class="empty-state card-surface">
      <p class="eyebrow">404</p>
      <h1>找不到這篇技術筆記。</h1>
      <p>請回到文章列表重新選擇。</p>
      <router-link to="/writing" class="button-primary">返回 Writing</router-link>
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
    : null
);
</script>
