// Файл: projects.get.query.ts
// Создан: 5/17/2026, 8:14:00 PM
// Операция: GET

import { projectService } from "@api";
import { projectsKeys } from "../query/projects.keys.query.ts";
import type { RouteLocationNormalized } from "vue-router";

export const projectsGetQuery = {
  GET_LIST: () => ({
    queryKey: [projectsKeys.getListProjects],
    queryFn: async () => {
      const { data } = await projectService.getList();
      return data;
    },
  }),

  GET_LIST_INFINITY_SCROLL: () => ({
    queryKey: [projectsKeys.getListProjectsInfinityScroll],
    queryFn: async ({ pageParam = 0 }) => {
      const params = { limit: 5, offset: pageParam * 5 };

      const { data } = await projectService.getList(
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
