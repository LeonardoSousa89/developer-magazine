'use client';
import type { ComponentProps } from 'react';
import { useTranslate } from '../../providers/language-provider';
import type { Values } from '../../types/localization';

export function TranslatedText({ text, values }: { text: string; values?: Values }) {
  return useTranslate()(text, values);
}
export function LocalizedNavigation({
  'aria-label': label,
  ...props
}: ComponentProps<'nav'>) {
  const translateText = useTranslate();
  return <nav {...props} aria-label={label ? translateText(label) : undefined} />;
}
