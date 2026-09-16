import Reveal from './Reveal';

export default function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <Reveal className="section-head">
      <span className="section-num mono">{num}</span>
      <h2>{title}</h2>
    </Reveal>
  );
}
