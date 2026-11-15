import { ArticleReference } from '../../../components/catalog/catalog-external-links';
import { TranslatedText } from '../../../components/localization/translated-text';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock3 } from 'lucide-react';
import { articles } from '../../../repositories/catalog-repository';
import { ArticleArt } from '../../../components/ui';
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return articles.map(({ id }) => ({ id }));
}
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: articles.find((article) => article.id === id)?.title ?? 'Article' };
}
export default async function Page({ params }: Props) {
  const { id } = await params,
    article = articles.find((article) => article.id === id);
  if (!article) notFound();
  return (
    <article className="container article-page">
      <Link href="/knowledge/" className="back">
        <ArrowLeft size={16} /> <TranslatedText text={'Knowledge base'} />
      </Link>
      <div className="article-intro">
        <span className="kicker">
          <i />
          <TranslatedText text={article.topic} />
        </span>
        <h1>
          <TranslatedText text={article.title} />
        </h1>
        <p>
          <TranslatedText text={article.summary} />
        </p>
        <span className="card-meta">
          <Clock3 size={15} />{' '}
          <TranslatedText text="{n} min read" values={{ n: article.minutes }} /> ·
          Developer Magazine
        </span>
      </div>
      <ArticleArt style={article.style} />
      <div className="article-prose">
        {article.body.map((paragraph) => (
          <p key={paragraph}>
            <TranslatedText text={paragraph} />
          </p>
        ))}
        <ArticleReference articleId={id} />
      </div>
    </article>
  );
}
