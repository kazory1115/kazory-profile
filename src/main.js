import { createApp } from 'vue';
import './index.css';
import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faPen,
  faTrash,
  faEdit,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import {
  faVuejs,
  faReact,
  faJsSquare,
  faHtml5,
  faCss3Alt,
  faBootstrap,
  faNodeJs,
  faLaravel,
  faGitAlt,
  faDocker,
} from '@fortawesome/free-brands-svg-icons';

const app = createApp(App);

library.add(
  faPen,
  faTrash,
  faEdit,
  faDatabase,
  faVuejs,
  faReact,
  faJsSquare,
  faHtml5,
  faCss3Alt,
  faBootstrap,
  faNodeJs,
  faLaravel,
  faGitAlt,
  faDocker
);

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
