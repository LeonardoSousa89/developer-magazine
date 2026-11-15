import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { loadSourceModule } from './helpers/load-source.mjs';

const { getPageTitle } = loadSourceModule(path.resolve('services/page-title.ts'));

test('route titles resolve for sections and catalog details', () => {
  assert.equal(getPageTitle('/people/'), 'People');
  assert.equal(getPageTitle('/people/turing/'), 'Alan Turing');
  assert.equal(getPageTitle('/projects/react/'), 'React');
  assert.equal(
    getPageTitle('/knowledge/distributed-systems/'),
    'Understanding distributed systems',
  );
  assert.equal(getPageTitle('/people/unknown/'), undefined);
  assert.equal(getPageTitle('/'), undefined);
});
