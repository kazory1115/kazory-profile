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
        <span class="eyebrow">{{ profile.englishName }}</span>
        <strong>後端工程、系統重構與實作筆記。</strong>
      </div>
      <a v-if="profile.email" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Navbar from './components/Navbar.vue';
import { useSiteContent } from './composables/useSiteContent.js';

const { site } = useSiteContent();
const profile = computed(() => site.value?.profile ?? {});
</script>
