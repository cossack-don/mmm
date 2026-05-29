import { caseYearTargetsKeys } from './case-year.keys.query.ts';
import { caseYearService } from '@api';

export const caseYearPutQuery = {
  PUT: () => ({
    mutationFn: async ({ idProject, idTask, name, pickedQ, month }: any) => {
      await caseYearService.putById(idProject, idTask, name, pickedQ, month);
    },
    // onMutate: (variables, context) => {
    // },
    // onError: (error, variables, onMutateResult, context) => {
    // },
    onSuccess: (data, variables, onMutateResult, context) => {
      const queryClient = context.client;
      queryClient.invalidateQueries({
        queryKey: [caseYearTargetsKeys.getListCaseYear],
      });
    },
    // onSettled: (data, error, variables, onMutateResult, context) => {
    // },
  }),
};
