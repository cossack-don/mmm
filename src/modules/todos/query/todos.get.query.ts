import { todosService } from "@api";
import { todosKeysQuery } from "./todos.keys.query";
import type { RouteLocationNormalized } from "vue-router";

export const todosGetQuery = {
  GET_LIST: (route: RouteLocationNormalized) => ({
    queryKey: [todosKeysQuery.getListTodos],
    queryFn: async () => {
      const { data } = await todosService.getList(
        route.params.idProject as string,
      );

      return data.data;
    },
  }),
  GET_LIST_INFINITY_SCROLL: (route: RouteLocationNormalized) => ({
    queryKey: [todosKeysQuery.getListTodosInfinityScroll],
    queryFn: async ({ pageParam = 0 }) => {
      const params = { limit: 5, offset: pageParam * 5 };

      const { data } = await todosService.getList(
        route.params.idProject as string,
        params.limit,
        params.offset,
      );

      return {
        data: data.data,
        total: data.total,
        limit: data.limit,
        offset: data.offset,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      // Вычисляем, есть ли следующая страница
      const loadedCount = allPages.length * lastPage.limit;
      const hasMore = loadedCount < lastPage.total;

      return hasMore ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5 минут
    refetchOnWindowFocus: false,
  }),
};
