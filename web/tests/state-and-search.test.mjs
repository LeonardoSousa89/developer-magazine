import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { loadSourceModule } from './helpers/load-source.mjs';

const { createThemeStore, resolveTheme } = loadSourceModule(
  path.resolve('stores/theme-store.ts'),
);
const { indexSearch, matchSearch } = loadSourceModule(
  path.resolve('services/catalog-search.ts'),
);

test('theme actions synchronize subscribers without notifying for unchanged state', () => {
  const store = createThemeStore();
  const otherStore = createThemeStore();
  const header = [];
  const settings = [];
  store.subscribe(() => header.push(store.getSnapshot().choice));
  const unsubscribe = store.subscribe(() => settings.push(store.getSnapshot().choice));

  store.dispatch({ type: 'theme/selected', choice: 'dark' });
  const snapshot = store.getSnapshot();
  store.dispatch({ type: 'theme/selected', choice: 'dark' });
  assert.equal(store.getSnapshot(), snapshot);
  assert.deepEqual(header, ['dark']);
  assert.deepEqual(settings, ['dark']);
  assert.equal(otherStore.getSnapshot().choice, 'system');

  unsubscribe();
  store.dispatch({ type: 'theme/selected', choice: 'light' });
  assert.deepEqual(header, ['dark', 'light']);
  assert.deepEqual(settings, ['dark']);
});

test('system theme changes affect effective color only when system is selected', () => {
  const store = createThemeStore();
  assert.equal(resolveTheme(store.getSnapshot()), 'light');
  store.dispatch({ type: 'system/changed', dark: true });
  assert.equal(resolveTheme(store.getSnapshot()), 'dark');
  store.dispatch({ type: 'theme/selected', choice: 'light' });
  assert.equal(resolveTheme(store.getSnapshot()), 'light');
  store.dispatch({ type: 'theme/selected', choice: 'system' });
  assert.equal(resolveTheme(store.getSnapshot()), 'dark');
});

test('search preserves translated and original matching, order and category filters', () => {
  const items = [
    { title: 'Computer science', category: 'A' },
    { title: 'Computer networks', category: 'B' },
  ];
  let translationCalls = 0;
  const index = indexSearch(
    items,
    (item) => [item.title],
    (title) => {
      translationCalls += 1;
      return title === 'Computer science'
        ? 'Ciência da computação'
        : 'Redes de computadores';
    },
  );
  assert.deepEqual(matchSearch(index, 'COMPUTER'), items);
  assert.deepEqual(matchSearch(index, 'CIÊNCIA'), [items[0]]);
  assert.deepEqual(
    matchSearch(index, '', (item) => item.category === 'B'),
    [items[1]],
  );
  assert.deepEqual(matchSearch(index, 'missing'), []);
  assert.equal(translationCalls, items.length);
});
