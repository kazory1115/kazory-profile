<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full space-y-8">
      <div class="text-center">
        <h2 class="text-4xl font-extrabold text-white">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">聯絡我</span>
        </h2>
        <p class="mt-4 text-lg text-gray-400">有任何問題或合作機會？歡迎隨時與我聯繫！</p>
      </div>
      <div class="modern-card p-8 space-y-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label for="name" class="text-sm font-medium text-gray-400">姓名</label>
            <input type="text" v-model="form.name" name="name" id="name" autocomplete="name" required 
                   class="mt-1 block w-full px-4 py-3 bg-gray-700 border-transparent rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-600">
          </div>
          <div>
            <label for="email" class="text-sm font-medium text-gray-400">電子郵件</label>
            <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required 
                   class="mt-1 block w-full px-4 py-3 bg-gray-700 border-transparent rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-600">
          </div>
          <div>
            <label for="message" class="text-sm font-medium text-gray-400">訊息</label>
            <textarea id="message" v-model="form.message" name="message" rows="5" required 
                      class="mt-1 block w-full px-4 py-3 bg-gray-700 border-transparent rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-600"></textarea>
          </div>
          <div>
            <button type="submit" 
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-transform duration-300">
              送出訊息
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: '',
});

const submitForm = () => {
  // In a real application, you would send the form data to a server
  console.log('Form submitted:', form.value);
  alert('感謝您的訊息，我會盡快回覆您！');
  form.value = {
    name: '',
    email: '',
    message: '',
  };
};
</script>