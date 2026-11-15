import { spotlight } from '../repositories/preview-repository';
import { TranslatedText } from '../components/localization/translated-text';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  GitFork,
  Globe2,
  Terminal,
  Users,
} from 'lucide-react';
import { articles, people, projects } from '../repositories/catalog-repository';
import {
  ArticleCard,
  PersonCard,
  Portrait,
  ProjectCard,
  SectionTitle,
} from '../components/ui';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-gridlines" aria-hidden="true" />
        <svg
          className="hero-orbits"
          viewBox="0 0 1440 660"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="orbit">
              <stop stopColor="#F12B36" stopOpacity=".08" />
              <stop offset=".5" stopColor="#FF741F" />
              <stop offset="1" stopColor="#F12B36" stopOpacity=".24" />
            </linearGradient>
          </defs>
          <path
            d="M-80 433C180 684 377 592 635 403S1090 21 1540 233M-90 475C173 743 437 580 652 423s514-407 918-173M-70 384C196 640 389 543 633 374s501-337 900-175"
            fill="none"
            stroke="url(#orbit)"
            strokeWidth="1.2"
          />
          <circle cx="133" cy="568" r="4" fill="#FF741F" />
          <circle cx="1064" cy="159" r="3" fill="#FFB52E" />
        </svg>
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="kicker hero-kicker">
              <i /> <TranslatedText text={'A home for the people who build technology'} />
            </span>
            <h1>
              <TranslatedText text={'The people'} />
              <br />
              <TranslatedText text={'behind the'} />
              <br />
              <em>
                <TranslatedText text={'technology.'} />
              </em>
            </h1>
            <p>
              <TranslatedText
                text={
                  'Discover the minds, projects, and ideas shaping our digital world. One place to document what we build, and the people who make it possible.'
                }
              />
            </p>
            <div className="hero-actions">
              <Link className="btn primary" href="/projects/">
                <TranslatedText text={'Explore projects'} /> <ArrowUpRight size={17} />
              </Link>
              <Link className="btn secondary" href="/people/">
                <Users size={16} /> <TranslatedText text={'Explore people'} />
              </Link>
            </div>
            <div className="hero-note">
              <Globe2 size={15} />{' '}
              <TranslatedText text={'Open knowledge, built together.'} />
            </div>
          </div>
          <div className="hero-visual">
            <div className="terminal">
              <div className="terminal-bar">
                <div className="terminal-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span>developer-magazine.ts</span>
                <Terminal size={16} />
              </div>
              <div className="terminal-body">
                <pre>
                  <code>
                    <span className="syntax-purple">const</span> magazine = {'{'}
                    <br />
                    {'  '}
                    <span className="syntax-key">builders</span>:{' '}
                    <span className="syntax-green">true</span>,<br />
                    {'  '}
                    <span className="syntax-key">projects</span>:{' '}
                    <span className="syntax-green">'real work'</span>,<br />
                    {'  '}
                    <span className="syntax-key">knowledge</span>:{' '}
                    <span className="syntax-green">'shared'</span>,<br />
                    {'  '}
                    <span className="syntax-key">community</span>:{' '}
                    <span className="syntax-green">'global'</span>,<br />
                    {'}'};<br />
                    <br />
                    <span className="syntax-comment">
                      <TranslatedText text="// A living history of technology." />
                    </span>
                    <br />
                    <span className="terminal-cursor">▌</span>
                  </code>
                </pre>
              </div>
              <div className="terminal-status">
                <span>
                  <GitFork size={12} /> main
                </span>
                <span>TypeScript · UTF-8</span>
              </div>
            </div>
            <Link href="/community/" className="community-float">
              <div className="avatar-stack">
                {spotlight.map((person) => (
                  <Portrait key={person.id} person={person} />
                ))}
              </div>
              <div>
                <strong>
                  <TranslatedText text={'Built by a community'} />
                </strong>
                <small>
                  <TranslatedText text={'Meet the people behind the work'} />
                </small>
              </div>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <div className="stats-strip">
        <div className="container stats-grid">
          {[
            { n: people.length, label: 'People profiles', I: Users, href: '/people/' },
            { n: projects.length, label: 'Projects', I: Code2, href: '/projects/' },
            {
              n: articles.length,
              label: 'Knowledge articles',
              I: BookOpen,
              href: '/knowledge/',
            },
            { n: 'Open', label: 'Community', I: Globe2, href: '/community/' },
          ].map(({ n, label, I, href }) => (
            <Link href={href} key={href}>
              <span className="stat-icon">
                <I size={20} />
              </span>
              <span>
                <strong>
                  {typeof n === 'number' ? (
                    String(n).padStart(2, '0')
                  ) : (
                    <TranslatedText text={n} />
                  )}
                </strong>
                <small>
                  <TranslatedText text={label} />
                </small>
              </span>
              <ArrowUpRight className="stat-arrow" size={14} />
            </Link>
          ))}
        </div>
      </div>
      <div className="container home-content">
        <section>
          <SectionTitle
            kicker="The people directory"
            title="Meet the builders"
            href="/people/"
            label="All people"
          />
          <div className="card-grid">
            {spotlight.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </section>
        <section>
          <SectionTitle
            kicker="Work that matters"
            title="Explore the projects"
            href="/projects/"
            label="All projects"
          />
          <div className="card-grid">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
        <section>
          <SectionTitle
            kicker="The knowledge base"
            title="Learn from the work"
            href="/knowledge/"
            label="All articles"
          />
          <div className="card-grid">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
        <section className="home-cta">
          <div>
            <span className="kicker">
              <TranslatedText text={'Built together'} />
            </span>
            <h2>
              <TranslatedText text={'What are you building?'} />
            </h2>
            <p>
              <TranslatedText
                text={
                  'Find your place in a community that values the work behind technology.'
                }
              />
            </p>
          </div>
          <Link className="btn primary" href="/team/">
            <TranslatedText text={'Explore the team'} /> <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </>
  );
}
