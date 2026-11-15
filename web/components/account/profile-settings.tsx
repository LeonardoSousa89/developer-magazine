'use client';
import { TranslatedText } from '../localization/translated-text';
import { useTranslate } from '../../providers/language-provider';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, type PreviewSession } from '../../providers/preview-session';
import { externalUrl } from '../../services/external-urls';
import { Check, UserRound } from 'lucide-react';
import { ThemeControl } from '../layout/theme-control';
import { PageHeading, Sidebar } from '../ui';
import { usePersistedState } from '../../hooks/use-persisted-state';

const settingsTabs = ['Profile', 'Appearance', 'Preview data'];
export function ProfileSettings() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session === null) router.replace('/signin/');
  }, [router, session]);
  return session ? <AccountSettings key={session.subject} session={session} /> : null;
}

function AccountSettings({ session }: { session: PreviewSession }) {
  const translateText = useTranslate();
  const [tab, setTab] = useState('Profile'),
    [status, setStatus] = useState('');
  const profileKey = 'dm-local-profile:' + session.subject;
  const emptyProfile = {
    name: session.name,
    bio: '',
    location: session.location,
    website: '',
    projectName: session.projectName,
    projectUrl: session.projectUrl,
  };
  const [profile, setProfile] = usePersistedState(profileKey, emptyProfile);
  function selectSettingsTab(nextTab: string) {
    setTab(nextTab);
    setStatus('');
  }

  return (
    <div className="container app-frame">
      <Sidebar
        kind="Settings"
        items={settingsTabs}
        active={tab}
        onSelect={selectSettingsTab}
      />
      <section className="app-content">
        <PageHeading
          kicker="Your workspace"
          title="Settings"
          description="Manage your local profile and appearance preferences."
        />
        <div className="mobile-tabs filter-row">
          {settingsTabs.map((option) => (
            <button
              key={option}
              className={'pill ' + (tab === option ? 'selected' : '')}
              aria-pressed={tab === option}
              onClick={() => selectSettingsTab(option)}
            >
              <TranslatedText text={option} />
            </button>
          ))}
        </div>
        {tab === 'Profile' ? (
          <form
            className="panel form-stack settings-form"
            key={JSON.stringify(profile)}
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const projectName = String(data.get('projectName')).trim();
              const projectUrl = externalUrl(data.get('projectUrl'), true);
              const websiteInput = String(data.get('website')).trim();
              const website = websiteInput ? externalUrl(websiteInput, true) : undefined;
              if (
                !projectName ||
                !projectUrl ||
                projectUrl.username ||
                projectUrl.password ||
                (websiteInput && (!website || website.username || website.password))
              ) {
                setStatus('Enter a project name and valid HTTPS links.');
                return;
              }
              setProfile({
                projectName,
                projectUrl: projectUrl.href,
                name: String(data.get('name')).trim(),
                bio: String(data.get('bio')).trim(),
                location: String(data.get('location')).trim(),
                website: website?.href ?? '',
              });
              setStatus('Profile saved in this browser.');
            }}
          >
            <div className="section-heading">
              <div>
                <h2>
                  <TranslatedText text={'Profile information'} />
                </h2>
                <p className="muted">
                  <TranslatedText text={'Visible to you in this preview.'} />
                </p>
              </div>
              <span className="settings-avatar">
                <UserRound size={28} />
              </span>
            </div>
            <div className="form-grid">
              <label>
                <TranslatedText text={'Name'} />
                <input
                  name="name"
                  autoComplete="name"
                  defaultValue={profile.name}
                  maxLength={80}
                  required
                  placeholder={translateText('Your name')}
                />
              </label>
              <label>
                <TranslatedText text={'Username'} />
                <input
                  name="username"
                  value={session.username}
                  readOnly
                  maxLength={30}
                  pattern="[A-Za-z0-9_]+"
                  placeholder={translateText('Your username')}
                />
              </label>
            </div>
            <label>
              <TranslatedText text={'Bio'} />
              <textarea
                name="bio"
                rows={4}
                defaultValue={profile.bio}
                maxLength={400}
                placeholder={translateText('Tell us a little about your work.')}
              />
            </label>
            <div className="form-grid">
              <label>
                <TranslatedText text={'Location'} />
                <input
                  name="location"
                  defaultValue={profile.location}
                  maxLength={80}
                  placeholder={translateText('City, country')}
                />
              </label>
              <label>
                <TranslatedText text={'Website'} />
                <input
                  name="website"
                  type="url"
                  defaultValue={profile.website}
                  maxLength={200}
                  placeholder="https://example.com"
                />
              </label>
            </div>
            <div className="form-grid">
              <label>
                <TranslatedText text="Project name" />
                <input
                  name="projectName"
                  required
                  maxLength={100}
                  defaultValue={profile.projectName}
                />
              </label>
              <label>
                <TranslatedText text="Project URL" />
                <input
                  name="projectUrl"
                  type="url"
                  required
                  maxLength={250}
                  defaultValue={profile.projectUrl}
                />
              </label>
            </div>
            <button className="btn primary">
              <TranslatedText text={'Save changes'} /> <Check size={16} />
            </button>
          </form>
        ) : tab === 'Appearance' ? (
          <section className="panel form-stack">
            <h2>
              <TranslatedText text={'Appearance'} />
            </h2>
            <p>
              <TranslatedText
                text={'Choose a theme for every page, or follow your system preference.'}
              />
            </p>
            <ThemeControl full />
          </section>
        ) : (
          <section className="panel form-stack">
            <h2>
              <TranslatedText text={'Preview data'} />
            </h2>
            <p>
              <TranslatedText text={'Reset the profile for this demo account.'} />
            </p>
            <button
              className="btn secondary"
              onClick={() => {
                localStorage.removeItem(profileKey);
                setProfile(emptyProfile);
                setStatus('Demo profile reset.');
              }}
            >
              <TranslatedText text={'Reset demo profile'} />
            </button>
          </section>
        )}
        <p className="muted status-line" role="status">
          <TranslatedText text={status} />
        </p>
      </section>
    </div>
  );
}
