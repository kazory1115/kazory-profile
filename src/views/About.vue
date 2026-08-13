<template>
  <div class="page-shell">

    <AsyncState v-if="isLoading" />
    <AsyncState v-else-if="error" is-error :message="error.message" @retry="reload" />

    <template v-else-if="site">

    <!-- Hero Split -->
    <section class="about-hero">
      <div class="section-heading">
        <p class="eyebrow">關於我</p>
        <h1>專注後端工程、<br>系統重構與可維護架構。</h1>
        <p class="page-lead">
          主要技術棧為 PHP、CodeIgniter、Laravel、MySQL 與 Vue 3。
          實作上重視分層清晰、資料流穩定與需求持續疊加後的維護成本。
        </p>
      </div>

      <aside class="about-aside">
        <p class="eyebrow">個人摘要</p>
        <div class="summary-list">
          <div class="summary-list__item">
            <span>職務</span>
            <strong>{{ profile.title }} / {{ profile.location }}</strong>
          </div>
          <div class="summary-list__item">
            <span>主要技術</span>
            <strong>PHP, Laravel, MySQL, Vue 3, Docker</strong>
          </div>
          <div class="summary-list__item">
            <span>關注領域</span>
            <strong>系統重構, API 設計, 大規模資料流</strong>
          </div>
          <div class="summary-list__item">
            <span>聯絡信箱</span>
            <strong>
              <a :href="`mailto:${profile.email}`" class="about-email">{{ profile.email }}</a>
            </strong>
          </div>
        </div>
      </aside>
    </section>

    <!-- Bio + Principles -->
    <section class="section-block split-grid">
      <article class="prose-block">
        <p class="eyebrow">簡介</p>
        <p v-for="paragraph in profile.summary" :key="paragraph" class="body-copy">
          {{ paragraph }}
        </p>
      </article>

      <aside class="prose-block">
        <p class="eyebrow">工程原則</p>
        <ul class="plain-list">
          <li v-for="item in engineeringPrinciples" :key="item">{{ item }}</li>
        </ul>
      </aside>
    </section>

    <!-- Journey (Clean Monospace Timeline) -->
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">經歷與方向</p>
        <h2>持續累積可重複套用的工程實踐</h2>
      </div>
      <div class="journey-list">
        <article v-for="item in journey" :key="item.title" class="journey-item">
          <span class="journey-item__period">{{ item.period }}</span>
          <div class="journey-item__main">
            <h3 class="journey-item__title">{{ item.title }}</h3>
            <p class="journey-item__desc">{{ item.description }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- Skills (Refined Horizontal Alignment) -->
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">技術能力</p>
        <h2>技術棧與工具鏈</h2>
      </div>
      <div class="skill-list">
        <div v-for="group in skillGroups" :key="group.title" class="skill-category" :id="`skill-${group.title}`">
          <span class="skill-category__title">{{ group.title }}</span>
          <div class="tag-list">
            <span v-for="item in group.items" :key="item">{{ item }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact (Clean Inline Layout) -->
    <section class="section-block split-grid">
      <article class="prose-block">
        <p class="eyebrow">聯絡方式</p>
        <h3 class="contact-title">直接交流</h3>
        <p class="body-copy">
          如需交流後端架構、重構策略或大型資料流程處理，歡迎直接來信。
        </p>
        <a :href="`mailto:${profile.email}`" class="contact-link">{{ profile.email }}</a>
      </article>

      <article class="prose-block">
        <p class="eyebrow">線上連結</p>
        <h3 class="contact-title">社群平台</h3>
        <p class="body-copy">
          檢視個人開源專案、實驗性工具或骨架代碼。
        </p>
        <a :href="profile.githubUrl" target="_blank" rel="noreferrer" class="contact-link">
          GitHub
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
        </a>
      </article>
    </section>

    </template>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import AsyncState from '../components/common/AsyncState.vue';
import { useSiteContent } from '../composables/useSiteContent.js';

const { site, error, isLoading, reload } = useSiteContent();

const profile = computed(() => site.value?.profile ?? {});
const engineeringPrinciples = computed(() => site.value?.engineeringPrinciples ?? []);
const journey = computed(() => site.value?.journey ?? []);
const skillGroups = computed(() => site.value?.skillGroups ?? []);
</script>

<style scoped>
.about-hero {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 3rem;
  align-items: start;
}

.about-email {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s ease;
}

.about-email:hover {
  border-color: var(--accent);
}

.prose-block {
  display: grid;
  align-content: start;
  gap: 0.5rem;
}

.body-copy {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.contact-title {
  font-size: 1.15rem;
  font-weight: 500;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.about-aside {
  position: sticky;
  top: 6rem;
}

@media (max-width: 900px) {
  .about-hero {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-aside {
    position: static;
  }
}
</style>
