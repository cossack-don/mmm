// Файл: projects.get.query.ts
// Создан: 5/17/2026, 8:14:00 PM
// Операция: GET

import { projectService } from '@api';
import { projectsKeys } from '../query/projects.keys.query.ts';
import { delayFetch } from '@/utils';
import { mappingDataInfinityQuery } from '@/utils/query';

export const projectsGetQuery = {
  GET_LIST: () => ({
    queryKey: [projectsKeys.getListProjects],
    queryFn: async () => {
      const { data } = await projectService.getList();
      return data;
    },
  }),

  GET_LIST_INFINITY_SCROLL: async ({ pageParam = 0 }) => {
    const params = { limit: 10, offset: pageParam * 10 };

    await delayFetch(500);

    const { data } = await projectService.getList(params.limit, params.offset);

    return {
      data: mappingDataInfinityQuery(data.data, {
        _isError: false,
        _isLoading: false,
        _isEditing: false,
      }),
      total: data.total,
      limit: data.limit,
      offset: data.offset,
    };
  },
};
