'use client';
import Link from 'next/link';
import { TranslatedText } from '../localization/translated-text';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setSession } from '../../providers/preview-session';
import {
  CredentialFields,
  matchLocalCredentials,
  readCredentials,
} from './local-credentials';

export function SignInPreview() {
  const [error, setError] = useState('');
  const router = useRouter();
  const [pending, setPending] = useState(false);
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
          <TranslatedText text={'Enter your email or username and password.'} />
        </p>
      </div>
      <form
        method="post"
        className="panel form-stack"
        onSubmit={async (event) => {
          event.preventDefault();
          if (pending) return;
          const credentials = readCredentials(new FormData(event.currentTarget));
          if (!credentials) {
            setError('Enter your email or username and password.');
            return;
          }

          setPending(true);
          try {
            const payload = await matchLocalCredentials(credentials);
            if (payload) {
              setSession(payload);
              router.replace('/community/');
              return;
            }
            setError('Email, username, or password does not match a local account.');
          } catch {
            setError('Email, username, or password does not match a local account.');
          } finally {
            setPending(false);
          }
        }}
      >
        <span className="settings-avatar">
          <LockKeyhole size={24} />
        </span>
        <h2>
          <TranslatedText text={'Sign in'} />
        </h2>
        <p>
          <TranslatedText
            text={
              'This preview checks your local registration. It does not authenticate an online account.'
            }
          />
        </p>
        <CredentialFields />
        <button className="btn primary" disabled={pending}>
          <TranslatedText text="Sign in" /> <ArrowRight size={16} />
        </button>
        {error && (
          <p role="alert">
            <TranslatedText text={error} />
          </p>
        )}
        <Link className="back" href="/join/">
          <TranslatedText text="Join the community" />
        </Link>
      </form>
    </div>
  );
}
