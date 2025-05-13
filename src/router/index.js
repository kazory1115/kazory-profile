import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Post from '../views/Post.vue';
import About from '../views/About.vue';
import Add from '../views/Add.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/post/:id', name: 'Post', component: Post },
  { path: '/about', name: 'About', component: About },
  { path: '/add', name: 'add', component: Add },
];

const router = createRouter({
  history: createWebHistory('/kazo/'),
  routes,
});

export default router;
