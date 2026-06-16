import { useMutation, useQuery } from '@tanstack/vue-query';
import type { RouteLocationNormalized } from 'vue-router';
import { serviceCaseYear } from './api';

export const keyGetListCaseYear = 'getListCaseYear';

export const useCaseYear = (route: RouteLocationNormalized) => {
  const {
    data: listCaseYear,
    isPending: isLoadingCaseYear,
    isError: isErrorCaseYear,
  } = useQuery({
    queryKey: [keyGetListCaseYear],
    queryFn: async () => {
      const list = [[], [], [], []];

      const { data } = await serviceCaseYear.getList(
        route.params.idProject as string
      );

      data.forEach((item: any) => {
        if (item.keyQ === 'Q1') {
          list[0].push(item);
        } else if (item.keyQ === 'Q2') {
          list[1].push(item);
        } else if (item.keyQ === 'Q3') {
          list[2].push(item);
        } else if (item.keyQ === 'Q4') {
          list[3].push(item);
        }
      });

      const monthNames = {
        1: 'Январь',
        2: 'Февраль',
        3: 'Март',
        4: 'Апрель',
        5: 'Май',
        6: 'Июнь',
        7: 'Июль',
        8: 'Август',
        9: 'Сентябрь',
        10: 'Октябрь',
        11: 'Ноябрь',
        12: 'Декабрь',
      };
      const quarters = {
        Q1: [1, 2, 3],
        Q2: [4, 5, 6],
        Q3: [7, 8, 9],
        Q4: [10, 11, 12],
      };

      const transform = (data: any) => {
        const grouped = {};

        data.forEach((item) => {
          grouped[item.keyQ] = grouped[item.keyQ] || {};
          grouped[item.keyQ][item.month] = grouped[item.keyQ][item.month] || [];
          grouped[item.keyQ][item.month].push({ id: item.id, name: item.name });
        });

        return Object.entries(quarters).map(([q, months], i) => ({
          id: i + 1,
          name: q,
          months: months.map((m, idx) => ({
            id: idx + 1,
            name: monthNames[m],
            tasks: grouped[q]?.[m] || [],
          })),
        }));
      };

      // Как использовать
      const listMock = transform(data);

      return listMock;
    },
  });

  const { mutate: deleteByIdCaseYear } = useMutation({
    mutationFn: async ({ idProject, idTask }: any) => {
      await serviceCaseYear.deleteById(idProject, idTask);
    },

    onSuccess: (_data, _variables, _onMutateResult, context) => {
      const queryClient = context.client;
      queryClient.invalidateQueries({
        queryKey: [keyGetListCaseYear],
      });
    },
  });

  const { mutate: createCaseYear } = useMutation({
    mutationFn: async ({ idProject, name, pickedQ, month }: any) => {
      await serviceCaseYear.create(idProject, name, pickedQ, month);
    },

    onSuccess: (_data, _variables, _onMutateResult, context) => {
      const queryClient = context.client;
      queryClient.invalidateQueries({
        queryKey: [keyGetListCaseYear],
      });
    },
  });

  const { mutate: putByIdCaseYear } = useMutation({
    mutationFn: async ({ idProject, idTask, name, pickedQ, month }: any) => {
      await serviceCaseYear.putById(idProject, idTask, name, pickedQ, month);
    },

    onSuccess: (_data, _variables, _onMutateResult, context) => {
      const queryClient = context.client;
      queryClient.invalidateQueries({
        queryKey: [keyGetListCaseYear],
      });
    },
  });

  return {
    listCaseYear,
    isLoadingCaseYear,
    isErrorCaseYear,
    deleteByIdCaseYear,
    createCaseYear,
    putByIdCaseYear,
  };
};
