<template>
  <nav class="bg-gray-900 shadow-lg">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            蘇建維的作品集
          </router-link>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <router-link
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              active-class="bg-gray-800 text-white"
            >
              {{ item.text }}
            </router-link>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <button @click="isOpen = !isOpen" type="button" class="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg :class="{'hidden': isOpen, 'block': !isOpen }" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg :class="{'hidden': !isOpen, 'block': isOpen }" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div :class="{'block': isOpen, 'hidden': !isOpen}" class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          @click="isOpen = false"
          class="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
          active-class="bg-gray-800 text-white"
        >
          {{ item.text }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const navItems = [
  { to: '/', text: '首頁' },
  { to: '/project', text: '專案' },
  { to: '/about', text: '關於我' },
  { to: '/contact', text: '聯絡我' },
];
</script>
