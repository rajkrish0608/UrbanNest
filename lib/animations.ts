import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ──────────────────────────────────────────
// HERO REVEAL — load animation
// wordmark clip-path 0%→100%, then image scale 1.08→1
// ──────────────────────────────────────────
export function heroReveal(
  wordmarkEl: HTMLElement | null,
  taglineEl: HTMLElement | null,
  imageEl: HTMLElement | null,
  ctaEl: HTMLElement | null,
) {
  if (!wordmarkEl) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Start hidden
  gsap.set(wordmarkEl, { clipPath: 'inset(0 100% 0 0)' });
  if (taglineEl) gsap.set(taglineEl, { opacity: 0, y: 16 });
  if (imageEl) gsap.set(imageEl, { scale: 1.08, opacity: 0 });
  if (ctaEl) gsap.set(ctaEl, { opacity: 0, y: 20 });

  tl.to(imageEl, { scale: 1, opacity: 1, duration: 1.2 }, 0)
    .to(taglineEl, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
    .to(wordmarkEl, { clipPath: 'inset(0 0% 0 0)', duration: 0.9 }, 0.3)
    .to(ctaEl, { opacity: 1, y: 0, duration: 0.5 }, 0.8);

  return tl;
}

// ──────────────────────────────────────────
// SECTION HEADING REVEAL — word split stagger
// translateY(40px→0) + opacity, 0.05s stagger per word
// ──────────────────────────────────────────
export function sectionHeadingReveal(
  words: HTMLElement[],
  trigger: Element | string,
) {
  if (!words.length) return;

  gsap.set(words, { y: 40, opacity: 0 });

  return ScrollTrigger.create({
    trigger,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(words, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power2.out',
      });
    },
    once: true,
  });
}

// ──────────────────────────────────────────
// PRODUCT GALLERY PARALLAX
// Each card scales 0.92→1, opacity 0.6→1 as centered
// ──────────────────────────────────────────
export function productCardReveal(cards: HTMLElement[], container: Element) {
  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { scale: 0.92, opacity: 0.5 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: undefined,
          start: 'left 80%',
          end: 'right 20%',
          scrub: 0.5,
          horizontal: true,
          scroller: container,
        },
      },
    );
  });
}

// ──────────────────────────────────────────
// WHY CHOOSE US — pin + crossfade
// Scrolls through 4 panels in one pinned viewport
// ──────────────────────────────────────────
export function whyChooseUsPin(
  container: HTMLElement,
  panels: HTMLElement[],
) {
  if (!container || !panels.length) return;

  // Hide all but first
  gsap.set(panels, { opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%' });
  gsap.set(panels[0], { opacity: 1 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      pin: true,
      start: 'top top',
      end: `+=${panels.length * 100}%`,
      scrub: 1,
    },
  });

  panels.forEach((panel, i) => {
    if (i === 0) return;
    const prev = panels[i - 1];
    
    const startTime = (i - 1) * 2;
    // Fade out previous panel
    tl.to(prev, { opacity: 0, y: -30, duration: 1, ease: 'power1.inOut' }, startTime + 1)
      // Fade in next panel slightly overlapping
      .fromTo(panel, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power1.inOut' }, startTime + 1.5);
  });

  return tl;
}

// ──────────────────────────────────────────
// GENERIC FADE-UP REVEAL
// ──────────────────────────────────────────
export function fadeUpReveal(
  elements: HTMLElement | HTMLElement[],
  trigger: Element | string,
  options?: { stagger?: number; delay?: number },
) {
  const els = Array.isArray(elements) ? elements : [elements];
  gsap.set(els, { y: 30, opacity: 0 });

  return ScrollTrigger.create({
    trigger,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(els, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: options?.stagger ?? 0.1,
        delay: options?.delay ?? 0,
        ease: 'power2.out',
      });
    },
    once: true,
  });
}
