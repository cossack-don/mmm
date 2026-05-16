import { caseYearController } from "../../controllers/case-year.controller.ts";
import { caseYearTargetsKeys } from "./case-year.keys.query.ts";
import { serviceCaseYear } from "../../../../../../api";

export const caseYearPutQuery = {
  PUT: () => ({
    mutationFn: async ({ idProject, idTask, name }: any) => {
      await serviceCaseYear.putById(idProject, idTask, name);
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
