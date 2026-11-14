import { portraitCredits } from '../mocks/media-credits';
import { articleUrls, profileUrls, projectUrls } from '../mocks/catalog-links';

export function findProfileUrl(personId: string) {
  return Object.hasOwn(profileUrls, personId) ? profileUrls[personId] : undefined;
}

export function findProjectLinks(projectId: string) {
  return Object.hasOwn(projectUrls, projectId) ? projectUrls[projectId] : undefined;
}

export function findArticleUrl(articleId: string) {
  return Object.hasOwn(articleUrls, articleId) ? articleUrls[articleId] : undefined;
}

export function findPortraitCredit(personId: string) {
  return Object.hasOwn(portraitCredits, personId) ? portraitCredits[personId] : undefined;
}
