'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Vec2 } from 'ogl';

const vertex = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// Adapted from Paper Shaders' Warp effect (Apache-2.0).
// License and notice: public/licenses/paper-shaders/.
// Modified for OGL, blue Mist folds, DPR-independent sizing, and
// continuous horizontal transport instead of cross-fading repeated images.
const fragment = `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uSize;
uniform float uTime;
uniform float uTravel;

float random(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 cell = floor(p);
  vec2 f = fract(p);
  vec2 weight = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(random(cell), random(cell + vec2(1.0, 0.0)), weight.x),
    mix(random(cell + vec2(0.0, 1.0)), random(cell + vec2(1.0)), weight.x),
    weight.y
  );
}

void main() {
  // The reference's active Mist preset: scale .48, distortion .08,
  // swirl .65 with five passes, edge shape .48, proportion .33.
  const float scale = 0.00338;
  vec2 uv = (gl_FragCoord.xy / uResolution - 0.5) * uSize * scale + 0.5;
  // Sampling farther right moves the field left without a wrap or reset.
  uv.x += uTravel;
  float t = 0.5 * uTime;
  float angle = noise(uv + t) * 6.28318530718;
  uv += 0.32 * noise(uv * 2.0 - t) * vec2(cos(angle), sin(angle));

  for (int pass = 1; pass <= 5; pass++) {
    float i = float(pass);
    uv.x += 0.65 / i * cos(t + i * 1.5 * uv.y);
    uv.y += 0.65 / i * cos(t + i * uv.x);
  }

  // A black-blue-black gradient across a warped edge produces a bright
  // ribbon with a dark interior, rather than overlapping cloudy blobs.
  float edge = (0.5 - uv.y) / (scale * uSize.y) + 0.5;
  float shape = smoothstep(0.346, 0.654, edge - 0.051);
  float rise = smoothstep(0.0, 0.7074, shape);
  float fall = smoothstep(0.3, 1.0148, shape);
  float ribbon = rise * (1.0 - fall);
  float grain = (random(gl_FragCoord.xy) - 0.5) * 0.015;
  // Match globals.css --primary: hsl(204, 100%, 50%) / #0099ff.
  const vec3 smokeColor = vec3(0.0, 0.6, 1.0);
  gl_FragColor = vec4(smokeColor * clamp(ribbon + grain, 0.0, 1.0), 1.0);
}
`;

export default function DarkVeil() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas.parentElement;
    let renderer;
    try {
      renderer = new Renderer({ canvas, dpr: Math.min(window.devicePixelRatio, 2) });
    } catch {
      // Keep the hero's black background if WebGL is unavailable.
      return;
    }
    const gl = renderer.gl;
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uResolution: { value: new Vec2() },
        uSize: { value: new Vec2() },
        uTime: { value: -2.35 },
        uTravel: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    const resize = () => {
      const width = Math.max(1, parent.clientWidth);
      const height = Math.max(1, parent.clientHeight);
      renderer.setSize(width, height);
      program.uniforms.uResolution.value.set(gl.drawingBufferWidth, gl.drawingBufferHeight);
      program.uniforms.uSize.value.set(width, height);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      renderer.render({ scene: mesh });
    };
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let elapsed = 0;
    let previous = performance.now();
    const loop = (now) => {
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (!document.hidden) {
        elapsed += delta;
        program.uniforms.uTime.value = -2.35 + elapsed * 0.131284480;
        program.uniforms.uTravel.value = elapsed * 0.10;
        renderer.render({ scene: mesh });
      }
      frame = requestAnimationFrame(loop);
    };
    const updateMotion = () => {
      cancelAnimationFrame(frame);
      if (!reducedMotion.matches) {
        previous = performance.now();
        frame = requestAnimationFrame(loop);
      }
    };
    reducedMotion.addEventListener('change', updateMotion);
    updateMotion();

    return () => {
      cancelAnimationFrame(frame);
      reducedMotion.removeEventListener('change', updateMotion);
      observer.disconnect();
      geometry.remove();
      program.remove();
    };
  }, []);

  return <canvas ref={ref} className="darkveil-canvas" aria-hidden="true" />;
}
