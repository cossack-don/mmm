export const caseYearDeleteQuery = {
  DELETE: () => ({
    mutationFn: async ({ idProject, idTarget }: any) => {},
    // onMutate: (variables, context) => {
    // },
    // onError: (error, variables, onMutateResult, context) => {
    // },
    onSuccess: (data, variables, onMutateResult, context) => {},
    // onSettled: (data, error, variables, onMutateResult, context) => {
    // },
  }),
};
