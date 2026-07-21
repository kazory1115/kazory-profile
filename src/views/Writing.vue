<template>
  <div class="page-shell">

    <!-- Hero -->
    <section class="section-heading">
      <p class="eyebrow">技術文章</p>
      <h1>技術筆記</h1>
      <p class="page-lead">
        內容以實作問題整理為主，包含系統拆分、效能瓶頸、通訊選型與開發環境配置。
        方便快速回看具體技術決策。
      </p>
    </section>

    <!-- Toolbar -->
    <section class="writing-toolbar" aria-label="文章篩選工具">
      <div class="writing-filter-row">
        <label class="writing-search">
          <svg class="writing-search__icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input v-model="query" type="search" placeholder="搜尋標題、內文或技術" id="writing-search-input" />
        </label>

        <div class="writing-filters">
          <label class="filter-item">
            <span>分類</span>
            <select v-model="activeCategory" id="writing-category-filter">
              <option v-for="category in categories" :key="category" :value="category">
                {{ category === 'All' ? '所有分類' : category }}（{{ categoryCount(category) }}）
              </option>
            </select>
          </label>
          <label class="filter-item">
            <span>標籤</span>
            <select v-model="activeTag" id="writing-tag-filter">
              <option value="All">所有標籤</option>
              <option v-for="tag in tags" :key="tag" :value="tag">#{{ tag }}</option>
            </select>
          </label>
          <label class="filter-item">
            <span>排序</span>
            <select v-model="sortOrder" id="writing-sort-filter">
              <option value="newest">最新優先</option>
              <option value="oldest">最舊優先</option>
              <option value="title">標題排序</option>
            </select>
          </label>
        </div>
      </div>

      <div class="writing-meta" aria-live="polite">
        <span>找到 {{ filteredWritings.length }} 篇，共 {{ writings.length }} 篇</span>
        <button v-if="hasFilters" type="button" class="clear-btn" @click="resetFilters">清除條件</button>
      </div>
    </section>

    <!-- List -->
    <section class="section-block">
      <div v-if="filteredWritings.length" class="writing-list">
        <router-link
          v-for="note in filteredWritings"
          :key="note.slug"
          :to="{ name: 'WritingDetail', params: { slug: note.slug } }"
          class="writing-item"
          :id="`writing-card-${note.slug}`"
        >
          <span class="writing-item__date">{{ note.date }}</span>
          <span class="writing-item__title">{{ note.title }}</span>
          <div class="writing-item__meta">
            <span class="writing-item__category">{{ note.category }}</span>
          </div>
        </router-link>
      </div>

      <div v-else class="empty-state">
        <p class="eyebrow">沒有結果</p>
        <h2>沒有符合條件的文章</h2>
        <button class="button-primary" @click="resetFilters">清除篩選</button>
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { writings } from '../data/site.js';

const query = ref('');
const activeCategory = ref('All');
const activeTag = ref('All');
const sortOrder = ref('newest');

const categories = computed(() => ['All', ...new Set(writings.map((n) => n.category))]);
const tags = computed(() => [...new Set(writings.flatMap((n) => n.tags))].sort());
const hasFilters = computed(
  () => Boolean(query.value.trim()) || activeCategory.value !== 'All' || activeTag.value !== 'All',
);
const categoryCount = (cat) =>
  cat === 'All' ? writings.length : writings.filter((n) => n.category === cat).length;

const filteredWritings = computed(() => {
  const needle = query.value.trim().toLowerCase();
  const result = writings.filter((note) => {
    const catMatch = activeCategory.value === 'All' || note.category === activeCategory.value;
    const tagMatch = activeTag.value === 'All' || note.tags.includes(activeTag.value);
    const text = [note.title, note.excerpt, note.category, note.tags.join(' '), note.rawContent]
      .join(' ')
      .toLowerCase();
    return catMatch && tagMatch && (!needle || text.includes(needle));
  });
  return [...result].sort((a, b) =>
    sortOrder.value === 'oldest'
      ? a.date.localeCompare(b.date)
      : sortOrder.value === 'title'
        ? a.title.localeCompare(b.title, 'zh-Hant')
        : b.date.localeCompare(a.date),
  );
});

const resetFilters = () => {
  query.value = '';
  activeCategory.value = 'All';
  activeTag.value = 'All';
};
</script>

<style scoped>
/* Toolbar */
.writing-toolbar {
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
  padding: 1.25rem 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.writing-filter-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: end;
}

.writing-search {
  position: relative;
  display: flex;
  align-items: center;
}

.writing-search__icon {
  position: absolute;
  left: 0.75rem;
  color: var(--muted);
  pointer-events: none;
}

.writing-search input {
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

.writing-search input:hover { border-color: var(--line-strong); }
.writing-search input:focus { border-color: var(--accent); background: transparent; }
.writing-search input::placeholder { color: var(--muted); }

.writing-filters {
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

.writing-meta {
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
  .writing-filter-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .writing-filters {
    flex-wrap: wrap;
  }

  .filter-item {
    flex: 1;
    min-width: 100px;
  }
}
</style>
