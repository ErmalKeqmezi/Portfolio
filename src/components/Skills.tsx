import { skillGroups } from '../data';
import Reveal from './Reveal';
import SectionHead from './SectionHead';

export default function Skills() {
  return (
    <section id="skills">
      <SectionHead num="05" title="Technical Skills" />
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <Reveal className={`skill-group ${group.learning ? 'learning' : ''}`} key={group.title}>
            <h3>{group.title}</h3>
            <div className="tag-row">
              {group.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
