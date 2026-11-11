# Root-level project validation

## Preservation

All 35 original modules were checked against their relocated files. All 121
original top-level declarations and directives matched after import/export and
format normalization, including declarations split into dedicated root layers.
CSS and JSON content are unchanged. Media assets and the approved root README
are byte-identical to the previous files.

## Checks

- `npm test`: four architecture and localization tests.
- `npm run typecheck`: strict TypeScript checking.
- `npm run format:check`: readable source formatting.
- `npm run build`: all existing routes and static detail pages.

Development-server and clean ZIP verification results are recorded below. These checks cover the requested structural change; no new backend,
legal review or complete accessibility audit is claimed.

## Development server

Root `npm run dev` served the application successfully. Browser checks passed for
home, people-directory navigation and filtering, a person-detail route, settings,
local profile persistence after reload, all seven language options, light/dark
selection, and opening/closing both legal dialogs. The existing layout and media
were inspected in the browser.

## Clean ZIP verification

The archive was extracted into a separate directory. `npm ci`, all four tests,
TypeScript checking, formatting validation and the full static build/export passed.
Next.js generated all 32 pages. The ZIP contains root-level development source and
configuration, without workspaces, nested `apps/web`, `src`, dependencies or build
output.
