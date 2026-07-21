<template>
  <div class="page-shell">

    <!-- Hero -->
    <section class="section-heading">
      <p class="eyebrow">專案案例</p>
      <h1>專案與經歷</h1>
      <p class="page-lead">
        精選專案與實務經驗，涵蓋系統拆分、框架升級、效能調整與開發流程優化。
        每個項目均完整記錄背景、工程取捨與實作內容。
      </p>
    </section>

    <!-- Toolbar -->
    <section class="project-toolbar" aria-label="專案篩選工具">
      <div class="project-filter-row">
        <label class="project-search">
          <svg class="project-search__icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input v-model="query" type="search" placeholder="搜尋專案、類型或技術" id="project-search-input" />
        </label>

        <div class="project-filters">
          <label class="filter-item">
            <span>類型</span>
            <select v-model="activeCategory" id="project-category-filter">
              <option v-for="category in categories" :key="category" :value="category">
                {{ category === 'All' ? '所有類型' : category }}（{{ projectCount(category) }}）
              </option>
            </select>
          </label>
          <label class="filter-item">
            <span>技術</span>
            <select v-model="activeTechnology" id="project-tech-filter">
              <option value="All">所有技術</option>
              <option v-for="technology in technologies" :key="technology" :value="technology">{{ technology }}</option>
            </select>
          </label>
        </div>
      </div>

      <div class="project-meta" aria-live="polite">
        <span>顯示 {{ filteredProjects.length }} / {{ projects.length }} 個案例</span>
        <button v-if="hasFilters" type="button" class="clear-btn" @click="resetFilters">清除篩選</button>
      </div>
    </section>

    <!-- Projects List -->
    <section class="section-block">
      <div v-if="filteredProjects.length" class="project-list">
        <router-link
          v-for="project in filteredProjects"
          :key="project.id"
          :to="{ name: 'ProjectDetail', params: { id: project.id } }"
          class="project-item"
          :id="`project-card-${project.id}`"
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

      <div v-else class="empty-state">
        <p class="eyebrow">沒有結果</p>
        <h2>沒有符合條件的案例</h2>
        <button class="button-primary" type="button" @click="resetFilters">清除篩選</button>
      </div>
    </section>

    <!-- GitHub Repos (Clean List) -->
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">程式碼儲存庫</p>
        <h2>公開專案項目</h2>
        <p class="page-lead">日常關注的技術主題、開源實作與實驗方向。</p>
      </div>

      <div class="repo-list">
        <div
          v-for="repo in githubRepositories"
          :key="repo.name"
          class="repo-item"
          :id="`repo-${repo.name}`"
        >
          <div class="repo-item__head">
            <div class="repo-item__name">{{ repo.name }}</div>
            <div class="repo-item__desc">{{ repo.note }}</div>
          </div>
          <div class="repo-item__meta">
            <span class="repo-item__lang">{{ repo.language }}</span>
            <a :href="repo.url" target="_blank" rel="noreferrer" class="contact-link">
              GitHub
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { githubRepositories, projects } from '../data/site.js';

const query = ref('');
const activeCategory = ref('All');
const activeTechnology = ref('All');

const categories = computed(() => ['All', ...new Set(projects.map((p) => p.category))]);
const technologies = computed(() => [...new Set(projects.flatMap((p) => p.technologies))].sort());
const hasFilters = computed(
  () => Boolean(query.value.trim()) || activeCategory.value !== 'All' || activeTechnology.value !== 'All',
);
const projectCount = (cat) =>
  cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;

const filteredProjects = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return projects.filter((project) => {
    const catMatch = activeCategory.value === 'All' || project.category === activeCategory.value;
    const techMatch = activeTechnology.value === 'All' || project.technologies.includes(activeTechnology.value);
    const text = [project.title, project.description, project.category, project.technologies.join(' ')].join(' ').toLowerCase();
    return catMatch && techMatch && (!needle || text.includes(needle));
  });
});

const resetFilters = () => {
  query.value = '';
  activeCategory.value = 'All';
  activeTechnology.value = 'All';
};
</script>

<style scoped>
.project-toolbar {
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
  padding: 1.25rem 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.project-filter-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: end;
}

.project-search {
  position: relative;
  display: flex;
  align-items: center;
}

.project-search__icon {
  position: absolute;
  left: 0.75rem;
  color: var(--muted);
  pointer-events: none;
}

.project-search input {
  width: 100%;
  height: 2.25rem;
  padding: 0 0.875rem 0 2.25rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-xs);
  background: var(--surface-soft);
  color: var(--text);
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.project-search input:hover { border-color: var(--line-strong); }
.project-search input:focus { border-color: var(--accent); background: transparent; }
.project-search input::placeholder { color: var(--muted); }

.project-filters {
  display: flex;
  gap: 1rem;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 140px;
}

.filter-item span {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.filter-item select {
  height: 2.25rem;
  padding: 0 1.75rem 0 0.65rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-xs);
  background: var(--surface-soft);
  color: var(--text);
  font-size: 0.8rem;
  outline: none;
  transition: border-color 0.15s ease;
}

.filter-item select:hover { border-color: var(--line-strong); }
.filter-item select:focus { border-color: var(--accent); }

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  color: var(--muted);
}

.clear-btn {
  background: none;
  border: none;
  color: var(--accent);
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.section-block {
  margin-top: 1.5rem;
}

@media (max-width: 820px) {
  .project-filter-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .project-filters {
    flex-wrap: wrap;
  }

  .filter-item {
    flex: 1;
    min-width: 100px;
  }
}
</style>
