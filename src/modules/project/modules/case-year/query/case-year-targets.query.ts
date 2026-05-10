import { caseYearTargetsController } from "../controllers/case-year-targets.controller.ts";
import type { QueryClient } from "@tanstack/vue-query";

export const caseYearTargetsQuery = {
  POST: (queryClient: QueryClient) => ({
    mutationFn: async ({ idProject, name }: any) => {
      await caseYearTargetsController.createTarget(idProject, name);
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
      queryClient.invalidateQueries({ queryKey: ["getListCaseYearTargets"] });
    },
    // onSettled: (data, error, variables, onMutateResult, context) => {
    //   // Error or success... doesn't matter!
    // },
  }),
  DELETE: (queryClient: QueryClient) => ({
    mutationFn: async ({ idProject, idTarget }: any) => {
      await caseYearTargetsController.deleteById(idProject, idTarget);
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
      queryClient.invalidateQueries({ queryKey: ["getListCaseYearTargets"] });
    },
    // onSettled: (data, error, variables, onMutateResult, context) => {
    //   // Error or success... doesn't matter!
    // },
  }),
  PUT: (queryClient: QueryClient) => ({
    mutationFn: async ({ idProject, idTarget, name }: any) => {
      await caseYearTargetsController.putById(idProject, idTarget, name);
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
      queryClient.invalidateQueries({ queryKey: ["getListCaseYearTargets"] });
    },
    // onSettled: (data, error, variables, onMutateResult, context) => {
    //   // Error or success... doesn't matter!
    // },
  }),
  GET_LIST: (route: any, enabled?: any) => ({
    queryKey: ["getListCaseYearTargets"],
    queryFn: async () => {
      const data = await caseYearTargetsController.getList(
        route.params.idProject as string,
      );

      return data;
    },
    enabled: enabled,
  }),
};
