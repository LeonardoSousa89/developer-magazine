import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { loadSourceModule } from './helpers/load-source.mjs';

const { externalUrl, requiredExternalUrl } = loadSourceModule(
  path.resolve('services/external-urls.ts'),
);
const { findProfileUrl, findProjectLinks } = loadSourceModule(
  path.resolve('repositories/catalog-link-repository.ts'),
);
const { projects } = loadSourceModule(path.resolve('mocks/catalog.ts'));
const { profileEvidence } = loadSourceModule(path.resolve('mocks/evidence.ts'));

test('optional links tolerate absent and invalid URLs', () => {
  for (const value of [undefined, '', '/relative', 'javascript:alert(1)']) {
    assert.equal(externalUrl(value), undefined);
  }
  assert.equal(findProfileUrl('unlisted-person'), undefined);
  assert.equal(findProfileUrl('constructor'), undefined);
});

test('project and contribution URLs are required; drafts require HTTPS', () => {
  assert.throws(() => requiredExternalUrl('', 'project example'), /project example/);
  assert.equal(externalUrl('http://example.com', true), undefined);
  assert.equal(externalUrl('https://example.com', true)?.href, 'https://example.com/');
  for (const project of projects)
    requiredExternalUrl(findProjectLinks(project.id)?.url, project.id);
  for (const [personId, evidence] of Object.entries(profileEvidence)) {
    assert.ok(evidence.contributions.length > 0, personId);
    for (const contribution of evidence.contributions) {
      requiredExternalUrl(contribution.url, personId);
    }
  }
});
