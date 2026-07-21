<template>
  <div class="app-shell">
    <Navbar />
    <main class="app-main">
      <router-view v-slot="{ Component, route }">
        <transition name="page">
          <KeepAlive include="Writing,Project">
            <component :is="Component" :key="route.fullPath" />
          </KeepAlive>
        </transition>
      </router-view>
    </main>
    <footer class="site-footer">
      <div>
        <span class="eyebrow">Kazory Su</span>
        <strong>後端工程、系統重構與實作筆記。</strong>
      </div>
      <a href="mailto:jay86888688@gmail.com">jay86888688@gmail.com</a>
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>
