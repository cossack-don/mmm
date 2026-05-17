// Файл: projects.create.query.ts
// Создан: 5/17/2026, 8:13:52 PM
// Операция: CREATE

import { projectService } from "@api";
import { projectsKeys } from "./projects.keys.query";

export const projectsCreateQuery = {
  POST: () => ({
    mutationFn: async ({ name }: any) => {
      await projectService.createProject(name);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      const queryClient = context.client;
      queryClient.invalidateQueries({
        queryKey: [projectsKeys.getListProjects],
      });
    },
  }),
};
