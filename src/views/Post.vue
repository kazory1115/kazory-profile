<template>
  <div class="container mt-4">
    <h2>文章內容：{{ post.title }}</h2>
    <p>{{ post.content }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const post = {
  title: `文章 #${route.params.id}`,
  content: '這是文章的詳細內容。你可以從 API 抓取真正的資料。',
};
</script>
