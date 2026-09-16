import { education } from '../data';
import Reveal from './Reveal';
import SectionHead from './SectionHead';

export default function Education() {
  return (
    <section id="education">
      <SectionHead num="04" title="Education" />
      <div className="edu-list">
        {education.map((e) => (
          <Reveal className="edu-card" key={e.id}>
            <div>
              <h3>{e.school}</h3>
              <div className="org">{e.org}</div>
              {e.courses && <div className="courses">{e.courses}</div>}
            </div>
            <div className="edu-date">{e.date}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
