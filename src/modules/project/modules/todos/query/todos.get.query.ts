import { serviceTodos } from "../../../../../api";
import { todosKeysQuery } from "./todos.keys.query";
import type { RouteLocationNormalized } from "vue-router";

export const todosGetQuery = {
  GET_LIST: (route: RouteLocationNormalized) => ({
    queryKey: [todosKeysQuery.getListTodos],
    queryFn: async () => {
      const { data } = await serviceTodos.getList(
        route.params.idProject as string,
      );

      return data.data;
    },
  }),
};
