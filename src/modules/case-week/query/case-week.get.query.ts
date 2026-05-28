import type { RouteLocationNormalized } from "vue-router";
import { caseWeekService, caseYearService } from "@api";
import { caseWeekKeys } from "./case-week.keys.query.ts";

export const caseWeekGetQuery = {
  GET_LIST: (route: RouteLocationNormalized) => ({
    queryKey: [caseWeekKeys.getListCaseWeek],
    queryFn: async () => {
      const data = await caseWeekService.getList(
        route.params.idProject as string,
      );

      return data.data;
    },
  }),

  GET_MONTH: (route: RouteLocationNormalized) => ({
    queryKey: [caseWeekKeys.getCurrentMonthCaseWeek],
    queryFn: async () => {
      const { data } = await caseYearService.getList(route.params.idProject);
      return data;
    },
    select: (data) => {
      const currentMonth = new Date().getMonth() + 1;
      return data.filter((item) => item.month === currentMonth);
    },
  }),
};
