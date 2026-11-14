import { LocalizedMetadata } from '../components/localization/localized-metadata';
import { LanguageProvider } from '../providers/language-provider';
import { TranslatedText } from '../components/localization/translated-text';
import { ThemeProvider } from '../providers/theme-provider';
import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import { Header, Footer } from '../components/layout/shell';

export const metadata: Metadata = {
  title: {
    default: 'Developer Magazine — People. Projects. Knowledge.',
    template: '%s | Developer Magazine',
  },
  description: 'Discover the people, projects and ideas behind technology.',
  icons: { icon: '/media/mark.webp' },
};
const bootTheme = `
try {
  const savedTheme = localStorage.getItem('dm-theme');
  document.documentElement.dataset.theme =
    savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
} catch {}
`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootTheme }} />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <LocalizedMetadata />
            <a className="skip" href="#main">
              <TranslatedText text={'Skip to content'} />
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
