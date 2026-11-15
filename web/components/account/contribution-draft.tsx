'use client';
import { ProjectFields, readProject } from './project-fields';
import Link from 'next/link';
import {
  RegistrationProfileFields,
  readRegistrationProfile,
} from './registration-profile';
import { TranslatedText } from '../localization/translated-text';
import { useState } from 'react';
import { Check, ArrowRight, LockKeyhole } from 'lucide-react';
import {
  BirthDateFields,
  birthDateEligibility,
  RegistrationCredentialFields,
  readRegistrationCredentials,
  registerLocalAccount,
} from './local-credentials';

export function ContributionDraft() {
  const [success, setSuccess] = useState(false),
    [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const underage = birthDateEligibility(birthDate) === 'underage';
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
          <TranslatedText text={'Local preview · Registration stays in this browser.'} />
        </div>
      </div>
      <form
        method="post"
        className="panel form-stack registration-form"
        onSubmit={async (event) => {
          event.preventDefault();
          if (pending || underage) return;
          setSuccess(false);
          const fields = new FormData(event.currentTarget);
          const credentials = readRegistrationCredentials(fields);
          if (credentials.error) {
            setError(credentials.error);
            return;
          }
          const project = readProject(fields);
          if (!project) {
            setError('Enter a project name and a valid HTTPS project URL.');
            return;
          }
          const details = readRegistrationProfile(fields);
          if (details.error) {
            setError(details.error);
            return;
          }
          setPending(true);
          try {
            if (!(await registerLocalAccount(credentials, project, details))) {
              setError('This email or username is already registered in this browser.');
              return;
            }
            setError('');
            setSuccess(true);
          } catch {
            setError('This browser could not save your profile.');
          } finally {
            setPending(false);
          }
        }}
      >
        <h2>
          <TranslatedText text={'Join the community'} />
        </h2>
        <p>
          <TranslatedText text={'Register your profile with a project you worked on.'} />
        </p>
        <p>
          <TranslatedText text="Use a test password for this local preview." />
        </p>
        <fieldset className="form-stack registration-fieldset" disabled={underage}>
          <RegistrationCredentialFields />
        </fieldset>
        <BirthDateFields onDateChange={setBirthDate} underage={underage} />
        <fieldset className="form-stack registration-fieldset" disabled={underage}>
          <ProjectFields />
          <RegistrationProfileFields />
          <button className="btn primary" disabled={pending || underage}>
            <TranslatedText text={'Create local account'} /> <ArrowRight size={16} />
          </button>
        </fieldset>
        {success && !underage && (
          <p role="status" className="inline-status">
            <Check size={17} />{' '}
            <TranslatedText
              text={'Profile saved in this browser. You can now sign in locally.'}
            />
          </p>
        )}
        {error && !underage && (
          <p role="alert">
            <TranslatedText text={error} />
          </p>
        )}
        <Link className="back" href="/signin/">
          <TranslatedText text={'Sign in'} />
        </Link>
      </form>
    </div>
  );
}
