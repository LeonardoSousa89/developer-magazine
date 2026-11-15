import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { loadSourceModule } from './helpers/load-source.mjs';

const { translate, localeNames } = loadSourceModule(
  path.resolve('services/translations.ts'),
);
const messages = JSON.parse(readFileSync('mocks/messages.i18n.json', 'utf8'));

test('the seven supported locales remain available', () => {
  assert.deepEqual(Object.keys(localeNames), [
    'en',
    'pt-BR',
    'es',
    'ja',
    'fr',
    'de',
    'zh-Hans',
  ]);
});

test('every dictionary entry has six translations and preserves interpolation tokens', () => {
  const tokens = (text) =>
    [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
  for (const [english, translations] of Object.entries(messages)) {
    for (const locale of Object.keys(localeNames).filter((locale) => locale !== 'en')) {
      assert.ok(translations[locale]?.trim(), `${locale}: ${english}`);
      assert.deepEqual(
        tokens(translations[locale]),
        tokens(english),
        `${locale}: ${english}`,
      );
    }
  }
});

test('translation lookup, source fallback and interpolation retain their behavior', () => {
  assert.equal(translate('pt-BR', 'People'), 'Pessoas');
  assert.equal(translate('en', 'People'), 'People');
  assert.equal(translate('ja', 'An unknown source key'), 'An unknown source key');
  assert.equal(translate('en', '{count} results', { count: 8 }), '8 results');
  assert.equal(translate('en', '{count} results'), '{count} results');
});
