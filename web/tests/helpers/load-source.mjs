import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

export function loadSourceModule(filename) {
  const source = readFileSync(filename, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
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
