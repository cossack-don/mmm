import { projectService } from '@api';
import { projectsKeys } from './projects.keys';
import type { QueryClient } from '@tanstack/vue-query';

export const projectsCreateQuery = {
  POST: () => ({
    mutationFn: async ({ name }: { name: string }) => {
      await projectService.createProject(name);
      return { name };
    },
    onSuccess: (
      _data: { name: string },
      _variables: { name: string },
      _onMutateResult: unknown,
      { client }: { client: QueryClient }
    ) => {
      client.invalidateQueries({
        queryKey: [projectsKeys.getListProjects],
      });
    },
  }),
};
