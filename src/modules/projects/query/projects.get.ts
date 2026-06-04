// Файл: projects.get.query.ts
// Создан: 5/17/2026, 8:14:00 PM
// Операция: GET

import { projectService } from '@api';
import { projectsKeys } from './projects.keys.ts';
import { delayFetch } from '@/utils';

export const projectsGetQuery = {
  GET_LIST: () => ({
    queryKey: [projectsKeys.getListProjects],
    queryFn: async () => {
      const { data } = await projectService.getList();
      return data;
    },
  }),

  GET_LIST_INFINITY_SCROLL: async ({ pageParam = 0, search }) => {
    const params = { limit: 20, offset: pageParam * 20 };

    await delayFetch(1500);

    const { data } = await projectService.getList(
      params.limit,
      params.offset,
      search
    );

    return {
      data: data.data,
      total: data.total,
      limit: data.limit,
      offset: data.offset,
    };
  },
};
