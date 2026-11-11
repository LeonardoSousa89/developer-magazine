import { T } from '../providers/language-provider';
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
  return (
    <div className={'portrait portrait-' + person.id + ' ' + className}>
      <img src={'/media/' + person.id + '.webp'} alt={person.name} loading="lazy" />
    </div>
  );
}
export function Tags({ items }: { items: readonly string[] }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>
          <T text={item} />
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
          <T text={person.category} />
        </span>
        <span className="media-arrow">
          <ArrowUpRight size={17} />
        </span>
      </div>
      <div className="card-body">
        <h3>{person.name}</h3>
        <p>
          <T text={person.role} />
        </p>
        <span className="card-meta">
          <MapPin size={13} />
          <T text={person.country} />
          <span>·</span>
          <T
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
          <T text={project.kind} />
        </span>
        <h3>
          <T text={project.name} />
        </h3>
        <p>
          <T text={project.summary} />
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
          <T text={article.topic} />
        </span>
        <h3>
          <T text={article.title} />
        </h3>
        <p>
          <T text={article.summary} />
        </p>
        <span className="card-meta">
          <BookOpen size={13} />
          <T text="{n} min read" values={{ n: article.minutes }} />{' '}
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
        <T text={kicker} />
      </span>
      <h1>
        <T text={title} />
      </h1>
      <p>
        <T text={description} />
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
          <T text={kicker} />
        </span>
        <h2>
          <T text={title} />
        </h2>
      </div>
      {href && (
        <Link className="btn secondary" href={href}>
          {label && <T text={label} />}
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
        <T text={kind} />
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
            <T text={item} />
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
        <T text={'No results found'} />
      </h3>
      <p>
        <T text={text} />
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
      <GitFork size={16} /> <T text={'Source repository'} /> <ArrowUpRight size={14} />
    </a>
  );
}
