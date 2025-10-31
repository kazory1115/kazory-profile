import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Project from '../views/Project.vue';
import Contact from '../views/Contact.vue';
import ProjectDetail from '../views/ProjectDetail.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/project', name: 'Project', component: Project },
  { path: '/project/:id', name: 'ProjectDetail', component: ProjectDetail },
  { path: '/contact', name: 'Contact', component: Contact },
];

const router = createRouter({
  history: createWebHashHistory('/kazory-profile'), // 改成 hash 模式
  routes,
});

export default router;
