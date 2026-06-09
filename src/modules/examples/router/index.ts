export const routerExamples = {
  path: 'examples',
  name: 'examples',
  component: () => import('@/modules/examples/Page.vue'),
  meta: {
    nameRu: 'Examples-query',
    // layout: "NavigationLayout",
  },
};
