import { useEffect, useRef, useState } from 'react';

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    let rx = 0,
      ry = 0,
      x = 0,
      y = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    let raf = 0;
    const tick = () => {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const enter = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest('[data-mag]')) setHover(true);
    };
    const leave = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest('[data-mag]')) setHover(false);
    };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', enter, { passive: true });
    window.addEventListener('mouseout', leave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', enter);
      window.removeEventListener('mouseout', leave);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="aur-cursor-dot" />
      <div ref={ring} className={`aur-cursor-ring ${hover ? 'aur-cursor-hover' : ''}`} />
    </>
  );
}
