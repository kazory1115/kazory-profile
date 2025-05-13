<template>
  <div class="container mt-4">
    <h2>最新文章</h2>
    <div class="row">
      <div class="col-md-4" v-for="post in posts" :key="post.id">
        <div class="card mb-3">
          <!-- d-flex flex-column 讓子項目垂直排列 -->
          <div class="card-body d-flex flex-column" style="height: 200px">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.summary + ' ...' }}</p>
            <router-link
              class="btn btn-primary mt-auto"
              :to="`/post/${post.id}`"
              >閱讀更多</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 用來儲存後端取得的資料
const posts = ref([]);
// 當元件掛載完成後執行（onMounted 是 Vue 的生命週期函式）
onMounted(async () => {
  // 用了 await，記得把 onMounted 的回呼函式標記成 async
  try {
    const response = await axios.get('http://127.0.0.1/api/posts');
    posts.value = response.data.data;
  } catch (error) {
    console.error('錯誤:', error);
    Swal.fire({
      title: '系統訊息',
      text: '讀取失敗',
      icon: 'error',
      timer: 1000,
      showConfirmButton: false, // Hide the OK button
    });
  }
});
</script>
