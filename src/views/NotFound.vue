<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <div class="modern-card p-12">
        <svg class="h-20 w-20 text-orange-300 mx-auto mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 class="text-4xl font-bold text-white mb-4">404 - 頁面不存在</h1>
        <p class="text-xl text-gray-400 mb-8">
          抱歉，您要找的頁面不存在。
        </p>
        <router-link
          to="/"
          class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-300 hover:bg-orange-400 transition-colors duration-300"
        >
          返回首頁
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for this simple component
</script>
