import { LocalNav, T } from '../../../providers/language-provider';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, FolderGit2 } from 'lucide-react';
import {
  contributedTo,
  people,
  projects,
} from '../../../repositories/catalog-repository';
import {
  Portrait,
  ProjectLogo,
  RepoLink,
  SourceLink,
  Tags,
} from '../../../components/ui';
import { DetailActions } from '../../../components/catalog/detail-actions';
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return projects.map(({ id }) => ({ id }));
}
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: projects.find((x) => x.id === id)?.name ?? 'Project' };
}
export default async function Page({ params }: Props) {
  const { id } = await params,
    project = projects.find((x) => x.id === id);
  if (!project) notFound();
  const contributors = people.filter((p) => contributedTo(project, p.id));
  const related = projects
    .filter(
      (p) =>
        p.id !== id &&
        (p.kind === project.kind ||
          p.tags.some((tag) => (project.tags as readonly string[]).includes(tag))),
    )
    .slice(0, 3);
  return (
    <div className="container detail-page">
      <Link href="/projects/" className="back">
        <ArrowLeft size={16} /> <T text={'Project directory'} />
      </Link>
      <div className="detail-banner">
        <div className={'detail-project-art project-art ' + project.tone}>
          <ProjectLogo project={project} />
        </div>
        <div className="detail-intro">
          <span className="kicker">
            <i />
            <T text={project.kind} />
          </span>
          <h1>
            <T text={project.name} />
          </h1>
          <p>
            <T text={project.summary} />
          </p>
          <DetailActions id={id} kind="project" />
        </div>
      </div>
      <LocalNav className="detail-tabs" aria-label="Project sections">
        <a href="#overview">
          <T text={'Overview'} />
        </a>
        <a href="#contributors">
          <T text={'Contributors'} />
        </a>
        <a href="#documentation">
          <T text={'Documentation'} />
        </a>
        <a href="#related">
          <T text={'Related'} />
        </a>
      </LocalNav>
      <div className="detail-columns">
        <div className="stack">
          <section id="overview" className="panel">
            <h2>
              <T text={'About'} />
            </h2>
            <p>
              <T text={project.detail} />
            </p>
            <Tags items={project.tags} />
          </section>
          <section className="panel" id="contributors">
            <h2>
              <T text={'Contributors'} />
            </h2>
            {contributors.length ? (
              contributors.map((person) => (
                <Link
                  className="mini-row"
                  href={'/people/' + person.id + '/'}
                  key={person.id}
                >
                  <Portrait person={person} />
                  <div>
                    <strong>{person.name}</strong>
                    <small>
                      <T text={person.role} />
                    </small>
                  </div>
                  <ArrowUpRight size={15} />
                </Link>
              ))
            ) : (
              <p>
                <T
                  text={
                    'For contributor attribution and activity, see the project’s source repository.'
                  }
                />
              </p>
            )}
          </section>
        </div>
        <aside className="stack">
          <section className="panel" id="documentation">
            <h2>
              <T text={'Documentation'} />
            </h2>
            <div className="stack">
              <SourceLink href={project.url}>
                <T text={'Project website'} />
              </SourceLink>
              <RepoLink href={project.source} />
            </div>
          </section>
          <section className="panel" id="related">
            <h2>
              <T text={'Related projects'} />
            </h2>
            {related.length ? (
              related.map((item) => (
                <Link
                  className="mini-row"
                  key={item.id}
                  href={'/projects/' + item.id + '/'}
                >
                  <ProjectLogo project={item} />
                  <div>
                    <strong>
                      <T text={item.name} />
                    </strong>
                    <small>
                      <T text={item.kind} />
                    </small>
                  </div>
                  <ArrowUpRight size={15} />
                </Link>
              ))
            ) : (
              <Link className="back" href="/projects/">
                <FolderGit2 size={16} /> <T text={'Explore all projects'} />
              </Link>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
