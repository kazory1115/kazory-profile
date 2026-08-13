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

        <ThemeToggle />
      </div>

      <!-- Mobile -->
      <div class="mobile-nav-actions mobile-only">
        <ThemeToggle />
        <button
          type="button"
          class="menu-toggle"
          :class="{ 'menu-toggle--active': isOpen }"
          :aria-expanded="isOpen"
          aria-controls="mobile-navigation"
          :aria-label="isOpen ? '關閉選單' : '開啟選單'"
          @click="isOpen = !isOpen"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  </header>

  <Teleport to="body">
    <transition name="slide">
      <div
        v-if="isOpen"
        id="mobile-navigation"
        class="site-nav__mobile mobile-only"
        @click.self="closeMenu"
      >
        <nav class="site-nav__mobile-inner" aria-label="手機版主要導覽">
          <router-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="site-nav__mobile-link"
            active-class="site-nav__mobile-link--active"
            @click="closeMenu"
          >
            {{ item.text }}
          </router-link>
        </nav>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useSiteContent } from '../composables/useSiteContent.js';
import ThemeToggle from './layout/ThemeToggle.vue';

const isOpen = ref(false);
const { site } = useSiteContent();
const navItems = computed(() => site.value?.navigation ?? []);

const closeMenu = () => {
  isOpen.value = false;
};

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
};

const handleViewportChange = () => {
  if (window.innerWidth >= 768) {
    closeMenu();
  }
};

watch(isOpen, (open) => {
  document.body.classList.toggle('mobile-menu-open', open);
});

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('resize', handleViewportChange);
});

onBeforeUnmount(() => {
  document.body.classList.remove('mobile-menu-open');
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('resize', handleViewportChange);
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
  z-index: 99;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
  background: var(--bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--line);
}

.site-nav__mobile-inner {
  width: min(var(--container-width), calc(100% - 3rem));
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.site-nav__mobile-link {
  display: flex;
  align-items: center;
  min-height: 3.25rem;
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

:global(body.mobile-menu-open) {
  overflow: hidden;
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
