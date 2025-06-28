<template>
  <div class="container mt-4" v-if="cardBody">
    <!-- View Mode -->
    <div v-if="!isEditing">
      <h2>文章主題：{{ post.title }}</h2>
      <div class="card mt-3 shadow-sm">
        <div class="card-body m-4">
          <div
            style="text-align: right; cursor: pointer"
            @click="enterEditMode"
          >
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

    <!-- Edit Mode -->
    <div v-else class="card m-3 p-3">
      <h2 class="mb-3">編輯文章</h2>
      <input
        type="text"
        class="form-control mb-3"
        style="width: 100%; text-align: center"
        v-model="editedTitle"
        placeholder="請輸入文章標題"
      />
      <div ref="editor" style="height: 300px"></div>
      <div class="mt-3">
        <button
          @click="updatePost"
          :disabled="isSubmitting"
          class="btn btn-primary"
        >
          更新
        </button>
        <button @click="cancelEdit" class="btn btn-secondary ms-2">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, nextTick } from 'vue';
import axios from 'axios';

const route = useRoute();
const post = ref({});
const cardBody = ref(false);
const isEditing = ref(false);
const isSubmitting = ref(false);
const editor = ref(null);
let quillInstance = null;

// Create separate refs for editing to avoid modifying the original data before saving
const editedTitle = ref('');

// Fetch post data on mount
onMounted(async () => {
  try {
    const url = `http://127.0.0.1/api/kazo/blog/posts/${route.params.id}`;
    const response = await axios.get(url);
    post.value = response.data.data;
    cardBody.value = true;
  } catch (error) {
    console.error('錯誤:', error);
    Swal.fire({
      title: '系統訊息',
      text: '文章讀取失敗',
      icon: 'error',
      timer: 1000,
      showConfirmButton: false,
    });
  }
});

// Function to enter edit mode
const enterEditMode = async () => {
  isEditing.value = true;
  editedTitle.value = post.value.title; // Copy title to the editor model

  await nextTick(); // Wait for the DOM to update
  if (editor.value) {
    quillInstance = new Quill(editor.value, {
      theme: 'snow',
    });
    quillInstance.root.innerHTML = post.value.content; // Load existing content
  }
};

// Function to cancel editing
const cancelEdit = () => {
  isEditing.value = false;
  quillInstance = null; // Clean up Quill instance
};

// Function to update the post
async function updatePost() {
  if (!quillInstance) return;
  isSubmitting.value = true;

  const html = quillInstance.root.innerHTML;

  try {
    const url = `http://127.0.0.1/api/kazo/blog/posts/${route.params.id}`;
    const response = await axios.put(url, {
      title: editedTitle.value,
      content: html,
    });

    // Update post data locally
    post.value.title = editedTitle.value;
    post.value.content = html;

    Swal.fire({
      title: '系統訊息',
      text: response.data.message,
      icon: response.data.status,
      timer: 1000,
      showConfirmButton: false,
    });

    isEditing.value = false; // Exit edit mode
    quillInstance = null; // Clean up
  } catch (error) {
    console.error('錯誤:', error);
    Swal.fire({
      title: '系統訊息',
      text: '文章更新失敗',
      icon: 'error',
      timer: 1000,
      showConfirmButton: false,
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>
