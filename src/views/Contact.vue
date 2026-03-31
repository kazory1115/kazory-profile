<template>
  <div class="page-shell">
    <section class="section-block contact-grid">
      <article class="card-surface contact-card">
        <p class="eyebrow">Contact</p>
        <h1>聯絡方式</h1>
        <p class="body-copy">
          如果你要交流 PHP 後端、系統重構、Service Layer、API 設計或大型資料流程整理，可以直接寄信。
        </p>
        <a :href="`mailto:${profile.email}`" class="contact-link">{{ profile.email }}</a>
      </article>

      <article class="card-surface contact-card">
        <p class="eyebrow">Online</p>
        <h2>GitHub</h2>
        <a :href="profile.githubUrl" target="_blank" rel="noreferrer" class="contact-link">
          {{ profile.githubUrl }}
        </a>
      </article>
    </section>
  </div>
</template>

<script setup>
import { profile } from '../data/site.js';
</script>
