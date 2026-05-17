import { caseYearTargetsKeys } from "./case-year-targets.keys.query";
import { caseYearTargetsService } from "../../../../../../api/services";

export const caseYearTargetsPutQuery = {
  PUT: () => ({
    mutationFn: async ({ idProject, idTarget, name }: any) => {
      await caseYearTargetsService.putById(idProject, idTarget, name);
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
