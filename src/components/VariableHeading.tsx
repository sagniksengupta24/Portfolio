import { useRef } from 'react';
import VariableProximity from './VariableProximity';

interface VariableHeadingProps {
  label: string;
  radius?: number;
  className?: string;
}

export const VariableHeading = ({ label, radius = 170, className = '' }: VariableHeadingProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  return (
    <span ref={containerRef} className={`variable-heading-wrap ${className}`}>
      <VariableProximity
        label={label}
        className="variable-proximity-display"
        fromFontVariationSettings="'wght' 760, 'opsz' 18"
        toFontVariationSettings="'wght' 1000, 'opsz' 72"
        containerRef={containerRef}
        radius={radius}
        falloff="gaussian"
      />
    </span>
  );
};
