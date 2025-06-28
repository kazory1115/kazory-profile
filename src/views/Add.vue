<template>
  <div class="card m-3 p-3">
    <!-- 標題 -->
    <h2 class="mb-3">新增文章</h2>

    <input
      type="text"
      class="mb-3"
      style="width: 100%; text-align: center"
      v-model="title"
      placeholder="請輸入文章標題"
    />

    <!-- 這個 div 是 Quill 編輯器會被掛載（render）的地方 -->
    <div ref="editor" style="height: 300px"></div>

    <!-- 按鈕：按下去會觸發 submit() 方法 -->
    <button
      id="saveSubmit"
      class="mt-3"
      @click="submit"
      :disabled="isSubmitting"
    >
      送出
    </button>
  </div>
</template>

<script setup>
// 引入 Vue 的 onMounted（生命週期）、ref（響應式變數）
import { onMounted, ref } from 'vue';
import axios from 'axios';

// 建立一個用來指向編輯器區塊的變數，綁定到 template 中的 ref="editor"
const editor = ref(null); // 這個變數會在編輯器掛載後被賦值
const title = ref(''); // 用來儲存文章標題的變數
const isSubmitting = ref(false); // 用來控制按鈕是否禁用
let quillInstance = null; // 用來儲存 Quill 編輯器的實例

// 當元件掛載完成後執行（onMounted 是 Vue 的生命週期函式）
onMounted(() => {
  // 建立一個 Quill 編輯器實例，並綁定到上面的 editor DOM 元素
  quillInstance = new Quill(editor.value, {
    theme: 'snow', // 使用 Quill 預設的白色主題
  });
});

async function submit() {
  isSubmitting.value = true; // 鎖定按鈕 防止連點

  // 取得編輯器內的 HTML 內容（包含標籤）
  const html = quillInstance.root.innerHTML;
  const dbtitle = title.value;
  // 將內容印出到開發者控制台
  console.log('輸出內容:', html);
  try {
    const response = await axios.post('http://127.0.0.1/api/kazo/blog/posts', {
      title: dbtitle,
      content: html,
    });
    Swal.fire({
      title: '系統訊息',
      text: response.data.message,
      icon: response.data.status,
      timer: 1000,
      showConfirmButton: false, // Hide the OK button
    });
  } catch (error) {
    console.error('錯誤:', error);
    Swal.fire({
      title: '系統訊息',
      text: '新增文章失敗',
      icon: 'error',
      timer: 1000,
      showConfirmButton: false, // Hide the OK button
    });
  } finally {
    // 不論成功或失敗，都會重新啟用按鈕
    isSubmitting.value = false;
  }
}
</script>
