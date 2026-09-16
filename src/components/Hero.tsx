import { useEffect, useState } from 'react';
import Reveal from './Reveal';

const ROLE_TEXT = 'Software Developer | AI Engineer';

export default function Hero() {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setTyped(ROLE_TEXT);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      setTyped(ROLE_TEXT.slice(0, i));
      i++;
      if (i <= ROLE_TEXT.length) timer = setTimeout(step, 42);
    };
    const startTimer = setTimeout(step, 400);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="hero" style={{ borderTop: 'none' }} id="hero">
      <Reveal>
        <div className="eyebrow">Prishtinë, Kosovo · Open to work</div>
        <h1>Ermal Keqmezi</h1>
        <div className="role">
          {typed}
          <span className="type-cursor" aria-hidden="true">|</span>
        </div>
        <p className="tagline cursor-text">
          Computer Science &amp; Engineering student building backend systems and applied AI applications.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary" data-cursor="" data-cursor-label="Click">
            View Projects
          </a>
          <a href="#contact" className="btn btn-ghost" data-cursor="" data-cursor-label="Click">
            Contact Me
          </a>
        </div>
      </Reveal>
      <Reveal className="photo-frame">
        <img src="/ermal-photo.webp" alt="Portrait of Ermal Keqmezi" width={600} height={600} />
      </Reveal>
    </section>
  );
}
