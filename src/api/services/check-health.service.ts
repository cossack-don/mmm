import { API } from "@api/createAxios";

export const checkHealthService = {
  status: () => {
    return API({
      url: "/check-health",
      method: "GET",
    });
  },
};
