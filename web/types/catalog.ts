import type { people, projects, articles } from '../mocks/catalog';

export type Person = (typeof people)[number];

export type Project = (typeof projects)[number];

export type Article = (typeof articles)[number];
