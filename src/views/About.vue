<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-3 lg:gap-8">
        <div class="lg:col-span-1">
          <div class="px-4 sm:px-0">
            <h2 class="text-3xl font-extrabold text-gray-900">關於我</h2>
            <div class="mt-4">
              <img class="h-48 w-48 rounded-full mx-auto" src="https://picsum.photos/seed/avatar/300/300" alt="Your Name">
              <h3 class="mt-6 text-xl font-semibold text-gray-900 text-center">[你的名字]</h3>
              <p class="mt-1 text-base text-gray-500 text-center">網頁開發者</p>
            </div>
          </div>
        </div>
        <div class="mt-12 lg:mt-0 lg:col-span-2">
          <div class="prose prose-indigo prose-lg text-gray-500 mx-auto">
            <p>我是一名充滿熱情的網頁開發人員，擁有 [年資] 年的經驗。我專注於使用 Vue.js、React 和 Node.js 等現代技術來建構高效能的 Web 應用程式。</p>
            <p>我熱衷於學習新技術，並將其應用於解決實際問題。我相信，一個好的產品不僅要有強大的功能，還要有良好的使用者體驗。</p>
          </div>
          <div class="mt-10">
            <h3 class="text-lg font-medium text-gray-900">我的技能</h3>
            <div class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <h4 class="text-base font-medium text-gray-900">前端</h4>
                <ul class="mt-4 space-y-4">
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <font-awesome-icon :icon="['fab', 'vuejs']" class="text-2xl text-green-500" />
                    </div>
                    <p class="ml-3 text-base text-gray-500">Vue.js</p>
                  </li>
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <font-awesome-icon :icon="['fab', 'react']" class="text-2xl text-blue-500" />
                    </div>
                    <p class="ml-3 text-base text-gray-500">React</p>
                  </li>
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <font-awesome-icon :icon="['fab', 'js-square']" class="text-2xl text-yellow-500" />
                    </div>
                    <p class="ml-3 text-base text-gray-500">JavaScript</p>
                  </li>
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <font-awesome-icon :icon="['fab', 'html5']" class="text-2xl text-orange-500" />
                    </div>
                    <p class="ml-3 text-base text-gray-500">HTML5</p>
                  </li>
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <font-awesome-icon :icon="['fab', 'css3-alt']" class="text-2xl text-blue-500" />
                    </div>
                    <p class="ml-3 text-base text-gray-500">CSS3</p>
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="text-base font-medium text-gray-900">後端</h4>
                <ul class="mt-4 space-y-4">
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <font-awesome-icon :icon="['fab', 'node-js']" class="text-2xl text-green-500" />
                    </div>
                    <p class="ml-3 text-base text-gray-500">Node.js</p>
                  </li>
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <font-awesome-icon :icon="['fab', 'laravel']" class="text-2xl text-red-500" />
                    </div>
                    <p class="ml-3 text-base text-gray-500">Laravel</p>
                  </li>
                </ul>
                <h4 class="mt-8 text-base font-medium text-gray-900">資料庫</h4>
                <ul class="mt-4 space-y-4">
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <font-awesome-icon :icon="['fas', 'database']" class="text-2xl text-gray-500" />
                    </div>
                    <p class="ml-3 text-base text-gray-500">MySQL</p>
                  </li>
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <font-awesome-icon :icon="['fas', 'database']" class="text-2xl text-green-500" />
                    </div>
                    <p class="ml-3 text-base text-gray-500">MongoDB</p>
                  </li>
                </ul>
                <h4 class="mt-8 text-base font-medium text-gray-900">其他</h4>
                <ul class="mt-4 space-y-4">
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <font-awesome-icon :icon="['fab', 'git-alt']" class="text-2xl text-red-500" />
                    </div>
                    <p class="ml-3 text-base text-gray-500">Git</p>
                  </li>
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <font-awesome-icon :icon="['fab', 'docker']" class="text-2xl text-blue-500" />
                    </div>
                    <p class="ml-3 text-base text-gray-500">Docker</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
