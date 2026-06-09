export const routerAuth = {
  path: '/auth',
  name: 'auth',
  component: () => import('@/modules/auth/Page.vue'),
  meta: {
    nameRu: null,
    layout: 'AuthLayout',
    auth: false,
  },
};
