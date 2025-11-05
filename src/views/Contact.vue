<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-2xl w-full space-y-8">
      <div class="text-center">
        <h2 class="text-4xl font-extrabold text-white">
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-400"
          >
            聯絡我
          </span>
        </h2>
        <p class="mt-4 text-lg text-gray-400">
          有任何問題或合作機會？歡迎隨時與我聯繫！
        </p>
      </div>

      <!-- 聯絡資訊 -->
      <div class="modern-card p-8 space-y-6">
        <div class="space-y-4">
          <!-- Email -->
          <div class="flex items-start space-x-4">
            <div
              class="flex-shrink-0 w-12 h-12 bg-orange-300/10 rounded-lg flex items-center justify-center"
            >
              <font-awesome-icon
                :icon="['fas', 'envelope']"
                class="text-orange-300 text-xl"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white mb-1">電子郵件</h3>
              <a
                :href="`mailto:${contactInfo.email}`"
                class="text-orange-300 hover:text-orange-400 transition-colors"
              >
                {{ contactInfo.email }}
              </a>
            </div>
          </div>

          <!-- Phone -->
          <div class="flex items-start space-x-4">
            <div
              class="flex-shrink-0 w-12 h-12 bg-orange-300/10 rounded-lg flex items-center justify-center"
            >
              <font-awesome-icon
                :icon="['fas', 'phone']"
                class="text-orange-300 text-xl"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white mb-1">電話</h3>
              <a
                :href="`tel:${contactInfo.phone}`"
                class="text-gray-300 hover:text-white transition-colors"
              >
                {{ contactInfo.phone }}
              </a>
            </div>
          </div>

          <!-- Location -->
          <div class="flex items-start space-x-4">
            <div
              class="flex-shrink-0 w-12 h-12 bg-orange-300/10 rounded-lg flex items-center justify-center"
            >
              <font-awesome-icon
                :icon="['fas', 'map-marker-alt']"
                class="text-orange-300 text-xl"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white mb-1">位置</h3>
              <p class="text-gray-300">{{ contactInfo.location }}</p>
            </div>
          </div>
        </div>

        <!-- 社群連結 -->
        <div class="pt-6 border-t border-gray-700">
          <h3 class="text-lg font-semibold text-white mb-4 text-center">
            社群連結
          </h3>
          <div class="flex justify-center space-x-6">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-orange-300 transition-colors transform hover:scale-110 duration-300"
              :title="social.name"
            >
              <font-awesome-icon :icon="social.icon" class="text-3xl" />
            </a>
          </div>
        </div>

        <!-- Mailto 按鈕 -->
        <div class="pt-4">
          <a
            :href="`mailto:${contactInfo.email}?subject=透過作品集網站聯繫`"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-orange-300 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 transform hover:scale-105 transition-all duration-300"
          >
            <font-awesome-icon :icon="['fas', 'paper-plane']" class="mr-2" />
            寄送電子郵件
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { profileData, socialLinks } from '../data/profile.js';

const contactInfo = {
  email: profileData.value.email,
  phone: profileData.value.phone,
  location: '台灣',
};

const socials = socialLinks.value;
</script>