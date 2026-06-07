// Файл: projects.get.query.ts
// Создан: 5/17/2026, 8:14:00 PM
// Операция: GET

import { projectService } from '@api';
import { projectsKeys } from './projects.keys.ts';

export const projectsGetQuery = {
  GET_LIST: () => ({
    queryKey: [projectsKeys.getListProjects],
    queryFn: async () => {
      const { data } = await projectService.getList();
      return data;
    },
  }),
};
