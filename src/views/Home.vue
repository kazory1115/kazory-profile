<template>
  <div class="page-shell">

    <!-- ── Hero (Clean & Minimalist Editorial Intro) ── -->
    <section class="home-hero">
      <div class="home-hero__content">
        <h1 class="home-hero__name">Kazory Su</h1>
        <p class="home-hero__intro">
          {{ profile.intro }}
          習慣將複雜系統梳理為分層清晰、責任邊界明確的架構，並將實務中的重構、效能優化與工程取捨記錄於此。
        </p>
        <div class="home-hero__links">
          <a :href="`mailto:${profile.email}`" class="contact-link">{{ profile.email }}</a>
          <span class="divider">/</span>
          <a :href="profile.githubUrl" target="_blank" rel="noreferrer" class="contact-link">GitHub</a>
        </div>
      </div>
    </section>

    <!-- ── Projects (Clean, Borderless List) ── -->
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">精選案例</p>
        <h2>專案實作</h2>
        <p class="page-lead">
          聚焦舊系統重構、既有代碼分層收斂、大型匯出與批次資料流程優化。
        </p>
      </div>

      <div class="project-list">
        <router-link
          v-for="project in featuredProjects"
          :key="project.id"
          :to="{ name: 'ProjectDetail', params: { id: project.id } }"
          class="project-item"
        >
          <div class="project-item__year">{{ project.year }}</div>
          <div class="project-item__main">
            <h3 class="project-item__title">{{ project.title }}</h3>
            <p class="project-item__desc">{{ project.description }}</p>
            <div class="tag-list">
              <span v-for="tech in project.technologies.slice(0, 5)" :key="tech">{{ tech }}</span>
            </div>
          </div>
          <div class="project-item__meta">
            <span class="project-item__category">{{ project.category }}</span>
          </div>
        </router-link>
      </div>

      <div class="section-cta">
        <router-link to="/project" class="button-secondary">查看所有專案 ↗</router-link>
      </div>
    </section>

    <!-- ── Engineering & Focus (Refined, Borderless) ── -->
    <section class="section-block split-grid">
      <article class="prose-block">
        <p class="eyebrow">工程原則</p>
        <h3 class="home-section-title">工程判斷</h3>
        <ul class="plain-list">
          <li v-for="item in engineeringPrinciples" :key="item">{{ item }}</li>
        </ul>
      </article>

      <article class="prose-block">
        <p class="eyebrow">關注領域</p>
        <h3 class="home-section-title">主要關注主題</h3>
        <div class="summary-list">
          <div v-for="item in focusAreas" :key="item.title" class="summary-list__item">
            <span>{{ item.title }}</span>
            <strong>{{ item.text }}</strong>
          </div>
        </div>
      </article>
    </section>

    <!-- ── Recent Writing (Borderless list) ── -->
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">近期文章</p>
        <h2>技術筆記</h2>
        <p class="page-lead">
          留下問題發生的現場。記錄系統重構、效能瓶頸、開發體驗與架構設計決策。
        </p>
      </div>

      <div class="writing-list">
        <router-link
          v-for="note in featuredWritings"
          :key="note.slug"
          :to="{ name: 'WritingDetail', params: { slug: note.slug } }"
          class="writing-item"
        >
          <span class="writing-item__date">{{ note.date }}</span>
          <span class="writing-item__title">{{ note.title }}</span>
          <div class="writing-item__meta">
            <span class="writing-item__category">{{ note.category }}</span>
          </div>
        </router-link>
      </div>

      <div class="section-cta">
        <router-link to="/writing" class="button-secondary">閱讀所有文章 ↗</router-link>
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  engineeringPrinciples,
  focusAreas,
  introTags,
  profile,
  projects,
  writings,
} from '../data/site.js';

const featuredProjects = computed(() => projects.slice(0, 3));
const featuredWritings = computed(() => writings.slice(0, 3));
</script>

<style scoped>
/* ── Hero ── */
.home-hero {
  padding-bottom: clamp(3rem, 6vw, 4rem);
  border-bottom: 1px solid var(--line);
}

.home-hero__content {
  display: grid;
  gap: 1.25rem;
  max-width: 680px;
}

.home-hero__name {
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--text);
}

.home-hero__intro {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.75;
}

.home-hero__links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.85rem;
}

.home-hero__links .divider {
  color: var(--line-strong);
}

/* Section CTA */
.section-cta {
  display: flex;
  padding-top: 0.5rem;
}

.home-section-title {
  font-size: 1.15rem;
  font-weight: 500;
  margin-top: 0.75rem;
  margin-bottom: 1.25rem;
}

.prose-block {
  display: grid;
  align-content: start;
}
</style>
