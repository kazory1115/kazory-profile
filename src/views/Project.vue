<template>
  <div class="page-shell">
    <section class="section-heading">
      <p class="eyebrow">專案案例</p>
      <h1>專案與經歷</h1>
      <p class="page-lead">
        由公開 repositories 與實務經驗整理而成，涵蓋全端系統、架構重構、資料流程、桌面工具與互動應用。
        每個項目都標明已落地內容、工程取捨與目前邊界。
      </p>
    </section>

    <FilterToolbar
      v-model:query="query"
      aria-label="專案篩選工具"
      placeholder="搜尋專案、類型或技術"
      :summary="`顯示 ${result.total} / ${result.available} 個案例`"
      :clearable="hasFilters"
      @clear="resetFilters"
    >
      <label class="filter-item">
        <span>類型</span>
        <select v-model="activeCategory">
          <option value="All">所有類型（{{ result.available }}）</option>
          <option v-for="facet in categories" :key="facet.value" :value="facet.value">
            {{ facet.value }}（{{ facet.count }}）
          </option>
        </select>
      </label>

      <label class="filter-item">
        <span>技術</span>
        <select v-model="activeTechnology">
          <option value="All">所有技術</option>
          <option v-for="facet in technologies" :key="facet.value" :value="facet.value">
            {{ facet.value }}
          </option>
        </select>
      </label>
    </FilterToolbar>

    <section class="section-block collection-results">
      <AsyncState v-if="isLoading && !result.items.length" />
      <AsyncState v-else-if="error" is-error :message="error.message" @retry="reload" />

      <div v-else-if="result.items.length" class="project-list" :aria-busy="isLoading">
        <ProjectListItem
          v-for="project in result.items"
          :key="project.id"
          :project="project"
        />
      </div>

      <div v-else class="empty-state">
        <p class="eyebrow">沒有結果</p>
        <h2>沒有符合條件的案例</h2>
        <button class="button-primary" type="button" @click="resetFilters">清除篩選</button>
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">程式碼儲存庫</p>
        <h2>公開專案項目</h2>
        <p class="page-lead">從公開 repositories 中篩選較完整、可閱讀與可驗證的作品。</p>
      </div>

      <AsyncState v-if="siteLoading" />
      <AsyncState v-else-if="siteError" is-error :message="siteError.message" @retry="reloadSite" />
      <div v-else class="repo-list">
        <div v-for="repo in repositories" :key="repo.name" class="repo-item">
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
import AsyncState from '../components/common/AsyncState.vue';
import FilterToolbar from '../components/common/FilterToolbar.vue';
import ProjectListItem from '../components/content/ProjectListItem.vue';
import { useRepositoryList } from '../composables/useRepositoryList.js';
import { useSiteContent } from '../composables/useSiteContent.js';
import { projectRepository } from '../repositories/index.js';

const emptyResult = {
  items: [],
  total: 0,
  available: 0,
  facets: { categories: [], technologies: [], statuses: [] },
};

const query = ref('');
const activeCategory = ref('All');
const activeTechnology = ref('All');

const { data: result, error, isLoading, reload } = useRepositoryList(
  [query, activeCategory, activeTechnology],
  () => projectRepository.list({
    q: query.value,
    category: activeCategory.value === 'All' ? undefined : activeCategory.value,
    technology: activeTechnology.value === 'All' ? undefined : activeTechnology.value,
  }),
  emptyResult,
);

const {
  site,
  error: siteError,
  isLoading: siteLoading,
  reload: reloadSite,
} = useSiteContent();

const categories = computed(() => result.value.facets.categories ?? []);
const technologies = computed(() => result.value.facets.technologies ?? []);
const repositories = computed(() => site.value?.githubRepositories ?? []);
const hasFilters = computed(
  () => Boolean(query.value.trim()) || activeCategory.value !== 'All' || activeTechnology.value !== 'All',
);

const resetFilters = () => {
  query.value = '';
  activeCategory.value = 'All';
  activeTechnology.value = 'All';
};
</script>

<style scoped>
.collection-results {
  margin-top: 1.5rem;
}
</style>
