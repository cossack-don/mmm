// Файл: projects.update.query.ts
// Создан: 5/17/2026, 8:13:57 PM
// Операция: UPDATE

import { projectService } from '@/api';
import { projectsKeys } from './projects.keys.query';
import { updateFieldsInfinityQuery } from '@/utils/query';
import type { QueryClient } from '@tanstack/vue-query';

export const projectsUpdateQuery = {
  UPDATE: () => ({
    mutationFn: async ({
      idProject,
      name,
    }: {
      idProject: number;
      name: string;
    }) => {
      await projectService.updateById(idProject, name);

      return { id: idProject, name: name };
    },
    onSuccess: (
      { id, name }: { id: number; name: string },
      _variables: { id: number; name: string },
      _onMutateResult: unknown,
      { client }: { client: QueryClient }
    ) => {
      client.setQueryData([projectsKeys.getListProjectsInfinityScroll], (old) =>
        updateFieldsInfinityQuery(old, id, {
          _isEditing: false,
          name: name,
        })
      );
    },
  }),
};
