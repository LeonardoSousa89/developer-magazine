import { TranslatedText } from '../../components/localization/translated-text';
import { Suspense } from 'react';
import { ContributionDraft } from '../../components/account/contribution-draft';
export const metadata = { title: 'Join' };
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container standalone">
          <TranslatedText text={'Loading contribution form…'} />
        </div>
      }
    >
      <ContributionDraft />
    </Suspense>
  );
}
