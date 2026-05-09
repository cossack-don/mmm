import { API } from "../createAxios";

export const serviceCaseWeek = {
  getList: (idProject: string | number) => {
    return API({
      url: `/project/${idProject}/case-week`,
      method: "GET",
    });
  },
  // createTaskQ: (
  //   idProject: string | number,
  //   name: string,
  //   keyQ: string,
  //   month: number,
  // ) => {
  //   return API({
  //     url: `/project/${idProject}/case-year`,
  //     method: "POST",
  //     data: {
  //       name: name,
  //       keyQ: keyQ,
  //       month: month,
  //     },
  //   });
  // },
  // deleteById: (idProject: number | string, idTaskQ: string | number) => {
  //   return API({
  //     url: `/project/${idProject}/case-year/${idTaskQ}`,
  //     method: "DELETE",
  //   });
  // },
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
