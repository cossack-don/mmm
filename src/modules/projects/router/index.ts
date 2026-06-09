export const routerProjects = {
  path: '/projects',
  name: 'projects',
  component: () => import('@/modules/projects/Page.vue'),
  meta: {
    nameRu: null,
    layout: 'DefaultLayout',
    auth: true,
  },
};
