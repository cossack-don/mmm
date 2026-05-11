import { todoAdapter } from "./step_2_todo.adapter";

// TODO Базовая бизнес логика и отдачи данных в view

export const todoQuery = {
  GET_LIST: (route) => ({
    queryKey: ["getListExample"],
    queryFn: async () => {
      const data = await todoAdapter.getList(route.params.idProject as string);

      return data;
    },
  }),
};
