import { caseYearTargetsKeys } from "./case-year-targets.keys.query";
import { caseYearTargetsService } from "@api";

export const caseYearTargetsPostQuery = {
  POST: () => ({
    mutationFn: async ({ idProject, name }: any) => {
      await caseYearTargetsService.createTarget(idProject, name);
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
