export const routes = [
  {
    path: "/",
    component: () => import("../BasePage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];
