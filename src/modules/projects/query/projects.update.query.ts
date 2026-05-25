// Файл: projects.update.query.ts
// Создан: 5/17/2026, 8:13:57 PM
// Операция: UPDATE

import { projectService } from '@/api';
import { projectsKeys } from './projects.keys.query';
import { updateFieldsInfinityQuery } from '@/utils/query';
import type { QueryClient } from '@tanstack/vue-query';
import type { IProjectsData } from '@/modules/projects/types';
import { delayFetch } from '@/utils';

export const projectsUpdateQuery = {
  UPDATE: () => ({
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      await delayFetch(3000);
      await projectService.updateById(id, name);

      return { id: id, name: name };
    },
    onSuccess: (
      data: { id: number; name: string },
      variables: { id: number; name: string },
      _onMutateResult: unknown,
      { client }: { client: QueryClient }
    ) => {
      const id = data.id ?? variables.id;
      const name = data.name ?? variables.name;

      client.setQueryData(
        [projectsKeys.getListProjectsInfinityScroll],
        (old: IProjectsData) => updateFieldsInfinityQuery(old, id, { name })
      );
    },
  }),
};
