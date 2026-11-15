import { findPortrait } from '../repositories/media-repository';
import { TranslatedText } from './localization/translated-text';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  FolderGit2,
  GitFork,
  MapPin,
  UserRound,
} from 'lucide-react';
import {
  siDocker,
  siGit,
  siLinux,
  siNodedotjs,
  siPostgresql,
  siReact,
  siTensorflow,
} from 'simple-icons';
import type { Article, Person, Project } from '../repositories/catalog-repository';
const icons = {
  linux: siLinux,
  react: siReact,
  postgresql: siPostgresql,
  nodedotjs: siNodedotjs,
  docker: siDocker,
  tensorflow: siTensorflow,
  git: siGit,
};
export function ProjectLogo({ project }: { project: Project }) {
  const icon = icons[project.logo as keyof typeof icons];
  return (
    <span className={'project-logo ' + project.tone} aria-hidden="true">
      {icon ? (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d={icon.path} />
        </svg>
      ) : (
        <Code2 />
      )}
    </span>
  );
}
export function Portrait({
  person,
  className = '',
}: {
  person: Person;
  className?: string;
}) {
  const portrait = findPortrait(person.id);
  return (
    <div className={'portrait portrait-' + person.id + ' ' + className}>
      {portrait && <img src={portrait} alt={person.name} loading="lazy" />}
    </div>
  );
}
export function Tags({ items }: { items: readonly string[] }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>
          <TranslatedText text={item} />
        </span>
      ))}
    </div>
  );
}
export function PersonCard({ person }: { person: Person }) {
  return (
    <Link className="card person-card" href={'/people/' + person.id + '/'}>
      <div className="card-media">
        <Portrait person={person} />
        <span
          className={
            'badge ' + (person.category === 'Historical figure' ? 'warm' : 'green')
          }
        >
          <TranslatedText text={person.category} />
        </span>
        <span className="media-arrow">
          <ArrowUpRight size={17} />
        </span>
      </div>
      <div className="card-body">
        <h3>{person.name}</h3>
        <p>
          <TranslatedText text={person.profession} />
          {' · '}
          <TranslatedText text={person.role} />
        </p>
        <span className="card-meta">
          <MapPin size={13} />
          <TranslatedText text={person.country} />
          <span>·</span>
          <TranslatedText
            text="{n} contributions"
            values={{ n: person.evidence.contributions.length }}
          />
        </span>
      </div>
    </Link>
  );
}
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="card project-card" href={'/projects/' + project.id + '/'}>
      <div className={'project-art ' + project.tone}>
        <ProjectLogo project={project} />
        <span className="media-arrow">
          <ArrowUpRight size={17} />
        </span>
      </div>
      <div className="card-body">
        <span className="kicker">
          <TranslatedText text={project.kind} />
        </span>
        <h3>
          <TranslatedText text={project.name} />
        </h3>
        <p>
          <TranslatedText text={project.summary} />
        </p>
        <Tags items={project.tags} />
      </div>
    </Link>
  );
}
export function ArticleArt({ style }: { style: Article['style'] }) {
  return (
    <div aria-hidden="true" className={'article-art art-' + style}>
      <i />
      <i />
      <i />
      <span>
        {style === 'boxes'
          ? '▦'
          : style === 'grid'
            ? '⌘'
            : style === 'mesh'
              ? '✦'
              : '〈/〉'}
      </span>
    </div>
  );
}
export function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <Link
      className={'card article-card ' + (featured ? 'featured' : '')}
      href={'/knowledge/' + article.id + '/'}
    >
      <ArticleArt style={article.style} />
      <div className="card-body">
        <span className="kicker">
          <TranslatedText text={article.topic} />
        </span>
        <h3>
          <TranslatedText text={article.title} />
        </h3>
        <p>
          <TranslatedText text={article.summary} />
        </p>
        <span className="card-meta">
          <BookOpen size={13} />
          <TranslatedText text="{n} min read" values={{ n: article.minutes }} />{' '}
          <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}
export function PageHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <span className="kicker">
        <i />
        <TranslatedText text={kicker} />
      </span>
      <h1>
        <TranslatedText text={title} />
      </h1>
      <p>
        <TranslatedText text={description} />
      </p>
    </div>
  );
}
export function SectionTitle({
  kicker,
  title,
  href,
  label,
}: {
  kicker: string;
  title: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="kicker">
          <i />
          <TranslatedText text={kicker} />
        </span>
        <h2>
          <TranslatedText text={title} />
        </h2>
      </div>
      {href && (
        <Link className="btn secondary" href={href}>
          {label && <TranslatedText text={label} />}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
export function Sidebar({
  kind,
  items,
  active,
  onSelect,
}: {
  kind: string;
  items: readonly string[];
  active: string;
  onSelect: (v: string) => void;
}) {
  return (
    <aside className="side-panel">
      <span className="side-title">
        <TranslatedText text={kind} />
      </span>
      <div className="side-options">
        {items.map((item, index) => (
          <button
            key={item}
            className={active === item ? 'active' : ''}
            aria-pressed={active === item}
            onClick={() => onSelect(item)}
          >
            {index === 0 ? <FolderGit2 size={15} /> : <span className="side-dot" />}
            <TranslatedText text={item} />
          </button>
        ))}
      </div>
    </aside>
  );
}
export function Empty({
  text = 'Try another search or select a different filter.',
}: {
  text?: string;
}) {
  return (
    <div className="empty">
      <UserRound size={26} />
      <h3>
        <TranslatedText text={'No results found'} />
      </h3>
      <p>
        <TranslatedText text={text} />
      </p>
    </div>
  );
}
export function SourceLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a className="btn secondary" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowUpRight size={15} />
    </a>
  );
}
export function RepoLink({ href }: { href: string }) {
  return (
    <a className="btn secondary" href={href} target="_blank" rel="noopener noreferrer">
      <GitFork size={16} /> <TranslatedText text={'Source repository'} />{' '}
      <ArrowUpRight size={14} />
    </a>
  );
}
