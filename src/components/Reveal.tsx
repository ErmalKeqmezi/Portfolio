import { ElementType, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

interface RevealProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}

/** Fades/slides its content in once scrolled into view (mirrors the .reveal CSS class). */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }: RevealProps) {
  const { ref, inView } = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} className={`reveal ${inView ? '' : 'pre'} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
