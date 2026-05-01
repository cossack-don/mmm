import { API } from "./createAxios";

export const serviceCheckHealthApp = {
  status: () => {
    return API({
      url: "/check-health",
      method: "GET",
    });
  },
};
