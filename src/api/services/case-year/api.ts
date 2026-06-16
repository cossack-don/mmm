import { API } from '@/app/configs';

export const serviceCaseYear = {
  getList: (idProject: string | number) => {
    return API({
      url: `/project/${idProject}/case-year`,
      method: 'GET',
    });
  },

  deleteById: (idProject: number | string, idTaskQ: string | number) => {
    return API({
      url: `/project/${idProject}/case-year/${idTaskQ}`,
      method: 'DELETE',
    });
  },

  create: (
    idProject: string | number,
    name: string,
    keyQ: string,
    month: number
  ) => {
    return API({
      url: `/project/${idProject}/case-year`,
      method: 'POST',
      data: {
        name: name,
        keyQ: keyQ,
        month: month,
      },
    });
  },

  putById: (
    idProject: number | string,
    idTaskQ: string | number,
    name: string,
    pickedQ: any,
    month: any
  ) => {
    return API({
      url: `/project/${idProject}/case-year/${idTaskQ}`,
      method: 'PUT',
      data: {
        name: name,
        keyQ: pickedQ,
        month: month,
      },
    });
  },

  getById: (idProject: number | string, idTaskQ: string | number) => {
    return API({
      url: `/project/${idProject}/case-year/${idTaskQ}`,
      method: 'GET',
    });
  },
};
