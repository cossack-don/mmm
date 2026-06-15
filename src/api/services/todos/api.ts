import { API } from '@/app/configs';

export const serviceTodos = {
  getList: (idProject: any, limit = 10, offset = 0, total = null) => {
    return API({
      url: `/project/${idProject}/todos`,
      params: {
        limit: limit,
        offset: offset,
        total: total,
      },
      method: 'GET',
    });
  },
  deleteById: (idProject: string, id: number | string) => {
    return API({
      url: `/project/${idProject}/todos/${id}`,
      method: 'DELETE',
    });
  },
  createTodo: (idProject: any, name: string, description: string) => {
    return API({
      url: `/project/${idProject}/todos`,
      method: 'POST',
      data: {
        name: name,
        description: description,
      },
    });
  },
  //TODO не работает фронт + бек починить и сделать патч
  // putByIdTodo: (idProject: any, name: string, description: string) => {
  //   return API({
  //     url: `/project/${idProject}/todos`,
  //     method: 'PUT',
  //     data: {
  //       name: name,
  //       description: description,
  //     },
  //   });
  // },
};
