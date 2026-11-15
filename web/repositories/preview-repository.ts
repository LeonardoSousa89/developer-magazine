import { featuredContributorIds, spotlightPersonIds } from '../mocks/community';
import { people } from './catalog-repository';

export { communityEvents, discussionPrompts } from '../mocks/community';
export { previewNotification, threads } from '../mocks/messages';

const peopleById = new Map(people.map((person) => [person.id, person]));

function selectPeople(ids: readonly string[]) {
  return ids.map((id) => peopleById.get(id)).filter((person) => person !== undefined);
}

export const spotlight = selectPeople(spotlightPersonIds);
export const featuredContributors = selectPeople(featuredContributorIds);
