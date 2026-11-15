import { TranslatedText } from '../../components/localization/translated-text';
import { Suspense } from 'react';
import { SearchResults } from '../../components/search/search';
export const metadata = { title: 'Search' };
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container standalone">
          <TranslatedText text={'Loading search…'} />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
