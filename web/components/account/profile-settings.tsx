'use client';
import { TranslatedText } from '../localization/translated-text';
import { useTranslate } from '../../providers/language-provider';
import { useState } from 'react';
import { Check, UserRound } from 'lucide-react';
import { ThemeControl } from '../layout/theme-control';
import { PageHeading, Sidebar } from '../ui';
import { usePersistedState } from '../../hooks/use-persisted-state';

const emptyProfile = { name: '', username: '', bio: '', location: '', website: '' };
const settingsTabs = ['Profile', 'Appearance', 'Preview data'];
export function ProfileSettings() {
  const translateText = useTranslate();
  const [tab, setTab] = useState('Profile'),
    [status, setStatus] = useState('');
  const [profile, setProfile] = usePersistedState('dm-local-profile', emptyProfile);
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
                  defaultValue={profile.username}
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
              <TranslatedText
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
                setProfile(emptyProfile);
                setStatus('Local drafts and profile cleared.');
              }}
            >
              <TranslatedText text={'Clear local profile and drafts'} />
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
