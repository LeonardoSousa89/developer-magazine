'use client';
import { useId, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslate } from '../../providers/language-provider';

type DocumentKind = 'terms' | 'privacy';
const terms = [
  [
    'Scope of this preview',
    'Developer Magazine is a reference and community preview. It offers public reference material and browser-only tools. The preview does not create a Developer Magazine account, publish drafts, or send messages to other users.',
  ],
  [
    'Acceptable use and content',
    'Use the preview lawfully. Do not impersonate others, infringe their rights, introduce harmful code, or attempt unauthorized access. Use only material you have permission to use. A draft does not transfer ownership of your work. Third-party works and links remain subject to their own terms and licenses.',
  ],
  [
    'Availability and your rights',
    'Reference material may be incomplete or change. Verify important information with its original source. Nothing in these terms limits rights or remedies that cannot be waived under applicable law.',
  ],
] as const;
const privacy = [
  [
    'What this notice covers',
    'This notice covers the Developer Magazine preview maintained by the project owner. The hosting provider delivers the preview and manages access controls. Its privacy policy explains its separate processing, legal bases, retention, and international transfers. External sites have their own privacy policies.',
  ],
  [
    'What is stored and why',
    'The app uses browser storage to remember your language and theme, profile fields, drafts, follows, saved projects, and message preferences. These values support the features you choose and are not sent by the app to a Developer Magazine backend. The app adds no advertising or analytics trackers.',
  ],
  [
    'Hosting, sharing and retention',
    'The hosting service may process technical data such as IP addresses, access logs, and requested URLs for delivery and security. Global search terms and selected roles can appear in URLs and browser history; avoid entering sensitive information. Local values remain until removed or cleared by your browser. Hosting data follows the provider’s policy.',
  ],
  [
    'Published reference material',
    'Public profiles use the sources linked on their pages for reference and educational purposes. If a profile concerns you, you can request a correction or ask the maintainer to review its inclusion.',
  ],
  [
    'Access, correction and deletion',
    'Use Settings to view or correct your local profile. In Settings → Preview data, you can clear the local profile and drafts. To remove remaining preferences and saved activity, clear this site’s data in your browser. Clear browser history separately if needed.',
  ],
  [
    'Data rights and requests',
    'Depending on the applicable law, you may request information about processing and sharing, confirmation and access, correction, deletion, anonymization or blocking, restriction, portability, and objection. Where consent applies, you can withdraw it and ask about the consequences of refusing it. Where applicable, you can also request review of solely automated decisions and complain to your data protection authority. In Brazil, consult the LGPD and the ANPD; in the EEA, consult your local supervisory authority.',
  ],
  [
    'Who to contact',
    'For this preview or its published content, contact the project maintainer. The project’s issue tracker is public: use it only to ask for a private contact channel, never to post personal data or a rights request. If you contact the maintainer privately, the information you provide is used to respond and kept as needed to handle the request or meet legal obligations. For hosting data, use the hosting provider’s privacy contact.',
  ],
] as const;

export function LegalControls() {
  const translateText = useTranslate();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [kind, setKind] = useState<DocumentKind>('terms');
  const headingId = useId();
  const titles = { terms: 'Terms of Use', privacy: 'Privacy Policy' } as const;

  function open(document: DocumentKind, button: HTMLButtonElement) {
    trigger.current = button;
    setKind(document);
    dialog.current?.showModal();
  }

  return (
    <>
      <button
        className="legal-trigger"
        type="button"
        aria-haspopup="dialog"
        onClick={(event) => open('terms', event.currentTarget)}
      >
        {translateText(titles.terms)}
      </button>
      <button
        className="legal-trigger"
        type="button"
        aria-haspopup="dialog"
        onClick={(event) => open('privacy', event.currentTarget)}
      >
        {translateText(titles.privacy)}
      </button>
      <dialog
        className="legal-dialog"
        ref={dialog}
        aria-labelledby={headingId}
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="legal-dialog-content">
          <header>
            <h2 id={headingId}>{translateText(titles[kind])}</h2>
            <button
              type="button"
              className="icon-button"
              aria-label={translateText('Close document')}
              onClick={() => dialog.current?.close()}
            >
              <X size={18} />
            </button>
          </header>
          <div className="legal-document">
            {(kind === 'terms' ? terms : privacy).map(([heading, body]) => (
              <section key={heading}>
                <h3>{translateText(heading)}</h3>
                <p>{translateText(body)}</p>
              </section>
            ))}
            {kind === 'privacy' && (
              <ul>
                <li>
                  <a
                    href="https://github.com/LeonardoSousa89/developer-magazine/issues"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {translateText('Project maintainer contact')}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {translateText('ANPD: rights under the LGPD')}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.edpb.europa.eu/topics/key-gdpr-concepts/data-subject-rights_en"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {translateText('EDPB: rights under the GDPR')}
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
