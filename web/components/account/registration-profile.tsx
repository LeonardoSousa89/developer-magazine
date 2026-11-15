import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from 'libphonenumber-js/min';
import { useMemo, useState } from 'react';
import { useLanguage } from '../../providers/language-provider';
import { TranslatedText } from '../localization/translated-text';

const countryCodes = getCountries();

function parseContactPhone(phone: string, country: CountryCode) {
  const number = parsePhoneNumberFromString(phone, {
    defaultCountry: country,
    extract: false,
  });
  return number?.country === country && number.isValid() ? number.number : undefined;
}

export function readRegistrationProfile(fields: FormData) {
  const value = (key: string) => String(fields.get(key) ?? '').trim();
  const country = countryCodes.find((code) => code === value('country'));
  const address = value('address');
  const city = value('city');
  if (!country || !address || !city)
    return { error: 'Enter your country, address, and city.' } as const;

  const phoneCountry = countryCodes.find((code) => code === value('phoneCountry'));
  const phone = value('phone');
  const contactPhone =
    phone && phoneCountry ? parseContactPhone(phone, phoneCountry) : undefined;
  if (phone && !contactPhone)
    return {
      error: 'Select the phone country and enter a valid phone number for it.',
    } as const;

  return {
    profile: {
      fullName: value('fullName'),
      profession: value('profession'),
      role: value('role'),
      country,
      contribution: value('contribution'),
    },
    contact: {
      address,
      city,
      region: value('region'),
      postalCode: value('postalCode'),
      phoneCountry: contactPhone ? phoneCountry : undefined,
      phone: contactPhone,
    },
  };
}

export function RegistrationProfileFields() {
  const { locale } = useLanguage();
  const [country, setCountry] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('');
  const countries = useMemo(() => {
    const names = new Intl.DisplayNames([locale], { type: 'region' });
    return countryCodes
      .map((code) => ({ code, name: names.of(code) ?? code }))
      .sort((a, b) => a.name.localeCompare(b.name, locale));
  }, [locale]);
  return (
    <>
      <h3>
        <TranslatedText text="Optional profile details" />
      </h3>
      <label>
        <TranslatedText text="Full name" />
        <input name="fullName" autoComplete="name" maxLength={80} />
      </label>
      <label>
        <TranslatedText text="Profession" />
        <input name="profession" maxLength={100} />
      </label>
      <label>
        <TranslatedText text="Role or specialty" />
        <input name="role" autoComplete="organization-title" maxLength={100} />
      </label>
      <label>
        <TranslatedText text="Contribution" />
        <textarea name="contribution" rows={3} maxLength={650} />
      </label>
      <h3>
        <TranslatedText text="Address details" />
      </h3>
      <label>
        <TranslatedText text="Country" />
        <select
          name="country"
          autoComplete="country"
          required
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          <option value="">—</option>
          {countries.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <TranslatedText text="Address" />
        <input name="address" required autoComplete="street-address" maxLength={200} />
      </label>
      <label>
        <TranslatedText text="City" />
        <input name="city" required autoComplete="address-level2" maxLength={100} />
      </label>
      <label>
        <TranslatedText text="State or region" />
        <input name="region" autoComplete="address-level1" maxLength={100} />
      </label>
      <label>
        <TranslatedText text="Postal code" />
        <input name="postalCode" autoComplete="postal-code" maxLength={20} />
      </label>
      <h3>
        <TranslatedText text="Optional contact details" />
      </h3>
      <label>
        <TranslatedText text="Phone country code" />
        <select
          name="phoneCountry"
          value={phoneCountry || country}
          onChange={(event) => setPhoneCountry(event.target.value)}
        >
          <option value="">—</option>
          {countries.map(({ code, name }) => (
            <option key={code} value={code}>
              {name} (+{getCountryCallingCode(code)})
            </option>
          ))}
        </select>
      </label>
      <label>
        <TranslatedText text="Contact phone" />
        <input name="phone" type="tel" autoComplete="tel" maxLength={30} />
      </label>
    </>
  );
}
