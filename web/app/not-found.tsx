import { TranslatedText } from '../components/localization/translated-text';
import Link from 'next/link';
import { PageHeading } from '../components/ui';
export default function NotFound() {
  return (
    <div className="container standalone">
      <PageHeading
        kicker="404 / Page not found"
        title="This page isn’t in the directory."
        description="Head back to Developer Magazine to find people, projects, and knowledge."
      />
      <Link className="btn primary" href="/">
        <TranslatedText text={'Go home'} />
      </Link>
    </div>
  );
}
