# Root-level Next.js frontend architecture

## Structure

This is a single Next.js application. `app/`, `components/`, `constants/`,
`hooks/`, `lib/`, `mocks/`, `providers/`, `public/`, `repositories/`, `services/`,
`shared/` and `types/` are directly inside the project root. The Next.js,
TypeScript, PostCSS, Tailwind and npm configuration files are at the same level.

There is no nested workspace application or `src/` directory in the development
package. `docs/` and `tests/` retain development documentation and automated checks.
`preview-dev.mjs` starts Next.js and accepts the preview runner's host/port flags.

## Responsibilities and dependency rules

| Layer | Responsibility | Allowed local dependencies |
| --- | --- | --- |
| `app` | Next.js routing, metadata, static parameters, layout, page composition and global CSS | app, components, providers, repositories, services, shared, types |
| `components` | Reusable UI and feature views | components, providers, repositories, services, hooks, lib, constants, shared, types |
| `providers` | React language context and document localization | providers, repositories, services, constants, types |
| `hooks` | Existing React browser-state adapter | hooks, lib, types |
| `lib` | Browser storage utility | lib, types |
| `repositories` | Existing catalog exports and contribution relationship rule | repositories, mocks, types |
| `services` | Pure translation lookup and interpolation | services, constants, mocks, types |
| `mocks` | Existing bundled frontend content and dictionaries | mocks, types |
| `constants` | Locale identifiers and display names | constants, types |
| `shared` | Media attribution metadata | shared, types |
| `types` | Catalog, profile-evidence and localization contracts | types, mocks, constants |

`tests/architecture.test.mjs` verifies these boundaries, resolves relative imports
and rejects browser globals or framework dependencies in the framework-independent
layers. `types/catalog.ts` intentionally retains the existing inferred types from
the bundled catalog; `types/localization.ts` retains locale inference from the
constant map. Type-only imports are erased at runtime.

## Preservation decisions

- Existing declarations were relocated without changing their bodies. Imports,
  exports and development paths were updated for the root structure.
- Catalog literals live in `mocks/catalog.ts`. The repository re-exports the same
  arrays and retains the existing `contributedTo` rule. No new lookup, loading,
  filtering, network or persistence behavior is introduced.
- The translation service retains its fallback and interpolation rules. Locale
  names and types were moved into their corresponding layers.
- `useLocal` remains in `hooks/local-store.ts`; `saveLocal` is in
  `lib/browser-storage.ts` and remains re-exported for existing consumers.
- The existing language provider and UI helpers remain together so their behavior
  and public component exports are unchanged.
- Next.js now writes its static export directly to root `out/`. The workspace-only
  export copy step is unnecessary. The development launcher moved to the root.
- Design, routes, translations, assets, storage keys and handlers are unchanged.
  The approved README is byte-identical to the supplied document.

## Future changes

Keep view code in components and route-specific composition in app. Put shared
contracts in types, data access behind repositories and reusable operations in
services. React state adapters belong in hooks and cross-tree state in providers.
Do not add network or backend implementations until that work is explicitly in
scope. This package remains a frontend-only application.
