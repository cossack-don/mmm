import { caseYearQuery } from "./case-year.query.ts";
import { caseYearTargetsQuery } from "./case-year-targets.query.ts";

export const chainRequestsQuery = {
  CHAIN_REQUESTS: (route) => ({
    queryKey: ["getPageApi"],
    queryFn: async () => {
      const listCaseYear = await caseYearQuery.GET_LIST(route).queryFn();
      const listCaseYearTargets = await caseYearTargetsQuery
        .GET_LIST(route)
        .queryFn();

      return {
        listCaseYear,
        listCaseYearTargets,
      };
    },
  }),
};
