import { caseYearController } from "../../controllers/case-year.controller.ts";
import { caseYearTargetsKeys } from "./case-year.keys.query.ts";
import { serviceCaseYear } from "../../../../../../api";

export const caseYearPostQuery = {
  POST: () => ({
    mutationFn: async ({ idProject, name, pickedQ, month }: any) => {
      await serviceCaseYear.createTaskQ(idProject, name, `Q${pickedQ}`, month);
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
