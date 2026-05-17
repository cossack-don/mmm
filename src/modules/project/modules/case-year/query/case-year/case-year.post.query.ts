import { caseYearTargetsKeys } from "./case-year.keys.query.ts";
import { caseYearService } from "../../../../../../api";

export const caseYearPostQuery = {
  POST: () => ({
    mutationFn: async ({ idProject, name, pickedQ, month }: any) => {
      await caseYearService.createTaskQ(idProject, name, `Q${pickedQ}`, month);
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
