import { projects } from '../data';
import Reveal from './Reveal';
import SectionHead from './SectionHead';

export default function Projects() {
  return (
    <section id="projects">
      <SectionHead num="03" title="Selected Projects" />
      <div className="proj-grid">
        {projects.map((p) => (
          <Reveal as="article" key={p.id} id={p.id} className="proj-card" data-cursor="">
            <div className="proj-thumb">
              <img src={p.image} alt={p.imageAlt} loading="lazy" decoding="async" width={960} height={540} />
            </div>
            <div className="proj-body">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="tag-row">
                {p.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="proj-links">
                <a href={p.github}>GitHub →</a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
