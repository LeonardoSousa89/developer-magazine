import { ProjectDocumentation } from '../../../components/catalog/catalog-external-links';
import {
  LocalizedNavigation,
  TranslatedText,
} from '../../../components/localization/translated-text';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, FolderGit2 } from 'lucide-react';
import {
  contributedTo,
  people,
  projects,
} from '../../../repositories/catalog-repository';
import { Portrait, ProjectLogo, Tags } from '../../../components/ui';
import { DetailActions } from '../../../components/catalog/detail-actions';
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return projects.map(({ id }) => ({ id }));
}
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: projects.find((project) => project.id === id)?.name ?? 'Project' };
}
export default async function Page({ params }: Props) {
  const { id } = await params,
    project = projects.find((project) => project.id === id);
  if (!project) notFound();
  const contributors = people.filter((person) => contributedTo(project, person.id));
  const related = projects
    .filter(
      (candidateProject) =>
        candidateProject.id !== id &&
        (candidateProject.kind === project.kind ||
          candidateProject.tags.some((tag) =>
            (project.tags as readonly string[]).includes(tag),
          )),
    )
    .slice(0, 3);
  return (
    <div className="container detail-page">
      <Link href="/projects/" className="back">
        <ArrowLeft size={16} /> <TranslatedText text={'Project directory'} />
      </Link>
      <div className="detail-banner">
        <div className={'detail-project-art project-art ' + project.tone}>
          <ProjectLogo project={project} />
        </div>
        <div className="detail-intro">
          <span className="kicker">
            <i />
            <TranslatedText text={project.kind} />
          </span>
          <h1>
            <TranslatedText text={project.name} />
          </h1>
          <p>
            <TranslatedText text={project.summary} />
          </p>
          <DetailActions id={id} kind="project" />
        </div>
      </div>
      <LocalizedNavigation className="detail-tabs" aria-label="Project sections">
        <a href="#overview">
          <TranslatedText text={'Overview'} />
        </a>
        <a href="#contributors">
          <TranslatedText text={'Contributors'} />
        </a>
        <a href="#documentation">
          <TranslatedText text={'Documentation'} />
        </a>
        <a href="#related">
          <TranslatedText text={'Related'} />
        </a>
      </LocalizedNavigation>
      <div className="detail-columns">
        <div className="stack">
          <section id="overview" className="panel">
            <h2>
              <TranslatedText text={'About'} />
            </h2>
            <p>
              <TranslatedText text={project.detail} />
            </p>
            <Tags items={project.tags} />
          </section>
          <section className="panel" id="contributors">
            <h2>
              <TranslatedText text={'Contributors'} />
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
                      <TranslatedText text={person.role} />
                    </small>
                  </div>
                  <ArrowUpRight size={15} />
                </Link>
              ))
            ) : (
              <p>
                <TranslatedText
                  text={
                    'For contributor attribution and activity, see the project’s source repository.'
                  }
                />
              </p>
            )}
          </section>
        </div>
        <aside className="stack">
          <ProjectDocumentation projectId={id} />
          <section className="panel" id="related">
            <h2>
              <TranslatedText text={'Related projects'} />
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
                      <TranslatedText text={item.name} />
                    </strong>
                    <small>
                      <TranslatedText text={item.kind} />
                    </small>
                  </div>
                  <ArrowUpRight size={15} />
                </Link>
              ))
            ) : (
              <Link className="back" href="/projects/">
                <FolderGit2 size={16} /> <TranslatedText text={'Explore all projects'} />
              </Link>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
