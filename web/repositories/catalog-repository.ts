import type { Project } from '../types/catalog';

export { people, projects, articles, positions } from '../mocks/catalog';
export type { Person, Project, Article } from '../types/catalog';

export const contributedTo = (project: Project, person: string) =>
  (project.people as readonly string[]).includes(person);
