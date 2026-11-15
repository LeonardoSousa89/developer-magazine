# Root-level Next.js frontend architecture

## Structure

This is a single Next.js application. `app/`, `components/`, `constants/`,
`hooks/`, `lib/`, `mocks/`, `providers/`, `public/`, `repositories/`, `services/`,
`shared/`, `stores/` and `types/` are directly inside the web root. The Next.js,
TypeScript, PostCSS, Tailwind and npm configuration files are at the same level.

There is no nested workspace application or `src/` directory in the development
package. `docs/` and `tests/` retain development documentation and automated checks.
Run `npm run dev` from `web/` to start Next.js.

## Responsibilities and dependency rules

| Layer | Responsibility | Allowed local dependencies |
| --- | --- | --- |
| `app` | Next.js routing, metadata, static parameters, layout, page composition and global CSS | app, components, providers, repositories, services, shared, types |
| `components` | Reusable UI and feature views | components, providers, repositories, services, hooks, lib, constants, shared, stores, types |
| `providers` | React bindings for shared theme and locale, plus localized metadata | providers, lib, stores, repositories, services, constants, types |
| `hooks` | Existing React browser-state adapter | hooks, lib, types |
| `lib` | Browser storage and theme integration | lib, types, stores |
| `repositories` | Existing catalog exports and contribution relationship rule | repositories, mocks, types |
| `stores` | Framework-independent Flux state and actions | stores |
| `services` | Pure translation and catalog matching | services, constants, mocks, types |
| `mocks` | Existing bundled frontend content and dictionaries | mocks, types |
| `constants` | Locale identifiers and display names | constants, types |
| `shared` | Media attribution metadata | shared, types |
| `types` | Catalog, profile-evidence and localization contracts | types, mocks, constants |

`tests/architecture.test.mjs` verifies these boundaries, resolves relative imports
and rejects browser globals or framework dependencies in the framework-independent
layers. `types/catalog.ts` intentionally retains the existing inferred types from
the bundled catalog; `types/localization.ts` retains locale inference from the
constant map. Type-only imports are erased at runtime.

## Baseline preservation decisions

- Existing declarations were relocated without changing their bodies. Imports,
  exports and development paths were updated for the root structure.
- Catalog literals live in `mocks/catalog.ts`. The repository re-exports the same
  arrays and retains the existing `contributedTo` rule. No new lookup, loading,
  filtering, network or persistence behavior is introduced.
- The translation service retains its fallback and interpolation rules. Locale
  names and types were moved into their corresponding layers.
- `usePersistedState` owns React state; JSON reads and writes are handled by
  `lib/browser-storage.ts`.
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
scope. The application in `web/` is frontend-only; sibling API and mobile files are outside this refactor.

## Shared theme state and catalog search

Theme is shared by the header and settings. The flow is: a control dispatches a
typed action, the store updates its snapshot, and React reads the selected choice
through `useSyncExternalStore`. The provider owns one store instance and one
browser adapter. The adapter applies the resolved theme and translates system
preference or cross-tab storage changes into actions. The existing `dm-theme`
key and pre-hydration script remain in use. The server snapshot is deterministic.

`stores/` is framework independent. `lib/theme-browser.ts` owns browser effects,
and `providers/theme-provider.tsx` connects the store to React. Forms, search
inputs and UI toggles remain local. Language stays in Context; its value is
stable across route changes, and metadata updates subscribe separately.

`services/catalog-search.ts` indexes original and translated fields once per
mounted search view and language. Directory views only index their own dataset.
The general search reuses results while the user edits an unsubmitted query.
Search fields, matching semantics, category filters and ordering are preserved.


## Naming and responsibilities

- `TranslatedText` renders a translated message; `useTranslate` supplies the
  translator for attributes and other non-JSX text.
- The language provider owns locale state. Locale persistence, document metadata,
  and the language selector each have their own module. The page-title service
  resolves route titles without reading the DOM.
- Profile settings, contribution drafts, and the sign-in preview have independent
  modules. The shared theme store continues to use Flux.
