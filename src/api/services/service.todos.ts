import { API } from "../createAxios";

export const serviceTodos = {
  getList: (idProject: any, limit = 10, offset = 10, total = null) => {
    console.log(1);
    return API({
      url: `/project/${idProject}/todos`,
      params: {
        limit: limit,
        offset: offset,
        total: total,
      },
      method: "GET",
    });
  },
  deleteById: (idProject, id: number | string) => {
    return API({
      url: `/project/${idProject}/todos/${id}`,
      method: "DELETE",
    });
  },
  // createTodo: (idProject, name: string, description: string) => {
  //   return API({
  //     url: `/project/${idProject}/todos`,
  //     method: "POST",
  //     data: {
  //       name: name,
  //       description: description,
  //     },
  //   });
  // },
  // putByIdTodo: (idProject, name: string, description: string) => {
  //   return API({
  //     url: `/project/${idProject}/todos`,
  //     method: "POST",
  //     data: {
  //       name: name,
  //       description: description,
  //     },
  //   });
  // },
};
