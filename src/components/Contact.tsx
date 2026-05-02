import { data } from '../data';

export function Contact() {
  return (
    <section className="aur-section aur-contact" id="contact">
      <div className="aur-contact-inner">
        <div className="aur-contact-eyebrow">Let's build something</div>
        <h2 className="aur-contact-title">
          <span>Have a hard</span>
          <span>
            <span className="aur-grad">interface</span> problem?
          </span>
          <span>I'd love to hear it.</span>
        </h2>
        <div className="aur-contact-grid">
          <a className="aur-contact-card" data-mag href={`mailto:${data.email}`}>
            <span className="aur-contact-l">Email</span>
            <span className="aur-contact-v">{data.email}</span>
          </a>
          <a
            className="aur-contact-card"
            data-mag
            href={data.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="aur-contact-l">LinkedIn</span>
            <span className="aur-contact-v">in/ramarao-react</span>
          </a>
          <a
            className="aur-contact-card"
            data-mag
            href={data.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="aur-contact-l">GitHub</span>
            <span className="aur-contact-v">@imsramarao</span>
          </a>
          <a
            className="aur-contact-card aur-contact-card-resume"
            data-mag
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="aur-contact-l">Resume · PDF ↓</span>
            <span className="aur-contact-v">Download / Open in new tab</span>
          </a>
        </div>
        <div className="aur-foot">
          <span>© 2026 · {data.name}</span>
          <span>{data.location}</span>
          <span>Built with React, care, and a tiny MCP server.</span>
        </div>
      </div>
    </section>
  );
}
