// Файл: projects.get.query.ts
// Создан: 5/17/2026, 8:14:00 PM
// Операция: GET

import { projectService } from '@api';
import { projectsKeys } from '../query/projects.keys.query.ts';
import type { RouteLocationNormalized } from 'vue-router';
import { delayFetch, mappingInfinityQuery } from '@/utils';

export const projectsGetQuery = {
  GET_LIST: () => ({
    queryKey: [projectsKeys.getListProjects],
    queryFn: async () => {
      const { data } = await projectService.getList();
      return data;
    },
  }),

  GET_LIST_INFINITY_SCROLL: async ({ pageParam = 0 }) => {
    // queryKey: [projectsKeys.getListProjectsInfinityScroll],
    const params = { limit: 10, offset: pageParam * 10 };

    await delayFetch(500);

    const { data } = await projectService.getList(params.limit, params.offset);

    const dataMapping = data?.data.map((item) => {
      return { ...item, _isError: false, _isLoading: false, _isEditing: false };
    });

    return {
      data: dataMapping,
      total: data.total,
      limit: data.limit,
      offset: data.offset,
    };
  },
};
