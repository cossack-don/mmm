import { useMutation, useQuery } from '@tanstack/vue-query';
import { serviceCaseYearTargets } from './api';

export const keyGetListCaseYearTargets = 'getListCaseYearTargets';

export const useCaseYearTargets = (route: any) => {
  const {
    data: listCaseYearTargets,
    isPending: isLoadingCaseYearTargets,
    isError: isErrorCaseYearTargets,
  } = useQuery({
    queryKey: [keyGetListCaseYearTargets],
    queryFn: async () => {
      const { data } = await serviceCaseYearTargets.getList(
        route.params.idProject as string
      );

      return data;
    },
  });

  const { mutate: deleteByIdCaseYearTarget } = useMutation({
    onMutate: () => {},
    mutationFn: async ({ idProject, idTarget }: any) => {
      await serviceCaseYearTargets.deleteById(idProject, idTarget);
    },
    onError: () => {
      console.log('error');
    },
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      const queryClient = context.client;
      queryClient.invalidateQueries({
        queryKey: [keyGetListCaseYearTargets],
      });
    },
    onSettled: () => {},
  });

  const { mutate: createCaseYearTarget } = useMutation({
    mutationFn: async ({ idProject, name }: any) => {
      await serviceCaseYearTargets.create(idProject, name);
    },

    onSuccess: (_data, _variables, _onMutateResult, context) => {
      const queryClient = context.client;
      queryClient.invalidateQueries({
        queryKey: [keyGetListCaseYearTargets],
      });
    },
  });

  const { mutate: putByIdCaseYearTarget } = useMutation({
    mutationFn: async ({ idProject, idTarget, name }: any) => {
      await serviceCaseYearTargets.putById(idProject, idTarget, name);
    },

    onSuccess: (_data, _variables, _onMutateResult, context) => {
      const queryClient = context.client;
      queryClient.invalidateQueries({
        queryKey: [keyGetListCaseYearTargets],
      });
    },
  });

  return {
    listCaseYearTargets,
    isLoadingCaseYearTargets,
    isErrorCaseYearTargets,
    deleteByIdCaseYearTarget,
    createCaseYearTarget,
    putByIdCaseYearTarget,
  };
};
