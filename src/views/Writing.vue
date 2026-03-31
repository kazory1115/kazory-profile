<template>
  <div class="page-shell">
    <section class="page-hero--split">
      <div class="section-heading">
        <p class="eyebrow">Writing</p>
        <h1>技術筆記聚焦重構、效能、Realtime 與開發流程實務。</h1>
        <p class="page-lead">
          內容以實作問題整理為主，包含系統拆分、效能瓶頸、通訊選型與開發環境配置。
          適合作為作品補充說明，也方便快速回看具體技術決策。
        </p>
      </div>

      <aside class="card-surface sticky-card">
        <p class="eyebrow">Editorial Direction</p>
        <div class="summary-list">
          <div class="summary-list__item">
            <span>Topics</span>
            <strong>Refactoring、Performance、Realtime、Workflow</strong>
          </div>
          <div class="summary-list__item">
            <span>Style</span>
            <strong>工程實務導向，少概念，多決策與踩坑整理</strong>
          </div>
          <div class="summary-list__item">
            <span>Articles</span>
            <strong>{{ writings.length }} 篇草稿與整理中筆記</strong>
          </div>
        </div>
      </aside>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Articles</p>
        <h2>文章內容以可落地的技術經驗為主，補充專案背後的設計思路與實作細節。</h2>
      </div>

      <div class="archive-list">
        <router-link
          v-for="note in writings"
          :key="note.slug"
          :to="{ name: 'WritingDetail', params: { slug: note.slug } }"
          class="archive-item"
        >
          <div class="archive-item__topline">
            <p class="card-kicker">{{ note.category }}</p>
            <span>{{ note.date }}</span>
          </div>
          <h2>{{ note.title }}</h2>
          <div class="archive-item__meta">
            <span>{{ note.readTime }}</span>
            <span>{{ note.status }}</span>
          </div>
          <p>{{ note.excerpt }}</p>
          <div class="tag-list">
            <span v-for="tag in note.tags" :key="tag">{{ tag }}</span>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { writings } from '../data/site.js';
</script>
