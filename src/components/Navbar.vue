<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-bgcolor">
    <div class="container-fluid">
      <router-link class="navbar-brand nav-link" to="/">
        Kazo的部落格
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="切換導航"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.path === '/' }"
              to="/"
            >
              首頁
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'Post', params: { id: 1 } }"
            >
              文章
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.path === '/about' }"
              to="/about"
            >
              關於我
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// 無需 JS 控制，Bootstrap 的漢堡選單是靠 data-bs-* 自動控制的
</script>

<style scoped>
/* 可加一些小調整 */
</style>
