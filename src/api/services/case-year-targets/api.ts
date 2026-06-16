import { API } from '@/app/configs';

export const serviceCaseYearTargets = {
  getList: (idProject: string | number) => {
    return API({
      url: `/project/${idProject}/case-year-targets`,
      method: 'GET',
    });
  },

  deleteById: (idProject: number | string, idTarget: string | number) => {
    return API({
      url: `/project/${idProject}/case-year-targets/${idTarget}`,
      method: 'DELETE',
    });
  },

  create: (idProject: string | number, name: string) => {
    return API({
      url: `/project/${idProject}/case-year-targets`,
      method: 'POST',
      data: {
        name: name,
      },
    });
  },

  putById: (
    idProject: number | string,
    idTarget: string | number,
    name: string
  ) => {
    return API({
      url: `/project/${idProject}/case-year-targets/${idTarget}`,
      method: 'PUT',
      data: {
        name: name,
      },
    });
  },

  getById: (idProject: number | string, idTarget: string | number) => {
    return API({
      url: `/project/${idProject}/case-year-targets/${idTarget}`,
      method: 'GET',
    });
  },
};
