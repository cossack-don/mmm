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
        path: "case-week",
        name: "case-week",
        component: () =>
          import("../modules/project/modules/case-week/PageWeek.vue"),
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
        component: () =>
          import("../modules/project/modules/todos/PageTodos.vue"),
        meta: {
          nameRu: "Заметки",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "finances",
        name: "finances",
        component: () =>
          import("../modules/project/modules/finances/PageFinances.vue"),
        meta: {
          nameRu: "Финансы",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "spirituality",
        name: "spirituality",
        component: () =>
          import("../modules/project/modules/spirituality/PageSpirituality.vue"),
        meta: {
          nameRu: "Духовность",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "relax",
        name: "relax",
        component: () =>
          import("../modules/project/modules/relax/PageRelax.vue"),
        meta: {
          nameRu: "Отдых",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "relationship",
        name: "relationship",
        component: () =>
          import("../modules/project/modules/relationship/PageRelationship.vue"),
        meta: {
          nameRu: "Отношения",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "schooling",
        name: "schooling",
        component: () =>
          import("../modules/project/modules/schooling/PageSchooling.vue"),
        meta: {
          nameRu: "Обучение",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "health",
        name: "health",
        component: () =>
          import("../modules/project/modules/health/PageHealth.vue"),
        meta: {
          nameRu: "Здоровье",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "environment",
        name: "environment",
        component: () =>
          import("../modules/project/modules/environment/PageEnvironment.vue"),
        meta: {
          nameRu: "Окружение",
          // layout: "NavigationLayout",
        },
      },
      {
        path: "vocation",
        name: "vocation",
        component: () =>
          import("../modules/project/modules/vocation/PageVocation.vue"),
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
