// Файл: projects.delete.query.ts
// Создан: 5/17/2026, 8:13:36 PM
// Операция: DELETE
import { projectService } from '@api';
import { projectsKeys } from './projects.keys.query.ts';
import { delayFetch } from '@/utils';

export const projectsDeleteQuery = {
  DELETE: () => ({
    mutationFn: async ({ id }: any) => {
      await delayFetch(5000);
      await projectService.deleteById(id);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      // const queryClient = context.client;
      // queryClient.invalidateQueries({
      //   queryKey: [projectsKeys.getListProjectsInfinityScroll],
      // });
    },
  }),
};
