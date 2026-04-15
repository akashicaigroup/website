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

// ===== SCRAMBLE TEXT =====
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

// ===== HUB CARDS STAGGER + 3D TILT =====
const hubCards = gsap.utils.toArray('.hub-card');

gsap.set(hubCards, { opacity: 0, y: 50 });

ScrollTrigger.batch(hubCards, {
  start: 'top 85%',
  onEnter: batch => {
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  },
  once: true
});

// 3D Tilt + Glow Effect
hubCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out'
    });

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)'
    });
  });
});

// ===== NEWSLETTER MODAL =====
const newsletterTrigger = document.getElementById('newsletterTrigger');
const newsletterModal = document.getElementById('newsletterModal');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');
const newsletterForm = document.getElementById('newsletterForm');

function openModal() {
  newsletterModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  gsap.fromTo(newsletterModal.querySelector('.modal-content'), {
    scale: 0.9,
    opacity: 0
  }, {
    scale: 1,
    opacity: 1,
    duration: 0.4,
    ease: 'power3.out'
  });
}

function closeModal() {
  gsap.to(newsletterModal.querySelector('.modal-content'), {
    scale: 0.9,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      newsletterModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

if (newsletterTrigger) {
  newsletterTrigger.addEventListener('click', openModal);
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', closeModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && newsletterModal.classList.contains('active')) {
    closeModal();
  }
});

// Newsletter Form Submit
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = newsletterForm.querySelector('.btn-submit');
    const email = document.getElementById('newsletterEmail').value;

    btn.classList.add('loading');

    // Simula API call - reemplazá con tu endpoint
    await new Promise(resolve => setTimeout(resolve, 1500));

    btn.classList.remove('loading');
    btn.querySelector('.btn-text').textContent = '✓ Subscribed';
    btn.style.background = '#00ff00';

    setTimeout(() => {
      closeModal();
      newsletterForm.reset();
      btn.querySelector('.btn-text').textContent = 'Subscribe';
      btn.style.background = '';
    }, 2000);
  });
}

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