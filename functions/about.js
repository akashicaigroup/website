// about.js - Scripts específicos para about.html
// Requiere: base.js, GSAP, ScrollTrigger, Lenis

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initAboutReveal();
  initAboutCounters();
  initAboutParallax();
  initTitleLines();
});

/**
 * Reveal animations para cards y métricas
 */
function initAboutReveal() {
  const revealItems = document.querySelectorAll('.reveal-item');
  
  revealItems.forEach((item, index) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out'
    });
  });
}

/**
 * Contadores animados con ScrollTrigger
 */
function initAboutCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    if (isNaN(target)) return;
    
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      onEnter: () => animateCounter(counter, target),
      once: true
    });
  });
}

function animateCounter(element, target) {
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    current += increment;
    step++;
    
    if (step >= steps) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, duration / steps);
}

/**
 * Parallax sutil en hero para dar profundidad
 */
function initAboutParallax() {
  const heroContent = document.querySelector('.about-hero-content');
  if (!heroContent) return;

  gsap.to(heroContent, {
    scrollTrigger: {
      trigger: '.about-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    },
    y: 120,
    opacity: 0.3,
    ease: 'none'
  });
}

/**
 * Animación de línea en títulos .column-title
 */
function initTitleLines() {
  const titles = document.querySelectorAll('.column-title');
  titles.forEach(title => {
    ScrollTrigger.create({
      trigger: title,
      start: 'top 85%',
      onEnter: () => title.classList.add('is-visible'),
      once: true
    });
  });
}

// Refresh ScrollTrigger cuando Lenis actualiza
if (window.lenis) {
  lenis.on('scroll', ScrollTrigger.update);
}

console.log('about.js initialized');