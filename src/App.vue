<template>
  <div class="app-shell">
    <Navbar />
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>
