import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// 全域物件
// app.component('tags-input', TagsInput);

/**
 * 載入路由˙
 */
app.use(router);

// 載入主檔案
app.mount('#app');
