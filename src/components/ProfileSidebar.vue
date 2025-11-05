<template>
  <div class="modern-card p-8 lg:col-span-1 lg:sticky top-16 self-start">
    <div class="text-center">
      <img
        class="w-48 h-48 rounded-full mx-auto mb-6 shadow-lg border-4 border-gray-700"
        :src="profile.avatarUrl"
        :alt="profile.name"
      />
      <h1 class="text-4xl font-extrabold text-white">{{ profile.name }}</h1>
      <p class="text-xl text-orange-300 mt-2 mb-6">{{ profile.jobTitle }}</p>

      <div class="flex justify-center space-x-4 mb-6">
        <a
          v-for="social in socials"
          :key="social.name"
          :href="social.url"
          target="_blank"
          class="text-gray-400 hover:text-white transition-colors"
          :title="social.name"
        >
          <font-awesome-icon :icon="social.icon" class="text-2xl" />
        </a>
      </div>

      <div class="text-left space-y-4">
        <div>
          <h3 class="text-lg font-semibold text-orange-300">Email</h3>
          <p class="text-gray-300">{{ profile.email }}</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-orange-300">電話</h3>
          <p class="text-gray-300">{{ profile.phone }}</p>
        </div>
      </div>

      <div class="mt-8">
        <a
          :href="profile.cvUrl"
          target="_blank"
          class="inline-block w-full px-6 py-3 bg-orange-300 text-gray-900 rounded-full text-lg font-semibold text-white hover:bg-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          查看線上履歷
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { profileData, socialLinks } from '../data/profile.js';

const profile = profileData;
const socials = socialLinks;
</script>
