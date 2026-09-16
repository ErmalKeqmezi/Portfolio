import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { contact, projects } from '../data';

type LineClass = 'out' | 'err' | 'ok' | 'cmd';
interface QueuedLine {
  t: string;
  c: LineClass;
  link?: string;
  href?: string;
}

const reduceMQ = () => window.matchMedia('(prefers-reduced-motion: reduce)');

function commandOutput(key: string): QueuedLine[] | null {
  switch (key) {
    case 'whoami':
      return [
        { t: 'Ermal Keqmezi — Software Developer building practical AI and ML systems.', c: 'out' },
        { t: 'Based in Prishtinë, Kosovo. CS & Engineering student @ UBT.', c: 'out' },
      ];
    case 'skills':
      return [
        { t: 'Programming    : Java, C#, JavaScript, Python', c: 'out' },
        { t: 'Frameworks     : .NET MVC, React, TypeScript, PostgreSQL, SQLite', c: 'out' },
        { t: 'Learning       : Python, Machine Learning', c: 'out' },
      ];
    case 'projects':
      return [
        ...projects.map((p, i) => ({ t: `${i + 1}. ${p.termLine}`, c: 'out' as const, link: p.id })),
        { t: 'click a line to jump to it', c: 'out' },
      ];
    case 'contact':
      return [
        { t: `email   : ${contact.email}`, c: 'out', href: `mailto:${contact.email}` },
        { t: `phone   : ${contact.phone}`, c: 'out', href: `tel:${contact.phoneHref}` },
        { t: `github  : ${contact.github}`, c: 'out', href: contact.githubUrl },
      ];
    case 'help':
      return [
        { t: 'available commands:', c: 'out' },
        { t: '  whoami        short intro', c: 'out' },
        { t: '  skills        tech stack', c: 'out' },
        { t: '  projects      project list (click to jump)', c: 'out' },
        { t: '  contact       email / phone / github', c: 'out' },
        { t: '  clear         clear the screen', c: 'out' },
      ];
    default:
      return null;
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const historyRef = useRef<string[]>([]);
  const histIndexRef = useRef(-1);
  const busyRef = useRef(false);
  const queueRef = useRef<QueuedLine[]>([]);
  const [inputValue, setInputValue] = useState('');

  function printLine(text: string, cls: LineClass, opts: { link?: string; href?: string } = {}) {
    const body = bodyRef.current;
    if (!body) return;
    const line = document.createElement('div');
    line.className = `term-line ${cls}`;
    if (opts.link || opts.href) {
      const btn = document.createElement('button');
      btn.className = 'term-link';
      btn.type = 'button';
      btn.textContent = text;
      btn.addEventListener('click', () => {
        if (opts.link) {
          const el = document.getElementById(opts.link);
          if (el) {
            el.scrollIntoView({ behavior: reduceMQ().matches ? 'auto' : 'smooth', block: 'center' });
            el.classList.add('highlight');
            setTimeout(() => el.classList.remove('highlight'), 1400);
          }
        } else if (opts.href) {
          window.open(opts.href, opts.href.indexOf('http') === 0 ? '_blank' : '_self');
        }
      });
      line.appendChild(btn);
    } else {
      line.textContent = text;
    }
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  function typeLine(item: QueuedLine, done: () => void) {
    const body = bodyRef.current;
    if (!body) return done();
    if (reduceMQ().matches) {
      printLine(item.t, item.c, item);
      done();
      return;
    }
    const line = document.createElement('div');
    line.className = `term-line ${item.c}`;
    body.appendChild(line);
    let i = 0;
    const step = () => {
      line.textContent = item.t.slice(0, i);
      body.scrollTop = body.scrollHeight;
      i++;
      if (i <= item.t.length) {
        setTimeout(step, 10);
      } else {
        if (item.link || item.href) {
          body.removeChild(line);
          printLine(item.t, item.c, item);
        }
        done();
      }
    };
    step();
  }

  function runQueue() {
    if (busyRef.current || !queueRef.current.length) return;
    busyRef.current = true;
    const item = queueRef.current.shift()!;
    typeLine(item, () => {
      busyRef.current = false;
      runQueue();
    });
  }

  function enqueue(lines: QueuedLine[]) {
    queueRef.current.push(...lines);
    runQueue();
  }

  function execute(raw: string) {
    const cmdStr = raw.trim();
    if (!cmdStr) return;
    historyRef.current.push(cmdStr);
    histIndexRef.current = historyRef.current.length;
    printLine(cmdStr, 'cmd');
    const body = bodyRef.current;
    if (body?.lastElementChild) {
      body.lastElementChild.innerHTML = `<span class="prompt">$</span>${escapeHtml(cmdStr)}`;
    }

    const key = cmdStr.toLowerCase();
    if (key === 'clear') {
      if (body) body.innerHTML = '';
      return;
    }
    const output = commandOutput(key);
    if (output) {
      enqueue(output);
    } else {
      enqueue([{ t: `command not found: ${cmdStr} — type "help" for available commands`, c: 'err' }]);
    }
  }

  useEffect(() => {
    if (!open) return;
    const body = bodyRef.current;
    if (body && !body.childElementCount) {
      enqueue([{ t: 'welcome — type "help" to see available commands', c: 'out' }]);
    }
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeTerm();
    }
    document.addEventListener('keydown', onKeydown);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function closeTerm() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      execute(inputValue);
      setInputValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIndexRef.current > 0) {
        histIndexRef.current--;
        setInputValue(historyRef.current[histIndexRef.current] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndexRef.current < historyRef.current.length - 1) {
        histIndexRef.current++;
        setInputValue(historyRef.current[histIndexRef.current] || '');
      } else {
        histIndexRef.current = historyRef.current.length;
        setInputValue('');
      }
    }
  }

  const chips = ['whoami', 'skills', 'projects', 'contact', 'help', 'clear'];

  return (
    <>
      <button
        className="term-trigger"
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="termWindow"
        data-cursor=""
        data-cursor-label="Open"
        onClick={() => setOpen(true)}
      >
        <span aria-hidden="true">{'</>'}</span>
        <span className="term-tooltip" aria-hidden="true">
          try the terminal
        </span>
        <span className="sr-only">Open interactive terminal</span>
      </button>

      <div
        className={`term-backdrop ${open ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeTerm();
        }}
      >
        <div className="term-window" id="termWindow" role="dialog" aria-modal="true" aria-label="Interactive terminal">
          <div className="term-titlebar">
            <span className="term-dot r" />
            <span className="term-dot y" />
            <span className="term-dot g" />
            <span className="term-title">ermal@portfolio: ~</span>
            <button className="term-close" aria-label="Close terminal" onClick={closeTerm}>
              ✕
            </button>
          </div>
          <div className="term-body" ref={bodyRef} aria-live="polite" />
          <div className="term-inputrow">
            <span className="prompt">$</span>
            <input
              className="term-input"
              ref={inputRef}
              type="text"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal command input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <span className="term-caret" aria-hidden="true" />
          </div>
          <div className="term-shortcuts" aria-label="Quick commands">
            {chips.map((c) => (
              <button
                key={c}
                className="term-chip"
                onClick={() => {
                  execute(c);
                  inputRef.current?.focus();
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
