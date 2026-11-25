import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: 'Sahibinden Manager',
    description:
      'Sahibinden.com için kompakt liste, ziyaret takibi, ilan eleme, not defteri ve gelişmiş filtreleme araçları.',
    permissions: ['storage', 'downloads', 'activeTab', 'tabs'],
    host_permissions: ['https://*.sahibinden.com/*'],
    homepage_url: 'https://github.com/fastfingertips/sahibinden-manager',
    author: 'fastfingertips',
  },
});
