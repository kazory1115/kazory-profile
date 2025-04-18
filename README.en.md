# Vue 3 + Vite Project

[![繁體中文](https://img.shields.io/badge/語言-繁體中文-blue)](https://github.com/kazory1115/vue_app/blob/main/README.md)
[![English](https://img.shields.io/badge/Language-English-blue)](https://github.com/kazory1115/vue_app/blob/main/README.en.md)


This project is built with Vue 3 and Vite, providing a fast and modern development environment for your web application.

## Features

- ⚡️ **Lightning Fast Development** with [Vite](https://vitejs.dev/)
- 🛠️ **Vue 3 Composition API** with `<script setup>` syntax
- 📱 **Responsive Design** out of the box
- 🚦 **Vue Router** for seamless navigation

## Project Structure

```
vue_test/
├─ public/                 # Static assets copied directly to dist/
│  └─ favicon.svg          # Default favicon (can be replaced)
│
├─ src/                    # Source code
│  ├─ assets/              # Images, CSS, fonts and other assets
│  ├─ components/          # Reusable components (buttons, cards, etc.)
│  ├─ views/               # Route components/pages (Home, About, etc.)
│  ├─ router/              # Vue Router configuration
│  │  └─ index.js          # Router setup and routes definition
│  ├─ App.vue              # Main component (layout and router-view)
│  └─ main.js / main.ts    # Application entry point
│
├─ index.html              # Main HTML file (JS will be injected)
├─ vite.config.js          # Vite configuration
├─ package.json            # Dependencies and scripts
└─ tsconfig.json           # TypeScript configuration (if applicable)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd vue_test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add Vue Router (if not already installed):
   ```bash
   npm install vue-router
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## IDE Support

For the best development experience, we recommend:
- [VS Code](https://code.visualstudio.com/) with the [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension
- Disable Vetur if you have it installed
- Check out more IDE recommendations in the [Vue Docs Scaling Up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support)

## Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Script Setup Documentation](https://v3.vuejs.org/api/sfc-script-setup.html)
- [Vite Documentation](https://vitejs.dev/)
- [Vue Router Documentation](https://router.vuejs.org/)
