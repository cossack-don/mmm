import { API } from "../createAxios";

export const serviceProject = {
  getList: () => {
    return API({
      url: "/project",
      method: "GET",
    });
  },
  createProject: (name: string) => {
    return API({
      url: `/project`,
      method: "POST",
      data: {
        name: name,
      },
    });
  },
  deleteById: (id: number | string) => {
    return API({
      url: `/project/${id}`,
      method: "DELETE",
    });
  },
  getById: (id: number | string) => {
    return API({
      url: `/project/${id}`,
      method: "GET",
    });
  },
};
