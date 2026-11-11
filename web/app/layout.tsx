import { LanguageProvider, T } from '../providers/language-provider';
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
  const p = localStorage.getItem('dm-theme');
  document.documentElement.dataset.theme =
    p === 'light' || p === 'dark'
      ? p
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
        <LanguageProvider>
          <a className="skip" href="#main">
            <T text={'Skip to content'} />
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
