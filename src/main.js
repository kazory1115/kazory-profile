import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPen, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const app = createApp(App);

library.add(faPen, faTrash, faEdit);

// 全域物件
// app.component('tags-input', TagsInput);

/**
 * 載入路由
 */
app.use(router);

//fontawesome
app.component('font-awesome-icon', FontAwesomeIcon);

// 載入主檔案
app.mount('#app');
