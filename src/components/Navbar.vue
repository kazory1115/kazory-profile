<template>
  <header class="site-header">
    <nav class="site-nav">
      <router-link to="/" class="brand-mark">
        <span>
          <span class="brand-mark__name">Kazory</span>
          <span class="brand-mark__role">後端工程師</span>
        </span>
      </router-link>

      <!-- Desktop -->
      <div class="site-nav__links desktop-only">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="site-nav__link"
          active-class="site-nav__link--active"
        >
          {{ item.text }}
        </router-link>

        <button
          class="theme-toggle"
          :aria-label="isDark ? '切換為淺色模式' : '切換為深色模式'"
          @click="toggleTheme"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        </button>
      </div>

      <!-- Mobile -->
      <div class="mobile-nav-actions mobile-only">
        <button
          class="theme-toggle"
          :aria-label="isDark ? '切換為淺色模式' : '切換為深色模式'"
          @click="toggleTheme"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        </button>
        <button
          type="button"
          class="menu-toggle"
          :class="{ 'menu-toggle--active': isOpen }"
          :aria-expanded="isOpen"
          aria-label="開啟選單"
          @click="isOpen = !isOpen"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <transition name="slide">
      <div v-if="isOpen" class="site-nav__mobile mobile-only">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="site-nav__mobile-link"
          active-class="site-nav__mobile-link--active"
          @click="isOpen = false"
        >
          {{ item.text }}
        </router-link>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { navItems } from '../data/site.js';

const isOpen = ref(false);
const isDark = ref(true);

const updateTheme = () => {
  const root = document.documentElement;
  if (isDark.value) {
    root.classList.remove('light');
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
  }
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDark.value = savedTheme ? savedTheme === 'dark' : prefersDark;
  updateTheme();
});
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--nav-bg);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.site-nav {
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.site-nav__links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.site-nav__link {
  position: relative;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--muted);
  transition: color 0.15s ease, background-color 0.15s ease;
}

.site-nav__link:hover,
.site-nav__link--active {
  color: var(--text);
  background: var(--surface-soft);
}

.site-nav__link--active {
  color: var(--text);
}

.theme-toggle,
.menu-toggle {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line);
  background: transparent;
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease;
  margin-left: 0.5rem;
}

.theme-toggle:hover,
.menu-toggle:hover {
  border-color: var(--line-strong);
  color: var(--text);
  background: var(--surface-soft);
}

.mobile-nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.menu-toggle {
  flex-direction: column;
  gap: 5px;
  margin-left: 0;
}

.menu-toggle span {
  width: 14px;
  height: 1.5px;
  background: currentColor;
  transition: transform 0.22s ease, opacity 0.22s ease;
  border-radius: 2px;
}

.menu-toggle--active span:first-child {
  transform: translateY(3.25px) rotate(45deg);
}

.menu-toggle--active span:last-child {
  transform: translateY(-3.25px) rotate(-45deg);
}

.site-nav__mobile {
  position: fixed;
  inset: 4rem 0 0;
  padding: 1rem;
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-top: 1px solid var(--line);
}

.site-nav__mobile-link {
  padding: 0.875rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  font-weight: 500;
  color: var(--muted);
  transition: color 0.15s ease, background-color 0.15s ease;
}

.site-nav__mobile-link:hover,
.site-nav__mobile-link--active {
  color: var(--text);
  background: var(--surface-soft);
}

/* Slide transition */
.slide-enter-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
}

@media (max-width: 767px) {
  .desktop-only {
    display: none;
  }
}
</style>
