import { createRouter, createWebHashHistory } from 'vue-router';

const Home = () => import('../views/Home.vue');
const About = () => import('../views/About.vue');
const Project = () => import('../views/Project.vue');
const ProjectDetail = () => import('../views/ProjectDetail.vue');
const Writing = () => import('../views/Writing.vue');
const WritingDetail = () => import('../views/WritingDetail.vue');
const NotFound = () => import('../views/NotFound.vue');

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/project', name: 'Project', component: Project },
  { path: '/project/:id', name: 'ProjectDetail', component: ProjectDetail },
  { path: '/writing', name: 'Writing', component: Writing },
  { path: '/writing/:slug', name: 'WritingDetail', component: WritingDetail },
  { path: '/contact', redirect: '/about' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory('/kazory-profile'),
  routes,
});

export default router;
