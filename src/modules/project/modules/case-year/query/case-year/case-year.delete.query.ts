import { caseYearController } from "../../controllers/case-year.controller.ts";
import { serviceCaseYear } from "../../../../../../api";
import { caseYearTargetsKeys } from "./case-year.keys.query.ts";

export const caseYearDeleteQuery = {
  DELETE: () => ({
    mutationFn: async ({ idProject, idTask }: any) => {
      await serviceCaseYear.deleteById(idProject, idTask);
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
