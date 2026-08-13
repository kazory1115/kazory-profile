<template>
  <div class="page-shell">

    <AsyncState v-if="isLoading" />
    <AsyncState v-else-if="error" is-error :message="error.message" @retry="reload" />

    <template v-else-if="homeData">

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
          從領域建模、跨模組交易到桌面工具發布，精選案例均可由公開程式碼、測試或 Release 驗證。
        </p>
      </div>

      <div class="project-list">
        <ProjectListItem
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
        />
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
        <WritingListItem
          v-for="note in featuredWritings"
          :key="note.slug"
          :writing="note"
        />
      </div>

      <div class="section-cta">
        <router-link to="/writing" class="button-secondary">閱讀所有文章 ↗</router-link>
      </div>
    </section>

    </template>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import AsyncState from '../components/common/AsyncState.vue';
import ProjectListItem from '../components/content/ProjectListItem.vue';
import WritingListItem from '../components/content/WritingListItem.vue';
import { useAsyncData } from '../composables/useAsyncData.js';
import { loadSiteContent } from '../composables/useSiteContent.js';
import { projectRepository, writingRepository } from '../repositories/index.js';

const { data: homeData, error, isLoading, reload } = useAsyncData(async () => {
  const [site, projectResult, writingResult] = await Promise.all([
    loadSiteContent(),
    projectRepository.list({ featured: true, limit: 3 }),
    writingRepository.list({ featured: true, limit: 3 }),
  ]);

  return {
    site,
    projects: projectResult.items,
    writings: writingResult.items,
  };
});

const profile = computed(() => homeData.value?.site.profile ?? {});
const engineeringPrinciples = computed(() => homeData.value?.site.engineeringPrinciples ?? []);
const focusAreas = computed(() => homeData.value?.site.focusAreas ?? []);
const featuredProjects = computed(() => homeData.value?.projects ?? []);
const featuredWritings = computed(() => homeData.value?.writings ?? []);
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
