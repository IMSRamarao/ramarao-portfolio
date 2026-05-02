import { data } from '../data';
import { SectionLabel } from './SectionLabel';

export function Certifications() {
  return (
    <section className="aur-section" id="certs">
      <SectionLabel num="09" title="Certifications" caption="courses · always learning" />
      <div className="aur-cert-grid">
        {data.certifications.map((c, i) => (
          <div key={i} className="aur-glass aur-cert" data-mag>
            <div className="aur-cert-tag">{c.tag}</div>
            <div className="aur-cert-title">{c.title}</div>
            <div className="aur-cert-meta">
              <span>{c.issuer}</span>
              <span className="aur-cert-year">{c.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
