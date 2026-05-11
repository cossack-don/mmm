import { serviceTodos } from "../../../../../api";

export const todosController = {
  getList: async (idProject: string) => {
    console.log(11);
    const { data } = await serviceTodos.getList(idProject);

    return data;
  },
  // createTask: async (
  //   idProject: string,
  //   name: string,
  //   pickedQ: string,
  //   month: string | number,
  // ) => {
  //   await serviceCaseYear.createTaskQ(idProject, name, `Q${pickedQ}`, month);
  // },
  //
  deleteById: async (idProject: string, idTask: string) => {
    await serviceTodos.deleteById(idProject, idTask);
  },
  //
  // putById: async (idProject: string, idTask: string, name: string) => {
  //   await serviceCaseYear.putById(idProject, idTask, name);
  // },
};
