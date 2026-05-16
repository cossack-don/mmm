export const caseYearPutQuery = {
  PUT: () => ({
    mutationFn: async ({ idProject, idTarget, name }: any) => {},
    // onMutate: (variables, context) => {
    // },
    // onError: (error, variables, onMutateResult, context) => {
    // },
    onSuccess: (data, variables, onMutateResult, context) => {},
    // onSettled: (data, error, variables, onMutateResult, context) => {
    // },
  }),
};
