import { useEffect, useRef, useState } from 'react';

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let rx = 0,
      ry = 0,
      x = 0,
      y = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    let raf = 0;
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const enter = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest('[data-mag]')) setHover(true);
    };
    const leave = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest('[data-mag]')) setHover(false);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', enter);
    window.addEventListener('mouseout', leave);
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
