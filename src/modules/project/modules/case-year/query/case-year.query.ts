import { type QueryClient, useQuery } from "@tanstack/vue-query";
import { caseYearController } from "../controllers/case-year.controller.ts";

export const caseYearQuery = {
  POST: (queryClient: QueryClient) => ({
    mutationFn: async ({ idProject, name, pickedQ, month }: any) => {
      await caseYearController.createTask(idProject, name, pickedQ, month);
    },
    // onMutate: (variables, context) => {
    //   // A mutation is about to happen!
    //   // Optionally return a result containing data to use when for example rolling back
    // },
    // onError: (error, variables, onMutateResult, context) => {
    //   // An error happened!
    //   console.log(`rolling back optimistic update with id ${onMutateResult.id}`);
    // },
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["getListCaseYear"] });
    },
    // onSettled: (data, error, variables, onMutateResult, context) => {
    //   // Error or success... doesn't matter!
    // },
  }),
  DELETE: (queryClient: QueryClient) => ({
    mutationFn: async ({ idProject, idTask }: any) => {
      await caseYearController.deleteById(idProject, idTask);
    },
    // onMutate: (variables, context) => {
    //   // A mutation is about to happen!
    //   // Optionally return a result containing data to use when for example rolling back
    // },
    // onError: (error, variables, onMutateResult, context) => {
    //   // An error happened!
    //   console.log(`rolling back optimistic update with id ${onMutateResult.id}`);
    // },
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["getListCaseYear"] });
    },
    // onSettled: (data, error, variables, onMutateResult, context) => {
    //   // Error or success... doesn't matter!
    // },
  }),

  PUT: (queryClient: QueryClient) => ({
    mutationFn: async ({ idProject, idTask, name }: any) => {
      await caseYearController.putById(idProject, idTask, name);
    },
    // onMutate: (variables, context) => {
    //   // A mutation is about to happen!
    //   // Optionally return a result containing data to use when for example rolling back
    // },
    // onError: (error, variables, onMutateResult, context) => {
    //   // An error happened!
    //   console.log(`rolling back optimistic update with id ${onMutateResult.id}`);
    // },
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["getListCaseYear"] });
    },
    // onSettled: (data, error, variables, onMutateResult, context) => {
    //   // Error or success... doesn't matter!
    // },
  }),

  GET_LIST: (route) => ({
    queryKey: ["getListCaseYear"],
    queryFn: async () => {
      const data = await caseYearController.getList(
        route.params.idProject as string,
      );

      return data;
    },
  }),
};
