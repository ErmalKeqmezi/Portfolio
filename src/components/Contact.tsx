import { FormEvent, useState } from 'react';
import { contact } from '../data';
import Reveal from './Reveal';
import SectionHead from './SectionHead';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact">
      <SectionHead num="06" title="Contact" />
      <div className="contact-grid">
        <Reveal as="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="c-name">Name</label>
            <input id="c-name" name="name" type="text" placeholder="Your name" required />
          </div>
          <div className="field">
            <label htmlFor="c-email">Email</label>
            <input id="c-email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="field">
            <label htmlFor="c-msg">Message</label>
            <textarea id="c-msg" name="message" rows={5} placeholder="What are you reaching out about?" required />
          </div>
          <button type="submit" className="btn btn-primary" data-cursor="" data-cursor-label="Click">
            Send Message
          </button>
          {sent && (
            <p className="mono" style={{ marginTop: 12, color: 'var(--ok)', fontSize: 13 }}>
              ✓ Message sent — thanks for reaching out!
            </p>
          )}
        </Reveal>
        <Reveal className="contact-info">
          <a className="info-row" href={`mailto:${contact.email}`} data-cursor="" data-cursor-label="Open">
            <span className="info-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <span>
              <span className="info-label">Email</span>
              {contact.email}
            </span>
          </a>
          <a className="info-row" href={`tel:${contact.phoneHref}`} data-cursor="" data-cursor-label="Open">
            <span className="info-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2z" />
              </svg>
            </span>
            <span>
              <span className="info-label">Phone</span>
              {contact.phone}
            </span>
          </a>
          <a className="info-row" href={contact.githubUrl} target="_blank" rel="noopener" data-cursor="" data-cursor-label="Open">
            <span className="info-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.7 2.8 5.6 3.1 5.6 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
              </svg>
            </span>
            <span>
              <span className="info-label">GitHub</span>
              {contact.github}
            </span>
          </a>
          <a className="info-row" href={contact.resumeUrl} target="_blank" rel="noopener" data-cursor="" data-cursor-label="Open">
            <span className="info-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M9 15h6M9 11h2" />
              </svg>
            </span>
            <span>
              <span className="info-label">Résumé</span>Download CV (PDF)
            </span>
          </a>
          <p className="mono" style={{ fontSize: 12.5, color: 'var(--text-faint)', marginTop: 4 }}>
            Languages: Albanian (Native) · English (C1)
          </p>
        </Reveal>
      </div>
    </section>
  );
}
