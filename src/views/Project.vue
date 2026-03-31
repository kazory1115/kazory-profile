<template>
  <div class="page-shell">
    <section class="page-hero--split">
      <div class="section-heading">
        <p class="eyebrow">Projects</p>
        <h1>精選專案與工程案例，聚焦架構設計、重構與實務落地。</h1>
        <p class="page-lead">
          作品內容以代表性案例為主，涵蓋系統拆分、框架升級、效能調整與開發流程整理。
          每個項目都會交代背景、技術決策、實作內容與可延伸方向。
        </p>
      </div>

      <aside class="card-surface sticky-card">
        <p class="eyebrow">Portfolio Structure</p>
        <div class="summary-list">
          <div class="summary-list__item">
            <span>Case studies</span>
            <strong>{{ projects.length }} 個重點案例</strong>
          </div>
          <div class="summary-list__item">
            <span>Repositories</span>
            <strong>{{ githubRepositories.length }} 個公開 repo</strong>
          </div>
          <div class="summary-list__item">
            <span>Focus</span>
            <strong>Refactoring、architecture、large-data workflow、developer experience</strong>
          </div>
        </div>
      </aside>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Selected Work</p>
        <h2>每個案例都對應一類實際工程問題，包含系統重構、資料流程與開發體驗優化。</h2>
      </div>
      <div class="project-grid">
        <router-link
          v-for="(project, index) in projects"
          :key="project.id"
          :to="{ name: 'ProjectDetail', params: { id: project.id } }"
          class="card-surface project-card"
        >
          <div class="project-card__meta">
            <p class="card-kicker">{{ project.category }}</p>
            <span class="project-card__index">0{{ index + 1 }}</span>
          </div>
          <h2>{{ project.title }}</h2>
          <p>{{ project.description }}</p>
          <div class="tag-list">
            <span v-for="tech in project.technologies.slice(0, 4)" :key="tech">{{ tech }}</span>
          </div>
          <div class="project-card__footer">
            <span>Open case study</span>
            <span>-></span>
          </div>
        </router-link>
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Repositories</p>
        <h2>公開 repositories 涵蓋日常關注的技術主題與實驗方向。</h2>
      </div>
      <div class="repo-grid">
        <article v-for="repo in githubRepositories" :key="repo.name" class="card-surface repo-card">
          <div class="repo-card__head">
            <h3>{{ repo.name }}</h3>
            <span>{{ repo.language }}</span>
          </div>
          <p class="subtle">Last updated: {{ repo.updatedAt }}</p>
          <p>{{ repo.note }}</p>
          <a :href="repo.url" target="_blank" rel="noreferrer" class="contact-link">Open GitHub</a>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { githubRepositories, projects } from '../data/site.js';
</script>
