import { WikiEditLink, WikiRevision } from '../../../components/wiki/wiki-detail';
import {
  LocalizedNavigation,
  TranslatedText,
} from '../../../components/localization/translated-text';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, BookOpen, Code2, MapPin } from 'lucide-react';
import {
  contributedTo,
  people,
  projects,
} from '../../../repositories/catalog-repository';
import { Portrait, ProjectLogo, Tags } from '../../../components/ui';
import {
  ProfileContributions,
  ProfileReferences,
} from '../../../components/catalog/catalog-external-links';
import { DetailActions } from '../../../components/catalog/detail-actions';
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return people.map(({ id }) => ({ id }));
}
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: people.find((person) => person.id === id)?.name ?? 'Person' };
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const person = people.find((person) => person.id === id);
  if (!person) notFound();
  const wikiId = 'person:' + id;
  const editable =
    person.category === 'Historical figure' || person.category === 'Famous';
  const work = projects.filter((project) => contributedTo(project, id));
  return (
    <div className="container detail-page">
      <Link href="/people/" className="back">
        <ArrowLeft size={16} /> <TranslatedText text={'People directory'} />
      </Link>
      <div className="detail-banner">
        <Portrait person={person} />
        <div className="detail-intro">
          <span className="kicker">
            <i />
            <TranslatedText text={person.category} />
          </span>
          <h1>
            <WikiRevision id={wikiId} field="title">
              {person.name}
            </WikiRevision>
          </h1>
          {editable && <WikiEditLink id={wikiId} />}
          <p>
            <TranslatedText text={person.profession} />
            {' · '}
            <WikiRevision id={wikiId} field="summary">
              <TranslatedText text={person.role} />
            </WikiRevision>
          </p>
          <div className="detail-meta">
            <span>
              <MapPin size={15} />
              <TranslatedText text={person.country} />
            </span>
            <span>
              <TranslatedText text={person.years} />
            </span>
          </div>
          <DetailActions id={id} kind="person" />
        </div>
        <div className="detail-stats">
          <div>
            <Code2 size={19} />
            <span>
              <strong>{person.evidence.contributions.length}</strong>
              <small>
                <TranslatedText text={'Documented contributions'} />
              </small>
            </span>
          </div>
          <div>
            <BookOpen size={19} />
            <span>
              <strong>{work.length}</strong>
              <small>
                <TranslatedText text={'Catalog projects'} />
              </small>
            </span>
          </div>
        </div>
      </div>
      <LocalizedNavigation className="detail-tabs" aria-label="Profile sections">
        <a href="#overview">
          <TranslatedText text={'Overview'} />
        </a>
        <a href="#contributions">
          <TranslatedText text={'Contributions'} />
        </a>
        <a href="#references">
          <TranslatedText text={'References'} />
        </a>
      </LocalizedNavigation>
      <div className="detail-columns">
        <div className="stack">
          <section className="panel" id="overview">
            <h2>
              <TranslatedText text={'About'} />
            </h2>
            <p>
              <WikiRevision id={wikiId} field="body" inline>
                <TranslatedText text={person.bio} />
              </WikiRevision>
            </p>
            <Tags items={person.tags} />
          </section>
          <ProfileContributions contributions={person.evidence.contributions} />
        </div>
        <aside className="stack">
          <section className="panel">
            <h2>
              <TranslatedText text={'In the project directory'} />
            </h2>
            {work.length ? (
              work.map((project) => (
                <Link
                  className="mini-row"
                  key={project.id}
                  href={'/projects/' + project.id + '/'}
                >
                  <ProjectLogo project={project} />
                  <div>
                    <strong>
                      <TranslatedText text={project.name} />
                    </strong>
                    <small>
                      <TranslatedText text={project.kind} />
                    </small>
                  </div>
                  <ArrowUpRight size={15} />
                </Link>
              ))
            ) : (
              <p>
                <TranslatedText
                  text={'See this person’s documented work in Contributions.'}
                />
              </p>
            )}
          </section>
          <ProfileReferences personId={id} links={person.evidence.links} />
        </aside>
      </div>
    </div>
  );
}
