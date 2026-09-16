import { useEffect, useState } from 'react';

/**
 * Tracks which section id is currently "active" for nav highlighting.
 *
 * Two IntersectionObservers drive *when* we recompute (so we're not running on
 * every scroll pixel), but the actual answer is resolved deterministically from
 * live geometry, not from either observer's entries array:
 *
 * - The main observer watches the sections themselves and applies a standard
 *   scrollspy rule: the active section is the last one (in document order)
 *   whose top has scrolled up past the sticky nav.
 * - A second observer watches a 1px sentinel at the very end of the page
 *   (#scroll-end-sentinel). Relying on scrollY/scrollHeight arithmetic to
 *   detect "at the bottom" is fragile (subpixel rounding, dynamic content
 *   height) and was proven wrong in practice — a real user reported the nav
 *   still highlighting "skills" while looking straight at the Contact
 *   section at the bottom of the page. A sentinel intersecting the viewport
 *   is a direct, unambiguous signal instead.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const lastId = sections[sections.length - 1].id;
    let atEnd = false;

    function recomputeFromSections() {
      if (atEnd) return;
      const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 0;
      const line = navHeight + 1;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActive(current);
    }

    const sectionIo = new IntersectionObserver(recomputeFromSections, {
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0,
    });
    sections.forEach((s) => sectionIo.observe(s));

    let endIo: IntersectionObserver | null = null;
    const sentinel = document.getElementById('scroll-end-sentinel');
    if (sentinel) {
      endIo = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          atEnd = entry.isIntersecting;
          if (atEnd) setActive(lastId);
          else recomputeFromSections();
        },
        { threshold: 0 },
      );
      endIo.observe(sentinel);
    }

    recomputeFromSections();

    return () => {
      sectionIo.disconnect();
      endIo?.disconnect();
    };
  }, [ids]);

  return active;
}
