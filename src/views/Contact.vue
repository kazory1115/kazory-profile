<template>
  <div class="page-shell">
    <section class="section-block split-grid">
      <article class="prose-block">
        <p class="eyebrow">聯絡方式</p>
        <h1 class="contact-title">聯絡方式</h1>
        <p class="body-copy">
          如果你要交流 PHP 後端、系統重構、Service Layer、API 設計或大型資料流程整理，可以直接寄信。
        </p>
        <a :href="`mailto:${profile.email}`" class="contact-link">{{ profile.email }}</a>
      </article>

      <article class="prose-block">
        <p class="eyebrow">線上連結</p>
        <h2 class="contact-title">GitHub</h2>
        <p class="body-copy">
          歡迎前往 GitHub 檢視專案源碼與近期開發實驗。
        </p>
        <a :href="profile.githubUrl" target="_blank" rel="noreferrer" class="contact-link">
          {{ profile.githubUrl }}
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
        </a>
      </article>
    </section>
  </div>
</template>

<script setup>
import { profile } from '../data/site.js';
</script>

<style scoped>
.prose-block {
  display: grid;
  align-content: start;
  gap: 0.5rem;
}

.contact-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.body-copy {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.7;
}
</style>
