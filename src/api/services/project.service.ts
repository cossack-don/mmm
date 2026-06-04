import { API } from '@/api/createAxios';

export const projectService = {
  getList: (
    limit: number = 10,
    offset: number = 0,
    search?: string,
    sortBy?: string,
    sortOrder?: string
  ) => {
    return API({
      url: '/project',
      method: 'GET',
      params: {
        limit: limit,
        offset: offset,
        search: search,
        sortBy: undefined,
        sortOrder: undefined,
      },
    });
  },
  createProject: (name: string) => {
    return API({
      url: `/project`,
      method: 'POST',
      data: {
        name: name,
      },
    });
  },
  deleteById: (id: number | string) => {
    return API({
      url: `/project/${id}`,
      method: 'DELETE',
    });
  },
  getById: (id: number | string) => {
    return API({
      url: `/project/${id}`,
      method: 'GET',
    });
  },

  updateById: (id: number | string, name: string) => {
    return API({
      url: `/project/${id}`,
      method: 'PUT',
      data: {
        name: name,
      },
    });
  },
};
