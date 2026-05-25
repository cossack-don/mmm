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
import { delayFetch } from '@/utils';
import type { IProjectsData } from '@/modules/projects/types';

export const projectsDeleteQuery = {
  DELETE: () => ({
    onMutate: async (
      { id }: { id: number },
      { client }: { client: QueryClient }
    ) => {
      // await client.cancelQueries({
      //   queryKey: [projectsKeys.getListProjectsInfinityScroll],
      // });
      // await client.setQueryData(
      //   [projectsKeys.getListProjectsInfinityScroll],
      //   (old: IProjectsData) =>
      //     updateFieldsInfinityQuery(old, id, {
      //       _isLoading: true,
      //       _isError: false,
      //     })
      // );
    },

    mutationFn: async ({ id }: { id: number }) => {
      await delayFetch(3000);
      await projectService.deleteById(id);

      return { id: id };
    },

    onSuccess: (
      { id }: { id: number },
      _variables: { id: number },
      _onMutateResult: unknown,
      { client }: { client: QueryClient }
    ) => {
      client.setQueryData(
        [projectsKeys.getListProjectsInfinityScroll],
        (old: IProjectsData) => deleteByIdInfinityQuery(old, id)
      );
    },

    onError: (
      _error: Error | null,
      { id }: { id: number },
      _onMutateResult: unknown,
      { client }: { client: QueryClient }
    ) => {
      // client.setQueryData(
      //   [projectsKeys.getListProjectsInfinityScroll],
      //   (old: IProjectsData) =>
      //     updateFieldsInfinityQuery(old, id, {
      //       _isError: true,
      //       _isLoading: false,
      //     })
      // );
    },

    onSettled: (
      data: { id: number } | undefined,
      _error: Error | null,
      variables: { id: number },
      _onMutateResult: unknown,
      { client }: { client: QueryClient }
    ) => {
      // const id = data?.id ?? variables.id;
      // client.setQueryData(
      //   [projectsKeys.getListProjectsInfinityScroll],
      //   (old: IProjectsData) =>
      //     updateFieldsInfinityQuery(old, id, { _isLoading: false })
      // );
    },
  }),
};
