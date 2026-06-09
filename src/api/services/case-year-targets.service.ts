import { API } from '@/app/configs';

export const caseYearTargetsService = {
  getList: (idProject: string | number) => {
    return API({
      url: `/project/${idProject}/case-year-targets`,
      method: 'GET',
    });
  },
  createTarget: (idProject: string | number, name: string) => {
    return API({
      url: `/project/${idProject}/case-year-targets`,
      method: 'POST',
      data: {
        name: name,
      },
    });
  },
  deleteById: (idProject: number | string, idTarget: string | number) => {
    return API({
      url: `/project/${idProject}/case-year-targets/${idTarget}`,
      method: 'DELETE',
    });
  },
  getById: (idProject: number | string, idTarget: string | number) => {
    return API({
      url: `/project/${idProject}/case-year-targets/${idTarget}`,
      method: 'GET',
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
};
