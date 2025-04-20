<template>
  <div class="container mt-4">
    <h2>最新文章</h2>
    <div class="row">
      <div class="col-md-4" v-for="post in posts" :key="post.id">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.summary }}</p>
            <router-link class="btn btn-primary" :to="`/post/${post.id}`"
              >閱讀更多</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const posts = [
  {
    id: 1,
    title: 'Vue 是什麼？',
    summary: 'Vue 是一個漸進式 JavaScript 框架...',
  },
  {
    id: 2,
    title: '如何開始學 Vue 3？',
    summary: '入門 Vue 3 不再困難，這篇教你...',
  },
];
</script>
