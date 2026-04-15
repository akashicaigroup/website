// ===== REGISTER GSAP PLUGINS =====
gsap.registerPlugin(ScrollTrigger);

// ===== HERO ENTRANCE =====
window.addEventListener('load', () => {
  gsap.set(['.page-hero.eyebrow', '.page-hero h1', '.page-hero p'], {
    opacity: 0,
    y: 40
  });

  const heroTl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    delay: 0.3
  });

  heroTl.to('.page-hero.eyebrow', {
    y: 0,
    opacity: 1,
    duration: 0.8
  })
 .to('.page-hero h1', {
    y: 0,
    opacity: 1,
    duration: 1
  }, '-=0.5')
 .to('.page-hero p', {
    y: 0,
    opacity: 1,
    duration: 0.8
  }, '-=0.6');
});

// ===== SCRAMBLE TEXT EFFECT =====
const scrambleElements = document.querySelectorAll('.scramble-text');

scrambleElements.forEach(el => {
  const originalText = el.dataset.text || el.textContent;
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  let queue = [];
  let frameRequest;

  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  const update = () => {
    let output = '';
    let complete = 0;

    for (let i = 0; i < originalText.length; i++) {
      if (queue[i] === originalText[i]) {
        output += originalText[i];
        complete++;
      } else {
        output += randomChar();
        queue[i] = originalText[i];
      }
    }

    el.textContent = output;

    if (complete === originalText.length) {
      cancelAnimationFrame(frameRequest);
    } else {
      frameRequest = requestAnimationFrame(update);
    }
  };

  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      queue = Array(originalText.length).fill('');
      update();
    }
  });
});

// ===== TIMELINE STAGGER + ACTIVE STATE =====
gsap.set('.timeline-item', { opacity: 0, y: 60 });

gsap.utils.toArray('.timeline-item').forEach((item, i) => {
  gsap.to(item, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: i * 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      once: true,
      onEnter: () => item.classList.add('active')
    }
  });
});

// ===== REVEAL TEXT =====
gsap.utils.toArray('.reveal-text').forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: 30,
    duration: 1,
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true
    }
  });
});

// ===== MAGNETIC BUTTON =====
const magneticBtn = document.querySelector('.magnetic');
if (magneticBtn) {
  magneticBtn.addEventListener('mousemove', (e) => {
    const rect = magneticBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(magneticBtn, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3
    });
  });

  magneticBtn.addEventListener('mouseleave', () => {
    gsap.to(magneticBtn, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)'
    });
  });
}