// Файл: projects.delete.query.ts
// Создан: 5/17/2026, 8:13:36 PM
// Операция: DELETE
import { projectService } from '@api';
import {
  deleteByIdInfinityQuery,
  updateFieldsInfinityQuery,
} from '@/utils/query';
import { projectsKeys } from './projects.keys.query';
import type { QueryClient } from '@tanstack/vue-query';

export const projectsDeleteQuery = {
  DELETE: () => ({
    mutationFn: async ({ id }: { id: number }) => {
      // await delayFetch(5000);
      await projectService.deleteById(id);

      return { id: id };
    },
    onSuccess: (
      { id }: { id: number },
      _variables: { id: number },
      _onMutateResult: unknown,
      { client }: { client: QueryClient }
    ) => {
      client.setQueryData([projectsKeys.getListProjectsInfinityScroll], (old) =>
        deleteByIdInfinityQuery(old, id)
      );
    },
    onError: (
      _error: Error | null,
      { id }: { id: number },
      _onMutateResult: unknown,
      { client }: { client: QueryClient }
    ) => {
      client.setQueryData([projectsKeys.getListProjectsInfinityScroll], (old) =>
        updateFieldsInfinityQuery(old, id, {
          _isError: true,
          _isLoading: false,
        })
      );
    },
    onSettled: (
      { id }: { id: number },
      _error: Error | null,
      _variables: { id: number },
      _onMutateResult: unknown,
      { client }: { client: QueryClient }
    ) => {
      client.setQueryData([projectsKeys.getListProjectsInfinityScroll], (old) =>
        updateFieldsInfinityQuery(old, id, { _isLoading: false })
      );
    },
  }),
};
