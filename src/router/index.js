import { createRouter, createWebHashHistory } from 'vue-router';

// 使用路由懶加載來提升首屏載入速度
const Home = () => import('../views/Home.vue');
const About = () => import('../views/About.vue');
const Project = () => import('../views/Project.vue');
const Contact = () => import('../views/Contact.vue');
const ProjectDetail = () => import('../views/ProjectDetail.vue');
const NotFound = () => import('../views/NotFound.vue');

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/project', name: 'Project', component: Project },
  { path: '/project/:id', name: 'ProjectDetail', component: ProjectDetail },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory('/kazory-profile'), // 改成 hash 模式
  routes,
});

export default router;
