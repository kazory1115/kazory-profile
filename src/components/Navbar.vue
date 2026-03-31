<template>
  <header class="site-header">
    <nav class="site-nav">
      <router-link to="/" class="brand-mark">
        <span class="brand-mark__name">Kazory / Portfolio</span>
        <span class="brand-mark__role">backend engineer / case studies / technical notes</span>
      </router-link>

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
          <font-awesome-icon :icon="isDark ? 'sun' : 'moon'" />
        </button>
      </div>

      <div class="mobile-nav-actions mobile-only">
        <button
          class="theme-toggle"
          :aria-label="isDark ? '切換為淺色模式' : '切換為深色模式'"
          @click="toggleTheme"
        >
          <font-awesome-icon :icon="isDark ? 'sun' : 'moon'" />
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

    <transition name="fade">
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
    return;
  }

  root.classList.remove('dark');
  root.classList.add('light');
  localStorage.setItem('theme', 'light');
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
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.site-nav {
  min-height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.site-nav__links {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface-soft);
}

.site-nav__link,
.site-nav__mobile-link {
  border-radius: 999px;
  color: var(--muted);
  font-weight: 500;
}

.site-nav__link {
  padding: 0.7rem 1rem;
}

.site-nav__link:hover,
.site-nav__link--active {
  background: var(--surface-strong);
  color: var(--text);
}

.theme-toggle,
.menu-toggle {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.mobile-nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.menu-toggle {
  flex-direction: column;
  gap: 6px;
}

.menu-toggle span {
  width: 16px;
  height: 2px;
  background: var(--text);
  transition: transform 0.24s ease, opacity 0.24s ease;
}

.menu-toggle--active span:first-child {
  transform: translateY(4px) rotate(45deg);
}

.menu-toggle--active span:last-child {
  transform: translateY(-4px) rotate(-45deg);
}

.site-nav__mobile {
  position: fixed;
  inset: 81px 0 0;
  padding: 1rem;
  background: var(--nav-bg);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  backdrop-filter: blur(18px);
}

.site-nav__mobile-link {
  padding: 1rem 1.1rem;
  background: var(--surface-soft);
  border: 1px solid var(--line);
}

.site-nav__mobile-link--active {
  color: var(--text);
  border-color: var(--accent);
  background: var(--accent-soft);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.24s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
