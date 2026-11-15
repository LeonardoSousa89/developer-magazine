import { portraits } from '../mocks/media';

export { branding } from '../mocks/media';

export function findPortrait(personId: string): string | undefined {
  return portraits.get(personId);
}
