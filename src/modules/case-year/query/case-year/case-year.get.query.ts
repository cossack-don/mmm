import type { RouteLocationNormalized } from 'vue-router';
import { caseYearTargetsKeys } from './case-year.keys.query.ts';
import { caseYearService } from '@api';

export const caseYearGetQuery = {
  GET_LIST: (route: RouteLocationNormalized) => ({
    queryKey: [caseYearTargetsKeys.getListCaseYear],
    queryFn: async () => {
      const list = [[], [], [], []];

      const { data } = await caseYearService.getList(
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

      const transform = (data) => {
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
      console.log(listMock);

      // console.log(list, 3);
      return listMock; // list
    },
  }),
};
