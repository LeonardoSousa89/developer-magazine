import { articles, people, projects } from '../repositories/catalog-repository';

const routes: Record<string, string> = {
  community: 'Community',
  join: 'Join',
  knowledge: 'Knowledge',
  messages: 'Messages',
  people: 'People',
  projects: 'Projects',
  search: 'Search',
  settings: 'Settings',
  signin: 'Sign in',
  team: 'Team',
};

export function getPageTitle(pathname: string) {
  const [route, slug] = pathname.split('/').filter(Boolean);
  if (!slug) return routes[route];
  switch (route) {
    case 'people':
      return people.find((person) => person.id === slug)?.name;
    case 'projects':
      return projects.find((project) => project.id === slug)?.name;
    default:
      return articles.find((article) => article.id === slug)?.title;
  }
}
