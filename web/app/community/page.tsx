import Link from 'next/link';
import { TranslatedText } from '../../components/localization/translated-text';
import { Community } from '../../components/community/community';
export const metadata = { title: 'Community' };
export default function Page() {
  return (
    <>
      <div className="container wiki-community-link">
        <Link className="btn secondary" href="/contribute/">
          <TranslatedText text="Community contributions" />
        </Link>
      </div>
      <Community />
    </>
  );
}
