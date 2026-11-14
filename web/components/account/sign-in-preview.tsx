'use client';
import Link from 'next/link';
import { TranslatedText } from '../localization/translated-text';
import { ArrowRight, LockKeyhole } from 'lucide-react';

export function SignInPreview() {
  return (
    <div className="container account-page">
      <div className="account-copy">
        <span className="kicker">
          <i /> <TranslatedText text={'Your workspace'} />
        </span>
        <h1>
          <TranslatedText text={'Welcome'} />{' '}
          <em>
            <TranslatedText text={'back.'} />
          </em>
        </h1>
        <p>
          <TranslatedText
            text={
              'Pick up where you left off with your local profile, preferences, and saved drafts.'
            }
          />
        </p>
      </div>
      <section className="panel form-stack">
        <span className="settings-avatar">
          <LockKeyhole size={24} />
        </span>
        <h2>
          <TranslatedText text={'Sign in'} />
        </h2>
        <p>
          <TranslatedText
            text={
              'Account sign-in isn’t connected in this frontend preview. You can still explore the workspace without providing credentials.'
            }
          />
        </p>
        <Link className="btn primary" href="/settings/">
          <TranslatedText text={'Open preview workspace'} /> <ArrowRight size={16} />
        </Link>
        <Link className="back" href="/join/">
          <TranslatedText text={'Create a contribution draft'} />
        </Link>
      </section>
    </div>
  );
}
