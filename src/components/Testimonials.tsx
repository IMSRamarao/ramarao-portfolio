import { data } from '../data';
import { SectionLabel } from './SectionLabel';

export function Testimonials() {
  return (
    <section className="aur-section" id="kind-words">
      <SectionLabel num="08" title="Kind words" caption="from people I've shipped with" />
      <div className="aur-test-grid">
        {data.testimonials.map((t, i) => (
          <figure key={i} className="aur-glass aur-test">
            <svg className="aur-quote" width="22" height="18" viewBox="0 0 22 18" fill="none">
              <path
                d="M0 18V12C0 5 4 0 10 0V4C7 4 5 6 5 9H10V18H0ZM12 18V12C12 5 16 0 22 0V4C19 4 17 6 17 9H22V18H12Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <strong>{t.author}</strong>
              <span>{t.org}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
