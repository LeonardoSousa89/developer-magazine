# Source relocation map

| Previous source path | Root-level source path |
| --- | --- |
| `apps/web/src/app/community/page.tsx` | `app/community/page.tsx` |
| `apps/web/src/app/globals.css` | `app/globals.css` |
| `apps/web/src/app/join/page.tsx` | `app/join/page.tsx` |
| `apps/web/src/app/knowledge/[id]/page.tsx` | `app/knowledge/[id]/page.tsx` |
| `apps/web/src/app/knowledge/page.tsx` | `app/knowledge/page.tsx` |
| `apps/web/src/app/layout.tsx` | `app/layout.tsx` |
| `apps/web/src/app/messages/page.tsx` | `app/messages/page.tsx` |
| `apps/web/src/app/not-found.tsx` | `app/not-found.tsx` |
| `apps/web/src/app/page.tsx` | `app/page.tsx` |
| `apps/web/src/app/people/[id]/page.tsx` | `app/people/[id]/page.tsx` |
| `apps/web/src/app/people/page.tsx` | `app/people/page.tsx` |
| `apps/web/src/app/projects/[id]/page.tsx` | `app/projects/[id]/page.tsx` |
| `apps/web/src/app/projects/page.tsx` | `app/projects/page.tsx` |
| `apps/web/src/app/search/page.tsx` | `app/search/page.tsx` |
| `apps/web/src/app/settings/page.tsx` | `app/settings/page.tsx` |
| `apps/web/src/app/signin/page.tsx` | `app/signin/page.tsx` |
| `apps/web/src/app/team/page.tsx` | `app/team/page.tsx` |
| `apps/web/src/presentation/components/ui.tsx` | `components/ui.tsx` |
| `apps/web/src/presentation/layout/shell.tsx` | `components/layout/shell.tsx` |
| `apps/web/src/presentation/legal/legal.tsx` | `components/legal/legal.tsx` |
| `apps/web/src/presentation/localization/i18n.tsx` | `providers/language-provider.tsx` |
| `apps/web/src/presentation/account/account.tsx` | `components/account/account.tsx` |
| `apps/web/src/presentation/community/community.tsx` | `components/community/community.tsx` |
| `apps/web/src/presentation/catalog/detail-actions.tsx` | `components/catalog/detail-actions.tsx` |
| `apps/web/src/presentation/catalog/discovery.tsx` | `components/catalog/discovery.tsx` |
| `apps/web/src/presentation/messages/messages.tsx` | `components/messages/messages.tsx` |
| `apps/web/src/presentation/search/search.tsx` | `components/search/search.tsx` |
| `apps/web/src/presentation/team/team.tsx` | `components/team/team.tsx` |
| `apps/web/src/application/localization/translations.ts` | `services/translations.ts` |
| `apps/web/src/application/localization/messages.i18n.json` | `mocks/messages.i18n.json` |
| `apps/web/src/domain/catalog/catalog.ts` | `repositories/catalog-repository.ts` |
| `apps/web/src/domain/catalog/people.json` | `mocks/people.json` |
| `apps/web/src/domain/catalog/evidence.ts` | `mocks/evidence.ts` |
| `apps/web/src/domain/catalog/media-credits.ts` | `shared/media-credits.ts` |
| `apps/web/src/infrastructure/browser/local-store.ts` | `hooks/local-store.ts` |

Catalog declarations are further separated into `mocks/catalog.ts`, `types/catalog.ts` and `repositories/catalog-repository.ts`. Evidence interfaces moved to `types/evidence.ts`; locale constants to `constants/locales.ts`; localization types to `types/localization.ts`; and `saveLocal` to `lib/browser-storage.ts`. Their implementations are retained.
