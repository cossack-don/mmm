import { serviceCaseYearTargets } from "../../../../../api/services";

export const caseYearTargetsController = {
  getList: async (idProject: string) => {
    const { data } = await serviceCaseYearTargets.getList(idProject);
    return data;
  },
  createTarget: async (idProject: string, name: string) => {
    await serviceCaseYearTargets.createTarget(idProject, name);
  },

  deleteById: async (idProject: string, idTarget: string) => {
    await serviceCaseYearTargets.deleteById(idProject, idTarget);
  },

  putById: async (idProject: string, idTarget: string, name: string) => {
    await serviceCaseYearTargets.putById(idProject, idTarget, name);
  },
};
