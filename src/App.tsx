import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Aurora } from './components/Aurora';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { DemoPage } from './pages/DemoPage';
import { CaseStudyPage } from './pages/CaseStudyPage';

function readTheme(): boolean {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('aur-theme');
  if (saved === 'light') return false;
  if (saved === 'dark') return true;
  return true;
}

export default function App() {
  const [dark, setDark] = useState(readTheme);

  useEffect(() => {
    document.body.style.background = dark ? '#0a0814' : '#f5f3ff';
    document.documentElement.classList.toggle('aur-light-pre', !dark);
    localStorage.setItem('aur-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <BrowserRouter>
      <div className={`aur-root ${dark ? 'aur-dark' : 'aur-light'}`}>
        <Aurora />
        <Cursor />
        <Nav dark={dark} setDark={setDark} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/writing/:slug" element={<ArticlePage />} />
            <Route path="*" element={<ArticlePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
