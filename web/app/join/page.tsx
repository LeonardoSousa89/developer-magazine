import { T } from '../../providers/language-provider';
import { Suspense } from 'react';
import { Join } from '../../components/account/account';
export const metadata = { title: 'Join' };
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container standalone">
          <T text={'Loading contribution form…'} />
        </div>
      }
    >
      <Join />
    </Suspense>
  );
}
