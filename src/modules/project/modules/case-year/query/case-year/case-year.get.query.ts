import type { RouteLocationNormalized } from "vue-router";
import { caseYearTargetsKeys } from "./case-year.keys.query.ts";
import { serviceCaseYear } from "../../../../../../api";

export const caseYearGetQuery = {
  GET_LIST: (route: RouteLocationNormalized) => ({
    queryKey: [caseYearTargetsKeys.getListCaseYear],
    queryFn: async () => {
      const list = [[], [], [], []];

      const { data } = await serviceCaseYear.getList(
        route.params.idProject as string,
      );

      data.forEach((item: any) => {
        if (item.keyQ === "Q1") {
          list[0].push(item);
        } else if (item.keyQ === "Q2") {
          list[1].push(item);
        } else if (item.keyQ === "Q3") {
          list[2].push(item);
        } else if (item.keyQ === "Q4") {
          list[3].push(item);
        }
      });

      return list;
    },
  }),
};
