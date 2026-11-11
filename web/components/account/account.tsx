'use client';
import { T, useT } from '../../providers/language-provider';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Check, LockKeyhole, UserRound } from 'lucide-react';
import { ThemeControl } from '../layout/shell';
import { PageHeading, Sidebar } from '../ui';
import { saveLocal, useLocal } from '../../hooks/local-store';
const profileDefault = { name: '', username: '', bio: '', location: '', website: '' };
const options = ['Profile', 'Appearance', 'Preview data'];
export function Settings() {
  const t = useT();
  const [tab, setTab] = useState('Profile'),
    [status, setStatus] = useState('');
  const [profile, setProfile] = useLocal('dm-local-profile', profileDefault);
  return (
    <div className="container app-frame">
      <Sidebar
        kind="Settings"
        items={options}
        active={tab}
        onSelect={(x) => {
          setTab(x);
          setStatus('');
        }}
      />
      <section className="app-content">
        <PageHeading
          kicker="Your workspace"
          title="Settings"
          description="Manage your local profile and appearance preferences."
        />
        <div className="mobile-tabs filter-row">
          {options.map((x) => (
            <button
              key={x}
              className={'pill ' + (tab === x ? 'selected' : '')}
              aria-pressed={tab === x}
              onClick={() => {
                setTab(x);
                setStatus('');
              }}
            >
              <T text={x} />
            </button>
          ))}
        </div>
        {tab === 'Profile' ? (
          <form
            className="panel form-stack settings-form"
            key={JSON.stringify(profile)}
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              setProfile({
                name: String(data.get('name')).trim(),
                username: String(data.get('username')).trim(),
                bio: String(data.get('bio')).trim(),
                location: String(data.get('location')).trim(),
                website: String(data.get('website')).trim(),
              });
              setStatus('Profile saved in this browser.');
            }}
          >
            <div className="section-heading">
              <div>
                <h2>
                  <T text={'Profile information'} />
                </h2>
                <p className="muted">
                  <T text={'Visible to you in this preview.'} />
                </p>
              </div>
              <span className="settings-avatar">
                <UserRound size={28} />
              </span>
            </div>
            <div className="form-grid">
              <label>
                <T text={'Name'} />
                <input
                  name="name"
                  autoComplete="name"
                  defaultValue={profile.name}
                  maxLength={80}
                  required
                  placeholder={t('Your name')}
                />
              </label>
              <label>
                <T text={'Username'} />
                <input
                  name="username"
                  defaultValue={profile.username}
                  maxLength={30}
                  pattern="[A-Za-z0-9_]+"
                  placeholder={t('Your username')}
                />
              </label>
            </div>
            <label>
              <T text={'Bio'} />
              <textarea
                name="bio"
                rows={4}
                defaultValue={profile.bio}
                maxLength={400}
                placeholder={t('Tell us a little about your work.')}
              />
            </label>
            <div className="form-grid">
              <label>
                <T text={'Location'} />
                <input
                  name="location"
                  defaultValue={profile.location}
                  maxLength={80}
                  placeholder={t('City, country')}
                />
              </label>
              <label>
                <T text={'Website'} />
                <input
                  name="website"
                  type="url"
                  defaultValue={profile.website}
                  maxLength={200}
                  placeholder="https://example.com"
                />
              </label>
            </div>
            <button className="btn primary">
              <T text={'Save changes'} /> <Check size={16} />
            </button>
          </form>
        ) : tab === 'Appearance' ? (
          <section className="panel form-stack">
            <h2>
              <T text={'Appearance'} />
            </h2>
            <p>
              <T
                text={'Choose a theme for every page, or follow your system preference.'}
              />
            </p>
            <ThemeControl full />
          </section>
        ) : (
          <section className="panel form-stack">
            <h2>
              <T text={'Preview data'} />
            </h2>
            <p>
              <T
                text={
                  'Remove your saved local profile, application, replies, and discussion drafts from this device.'
                }
              />
            </p>
            <button
              className="btn secondary"
              onClick={() => {
                for (const key of [
                  'dm-local-profile',
                  'dm-join-draft',
                  'dm-inbox-drafts',
                  'dm-community-drafts',
                ])
                  localStorage.removeItem(key);
                setProfile(profileDefault);
                setStatus('Local drafts and profile cleared.');
              }}
            >
              <T text={'Clear local profile and drafts'} />
            </button>
          </section>
        )}
        <p className="muted status-line" role="status">
          <T text={status} />
        </p>
      </section>
    </div>
  );
}
export function Join() {
  const t = useT();
  const role = useSearchParams().get('role')?.slice(0, 100) ?? '';
  const [success, setSuccess] = useState(false),
    [error, setError] = useState('');
  return (
    <div className="container account-page">
      <div className="account-copy">
        <span className="kicker">
          <i /> <T text={'Built together'} />
        </span>
        <h1>
          <T text={'Bring your work'} />
          <br />
          <T text={'to the'} />{' '}
          <em>
            <T text={'story.'} />
          </em>
        </h1>
        <p>
          <T
            text={
              'Developer Magazine documents real contributions and the people who make them possible.'
            }
          />
        </p>
        <div className="account-note">
          <LockKeyhole size={18} />{' '}
          <T text={'Frontend preview · Drafts stay on this device.'} />
        </div>
      </div>
      <form
        className="panel form-stack"
        onSubmit={(e) => {
          e.preventDefault();
          const values = Object.fromEntries(new FormData(e.currentTarget));
          try {
            if (new URL(String(values.evidence)).protocol !== 'https:') {
              setError('Use an HTTPS link to your work.');
              return;
            }
            saveLocal('dm-join-draft', values);
            setError('');
            setSuccess(true);
          } catch {
            setError('This browser could not save your draft.');
          }
        }}
      >
        <h2>
          <T text={'Join the community'} />
        </h2>
        <p>
          <T text={'Document a project, article, or contribution others can inspect.'} />
        </p>
        <label>
          <T text={'Your name'} />
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            placeholder={t('Full name')}
          />
        </label>
        <label>
          <T text={'Role or specialty'} />
          <input
            name="role"
            required
            defaultValue={t(role)}
            maxLength={100}
            placeholder={t('e.g. Frontend developer')}
          />
        </label>
        <label>
          <T text={'Contribution'} />
          <textarea
            name="contribution"
            rows={3}
            required
            minLength={20}
            maxLength={650}
            placeholder={t('What did you build or contribute, and why did it matter?')}
          />
        </label>
        <label>
          <T text={'Supporting link'} />
          <input
            name="evidence"
            type="url"
            required
            maxLength={250}
            placeholder="https://github.com/…"
          />
        </label>
        <button className="btn primary">
          <T text={'Save contribution draft'} /> <ArrowRight size={16} />
        </button>
        {success && (
          <p role="status" className="inline-status">
            <Check size={17} /> <T text={'Draft saved locally. Nothing was submitted.'} />
          </p>
        )}
        {error && (
          <p role="alert">
            <T text={error} />
          </p>
        )}
        <Link className="back" href="/signin/">
          <T text={'Already exploring? Open the preview workspace'} />
        </Link>
      </form>
    </div>
  );
}
export function SignIn() {
  return (
    <div className="container account-page">
      <div className="account-copy">
        <span className="kicker">
          <i /> <T text={'Your workspace'} />
        </span>
        <h1>
          <T text={'Welcome'} />{' '}
          <em>
            <T text={'back.'} />
          </em>
        </h1>
        <p>
          <T
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
          <T text={'Sign in'} />
        </h2>
        <p>
          <T
            text={
              'Account sign-in isn’t connected in this frontend preview. You can still explore the workspace without providing credentials.'
            }
          />
        </p>
        <Link className="btn primary" href="/settings/">
          <T text={'Open preview workspace'} /> <ArrowRight size={16} />
        </Link>
        <Link className="back" href="/join/">
          <T text={'Create a contribution draft'} />
        </Link>
      </section>
    </div>
  );
}
