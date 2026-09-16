import Reveal from './Reveal';
import SectionHead from './SectionHead';

export default function About() {
  return (
    <section id="about">
      <SectionHead num="01" title="About" />
      <div className="about-grid">
        <Reveal>
          <p className="cursor-text">
            Computer Science and Engineering student with hands-on experience building full-stack applications in
            Java, C#, and .NET MVC. Strong foundation in algorithms, data structures, and databases.
          </p>
          <p className="cursor-text">
            Fast learner with a track record of delivering working software independently, currently growing into
            applied ML and data-driven systems.
          </p>
        </Reveal>
        <Reveal className="building-card">
          <h3>// currently building</h3>
          <ul className="building-list">
            <li>Python fundamentals</li>
            <li>Machine Learning foundations</li>
            <li>Applied ML alongside software engineering</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
