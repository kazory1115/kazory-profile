import { createApp } from 'vue';
import './index.css';
import App from './App.vue';
import router from './router';
import { initializeTheme } from './composables/useTheme.js';
import './assets/custom.css';

initializeTheme();

const app = createApp(App);
app.use(router);
app.mount('#app');
