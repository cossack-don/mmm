import { projectsKeys } from './projects.keys.ts';
import { projectsUpdateQuery } from './projects.update.ts';
import { projectsDeleteQuery } from './projects.delete.ts';
import { projectsGetQuery } from './projects.get.ts';
import { projectsCreateQuery } from './projects.create.ts';

export {
  projectsKeys,
  projectsGetQuery,
  projectsUpdateQuery, // PUT /PATCH
  projectsDeleteQuery,
  projectsCreateQuery,
};
