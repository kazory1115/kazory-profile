<template>
  <div class="home-wrapper">
    <div
      class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative"
    >
      <Particles id="tsparticles" :options="particlesOptions" />
      <div
        class="container mx-auto px-4 h-screen flex items-center relative z-10"
      >
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="text-center md:text-left">
            <h1 class="text-6xl md:text-7xl font-extrabold leading-tight mb-4">
              <span class="block">
                <span
                  v-for="(word, index) in mainTitleWords"
                  :key="index"
                  class="inline-block animate-fade-in-down"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                  >{{ word }}&nbsp;</span
                >
              </span>
              <span
                class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300"
              >
                <span
                  v-for="(word, index) in subTitleWords"
                  :key="index"
                  class="inline-block animate-fade-in-down"
                  :style="{
                    animationDelay: `${
                      mainTitleWords.length * 0.1 + index * 0.1
                    }s`,
                  }"
                  >{{ word }}&nbsp;</span
                >
              </span>
            </h1>
            <p
              class="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up animation-delay-300"
            >
              {{ description }}
            </p>
            <div
              class="flex justify-center md:justify-start space-x-4 animate-fade-in-up animation-delay-600"
            >
              <router-link
                to="/project"
                class="px-8 py-4 bg-blue-600 rounded-full text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {{ projectButtonText }}
              </router-link>
              <router-link
                to="/contact"
                class="px-8 py-4 bg-gray-700 rounded-full text-lg font-semibold hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {{ contactButtonText }}
              </router-link>
            </div>
          </div>
          <div class="hidden md:block animate-fade-in animation-delay-900">
            <img
              class="rounded-lg shadow-2xl transform hover:rotate-3 transition-transform duration-500"
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Homepage Image"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-900 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-extrabold text-white mb-12 text-center">
          精選作品
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(item, index) in featuredItems"
            :key="item.id"
            class="transform hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <ProjectItem :project="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { allItems } from '../data/items.js';
import ProjectItem from '../components/ProjectItem.vue';

const mainTitle = ref('蘇建維');
const subTitle = ref('後端工程師');
const description = ref(
  'Hi! 我是蘇建維，一位充滿熱情的網頁開發者，專注於打造高效能且使用者體驗良好的應用程式。'
);
const projectButtonText = ref('查看我的專案');
const contactButtonText = ref('聯絡我');

const featuredItems = computed(() => allItems.value.slice(0, 10));

const mainTitleWords = computed(() => mainTitle.value.split(' '));
const subTitleWords = computed(() => subTitle.value.split(' '));

const particlesOptions = ref({
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce',
      },
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: {
        min: 1,
        max: 5,
      },
    },
  },
  detectRetina: true,
});
</script>

<style scoped>
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.5s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-900 {
  animation-delay: 0.9s;
}
</style>
