import { useCallback, useEffect, useRef, useState } from 'react';
import { Aurora } from './components/Aurora';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { MCPLab } from './components/MCPLab';
import { DesignSystem } from './components/DesignSystem';
import { Testimonials } from './components/Testimonials';
import { Certifications } from './components/Certifications';
import { Writing } from './components/Writing';
import { Contact } from './components/Contact';

const navMap: Record<string, string> = {
  About: 'about',
  Skills: 'skills',
  Work: 'work',
  'MCP Lab': 'mcp-lab',
  DS: 'ds',
  Writing: 'writing',
  Contact: 'contact',
};

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.body.style.background = dark ? '#0a0814' : '#f5f3ff';
  }, [dark]);

  const onNav = useCallback((label: string) => {
    const id = navMap[label] ?? label.toLowerCase().replace(' ', '-');
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <div ref={root} className={`aur-root ${dark ? 'aur-dark' : 'aur-light'}`}>
      <Aurora />
      <Cursor />
      <Nav onNav={onNav} dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <MCPLab />
        <DesignSystem />
        <Testimonials />
        <Certifications />
        <Writing />
        <Contact />
      </main>
    </div>
  );
}
