import { LocalNav, T } from '../../../providers/language-provider';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, BookOpen, Code2, MapPin } from 'lucide-react';
import {
  contributedTo,
  people,
  projects,
} from '../../../repositories/catalog-repository';
import { Portrait, ProjectLogo, SourceLink, Tags } from '../../../components/ui';
import { portraitCredits } from '../../../shared/media-credits';
import { DetailActions } from '../../../components/catalog/detail-actions';
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return people.map(({ id }) => ({ id }));
}
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: people.find((x) => x.id === id)?.name ?? 'Person' };
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const person = people.find((x) => x.id === id);
  if (!person) notFound();
  const work = projects.filter((p) => contributedTo(p, id));
  const credit = portraitCredits[id];
  return (
    <div className="container detail-page">
      <Link href="/people/" className="back">
        <ArrowLeft size={16} /> <T text={'People directory'} />
      </Link>
      <div className="detail-banner">
        <Portrait person={person} />
        <div className="detail-intro">
          <span className="kicker">
            <i />
            <T text={person.category} />
          </span>
          <h1>{person.name}</h1>
          <p>
            <T text={person.role} />
          </p>
          <div className="detail-meta">
            <span>
              <MapPin size={15} />
              <T text={person.country} />
            </span>
            <span>
              <T text={person.years} />
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
                <T text={'Documented contributions'} />
              </small>
            </span>
          </div>
          <div>
            <BookOpen size={19} />
            <span>
              <strong>{work.length}</strong>
              <small>
                <T text={'Catalog projects'} />
              </small>
            </span>
          </div>
        </div>
      </div>
      <LocalNav className="detail-tabs" aria-label="Profile sections">
        <a href="#overview">
          <T text={'Overview'} />
        </a>
        <a href="#contributions">
          <T text={'Contributions'} />
        </a>
        <a href="#references">
          <T text={'References'} />
        </a>
      </LocalNav>
      <div className="detail-columns">
        <div className="stack">
          <section className="panel" id="overview">
            <h2>
              <T text={'About'} />
            </h2>
            <p>
              <T text={person.bio} />
            </p>
            <Tags items={person.tags} />
          </section>
          <section className="panel" id="contributions">
            <h2>
              <T text={'Projects & contributions'} />
            </h2>
            <div className="detail-list">
              {person.evidence.contributions.map((c) => (
                <div key={c.url}>
                  <a href={c.url} target="_blank" rel="noreferrer">
                    <T text={c.title} />
                    <ArrowUpRight size={15} />
                  </a>
                  <p>
                    <T text={c.description} />
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="stack">
          <section className="panel">
            <h2>
              <T text={'In the project directory'} />
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
                      <T text={project.name} />
                    </strong>
                    <small>
                      <T text={project.kind} />
                    </small>
                  </div>
                  <ArrowUpRight size={15} />
                </Link>
              ))
            ) : (
              <p>
                <T text={'See this person’s documented work in Contributions.'} />
              </p>
            )}
          </section>
          <section id="references" className="panel">
            <h2>
              <T text={'References'} />
            </h2>
            <div className="stack">
              <SourceLink href={person.url}>
                <T text={'Wikipedia biography'} />
              </SourceLink>
              {person.evidence.links.map((l) => (
                <SourceLink key={l.url} href={l.url}>
                  {l.label}
                </SourceLink>
              ))}
            </div>
            <p className="photo-credit">
              <T text={'Portrait:'} />{' '}
              <a
                href={
                  'https://commons.wikimedia.org/wiki/File:' +
                  encodeURIComponent(credit.file)
                }
                target="_blank"
                rel="noreferrer"
              >
                <T text={credit.author} />
              </a>{' '}
              ·{' '}
              {credit.licenseUrl ? (
                <a href={credit.licenseUrl} target="_blank" rel="noreferrer">
                  <T text={credit.license} />
                </a>
              ) : (
                <T text={credit.license} />
              )}{' '}
              <T text={'· Resized'} />
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
