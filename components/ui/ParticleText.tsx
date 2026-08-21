'use client';

import { useEffect, useRef } from 'react';

const hexToRgb = (hex: string) => {
  const clean = hex.replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
};
const mixRgb = (from: {r:number,g:number,b:number}, to: {r:number,g:number,b:number}, amount: number) => ({
  r: Math.round(from.r + (to.r - from.r) * amount),
  g: Math.round(from.g + (to.g - from.g) * amount),
  b: Math.round(from.b + (to.b - from.b) * amount),
});
const rgbToCss = (rgb: {r:number,g:number,b:number}) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const resolveFontSize = (value: string | number, container: HTMLElement, fontWeight: number, fontFamily: string) => {
  if (typeof value === 'number') return value;
  const probe = document.createElement('span');
  probe.textContent = 'M';
  probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;font-size:${value};font-weight:${fontWeight};font-family:${fontFamily}`;
  container.appendChild(probe);
  const size = parseFloat(window.getComputedStyle(probe).fontSize) || 96;
  probe.remove();
  return size;
};

interface ParticleTextProps {
  text?: string;
  particleSize?: number;
  density?: number;
  color?: string;
  highlightColor?: string;
  scatter?: number;
  gatherDuration?: number;
  stagger?: number;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  trigger?: 'mount' | 'hover' | 'click';
  fontSize?: string | number;
  fontWeight?: number;
  fontFamily?: string;
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ParticleText = ({
  text = 'React Bits',
  particleSize = 2,
  density = 4,
  color = '#ffffff',
  highlightColor = '#8b5cf6',
  scatter = 180,
  gatherDuration = 1600,
  stagger = 420,
  pointerRepel = 40,
  repelRadius = 120,
  idleDrift = 0.7,
  trigger = 'mount',
  fontSize = 'clamp(3rem, 12vw, 8rem)',
  fontWeight = 800,
  fontFamily = 'inherit',
  glow = true,
  className = '',
  style,
}: ParticleTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    type Particle = {
      x: number; y: number; startX: number; startY: number;
      targetX: number; targetY: number; size: number; color: string;
      seed: number; depth: number; delay: number;
    };

    let particles: Particle[] = [];
    let animationFrame: number | null = null;
    let resizeFrame: number | null = null;
    let buildId = 0;
    let gathering = false;
    let gatherStart = 0;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let width = 0, height = 0, dpr = 1;
    const pointer = { active: false, x: 0, y: 0, smoothX: 0, smoothY: 0 };

    const startGather = (fromScatter = true) => {
      if (!particles.length) return;
      const now = performance.now();
      const spread = reducedMotion ? 0 : scatter;
      particles.forEach(p => {
        if (fromScatter) {
          const angle = p.seed * Math.PI * 2;
          const distance = spread * (0.35 + p.depth * 0.75);
          p.x = p.targetX + Math.cos(angle) * distance;
          p.y = p.targetY + Math.sin(angle) * distance;
        }
        p.startX = p.x; p.startY = p.y;
        p.delay = reducedMotion ? 0 : p.seed * stagger;
      });
      gatherStart = now; gathering = true;
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      if (glow && !reducedMotion) { ctx.shadowBlur = particleSize * 3; ctx.shadowColor = highlightColor; }
      else ctx.shadowBlur = 0;
      pointer.smoothX += (pointer.x - pointer.smoothX) * 0.18;
      pointer.smoothY += (pointer.y - pointer.smoothY) * 0.18;
      let complete = true;
      particles.forEach(p => {
        let bx = p.targetX, by = p.targetY, progress = 1;
        if (gathering) {
          const local = (now - gatherStart - p.delay) / Math.max(1, reducedMotion ? 1 : gatherDuration);
          progress = clamp(local, 0, 1);
          const eased = easeOutCubic(progress);
          bx = p.startX + (p.targetX - p.startX) * eased;
          by = p.startY + (p.targetY - p.startY) * eased;
          if (progress < 1) complete = false;
        } else if (!reducedMotion && idleDrift > 0) {
          const t = now * 0.001;
          bx += Math.sin(t * 0.9 + p.seed * 10) * idleDrift * p.depth;
          by += Math.cos(t * 0.75 + p.depth * 10) * idleDrift * p.depth;
        }
        if (pointer.active && !reducedMotion && pointerRepel > 0) {
          const dx = bx - pointer.smoothX, dy = by - pointer.smoothY;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < repelRadius) {
            const force = Math.pow(1 - dist / repelRadius, 2) * pointerRepel;
            bx += (dx / dist) * force; by += (dy / dist) * force;
          }
        }
        const follow = reducedMotion ? 1 : 0.22;
        p.x += (bx - p.x) * follow; p.y += (by - p.y) * follow;
        ctx.globalAlpha = clamp(0.35 + progress * 0.65, 0, 1);
        ctx.fillStyle = p.color;
        const sz = p.size;
        if (sz <= 2.1) { ctx.fillRect(p.x - sz/2, p.y - sz/2, sz, sz); }
        else { ctx.beginPath(); ctx.arc(p.x, p.y, sz/2, 0, Math.PI*2); ctx.fill(); }
      });
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      if (gathering && complete) gathering = false;
      animationFrame = requestAnimationFrame(render);
    };

    const sampleText = async () => {
      const currentBuild = ++buildId;
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width); height = Math.floor(rect.height);
      if (width <= 0 || height <= 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr);
      canvas.style.width = '100%'; canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const computed = window.getComputedStyle(container);
      const resolvedFamily = fontFamily === 'inherit' ? computed.fontFamily || 'sans-serif' : fontFamily;
      let resolvedSize = resolveFontSize(fontSize, container, fontWeight, resolvedFamily);
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true })!;
      const content = String(text || ' ');
      offCtx.font = `${fontWeight} ${resolvedSize}px ${resolvedFamily}`;
      const metrics = offCtx.measureText(content);
      const left = Math.ceil(metrics.actualBoundingBoxLeft || 0);
      const right = Math.ceil(metrics.actualBoundingBoxRight || metrics.width);
      const ascent = Math.ceil(metrics.actualBoundingBoxAscent || resolvedSize * 0.78);
      const descent = Math.ceil(metrics.actualBoundingBoxDescent || resolvedSize * 0.22);
      const padding = Math.max(12, Math.ceil(resolvedSize * 0.08));
      offscreen.width = left + right + padding * 2; offscreen.height = ascent + descent + padding * 2;
      offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
      offCtx.font = `${fontWeight} ${resolvedSize}px ${resolvedFamily}`;
      offCtx.textAlign = 'left'; offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = '#ffffff';
      offCtx.fillText(content, padding - left, padding + ascent);
      const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const targets: {x:number,y:number,alpha:number}[] = [];
      const step = Math.max(2, Math.floor(density));
      for (let y = 0; y < offscreen.height; y += step) {
        for (let x = 0; x < offscreen.width; x += step) {
          const alpha = imageData.data[(y * offscreen.width + x) * 4 + 3];
          if (alpha > 40) targets.push({ x: width/2 - offscreen.width/2 + x, y: height/2 - offscreen.height/2 + y, alpha: alpha/255 });
        }
      }
      if (currentBuild !== buildId) return;
      const maxParticles = Math.max(900, Math.min(5200, Math.floor((width * height) / 90)));
      const stride = Math.max(1, Math.ceil(targets.length / maxParticles));
      const baseRgb = hexToRgb(color); const highlightRgb = hexToRgb(highlightColor);
      const selected = targets.filter((_, i) => i % stride === 0);
      particles = selected.map((target, index) => {
        const seed = ((index * 9301 + 49297) % 233280) / 233280;
        const depth = 0.45 + (((index * 233 + 97) % 1000) / 1000) * 0.9;
        const blend = baseRgb && highlightRgb ? clamp(target.x / Math.max(1, width) + (seed - 0.5) * 0.35, 0, 1) : 0;
        const particleColor = baseRgb && highlightRgb ? rgbToCss(mixRgb(baseRgb, highlightRgb, blend)) : color;
        const angle = seed * Math.PI * 2;
        const distance = (reducedMotion ? 0 : scatter) * (0.35 + depth * 0.75);
        const startX = target.x + Math.cos(angle) * distance;
        const startY = target.y + Math.sin(angle) * distance;
        return { x: reducedMotion ? target.x : startX, y: reducedMotion ? target.y : startY, startX, startY, targetX: target.x, targetY: target.y, size: Math.max(0.6, particleSize * (0.75 + target.alpha * 0.45)), color: particleColor, seed, depth, delay: seed * stagger };
      });
      pointer.x = width/2; pointer.y = height/2;
      pointer.smoothX = pointer.x; pointer.smoothY = pointer.y;
      if (!reducedMotion) startGather(false);
      if (animationFrame === null) animationFrame = requestAnimationFrame(render);
    };

    const queueSample = () => { if (resizeFrame) cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(sampleText); };
    const handlePointerMove = (e: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.x = e.clientX - rect.left; pointer.y = e.clientY - rect.top; pointer.active = true; };
    const handlePointerLeave = () => { pointer.active = false; };
    const handlePointerEnter = (e: PointerEvent) => { handlePointerMove(e); if (trigger === 'hover') startGather(true); };
    canvas.addEventListener('pointerenter', handlePointerEnter);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    const ro = new ResizeObserver(queueSample);
    ro.observe(container);
    sampleText();
    return () => {
      buildId += 1; ro.disconnect();
      canvas.removeEventListener('pointerenter', handlePointerEnter);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
    };
  }, [text, particleSize, density, color, highlightColor, scatter, gatherDuration, stagger, pointerRepel, repelRadius, idleDrift, trigger, fontSize, fontWeight, fontFamily, glow]);

  return (
    <div ref={containerRef} className={`particle-text-container ${className}`} style={{ position:'relative', display:'block', width:'100%', height:'100%', minHeight:'180px', overflow:'hidden', touchAction:'none', ...style }} aria-label={text}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} aria-hidden='true' />
      <span style={{ position:'absolute', width:'1px', height:'1px', padding:0, margin:'-1px', overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap', border:0 }}>{text}</span>
    </div>
  );
};

export default ParticleText;
