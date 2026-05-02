import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Aurora } from './components/Aurora';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { DemoPage } from './pages/DemoPage';

export default function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.body.style.background = dark ? '#0a0814' : '#f5f3ff';
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
            <Route path="/writing/:slug" element={<ArticlePage />} />
            <Route path="*" element={<ArticlePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
