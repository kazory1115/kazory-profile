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
  faFileAlt,
  faMobileAlt,
  faCode,
  faProjectDiagram,
  faSearch,
  faCloud,
  faBug,
  faTachometerAlt,
  faCogs,
  faCheckCircle,
  faStarHalfAlt,
  faHourglassHalf,
  faQuestionCircle,
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
  faGithub,
  faLinkedin,
  faPhp,
} from '@fortawesome/free-brands-svg-icons';

import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const app = createApp(App);

library.add(
  faPen,
  faTrash,
  faEdit,
  faDatabase,
  faFileAlt,
  faMobileAlt,
  faCode,
  faProjectDiagram,
  faSearch,
  faCloud,
  faBug,
  faTachometerAlt,
  faCogs,
  faCheckCircle,
  faStarHalfAlt,
  faHourglassHalf,
  faQuestionCircle,
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
  faGithub,
  faLinkedin,
  faPhp
);

/**
 * 載入路由
 */
app.use(router);

//fontawesome
app.component('font-awesome-icon', FontAwesomeIcon);

//tsparticles
app.use(Particles, {
  init: async (engine) => {
    await loadFull(engine);
  },
});

// 載入主檔案
app.mount('#app');
