import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import ts from 'typescript';

function loadSourceModule(filename) {
  const source = readFileSync(filename, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  });
  const nativeRequire = createRequire(filename);
  const localRequire = (specifier) => {
    if (specifier.startsWith('.') && !specifier.endsWith('.json')) {
      return loadSourceModule(path.resolve(path.dirname(filename), specifier + '.ts'));
    }
    return nativeRequire(specifier);
  };
  const module = { exports: {} };
  new Function('require', 'exports', 'module', outputText)(
    localRequire,
    module.exports,
    module,
  );
  return module.exports;
}
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
