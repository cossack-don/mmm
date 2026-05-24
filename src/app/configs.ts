// vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// vue query
import { QueryClient } from '@tanstack/vue-query';

// router
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router/routes';

export const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
  theme: {
    defaultTheme: 'light', // 'system' | 'light' | 'dark'
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 10 * 60 * 1000, // 10 минут
      retry: false,
    },
  },
});

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
