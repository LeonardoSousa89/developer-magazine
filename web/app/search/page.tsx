import { T } from '../../providers/language-provider';
import { Suspense } from 'react';
import { SearchResults } from '../../components/search/search';
export const metadata = { title: 'Search' };
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container standalone">
          <T text={'Loading search…'} />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
