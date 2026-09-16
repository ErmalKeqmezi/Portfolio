import { useEffect, useRef, useState } from 'react';
import { navSections } from '../data';
import { useActiveSection } from '../hooks/useActiveSection';
import { useTheme } from '../hooks/useTheme';

export default function Nav() {
  const { toggle, isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navSections.map((s) => s.id));
  const linksRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = linksRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;
    const activeLink = container.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (!activeLink) return;
    const linkRect = activeLink.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();
    indicator.style.opacity = '1';
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.transform = `translateX(${linkRect.left - parentRect.left}px)`;
  }, [active]);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand">
          <span className="brand-dot" />
          ermal<span className="mono" style={{ color: 'var(--accent)' }}>.</span>dev
        </div>
        <ul className={`nav-links ${open ? 'open' : ''}`} ref={linksRef}>
          <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
          {navSections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`mono ${active === s.id ? 'active' : ''}`}
                data-cursor=""
                onClick={() => setOpen(false)}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <button
            className="theme-btn"
            aria-label="Toggle dark/light theme"
            title="Toggle theme"
            data-cursor=""
            onClick={toggle}
          >
            {isDark ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            )}
          </button>
          <button className="nav-toggle" aria-label="Open menu" onClick={() => setOpen((v) => !v)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
