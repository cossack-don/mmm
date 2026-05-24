export interface IProject {
  id: number;
  name: string;
  isDeleted: boolean;
}

export interface IProjectWithFieldsFront extends IProject {
  _isError: boolean;
  _isLoading: boolean;
  _isEditing: boolean;
}

export interface IProjectPage {
  data: IProjectWithFieldsFront[];
  total: number;
  limit: number;
  offset: number;
}

export interface IProjectsData {
  pageParams: number[];
  pages: IProjectPage[];
}
