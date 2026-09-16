import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fineMQ = window.matchMedia('(pointer: fine)');
    const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fineMQ.matches) return; // disable entirely on touch devices

    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    document.documentElement.classList.add('custom-cursor');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let lastX = mx;
    let lastY = my;
    let lastT = performance.now();
    let sparkAccumulator = 0;
    let raf = 0;

    const accentRGB = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
    const accent2RGB = getComputedStyle(document.documentElement).getPropertyValue('--accent-2-rgb').trim();

    function spawnSpark(x: number, y: number, rgb: string) {
      const s = document.createElement('div');
      s.className = 'spark';
      s.style.left = `${x}px`;
      s.style.top = `${y}px`;
      s.style.background = `rgba(${rgb},.8)`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 600);
    }

    function onMouseMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (!reduceMQ.matches) {
        const now = performance.now();
        const dt = now - lastT;
        const dist = Math.hypot(mx - lastX, my - lastY);
        const speed = dt > 0 ? dist / dt : 0;
        sparkAccumulator += dt;
        if (speed > 1.1 && sparkAccumulator > 35) {
          spawnSpark(mx, my, Math.random() > 0.5 ? accentRGB : accent2RGB);
          sparkAccumulator = 0;
        }
        lastX = mx;
        lastY = my;
        lastT = now;
      }
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const hoverTarget = target.closest<HTMLElement>('[data-cursor]');
      const textTarget = target.closest<HTMLElement>('.cursor-text');
      if (hoverTarget) {
        cursor!.classList.remove('is-text');
        const text = hoverTarget.getAttribute('data-cursor-label');
        if (text) {
          label!.textContent = text;
          cursor!.classList.add('has-label');
        } else {
          cursor!.classList.remove('has-label');
        }
      } else if (textTarget) {
        cursor!.classList.add('is-text');
        cursor!.classList.remove('has-label');
      }
    }

    function onMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;
      const hoverTarget = target.closest<HTMLElement>('[data-cursor]');
      const textTarget = target.closest<HTMLElement>('.cursor-text');
      if (hoverTarget && (!related || !related.closest('[data-cursor]'))) {
        cursor!.classList.remove('has-label');
      }
      if (textTarget && (!related || !related.closest('.cursor-text'))) {
        cursor!.classList.remove('is-text');
      }
    }

    function loop() {
      const ease = reduceMQ.matches ? 1 : 0.2;
      const dx = mx - cx;
      const dy = my - cy;
      // skip the style write entirely once the cursor has settled — otherwise this
      // writes `transform` (forcing a style recalc/paint) every frame forever, even
      // while the mouse is sitting perfectly still
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        cx += dx * ease;
        cy += dy * ease;
        if (cursor) cursor.style.transform = `translate3d(${cx}px,${cy}px,0) translate3d(-50%,-50%,0)`;
      }
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    loop();

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cursor" ref={cursorRef} aria-hidden="true">
      <div className="cursor-glow" />
      <div className="cursor-core" />
      <span className="cursor-label" ref={labelRef} />
    </div>
  );
}
