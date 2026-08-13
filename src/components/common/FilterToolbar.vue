<template>
  <section class="content-toolbar" :aria-label="ariaLabel">
    <div class="content-filter-row">
      <label class="content-search">
        <svg class="content-search__icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input v-model="query" type="search" :placeholder="placeholder" :aria-label="placeholder" />
      </label>

      <div class="content-filters">
        <slot />
      </div>
    </div>

    <div class="content-meta" aria-live="polite">
      <span>{{ summary }}</span>
      <button v-if="clearable" type="button" class="clear-btn" @click="$emit('clear')">
        清除條件
      </button>
    </div>
  </section>
</template>

<script setup>
const query = defineModel('query', { type: String, default: '' });

defineProps({
  ariaLabel: { type: String, required: true },
  placeholder: { type: String, required: true },
  summary: { type: String, required: true },
  clearable: { type: Boolean, default: false },
});

defineEmits(['clear']);
</script>
