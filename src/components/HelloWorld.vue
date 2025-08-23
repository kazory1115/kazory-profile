<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1 class="text-3xl font-bold mb-4">{{ msg }}</h1>

  <div class="p-4 border rounded-lg shadow-lg">
    <button type="button" @click="count++" class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
      count is {{ count }}
    </button>
    <p class="mt-2">
      Edit
      <code class="px-2 py-1 font-mono text-sm bg-gray-200 rounded">components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p class="mt-4">
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank" class="text-blue-500 hover:underline"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p class="mt-2">
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      class="text-blue-500 hover:underline"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="mt-2 text-gray-500">Click on the Vite and Vue logos to learn more</p>
</template>