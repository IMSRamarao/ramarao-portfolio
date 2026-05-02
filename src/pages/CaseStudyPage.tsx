import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { caseStudies, caseStudyBySlug } from '../content/caseStudies/registry';
import { data } from '../data';

export function CaseStudyPage() {
  const { slug = '' } = useParams();
  const study = caseStudyBySlug[slug];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  useEffect(() => {
    if (study) document.title = `${study.name} — Case Study — ${data.shortName}`;
    return () => {
      document.title = `${data.name} — ${data.role}`;
    };
  }, [study]);

  if (!study) {
    return (
      <article className="aur-case">
        <div className="aur-case-inner">
          <Link to="/#projects" className="aur-back" data-mag>
            ← Back to selected work
          </Link>
          <h1 className="aur-case-title">Case study not found</h1>
          <p className="aur-case-dek">
            That project doesn't have a case study yet.
          </p>
        </div>
      </article>
    );
  }

  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article className="aur-case">
      <div className="aur-case-inner">
        <Link to="/#projects" className="aur-back" data-mag>
          ← Back to selected work
        </Link>

        <header className="aur-case-head">
          <div className="aur-case-meta">
            <span className="aur-case-tag">{study.tag}</span>
            <span className="aur-case-dot">·</span>
            <span>{study.year}</span>
          </div>
          <h1 className="aur-case-title">{study.name}</h1>
          <p className="aur-case-dek">{study.dek}</p>

          <div className="aur-case-credits">
            <div className="aur-case-credit">
              <div className="aur-case-credit-l">Role</div>
              <div className="aur-case-credit-v">{study.role}</div>
            </div>
            <div className="aur-case-credit">
              <div className="aur-case-credit-l">Where</div>
              <div className="aur-case-credit-v">{study.client}</div>
            </div>
            <div className="aur-case-credit">
              <div className="aur-case-credit-l">Stack</div>
              <div className="aur-case-credit-v">{study.stack.join(', ')}</div>
            </div>
          </div>

          <div className="aur-case-metrics">
            {study.metrics.map((m, i) => (
              <div key={i} className="aur-case-metric">
                <div className="aur-case-mv">{m.v}</div>
                <div className="aur-case-ml">{m.l}</div>
              </div>
            ))}
          </div>
        </header>

        <div className="aur-case-body">{study.body}</div>

        <footer className="aur-case-foot">
          <div className="aur-case-foot-grid">
            <div>
              <div className="aur-case-foot-l">Next project</div>
              <Link to={`/work/${next.slug}`} className="aur-case-next" data-mag>
                <span className="aur-case-next-title">{next.name}</span>
                <span className="aur-case-next-meta">
                  {next.tag} · {next.year}
                </span>
              </Link>
            </div>
            <div>
              <div className="aur-case-foot-l">Get in touch</div>
              <a className="aur-case-next" data-mag href={`mailto:${data.email}`}>
                <span className="aur-case-next-title">Email me →</span>
                <span className="aur-case-next-meta">{data.email}</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
