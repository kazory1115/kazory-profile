<template>
  <router-link
    :to="{ name: 'WritingDetail', params: { slug: writing.slug } }"
    class="writing-item"
  >
    <span class="writing-item__date">{{ writing.publishedAt }}</span>
    <span class="writing-item__title">{{ writing.title }}</span>
    <div class="writing-item__meta">
      <span class="writing-item__category">{{ writing.category }}</span>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  writing: { type: Object, required: true },
});
</script>
