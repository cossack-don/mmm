import type { RouteLocationNormalized } from "vue-router";

export const caseYearGetQuery = {
  GET_LIST: (route: RouteLocationNormalized) => ({
    queryKey: [],
    queryFn: async () => {},
  }),
};
