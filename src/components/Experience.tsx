import Reveal from './Reveal';
import SectionHead from './SectionHead';

export default function Experience() {
  return (
    <section id="experience">
      <SectionHead num="02" title="Experience" />
      <Reveal className="xp-card">
        <div className="xp-date">01/2025 — 06/2025</div>
        <div>
          <div className="xp-role">.NET MVC Internship</div>
          <div className="xp-org">Tectigon Academy</div>
          <ul>
            <li>
              Designed and developed a full restaurant management application handling order flow and kitchen
              operations between waitstaff and kitchen staff.
            </li>
            <li>
              Built the data layer and business logic in C# / .NET MVC, working with a relational database to
              manage orders, menu items, and staff roles in real time.
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
