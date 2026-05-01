import { API } from "./createAxios.ts";

export const serviceTodos = {
  getList: () => {
    return API({
      url: "/todos",
      method: "GET",
    });
  },
  deleteById: (id: number | string) => {
    return API({
      url: `/todos/${id}`,
      method: "DELETE",
    });
  },
  createTodo: (name: string, description: string) => {
    return API({
      url: `/todos`,
      method: "POST",
      data: {
        name: name,
        description: description,
      },
    });
  },
};
