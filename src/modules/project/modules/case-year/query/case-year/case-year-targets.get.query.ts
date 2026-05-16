import { serviceCaseYearTargets } from "../../../../../../api/services";
import type { RouteLocationNormalized } from "vue-router";
import { caseYearTargetsKeys } from "./case-year-targets.keys.query.ts";

export const caseYearTargetsGetQuery = {
  GET_LIST: (route: RouteLocationNormalized, enabled?: any) => ({
    queryKey: [caseYearTargetsKeys.getListCaseYearTargets],
    queryFn: async () => {
      const { data } = await serviceCaseYearTargets.getList(
        route.params.idProject as string,
      );
      return data;
    },
    enabled: enabled,
  }),
};
