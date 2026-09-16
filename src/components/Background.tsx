import { useEffect, useRef } from 'react';

export default function Background() {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let ticking = false;
    function update() {
      const y = window.scrollY || window.pageYOffset;
      layerRefs.current.forEach((layer) => {
        if (!layer) return;
        const depth = parseFloat(layer.dataset.depth || '0');
        layer.style.transform = `translateY(${y * depth}px)`;
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <div className="aurora-layer" data-depth="0.05" ref={(el) => (layerRefs.current[0] = el)}>
          <span className="aurora-blob b1" />
        </div>
        <div className="aurora-layer" data-depth="0.09" ref={(el) => (layerRefs.current[1] = el)}>
          <span className="aurora-blob b2" />
        </div>
        <div className="aurora-layer" data-depth="0.03" ref={(el) => (layerRefs.current[2] = el)}>
          <span className="aurora-blob b3" />
        </div>
      </div>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="floaters" aria-hidden="true">
        <span className="float-shape fs1">{'{ }'}</span>
        <span className="float-shape fs2">{'</>'}</span>
        <span className="float-shape fs3">●</span>
        <span className="float-shape fs4">{'[ ]'}</span>
        <span className="float-shape fs5">{'</>'}</span>
      </div>
    </>
  );
}
