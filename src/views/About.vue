<template>
  <div class="page-shell">
    <section class="page-hero--split">
      <div class="section-heading">
        <p class="eyebrow">About</p>
        <h1>專注於後端工程、系統重構與可維護架構設計。</h1>
        <p class="page-lead">
          主要技術棧為 PHP、CodeIgniter、Laravel、MySQL 與 Vue 3。
          實作上重視分層清晰、資料流穩定與需求持續疊加後的維護成本。
        </p>
      </div>

      <aside class="card-surface sticky-card">
        <p class="eyebrow">Snapshot</p>
        <div class="summary-list">
          <div class="summary-list__item">
            <span>Role</span>
            <strong>{{ profile.title }} / {{ profile.location }}</strong>
          </div>
          <div class="summary-list__item">
            <span>Primary stack</span>
            <strong>PHP、CodeIgniter、Laravel、MySQL、Vue 3、Docker</strong>
          </div>
          <div class="summary-list__item">
            <span>Focus</span>
            <strong>Refactoring、Service Layer、API 設計、大型資料處理</strong>
          </div>
        </div>
      </aside>
    </section>

    <section class="section-block split-grid">
      <article class="card-surface prose-card">
        <p class="eyebrow">Summary</p>
        <p v-for="paragraph in profile.summary" :key="paragraph" class="body-copy">
          {{ paragraph }}
        </p>
      </article>

      <aside class="card-surface profile-card">
        <p class="eyebrow">Principles</p>
        <ul class="plain-list">
          <li v-for="item in engineeringPrinciples" :key="item">{{ item }}</li>
        </ul>
      </aside>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Journey</p>
        <h2>從既有系統整理、框架升級到 side project 驗證，持續累積可重複套用的工程方法。</h2>
      </div>
      <div class="timeline">
        <article v-for="item in journey" :key="item.title" class="card-surface journey-card">
          <p class="card-kicker">{{ item.period }}</p>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Stack</p>
        <h2>技術能力涵蓋後端實作、資料庫與基礎設施，以及日常開發工具鏈。</h2>
      </div>
      <div class="stack-grid">
        <article v-for="group in skillGroups" :key="group.title" class="card-surface simple-card">
          <p class="section-code">{{ group.title }}</p>
          <div class="tag-list">
            <span v-for="item in group.items" :key="item">{{ item }}</span>
          </div>
        </article>
      </div>
    </section>

    <section class="section-block contact-grid">
      <article class="card-surface contact-card">
        <p class="eyebrow">Contact</p>
        <h2>如需交流後端架構、重構策略或大型資料流程處理，歡迎直接聯絡。</h2>
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
import { engineeringPrinciples, journey, profile, skillGroups } from '../data/site.js';
</script>
