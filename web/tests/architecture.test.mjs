import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import ts from 'typescript';

const sourceRoot = path.resolve('.');
const dependencies = {
  app: ['app', 'components', 'providers', 'repositories', 'services', 'shared', 'types'],
  components: [
    'components',
    'providers',
    'stores',
    'repositories',
    'services',
    'hooks',
    'lib',
    'constants',
    'shared',
    'types',
  ],
  providers: [
    'providers',
    'lib',
    'stores',
    'repositories',
    'services',
    'constants',
    'types',
  ],
  hooks: ['hooks', 'lib', 'types'],
  lib: ['lib', 'types', 'stores', 'constants'],
  stores: ['stores'],
  repositories: ['repositories', 'mocks', 'types'],
  services: ['services', 'constants', 'mocks', 'types', 'repositories'],
  mocks: ['mocks', 'types'],
  constants: ['constants', 'types'],
  shared: ['shared', 'types'],
  types: ['types', 'mocks', 'constants'],
};
const frameworkIndependent = [
  'stores',
  'repositories',
  'services',
  'mocks',
  'constants',
  'shared',
  'types',
];

function filesIn(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const file = path.join(directory, entry);
    return statSync(file).isDirectory() ? filesIn(file) : [file];
  });
}

test('source dependencies respect the frontend layers', () => {
  for (const file of Object.keys(dependencies)
    .flatMap((folder) => filesIn(path.join(sourceRoot, folder)))
    .filter((file) => /\.tsx?$/.test(file))) {
    const layer = path.relative(sourceRoot, file).split(path.sep)[0];
    assert.ok(dependencies[layer], `Unknown source layer: ${file}`);
    const code = readFileSync(file, 'utf8');
    const parsed = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);
    function check(node) {
      if (frameworkIndependent.includes(layer) && ts.isIdentifier(node)) {
        assert.ok(
          !['window', 'document', 'localStorage', 'sessionStorage', 'navigator'].includes(
            node.text,
          ),
          `${layer} cannot access browser globals: ${file}`,
        );
      }
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        const specifier = node.moduleSpecifier.text;
        if (specifier.startsWith('.')) {
          const target = path.resolve(path.dirname(file), specifier);
          assert.ok(
            ['', '.ts', '.tsx', '.json', '/index.ts', '/index.tsx'].some((suffix) =>
              existsSync(target + suffix),
            ),
            `Unresolved import in ${file}: ${specifier}`,
          );
          const targetLayer = path.relative(sourceRoot, target).split(path.sep)[0];
          assert.ok(
            dependencies[layer].includes(targetLayer),
            `${layer} cannot depend on ${targetLayer}: ${file}`,
          );
        } else if (frameworkIndependent.includes(layer)) {
          assert.fail(`${layer} must be framework independent: ${specifier}`);
        }
      }
      ts.forEachChild(node, check);
    }
    check(parsed);
  }
});
