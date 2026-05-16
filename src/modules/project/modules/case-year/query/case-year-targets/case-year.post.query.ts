export const caseYearPostQuery = {
  POST: () => ({
    mutationFn: async ({ idProject, name }: any) => {},
    // onMutate: (variables, context) => {
    // },
    // onError: (error, variables, onMutateResult, context) => {
    // },
    onSuccess: (data, variables, onMutateResult, context) => {},
    // onSettled: (data, error, variables, onMutateResult, context) => {
    // },
  }),
};
