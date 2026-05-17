export const nameDeleteQuery = {
  DELETE: () => ({
    mutationFn: async ({ idProject, idTask }: any) => {
      // API
    },
    // onMutate: (variables, context) => {},
    // onError: (error, variables, onMutateResult, context) => {},
    onSuccess: (data, variables, onMutateResult, context) => {
      // const queryClient = context.client;
      // queryClient.invalidateQueries({
      //   queryKey: ["query_KEY"],
      // });
    },
    // onSettled: (data, error, variables, onMutateResult, context) => {}
  }),
};
