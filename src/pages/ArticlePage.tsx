import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articleBySlug, articles } from '../content/registry';
import { data } from '../data';

export function ArticlePage() {
  const { slug = '' } = useParams();
  const article = articleBySlug[slug];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  useEffect(() => {
    if (article) document.title = `${article.title} — ${data.shortName}`;
    return () => {
      document.title = `${data.name} — ${data.role}`;
    };
  }, [article]);

  if (!article) {
    return (
      <article className="aur-article aur-article-missing">
        <div className="aur-article-inner">
          <Link to="/#writing" className="aur-back" data-mag>
            ← Back to writing
          </Link>
          <h1 className="aur-article-title">Not found</h1>
          <p className="aur-article-dek">
            That article doesn't exist. It may have been retitled.
          </p>
        </div>
      </article>
    );
  }

  const idx = articles.findIndex((a) => a.slug === slug);
  const next = articles[(idx + 1) % articles.length];

  return (
    <article className="aur-article">
      <div className="aur-article-inner">
        <Link to="/#writing" className="aur-back" data-mag>
          ← Back to writing
        </Link>

        <header className="aur-article-head">
          <div className="aur-article-meta">
            <span className="aur-article-tag">{article.tag}</span>
            <span className="aur-article-dot">·</span>
            <time dateTime={article.dateISO}>{article.date}</time>
            <span className="aur-article-dot">·</span>
            <span>{article.readTime} read</span>
          </div>
          <h1 className="aur-article-title">{article.title}</h1>
          <p className="aur-article-dek">{article.dek}</p>
          <div className="aur-article-byline">
            <span className="aur-article-byline-mark" />
            <span>
              <strong>{data.name}</strong>
              <span className="aur-article-byline-sub"> — {data.role}</span>
            </span>
          </div>
        </header>

        <div className="aur-article-body">{article.body}</div>

        <footer className="aur-article-foot">
          <div className="aur-article-foot-grid">
            <div>
              <div className="aur-article-foot-l">Next read</div>
              <Link to={`/writing/${next.slug}`} className="aur-article-next" data-mag>
                <span className="aur-article-next-title">{next.title}</span>
                <span className="aur-article-next-meta">
                  {next.tag} · {next.readTime}
                </span>
              </Link>
            </div>
            <div>
              <div className="aur-article-foot-l">Get in touch</div>
              <a className="aur-article-next" data-mag href={`mailto:${data.email}`}>
                <span className="aur-article-next-title">Reply by email →</span>
                <span className="aur-article-next-meta">{data.email}</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
