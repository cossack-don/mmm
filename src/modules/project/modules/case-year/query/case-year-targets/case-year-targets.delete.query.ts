import { caseYearTargetsKeys } from './case-year-targets.keys.query';
import { caseYearTargetsService } from '@api';

export const caseYearTargetsDeleteQuery = {
  DELETE: () => ({
    onMutate: (variables, context) => {},
    mutationFn: async ({ idProject, idTarget }: any) => {
      await caseYearTargetsService.deleteById(idProject, idTarget);
    },
    onError: (error, variables, onMutateResult, context) => {
      console.log('error');
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      const queryClient = context.client;
      queryClient.invalidateQueries({
        queryKey: [caseYearTargetsKeys.getListCaseYearTargets],
      });
    },
    onSettled: (data, error, variables, onMutateResult, context) => {},
  }),
};
