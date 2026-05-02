import { Link } from 'react-router-dom';
import { articles } from '../content/registry';
import { SectionLabel } from './SectionLabel';

export function Writing() {
  return (
    <section className="aur-section" id="writing">
      <SectionLabel num="10" title="Writing" caption="what I'm thinking about" />
      <div className="aur-write-list">
        {articles.map((a, i) => (
          <Link
            key={a.slug}
            to={`/writing/${a.slug}`}
            data-mag
            className="aur-write-row"
          >
            <span className="aur-write-num">0{i + 1}</span>
            <span className="aur-write-title">{a.title}</span>
            <span className="aur-write-tag">{a.tag}</span>
            <span className="aur-write-read">{a.readTime}</span>
            <svg
              className="aur-write-arrow"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
