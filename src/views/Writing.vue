<template>
  <div class="page-shell">
    <section class="section-heading">
      <p class="eyebrow">技術文章</p>
      <h1>技術筆記</h1>
      <p class="page-lead">
        內容以實作問題整理為主，包含系統拆分、效能瓶頸、通訊選型與開發環境配置。
        方便快速回看具體技術決策。
      </p>
    </section>

    <FilterToolbar
      v-model:query="query"
      aria-label="文章篩選工具"
      placeholder="搜尋標題、內文或技術"
      :summary="`找到 ${result.total} 篇，共 ${result.available} 篇已發布文章`"
      :clearable="hasFilters"
      @clear="resetFilters"
    >
      <label class="filter-item">
        <span>分類</span>
        <select v-model="activeCategory">
          <option value="All">所有分類（{{ result.available }}）</option>
          <option v-for="facet in categories" :key="facet.value" :value="facet.value">
            {{ facet.value }}（{{ facet.count }}）
          </option>
        </select>
      </label>

      <label class="filter-item">
        <span>標籤</span>
        <select v-model="activeTag">
          <option value="All">所有標籤</option>
          <option v-for="facet in tags" :key="facet.value" :value="facet.value">#{{ facet.value }}</option>
        </select>
      </label>

      <label class="filter-item">
        <span>排序</span>
        <select v-model="sortOrder">
          <option value="newest">最新優先</option>
          <option value="oldest">最舊優先</option>
          <option value="title">標題排序</option>
        </select>
      </label>
    </FilterToolbar>

    <section class="section-block collection-results">
      <AsyncState v-if="isLoading && !result.items.length" />
      <AsyncState v-else-if="error" is-error :message="error.message" @retry="reload" />

      <div v-else-if="result.items.length" class="writing-list" :aria-busy="isLoading">
        <WritingListItem
          v-for="writing in result.items"
          :key="writing.slug"
          :writing="writing"
        />
      </div>

      <div v-else class="empty-state">
        <p class="eyebrow">沒有結果</p>
        <h2>沒有符合條件的文章</h2>
        <button type="button" class="button-primary" @click="resetFilters">清除篩選</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import AsyncState from '../components/common/AsyncState.vue';
import FilterToolbar from '../components/common/FilterToolbar.vue';
import WritingListItem from '../components/content/WritingListItem.vue';
import { useRepositoryList } from '../composables/useRepositoryList.js';
import { writingRepository } from '../repositories/index.js';

const emptyResult = {
  items: [],
  total: 0,
  available: 0,
  facets: { categories: [], tags: [], statuses: [] },
};

const query = ref('');
const activeCategory = ref('All');
const activeTag = ref('All');
const sortOrder = ref('newest');

const { data: result, error, isLoading, reload } = useRepositoryList(
  [query, activeCategory, activeTag, sortOrder],
  () => writingRepository.list({
    q: query.value,
    category: activeCategory.value === 'All' ? undefined : activeCategory.value,
    tag: activeTag.value === 'All' ? undefined : activeTag.value,
    sort: sortOrder.value,
  }),
  emptyResult,
);

const categories = computed(() => result.value.facets.categories ?? []);
const tags = computed(() => result.value.facets.tags ?? []);
const hasFilters = computed(
  () => Boolean(query.value.trim())
    || activeCategory.value !== 'All'
    || activeTag.value !== 'All'
    || sortOrder.value !== 'newest',
);

const resetFilters = () => {
  query.value = '';
  activeCategory.value = 'All';
  activeTag.value = 'All';
  sortOrder.value = 'newest';
};
</script>

<style scoped>
.collection-results {
  margin-top: 1.5rem;
}
</style>
