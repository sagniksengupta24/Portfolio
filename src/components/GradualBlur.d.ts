import type { CSSProperties, ComponentType } from 'react';

type GradualBlurPosition = 'top' | 'bottom' | 'left' | 'right';
type GradualBlurCurve = 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
type GradualBlurTarget = 'parent' | 'page';

interface GradualBlurProps {
  position?: GradualBlurPosition;
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  curve?: GradualBlurCurve;
  opacity?: number;
  animated?: boolean | 'scroll';
  duration?: string;
  easing?: string;
  hoverIntensity?: number;
  target?: GradualBlurTarget;
  preset?: string;
  responsive?: boolean;
  zIndex?: number;
  onAnimationComplete?: () => void;
  className?: string;
  style?: CSSProperties;
}

declare const GradualBlur: ComponentType<GradualBlurProps>;

export default GradualBlur;
