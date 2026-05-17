import { projectsKeys } from "./projects.keys.query.ts";
import { projectsUpdateQuery } from "./projects.update.query.ts";
import { projectsDeleteQuery } from "./projects.delete.query";
import { projectsGetQuery } from "./projects.get.query.ts";
import { projectsCreateQuery } from "./projects.create.query.ts";

export {
  projectsKeys,
  projectsGetQuery,
  projectsUpdateQuery, // PUT /PATCH
  projectsDeleteQuery,
  projectsCreateQuery,
};
