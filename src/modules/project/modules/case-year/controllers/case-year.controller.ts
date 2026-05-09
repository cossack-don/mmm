import { serviceCaseYear } from "../../../../../api";

export const caseYearController = {
  getList: async (idProject: string) => {
    const list = [[], [], [], []];

    const { data } = await serviceCaseYear.getList(idProject);

    data.forEach((item: any) => {
      if (item.keyQ === "Q1") {
        list[0].push(item);
      } else if (item.keyQ === "Q2") {
        list[1].push(item);
      } else if (item.keyQ === "Q3") {
        list[2].push(item);
      } else if (item.keyQ === "Q4") {
        list[3].push(item);
      }
    });

    return list;
  },
  createTask: async (
    idProject: string,
    name: string,
    pickedQ: string,
    month: string | number,
  ) => {
    await serviceCaseYear.createTaskQ(idProject, name, `Q${pickedQ}`, month);
  },

  deleteById: async (idProject: string, idTask: string) => {
    await serviceCaseYear.deleteById(idProject, idTask);
  },

  putById: async (idProject: string, idTask: string, name: string) => {
    await serviceCaseYear.putById(idProject, idTask, name);
  },
};
