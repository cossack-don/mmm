export const routes = [
  {
    path: "/auth",
    name: "auth",
    component: () => import("../modules/projects/PageProjects.vue"), // BasePage
    meta: {
      nameRu: null,
      layout: "AuthLayout",
      auth: false,
    },
  },

  {
    path: "/",
    name: "home",
    component: () => import("../modules/projects/PageProjects.vue"), // BasePage
    meta: {
      nameRu: null,
      layout: "DefaultLayout",
      auth: true,
    },
  },
  {
    path: "/project/:idProject",
    name: "project",
    component: () => import("../modules/project/PageRouterView.vue"),
    meta: {
      nameRu: "11",
      layout: "NavigationLayout", //layout: "DefaultLayout",
      auth: true,
    },
    redirect: { name: "dashboard" },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () =>
          import("../modules/project/modules/dashboard/PageDashboard.vue"),
        meta: {
          nameRu: "Дашборд",
          // layout: "NavigationLayout", //layout: "DefaultLayout",
        },
      },
      {
        path: "case-month",
        name: "case-month",
        component: () => import("../TestPage.vue"),
        meta: {
          nameRu: "Дела на месяц и неделю",
          // layout: "NavigationLayout", //layout: "DefaultLayout",
        },
      },
      {
        path: "case-year",
        name: "case-year",
        component: () =>
          import("../modules/project/modules/case-year/PageCaseYear.vue"),
        meta: {
          nameRu: "Дела на год и кварталы",
          // layout: "NavigationLayout",
        },
      },

      {
        path: "todos",
        name: "todos",
        component: () => import("../NavigationPage.vue"),
        meta: {
          nameRu: "Заметки",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "dadadadad",
        name: "dadadadad",
        component: () => import("../NavigationPage.vue"),
        meta: {
          nameRu: "------",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "finances",
        name: "finances",
        component: () => import("../NavigationPage.vue"),
        meta: {
          nameRu: "Финансы",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "spirituality",
        name: "spirituality",
        component: () => import("../NavigationPage.vue"),
        meta: {
          nameRu: "Духовность",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "relationship",
        name: "relationship",
        component: () => import("../NavigationPage.vue"),
        meta: {
          nameRu: "отдяых",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "relationship",
        name: "relationship",
        component: () => import("../NavigationPage.vue"),
        meta: {
          nameRu: "Отношения",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "schooling",
        name: "schooling",
        component: () => import("../NavigationPage.vue"),
        meta: {
          nameRu: "Обучение",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "health",
        name: "health",
        component: () => import("../NavigationPage.vue"),
        meta: {
          nameRu: "Здоровье",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "environment",
        name: "environment",
        component: () => import("../NavigationPage.vue"),
        meta: {
          nameRu: "Окружение",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "vocation",
        name: "vocation",
        component: () => import("../NavigationPage.vue"),
        meta: {
          nameRu: "Призвание",
          // layout: "NavigationLayout",
        },
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
    meta: {
      nameRu: null,
      layout: null,
      auth: null,
    },
  },
];
