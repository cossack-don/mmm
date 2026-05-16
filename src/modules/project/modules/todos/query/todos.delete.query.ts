import { serviceTodos } from "../../../../../api";
import { todosKeysQuery } from "./todos.keys.query.ts";

export const todosDeleteQuery = {
  DELETE: () => ({
    mutationFn: async ({ idProject, idTask }: any) => {
      await serviceTodos.deleteById(idProject, idTask);
    },
    // onMutate: (variables, context) => {
    // },
    // onError: (error, variables, onMutateResult, context) => {
    // },
    onSuccess: (data, variables, onMutateResult, context) => {
      const queryClient = context.client;
      queryClient.invalidateQueries({
        queryKey: [todosKeysQuery.getListTodos],
      });
    },
    // onSettled: (data, error, variables, onMutateResult, context) => {
    // },
  }),
};
