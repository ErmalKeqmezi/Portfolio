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
 *
 * IMPORTANT: the main observer's rootMargin MUST bound a zone whose top edge
 * is exactly the same line recomputeFromSections() uses to decide the answer
 * (navHeight + 1). It previously used an unrelated '-40% -50%' band around
 * the vertical middle of the viewport — since recomputeFromSections() always
 * recomputes fresh from geometry and ignores the entries it's given, that
 * band only mattered as a trigger. Sections in this page vary a lot in
 * height, so a real dead zone existed: the true answer (per the near-top
 * decision line) could change without any section's intersection state with
 * the far-away mid-viewport band changing, leaving `active` stale until the
 * next unrelated callback — by which point the user had often scrolled a
 * further section down. That gap's width differs by section height, which
 * is why the lag was far more noticeable scrolling down than up, even
 * though both directions shared the same underlying bug. Anchoring the
 * zone's top to the decision line itself guarantees a callback fires at
 * the exact moment the answer changes, in either direction.
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

    const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 0;
    const line = navHeight + 1;

    function recomputeFromSections() {
      if (atEnd) return;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActive(current);
    }

    // top edge = the decision line itself, so a section crossing it always
    // crosses this zone's boundary at the same instant; bottom edge just
    // gives the zone enough height that a fast scroll can't skip past it
    // between two IO sampling passes without being detected.
    const sectionIo = new IntersectionObserver(recomputeFromSections, {
      rootMargin: `-${line}px 0px -70% 0px`,
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
