import { readStoredJson, writeStoredJson } from '../../lib/browser-storage';
import { Eye, EyeOff } from 'lucide-react';
import { useId, useState, type ComponentProps } from 'react';
import { useTranslate } from '../../providers/language-provider';
import { TranslatedText } from '../localization/translated-text';
import type { readProject } from './project-fields';

import type { readRegistrationProfile } from './registration-profile';

type RegistrationDetails = Exclude<
  ReturnType<typeof readRegistrationProfile>,
  { error: string }
>;
type Project = NonNullable<ReturnType<typeof readProject>>;
type LocalAccount = Project &
  Partial<RegistrationDetails> & {
    identifier?: string;
    email?: string;
    username?: string;
    birthDate?: string;
    salt: string;
    verifier: string;
  };

const accountsKey = 'dm-preview-accounts';

export function readCredentials(fields: FormData) {
  const identifier = String(fields.get('identifier') ?? '')
    .trim()
    .toLowerCase();
  const password = String(fields.get('password') ?? '');
  return identifier && password ? { identifier, password } : undefined;
}

type Credentials = NonNullable<ReturnType<typeof readCredentials>>;

export const underageRegistrationMessage =
  'Registration cannot continue because you are under 18.';

export function birthDateEligibility(birthDate: string, today = new Date()) {
  if (birthDate.startsWith('0000') || !/^\d{4}-\d{2}-\d{2}$/.test(birthDate))
    return 'invalid';
  const birth = new Date(birthDate + 'T00:00:00.000Z');
  if (!Number.isFinite(birth.getTime()) || birth.toISOString().slice(0, 10) !== birthDate)
    return 'invalid';

  const monthAndDay = (today.getMonth() + 1) * 100 + today.getDate();
  const enteredDate = Number(birthDate.replaceAll('-', ''));
  if (enteredDate > today.getFullYear() * 10000 + monthAndDay) return 'invalid';
  const cutoff = (today.getFullYear() - 18) * 10000 + monthAndDay;
  return enteredDate <= cutoff ? 'eligible' : 'underage';
}

export function readRegistrationCredentials(fields: FormData, today = new Date()) {
  const email = String(fields.get('email') ?? '')
    .trim()
    .toLowerCase();
  const username = String(fields.get('username') ?? '')
    .trim()
    .toLowerCase();
  const password = String(fields.get('password') ?? '');
  const birthDate = String(fields.get('birthDate') ?? '');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[^\s@]+$/.test(username))
    return { error: 'Enter a valid email and a username without spaces or @.' } as const;
  if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password))
    return {
      error: 'Use at least 8 characters, including an uppercase letter and a number.',
    } as const;
  if (password !== fields.get('confirmPassword'))
    return { error: 'Passwords do not match.' } as const;
  const eligibility = birthDateEligibility(birthDate, today);
  if (eligibility === 'underage') return { error: underageRegistrationMessage } as const;
  if (eligibility === 'invalid')
    return {
      error: 'The entered date of birth is not eligible for registration.',
    } as const;

  return { email, username, password, birthDate };
}

type RegistrationCredentials = Exclude<
  ReturnType<typeof readRegistrationCredentials>,
  { error: string }
>;

function accountHasIdentifier(account: LocalAccount, identifier: string) {
  return (
    account.identifier === identifier ||
    account.email === identifier ||
    account.username === identifier
  );
}

async function passwordVerifier(password: string, salt: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: encoder.encode(salt), iterations: 600_000 },
    key,
    256,
  );
  return Array.from(new Uint8Array(bits), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}

export async function registerLocalAccount(
  credentials: RegistrationCredentials,
  project: Project,
  details: RegistrationDetails,
) {
  const salt = crypto.randomUUID();
  const verifier = await passwordVerifier(credentials.password, salt);
  const accounts = readStoredJson<LocalAccount[]>(accountsKey) ?? [];
  if (
    accounts.some(
      (account) =>
        accountHasIdentifier(account, credentials.email) ||
        accountHasIdentifier(account, credentials.username),
    )
  )
    return false;
  writeStoredJson(accountsKey, [
    ...accounts,
    {
      ...project,
      ...details,
      email: credentials.email,
      username: credentials.username,
      birthDate: credentials.birthDate,
      salt,
      verifier,
    },
  ]);
  return true;
}

export async function matchLocalCredentials(credentials: Credentials) {
  const account = readStoredJson<LocalAccount[]>(accountsKey)?.find((account) =>
    accountHasIdentifier(account, credentials.identifier),
  );
  return (
    !!account &&
    account.verifier === (await passwordVerifier(credentials.password, account.salt))
  );
}

type PasswordFieldProps = Omit<ComponentProps<'input'>, 'id' | 'type'> & {
  label: string;
};

function PasswordField({ label, ...inputProps }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  const translate = useTranslate();
  const action = translate(visible ? 'Hide password' : 'Show password');

  return (
    <div className="password-field">
      <label htmlFor={id}>
        <TranslatedText text={label} />
      </label>
      <div className="password-field-control">
        <input {...inputProps} id={id} type={visible ? 'text' : 'password'} />
        <button
          type="button"
          className="password-visibility"
          aria-label={action}
          title={action}
          aria-controls={id}
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <EyeOff size={18} aria-hidden="true" />
          ) : (
            <Eye size={18} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}

export function CredentialFields() {
  return (
    <>
      <label>
        <TranslatedText text="Email or username" />
        <input name="identifier" autoComplete="username" required maxLength={254} />
      </label>
      <PasswordField
        label="Password"
        name="password"
        autoComplete="current-password"
        required
        maxLength={128}
      />
    </>
  );
}

export function suggestPassword() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const ceiling = 256 - (256 % alphabet.length);
  while (true) {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    const candidate = Array.from(bytes)
      .filter((byte) => byte < ceiling)
      .slice(0, 16)
      .map((byte) => alphabet[byte % alphabet.length])
      .join('');
    if (
      candidate.length === 16 &&
      /[A-Z]/.test(candidate) &&
      /[a-z]/.test(candidate) &&
      /[0-9]/.test(candidate)
    )
      return candidate;
  }
}

const usernameSuggestions = [
  'rudmouncian',
  'mayni789',
  'jimmy_ork789',
  'liberano',
  'rune_walker',
  'pixelronin',
  'neko_arcade',
  'vega_prime',
  'draxbyte',
  'nova_shard',
  'quasar_jinx',
  'bytepaladin',
  'miralune',
  'astra_fox',
  'kharn789',
  'cobaltwitch',
  'lunar_mage',
  'goblin_jim',
  'orion_sable',
  'arcane_link',
  'dusk_ranger',
  'echo_knight',
  'nimbus_77',
  'frost_rogue',
  'kyronix',
  'void_sprite',
  'sira_nova',
  'techno_ork',
  'nebula_rider',
  'chroma_wolf',
  'starforge_99',
  'zelda_byte',
  'raven_panel',
  'atlas_jedi',
  'kaiju_404',
  'noir_raccoon',
  'laser_golem',
  'neon_wraith',
  'shard_alchemist',
  'rogue_panel',
  'astroloki',
  'turbo_gnome',
  'vanta_wizard',
  'night_pixel',
  'solari_quest',
  'portal_monk',
  'mech_warden',
  'ink_phantom',
  'gwen_pixel',
  'kira_moon',
  'sonic_rune',
  'rift_pilot',
];

function formatBirthDate(date: { day: string; month: string; year: string }) {
  return date.year.length === 4 && date.day && date.month
    ? `${date.year}-${date.month.padStart(2, '0')}-${date.day.padStart(2, '0')}`
    : '';
}

export function BirthDateFields({
  onDateChange,
  underage,
}: {
  onDateChange: (value: string) => void;
  underage: boolean;
}) {
  const [date, setDate] = useState({ day: '', month: '', year: '' });
  const parts = [
    { name: 'day', label: 'Day', length: 2, autoComplete: 'bday-day' },
    { name: 'month', label: 'Month', length: 2, autoComplete: 'bday-month' },
    { name: 'year', label: 'Year', length: 4, autoComplete: 'bday-year' },
  ] as const;

  return (
    <fieldset
      className="birth-date-fields"
      aria-describedby={underage ? 'registration-age-alert' : undefined}
    >
      <legend>
        <TranslatedText text="Date of birth" />
      </legend>
      <div className="birth-date-parts">
        {parts.map(({ name, label, length, autoComplete }) => (
          <label key={name}>
            <TranslatedText text={label} />
            <input
              type="text"
              inputMode="numeric"
              pattern={name === 'year' ? '[0-9]{4}' : '[0-9]{1,2}'}
              autoComplete={autoComplete}
              required
              maxLength={length}
              value={date[name]}
              onChange={(event) => {
                const value = event.target.value.replace(/[^0-9]/g, '').slice(0, length);
                const nextDate = { ...date, [name]: value };
                setDate(nextDate);
                onDateChange(formatBirthDate(nextDate));
              }}
            />
          </label>
        ))}
      </div>
      <input type="hidden" name="birthDate" value={formatBirthDate(date)} />
      {underage && (
        <p id="registration-age-alert" role="alert">
          <TranslatedText text={underageRegistrationMessage} />
        </p>
      )}
    </fieldset>
  );
}

export function RegistrationCredentialFields() {
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  return (
    <>
      <label>
        <TranslatedText text="Email" />
        <input name="email" type="email" autoComplete="email" required maxLength={254} />
      </label>
      <label>
        <TranslatedText text="Username" />
        <input
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          required
          maxLength={64}
          aria-describedby="username-suggestions-hint"
        />
        <small id="username-suggestions-hint">
          <TranslatedText text="Generate a suggestion or type your own username." />
        </small>
      </label>
      <button
        type="button"
        className="btn secondary"
        onClick={() => {
          setUsername(usernameSuggestions[suggestionIndex]);
          setSuggestionIndex((suggestionIndex + 1) % usernameSuggestions.length);
        }}
      >
        <TranslatedText text="Suggest a username" />
      </button>
      <PasswordField
        label="Password"
        name="password"
        autoComplete="new-password"
        required
        minLength={8}
        maxLength={128}
        value={password}
        aria-describedby="registration-password-hint"
        onChange={(event) => setPassword(event.target.value)}
      />
      <small id="registration-password-hint">
        <TranslatedText text="Use at least 8 characters, including an uppercase letter and a number." />
      </small>
      <PasswordField
        label="Confirm password"
        name="confirmPassword"
        autoComplete="new-password"
        required
        minLength={8}
        maxLength={128}
        value={confirmation}
        onChange={(event) => setConfirmation(event.target.value)}
      />
      <button
        type="button"
        className="btn secondary"
        onClick={() => {
          const suggestion = suggestPassword();
          setPassword(suggestion);
          setConfirmation(suggestion);
        }}
      >
        <TranslatedText text="Suggest a strong password" />
      </button>
    </>
  );
}
