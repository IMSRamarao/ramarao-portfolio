import { data } from '../data';

type Props = {
  onNav: (id: string) => void;
  dark: boolean;
  setDark: (d: boolean) => void;
};

const items = ['About', 'Skills', 'Work', 'MCP Lab', 'DS', 'Writing', 'Contact'];

export function Nav({ onNav, dark, setDark }: Props) {
  return (
    <header className="aur-nav">
      <div className="aur-nav-mark">
        <span className="aur-nav-dot" />
        <span className="aur-nav-name">{data.name.split(' ')[0]}.</span>
        <span className="aur-nav-status">
          <span className="aur-nav-pulse" /> Available · April 2026
        </span>
      </div>
      <nav className="aur-nav-links">
        {items.map((i) => (
          <a
            key={i}
            data-mag
            href={`#${i.toLowerCase().replace(' ', '-')}`}
            onClick={(e) => {
              e.preventDefault();
              onNav(i);
            }}
          >
            {i}
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
        <a className="aur-nav-cta" data-mag href="#contact">
          Let's talk
          <span className="aur-arrow">→</span>
        </a>
      </div>
    </header>
  );
}
