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
  { path: '/project/:id', name: 'ProjectDetail', component: ProjectDetail, meta: { scrollToTop: true } },
  { path: '/writing', name: 'Writing', component: Writing },
  { path: '/writing/:slug', name: 'WritingDetail', component: WritingDetail, meta: { scrollToTop: true } },
  { path: '/contact', redirect: '/about' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition && !to.meta.scrollToTop) {
      return savedPosition;
    }

    if (to.hash) {
      return { el: to.hash, top: 88 };
    }

    return { top: 0, left: 0 };
  },
});

export default router;
