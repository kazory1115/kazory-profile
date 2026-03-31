<template>
  <div class="page-shell">
    <section class="portfolio-hero">
      <div class="portfolio-hero__main card-surface">
        <div class="portfolio-hero__identity">
          <p class="eyebrow">Backend Engineer Portfolio</p>
          <h1>{{ profile.name }} <span>{{ profile.englishName }}</span></h1>
          <p class="portfolio-hero__role">{{ profile.title }} / {{ profile.location }}</p>
        </div>

        <p class="portfolio-hero__summary">{{ profile.intro }}</p>

        <div class="portfolio-hero__actions">
          <router-link to="/project" class="button-primary">Projects</router-link>
          <router-link to="/writing" class="button-secondary">Writing</router-link>
          <a :href="profile.githubUrl" target="_blank" rel="noreferrer" class="button-secondary">
            GitHub
          </a>
        </div>

        <div class="portfolio-hero__stack">
          <span v-for="tag in introTags" :key="tag" class="badge">{{ tag }}</span>
        </div>
      </div>

      <aside class="portfolio-hero__side">
        <article class="card-surface compact-panel">
          <p class="eyebrow">Quick Summary</p>
          <div class="summary-list">
            <div class="summary-list__item">
              <span>Focus</span>
              <strong>重構、API 設計、大型資料流程與可維護架構</strong>
            </div>
            <div class="summary-list__item">
              <span>Primary stack</span>
              <strong>PHP、CodeIgniter、Laravel、MySQL、Vue 3、Docker</strong>
            </div>
            <div class="summary-list__item">
              <span>Work style</span>
              <strong>偏好清楚分層、可持續擴充、可追蹤問題來源的工程實作</strong>
            </div>
          </div>
        </article>

        <article class="card-surface compact-panel">
          <p class="eyebrow">Metrics</p>
          <div class="metrics-grid metrics-grid--compact">
            <article v-for="metric in heroMetrics" :key="metric.label" class="hero-metric">
              <strong>{{ metric.value }}</strong>
              <span>{{ metric.label }}</span>
            </article>
          </div>
        </article>
      </aside>
    </section>

    <section class="section-block">
      <div class="section-heading section-heading--compact">
        <p class="eyebrow">Selected Projects</p>
        <h2>代表性案例</h2>
        <p class="page-lead">
          聚焦舊系統重構、框架升級、大型資料處理與可延伸的 side project 骨架。
        </p>
      </div>
      <div class="project-grid">
        <router-link
          v-for="project in featuredProjects"
          :key="project.id"
          :to="{ name: 'ProjectDetail', params: { id: project.id } }"
          class="card-surface project-card"
        >
          <div class="project-card__meta">
            <p class="card-kicker">{{ project.category }}</p>
            <span class="project-card__index">0{{ project.id }}</span>
          </div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="tag-list">
            <span v-for="tech in project.technologies.slice(0, 4)" :key="tech">{{ tech }}</span>
          </div>
          <div class="project-card__footer">
            <span>View case study</span>
            <span>-></span>
          </div>
        </router-link>
      </div>
    </section>

    <section class="section-block split-grid">
      <article class="card-surface prose-card">
        <div class="section-heading section-heading--compact">
          <p class="eyebrow">Engineering Principles</p>
          <h2>工程判斷</h2>
        </div>
        <ul class="plain-list">
          <li v-for="item in engineeringPrinciples" :key="item">{{ item }}</li>
        </ul>
      </article>

      <article class="card-surface profile-card">
        <div class="section-heading section-heading--compact">
          <p class="eyebrow">Focus Areas</p>
          <h2>主要關注主題</h2>
        </div>
        <div class="summary-list">
          <div v-for="item in focusAreas" :key="item.title" class="summary-list__item">
            <span>{{ item.title }}</span>
            <strong>{{ item.text }}</strong>
          </div>
        </div>
      </article>
    </section>

    <section class="section-block">
      <div class="section-heading section-heading--compact">
        <p class="eyebrow">Recent Writing</p>
        <h2>技術筆記</h2>
        <p class="page-lead">
          補充專案背後的設計思路，內容聚焦重構、效能、Realtime 與開發流程整理。
        </p>
      </div>
      <div class="archive-list">
        <router-link
          v-for="note in featuredWritings"
          :key="note.slug"
          :to="{ name: 'WritingDetail', params: { slug: note.slug } }"
          class="archive-item"
        >
          <div class="archive-item__topline">
            <p class="card-kicker">{{ note.category }}</p>
            <span>{{ note.date }}</span>
          </div>
          <h3>{{ note.title }}</h3>
          <p>{{ note.excerpt }}</p>
          <div class="archive-item__meta">
            <span>{{ note.readTime }}</span>
            <span>{{ note.status }}</span>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  engineeringPrinciples,
  focusAreas,
  heroMetrics,
  introTags,
  profile,
  projects,
  writings,
} from '../data/site.js';

const featuredProjects = computed(() => projects.slice(0, 3));
const featuredWritings = computed(() => writings.slice(0, 3));
</script>

<style scoped>
.portfolio-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.85fr);
  gap: 1.25rem;
  align-items: start;
}

.portfolio-hero__main,
.portfolio-hero__side,
.portfolio-hero__identity {
  display: grid;
  gap: 1rem;
}

.portfolio-hero__main {
  padding: clamp(1.5rem, 3vw, 2rem);
}

.portfolio-hero__identity h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: baseline;
}

.portfolio-hero__identity h1 span {
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  color: var(--muted);
  font-family: 'IBM Plex Sans', 'Noto Sans TC', sans-serif;
  font-weight: 500;
  letter-spacing: 0;
}

.portfolio-hero__role {
  color: var(--muted);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.9rem;
}

.portfolio-hero__summary {
  max-width: 62ch;
  color: var(--text);
  line-height: 1.8;
}

.portfolio-hero__actions,
.portfolio-hero__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.portfolio-hero__side {
  gap: 1.25rem;
}

.compact-panel {
  padding: 1.4rem;
  display: grid;
  gap: 1rem;
}

.metrics-grid--compact {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.section-heading--compact h2 {
  font-size: clamp(1.55rem, 2.3vw, 2rem);
}

.hero-metric {
  display: grid;
  gap: 0.35rem;
  padding: 0.95rem;
  background: var(--surface-soft);
  border: 1px solid var(--line);
  border-radius: 16px;
}

.hero-metric strong {
  font-family: 'Space Grotesk', 'Noto Sans TC', sans-serif;
  font-size: 1.2rem;
}

.hero-metric span {
  color: var(--muted);
  font-size: 0.82rem;
}

@media (max-width: 980px) {
  .portfolio-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .metrics-grid--compact {
    grid-template-columns: 1fr;
  }
}
</style>
