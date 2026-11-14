'use client';
import { externalUrl } from '../../services/external-urls';
import Link from 'next/link';
import { TranslatedText } from '../localization/translated-text';
import { useTranslate } from '../../providers/language-provider';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Check, ArrowRight, LockKeyhole } from 'lucide-react';
import { writeStoredJson } from '../../lib/browser-storage';

export function ContributionDraft() {
  const translateText = useTranslate();
  const role = useSearchParams().get('role')?.slice(0, 100) ?? '';
  const [success, setSuccess] = useState(false),
    [error, setError] = useState('');
  return (
    <div className="container account-page">
      <div className="account-copy">
        <span className="kicker">
          <i /> <TranslatedText text={'Built together'} />
        </span>
        <h1>
          <TranslatedText text={'Bring your work'} />
          <br />
          <TranslatedText text={'to the'} />{' '}
          <em>
            <TranslatedText text={'story.'} />
          </em>
        </h1>
        <p>
          <TranslatedText
            text={
              'Developer Magazine documents real contributions and the people who make them possible.'
            }
          />
        </p>
        <div className="account-note">
          <LockKeyhole size={18} />{' '}
          <TranslatedText text={'Frontend preview · Drafts stay on this device.'} />
        </div>
      </div>
      <form
        className="panel form-stack"
        onSubmit={(event) => {
          event.preventDefault();
          const values = Object.fromEntries(new FormData(event.currentTarget));
          if (!externalUrl(values.evidence, true)) {
            setError('Use an HTTPS link to your work.');
            return;
          }
          try {
            writeStoredJson('dm-join-draft', values);
            setError('');
            setSuccess(true);
          } catch {
            setError('This browser could not save your draft.');
          }
        }}
      >
        <h2>
          <TranslatedText text={'Join the community'} />
        </h2>
        <p>
          <TranslatedText
            text={'Document a project, article, or contribution others can inspect.'}
          />
        </p>
        <label>
          <TranslatedText text={'Your name'} />
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            placeholder={translateText('Full name')}
          />
        </label>
        <label>
          <TranslatedText text={'Role or specialty'} />
          <input
            name="role"
            required
            defaultValue={translateText(role)}
            maxLength={100}
            placeholder={translateText('e.g. Frontend developer')}
          />
        </label>
        <label>
          <TranslatedText text={'Contribution'} />
          <textarea
            name="contribution"
            rows={3}
            required
            minLength={20}
            maxLength={650}
            placeholder={translateText(
              'What did you build or contribute, and why did it matter?',
            )}
          />
        </label>
        <label>
          <TranslatedText text={'Supporting link'} />
          <input
            name="evidence"
            type="url"
            required
            maxLength={250}
            placeholder="https://github.com/…"
          />
        </label>
        <button className="btn primary">
          <TranslatedText text={'Save contribution draft'} /> <ArrowRight size={16} />
        </button>
        {success && (
          <p role="status" className="inline-status">
            <Check size={17} />{' '}
            <TranslatedText text={'Draft saved locally. Nothing was submitted.'} />
          </p>
        )}
        {error && (
          <p role="alert">
            <TranslatedText text={error} />
          </p>
        )}
        <Link className="back" href="/signin/">
          <TranslatedText text={'Already exploring? Open the preview workspace'} />
        </Link>
      </form>
    </div>
  );
}
