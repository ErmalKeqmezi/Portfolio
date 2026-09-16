import { useEffect, useState } from 'react';

/**
 * Tracks which section id is currently "active" for nav highlighting.
 *
 * IntersectionObserver drives *when* we recompute (so we're not running on
 * every scroll pixel), but the actual answer is resolved deterministically
 * from live getBoundingClientRect() values, not from the observer's entries
 * array. A fast/smooth jump can report several sections as simultaneously
 * "intersecting" in one callback batch, in which case just taking the last
 * entry (DOM order) picks the wrong one — this instead applies a standard
 * scrollspy rule: the active section is the last one (in document order)
 * whose top has scrolled up past the sticky nav.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    function recompute() {
      // at the very bottom of the page the last section may be short enough that
      // its own top never crosses the nav line — treat "at bottom" as "last section active"
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(sections[sections.length - 1].id);
        return;
      }

      const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 0;
      const line = navHeight + 1;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActive(current);
    }

    const io = new IntersectionObserver(recompute, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    sections.forEach((s) => io.observe(s));
    recompute();

    return () => io.disconnect();
  }, [ids]);

  return active;
}
