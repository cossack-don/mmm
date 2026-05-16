import { caseYearTargetsKeys } from "./case-year-targets.keys.query.ts";
import { serviceCaseYearTargets } from "../../../../../../api/services";

export const caseYearTargetsDeleteQuery = {
  DELETE: () => ({
    mutationFn: async ({ idProject, idTarget }: any) => {
      await serviceCaseYearTargets.deleteById(idProject, idTarget);
    },
    // onMutate: (variables, context) => {
    // },
    // onError: (error, variables, onMutateResult, context) => {
    // },
    onSuccess: (data, variables, onMutateResult, context) => {
      const queryClient = context.client;
      queryClient.invalidateQueries({
        queryKey: [caseYearTargetsKeys.getListCaseYearTargets],
      });
    },
    // onSettled: (data, error, variables, onMutateResult, context) => {
    // },
  }),
};
