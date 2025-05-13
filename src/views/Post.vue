<template>
  <div class="container mt-4" v-if="cardBody">
    <h2>文章主題：{{ post.title }}</h2>

    <div class="card mt-3 shadow-sm">
      <div class="card-body m-4">
        <div style="text-align: right">
          <font-awesome-icon icon="pen" />
        </div>

        <div
          v-html="post.content"
          class="post-content"
          style="text-align: left; font-size: 1.1rem; line-height: 1.8"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const route = useRoute(); // 讀取路由
const post = ref({});
const cardBody = ref({});
cardBody.value = false;

onMounted(async () => {
  // 用了 await，記得把 onMounted 的回呼函式標記成 async
  try {
    let url = 'http://127.0.0.1/api/posts/' + route.params.id;
    const response = await axios.get(url);
    post.value = response.data.data;
    cardBody.value = true;
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
