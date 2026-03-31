<template>
  <div class="page-shell">
    <div v-if="project" class="detail-shell">
      <router-link to="/project" class="back-link">回到 Projects</router-link>

      <article class="card-surface project-detail">
        <header class="detail-header">
          <p class="card-kicker">{{ project.category }}</p>
          <h1>{{ project.title }}</h1>
          <p class="section-code">Project Summary</p>
          <p class="body-copy">{{ project.description }}</p>
          <div class="tag-list">
            <span v-for="tech in project.technologies" :key="tech">{{ tech }}</span>
          </div>
        </header>

        <section class="project-detail__section">
          <p class="section-code">01 / Project Context</p>
          <p>{{ project.context }}</p>
        </section>

        <section class="project-detail__section">
          <p class="section-code">02 / Engineering Challenge</p>
          <p>{{ project.challenge }}</p>
        </section>

        <section class="project-detail__section">
          <p class="section-code">03 / Key Contributions</p>
          <ul class="plain-list">
            <li v-for="item in project.work" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="project-detail__section">
          <p class="section-code">04 / Outcomes & Takeaways</p>
          <ul class="plain-list">
            <li v-for="item in project.takeaway" :key="item">{{ item }}</li>
          </ul>
        </section>

        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          rel="noreferrer"
          class="button-primary"
        >
          View Repository
        </a>
      </article>
    </div>

    <div v-else class="empty-state card-surface">
      <p class="eyebrow">404</p>
      <h1>找不到這個專案。</h1>
      <p>請回到專案列表重新選擇。</p>
      <router-link to="/project" class="button-primary">返回 Projects</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { projects } from '../data/site.js';

const route = useRoute();

const project = computed(() => projects.find((item) => item.id === Number(route.params.id)));
</script>
