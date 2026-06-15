export const routerFinances = {
  path: 'finances',
  name: 'finances',
  component: () => import('@/modules/finances/Page.vue'),
  meta: {
    nameRu: 'Финансы',
    // layout: "NavigationLayout",
  },
};
