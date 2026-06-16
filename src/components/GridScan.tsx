import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './GridScan.css';

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uScanOpacity;
uniform float uLineJitter;
uniform float uScanGlow;
uniform float uScanSoftness;
varying vec2 vUv;

float gridLine(vec2 uv, float thickness) {
  vec2 grid = abs(fract(uv - 0.5) - 0.5) / fwidth(uv);
  float line = min(grid.x, grid.y);
  return 1.0 - min(line / thickness, 1.0);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 uv = vUv;
  vec2 centered = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
  centered += uPointer * 0.08;

  float perspective = 1.0 + centered.y * 0.82;
  vec2 gridUv = vec2(centered.x / max(0.18, perspective), centered.y + uTime * 0.08);
  gridUv /= max(0.025, uGridScale);

  vec2 jitter = vec2(
    sin(gridUv.y * 0.9 + uTime * 2.0),
    cos(gridUv.x * 0.85 - uTime * 1.7)
  ) * uLineJitter * 0.09;

  float grid = gridLine(gridUv + jitter, uLineThickness);
  float fade = smoothstep(0.86, 0.12, length(centered));
  float scanPos = 0.5 + 0.5 * sin(uTime * 4.8);
  float scanDistance = abs(uv.y - scanPos);
  float scanCore = exp(-(scanDistance * scanDistance) / max(0.0001, 0.00045 * uScanSoftness));
  float scanAura = exp(-(scanDistance * scanDistance) / max(0.0001, 0.0048 * uScanGlow));

  float grain = (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.035;
  vec3 color = uLinesColor * grid * fade;
  color += uScanColor * scanCore * uScanOpacity;
  color += uScanColor * scanAura * uScanOpacity * 0.22;
  color += grain;

  float alpha = max(grid * fade * 0.72, scanCore * uScanOpacity);
  alpha = max(alpha, scanAura * uScanOpacity * 0.18);
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), clamp(alpha, 0.0, 1.0));
}
`;

interface GridScanProps {
  lineThickness?: number;
  linesColor?: string;
  gridScale?: number;
  scanColor?: string;
  scanOpacity?: number;
  lineJitter?: number;
  scanGlow?: number;
  scanSoftness?: number;
  className?: string;
  style?: React.CSSProperties;
}

const toLinearColor = (color: string) => new THREE.Color(color).convertSRGBToLinear();

export const GridScan = ({
  lineThickness = 1.8,
  linesColor = '#203032',
  gridScale = 0.085,
  scanColor = '#9DE8D7',
  scanOpacity = 0.48,
  lineJitter = 0.4,
  scanGlow = 0.95,
  scanSoftness = 2.2,
  className = '',
  style
}: GridScanProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<any>(null);
  const pointerRef = useRef(new THREE.Vector2(0, 0));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      vertexShader,
      fragmentShader,
      uniforms: {
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uLineThickness: { value: lineThickness },
        uLinesColor: { value: toLinearColor(linesColor) },
        uScanColor: { value: toLinearColor(scanColor) },
        uGridScale: { value: gridScale },
        uScanOpacity: { value: scanOpacity },
        uLineJitter: { value: lineJitter },
        uScanGlow: { value: scanGlow },
        uScanSoftness: { value: scanSoftness }
      }
    });
    materialRef.current = material;
    scene.add(new THREE.Mesh(geometry, material));

    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      material.uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      );
    };

    window.addEventListener('resize', handleResize);
    container.addEventListener('pointermove', handlePointerMove);

    const tick = () => {
      const now = performance.now() / 1000;
      material.uniforms.uTime.value = now;
      material.uniforms.uPointer.value.lerp(pointerRef.current, 0.08);
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      material.dispose();
      geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
      materialRef.current = null;
    };
  }, [gridScale, lineJitter, lineThickness, linesColor, scanColor, scanGlow, scanOpacity, scanSoftness]);

  return <div ref={containerRef} className={`gridscan${className ? ` ${className}` : ''}`} style={style} />;
};

export default GridScan;
