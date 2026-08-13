<template>
  <div class="empty-state" role="status" aria-live="polite">
    <p class="eyebrow">{{ isError ? '載入失敗' : '載入中' }}</p>
    <h2>{{ isError ? '目前無法取得內容' : '正在整理內容…' }}</h2>
    <p v-if="isError">{{ message || '請稍後再試一次。' }}</p>
    <button v-if="isError" type="button" class="button-primary" @click="$emit('retry')">
      重新載入
    </button>
  </div>
</template>

<script setup>
defineProps({
  isError: { type: Boolean, default: false },
  message: { type: String, default: '' },
});

defineEmits(['retry']);
</script>
