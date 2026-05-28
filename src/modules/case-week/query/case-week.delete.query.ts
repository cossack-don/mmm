import { caseWeekService } from "@api";
import { caseWeekKeys } from "./case-week.keys.query.ts";

export const caseWeekDeleteQuery = {
  DELETE: () => ({
    mutationFn: async ({ idProject, idTask }: any) => {
      await caseWeekService.deleteById(idProject, idTask);
    },
    // onMutate: (variables, context) => {
    // },
    // onError: (error, variables, onMutateResult, context) => {
    // },
    onSuccess: (data, variables, onMutateResult, context) => {
      const queryClient = context.client;
      queryClient.invalidateQueries({
        queryKey: [caseWeekKeys.getListCaseWeek],
      });
    },
    // onSettled: (data, error, variables, onMutateResult, context) => {
    // },
  }),
};
