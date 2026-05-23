// Файл: projects.update.query.ts
// Создан: 5/17/2026, 8:13:57 PM
// Операция: UPDATE

import { projectService } from '@/api';

export const projectsUpdateQuery = {
  UPDATE: () => ({
    mutationFn: async ({ idProject, name }: any) => {
      await projectService.updateById(idProject, name);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      // const queryClient = context.client;
      // queryClient.invalidateQueries({
      //   queryKey: ["query_KEY"],
      // });
    },
  }),
};
