import { ArrowUpRight } from 'lucide-react';
import {
  findArticleUrl,
  findProfileUrl,
  findPortraitCredit,
  findProjectLinks,
} from '../../repositories/catalog-link-repository';
import { externalUrl, requiredExternalUrl } from '../../services/external-urls';
import type { PortraitCredit } from '../../types/media-credit';
import type { Contribution, PublicLink } from '../../types/evidence';
import { TranslatedText } from '../localization/translated-text';
import { RepoLink, SourceLink } from '../ui';

export function ProfileReferences({
  personId,
  links = [],
}: {
  personId: string;
  links?: readonly PublicLink[];
}) {
  const primaryUrl = externalUrl(findProfileUrl(personId));
  const credit = findPortraitCredit(personId);
  const references = new Map<string, string>();

  if (primaryUrl) {
    const isWikipedia =
      primaryUrl.hostname === 'wikipedia.org' ||
      primaryUrl.hostname.endsWith('.wikipedia.org');
    references.set(primaryUrl.href, isWikipedia ? 'Wikipedia biography' : 'Website');
  }

  for (const { url, label } of links) {
    const href = externalUrl(url)?.href;
    if (href && !references.has(href)) references.set(href, label);
  }

  return (
    <section id="references" className="panel">
      <h2>
        <TranslatedText text="References" />
      </h2>
      {references.size > 0 && (
        <div className="stack">
          {Array.from(references, ([href, label]) => (
            <SourceLink key={href} href={href}>
              <TranslatedText text={label} />
            </SourceLink>
          ))}
        </div>
      )}
      {credit && <PortraitAttribution credit={credit} />}
    </section>
  );
}

function PortraitAttribution({ credit }: { credit: PortraitCredit }) {
  const sourceHref = externalUrl(credit.sourceUrl)?.href;
  const licenseHref = externalUrl(credit.licenseUrl)?.href;
  return (
    <p className="photo-credit">
      <TranslatedText text="Portrait:" />{' '}
      {sourceHref ? (
        <a href={sourceHref} target="_blank" rel="noreferrer">
          <TranslatedText text={credit.author} />
        </a>
      ) : (
        <TranslatedText text={credit.author} />
      )}{' '}
      ·{' '}
      {licenseHref ? (
        <a href={licenseHref} target="_blank" rel="noreferrer">
          <TranslatedText text={credit.license} />
        </a>
      ) : (
        <TranslatedText text={credit.license} />
      )}{' '}
      <TranslatedText text="· Resized" />
    </p>
  );
}

export function ProfileContributions({
  contributions,
}: {
  contributions: readonly Contribution[];
}) {
  return (
    <section className="panel" id="contributions">
      <h2>
        <TranslatedText text="Projects & contributions" />
      </h2>
      <div className="detail-list">
        {contributions.map(({ title, description, url }) => {
          const href = requiredExternalUrl(url, `contribution ${title}`);
          return (
            <div key={JSON.stringify([url, title])}>
              <a href={href} target="_blank" rel="noreferrer">
                <TranslatedText text={title} />
                <ArrowUpRight size={15} />
              </a>
              <p>
                <TranslatedText text={description} />
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ProjectDocumentation({ projectId }: { projectId: string }) {
  const links = findProjectLinks(projectId);
  const website = requiredExternalUrl(links?.url, `project ${projectId}`);
  const repository = externalUrl(links?.source)?.href;

  return (
    <section className="panel" id="documentation">
      <h2>
        <TranslatedText text="Documentation" />
      </h2>
      <div className="stack">
        <SourceLink href={website}>
          <TranslatedText text="Project website" />
        </SourceLink>
        {repository && <RepoLink href={repository} />}
      </div>
    </section>
  );
}

export function ArticleReference({ articleId }: { articleId: string }) {
  const href = externalUrl(findArticleUrl(articleId))?.href;
  if (!href) return null;

  return (
    <>
      <h2>
        <TranslatedText text="Read further" />
      </h2>
      <SourceLink href={href}>
        <TranslatedText text="Reference and further reading" />
      </SourceLink>
    </>
  );
}
