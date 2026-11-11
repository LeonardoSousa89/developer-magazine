import { T } from '../../../providers/language-provider';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock3 } from 'lucide-react';
import { articles } from '../../../repositories/catalog-repository';
import { ArticleArt, SourceLink } from '../../../components/ui';
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return articles.map(({ id }) => ({ id }));
}
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: articles.find((x) => x.id === id)?.title ?? 'Article' };
}
export default async function Page({ params }: Props) {
  const { id } = await params,
    article = articles.find((a) => a.id === id);
  if (!article) notFound();
  return (
    <article className="container article-page">
      <Link href="/knowledge/" className="back">
        <ArrowLeft size={16} /> <T text={'Knowledge base'} />
      </Link>
      <div className="article-intro">
        <span className="kicker">
          <i />
          <T text={article.topic} />
        </span>
        <h1>
          <T text={article.title} />
        </h1>
        <p>
          <T text={article.summary} />
        </p>
        <span className="card-meta">
          <Clock3 size={15} /> <T text="{n} min read" values={{ n: article.minutes }} /> ·
          Developer Magazine
        </span>
      </div>
      <ArticleArt style={article.style} />
      <div className="article-prose">
        {article.body.map((p) => (
          <p key={p}>
            <T text={p} />
          </p>
        ))}
        <h2>
          <T text={'Read further'} />
        </h2>
        <SourceLink href={article.reference}>
          <T text={'Reference and further reading'} />
        </SourceLink>
      </div>
    </article>
  );
}
