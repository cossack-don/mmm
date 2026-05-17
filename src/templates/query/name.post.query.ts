import { caseWeekService } from "@api";
import { caseWeekKeys } from "./case-week.keys.query.ts";

export const namePostQuery = {
  POST: () => ({
    mutationFn: async ({ idProject, name, day }: any) => {
      await caseWeekService.createTaskDay(idProject, name, day);
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
