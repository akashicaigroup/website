// ===== HERO GLITCH EFFECT =====
const glitchEl = document.querySelector('.glitch-wrapper h1');
if (glitchEl) {
  setInterval(() => {
    if (Math.random() > 0.95) {
      gsap.to(glitchEl, {
        skewX: gsap.utils.random(-3, 3),
        duration: 0.05,
        repeat: 3,
        yoyo: true,
        onComplete: () => gsap.set(glitchEl, { skewX: 0 })
      });
    }
  }, 3000);
}

// ===== CARDS 3D TILT + STAGGER =====
gsap.utils.toArray('.card').forEach((card, i) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: i * 0.15,
    ease: 'power3.out',
    scrollTrigger: { trigger: card, start: 'top 85%', once: true }
  });

  if (card.hasAttribute('data-tilt')) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      gsap.to(card, { rotationX: rotateX, rotationY: rotateY, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' });
    });
  }
});

// ===== PHILOSOPHY TEXT STAGGER =====
gsap.utils.toArray('.philosophy-content p').forEach((p, i) => {
  gsap.to(p, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: i * 0.15,
    scrollTrigger: { trigger: p, start: 'top 90%', once: true }
  });
});

// ===== FAQ STAGGER =====
gsap.utils.toArray('.faq-item').forEach((item, i) => {
  gsap.to(item, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: i * 0.1,
    scrollTrigger: { trigger: item, start: 'top 90%', once: true }
  });
});