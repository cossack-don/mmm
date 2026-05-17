import { API } from "@/api/createAxios";

export const caseWeekService = {
  getList: (idProject: string | number) => {
    return API({
      url: `/project/${idProject}/case-week`,
      method: "GET",
    });
  },
  createTaskDay: (idProject: string | number, name: string, day: string) => {
    return API({
      url: `/project/${idProject}/case-week`,
      method: "POST",
      data: {
        name: name,
        day: day,
      },
    });
  },
  deleteById: (idProject: number | string, idTask: string | number) => {
    return API({
      url: `/project/${idProject}/case-week/${idTask}`,
      method: "DELETE",
    });
  },
  // getById: (idProject: number | string, idTaskQ: string | number) => {
  //   return API({
  //     url: `/project/${idProject}/case-year/${idTaskQ}`,
  //     method: "GET",
  //   });
  // },
  // putById: (
  //   idProject: number | string,
  //   idTaskQ: string | number,
  //   name: string,
  // ) => {
  //   return API({
  //     url: `/project/${idProject}/case-year/${idTaskQ}`,
  //     method: "PUT",
  //     data: {
  //       name: name,
  //     },
  //   });
  // },
};
