import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { data } from '../data';

type Props = {
  dark: boolean;
  setDark: (d: boolean) => void;
};

const items: [label: string, id: string][] = [
  ['About', 'about'],
  ['Work', 'work'],
  ['MCP', 'mcp-lab'],
  ['Live', 'mcp-live'],
  ['DS', 'ds'],
  ['Writing', 'writing'],
  ['Contact', 'contact'],
];

export function Nav({ dark, setDark }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    }
  }, [location.pathname, location.hash]);

  const onClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <header className="aur-nav">
      <div className="aur-nav-mark">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="aur-nav-mark-link"
          data-mag
        >
          <span className="aur-nav-dot" />
          <span className="aur-nav-name">{data.name.split(' ')[0]}.</span>
        </a>
        <span className="aur-nav-status">
          <span className="aur-nav-pulse" /> Available · April 2026
        </span>
      </div>
      <nav className="aur-nav-links">
        {items.map(([label, id]) => (
          <a key={label} data-mag href={`/#${id}`} onClick={onClick(id)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="aur-nav-right">
        <button
          className="aur-theme"
          data-mag
          onClick={() => setDark(!dark)}
          aria-label="Toggle theme"
        >
          <span className="aur-theme-orb" />
        </button>
        <a className="aur-nav-cta" data-mag href="/#contact" onClick={onClick('contact')}>
          Let's talk
          <span className="aur-arrow">→</span>
        </a>
      </div>
    </header>
  );
}
