'use client';
import { ChevronDown, Monitor, Moon, Sun } from 'lucide-react';
import { TranslatedText } from '../localization/translated-text';
import { useTranslate } from '../../providers/language-provider';
import { useTheme } from '../../providers/theme-provider';
import type { Theme } from '../../stores/theme-store';

const themes: Record<Theme, typeof Sun> = { light: Sun, dark: Moon, system: Monitor };
export function ThemeControl({ full = false }: { full?: boolean }) {
  const translateText = useTranslate();
  const { choice, changeTheme } = useTheme();
  const Icon = themes[choice];
  return (
    <label className={full ? 'theme-control theme-full' : 'theme-control'}>
      <Icon size={16} />
      {full && (
        <span>
          <TranslatedText text={'Theme'} />
        </span>
      )}
      <select
        value={choice}
        aria-label={translateText('Appearance theme')}
        onChange={(event) => changeTheme(event.target.value as Theme)}
      >
        <option value="system">
          <TranslatedText text={'System'} />
        </option>
        <option value="light">
          <TranslatedText text={'Light'} />
        </option>
        <option value="dark">
          <TranslatedText text={'Dark'} />
        </option>
      </select>
      <ChevronDown size={12} />
    </label>
  );
}
