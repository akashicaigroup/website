// LENIS SMOOTH SCROLL
const lenis = new Lenis({
  duration: 1.2,
  easing: function(t) {
    return Math.min(1, 1.001 - Math.pow(2, -10 * t));
  },
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP SETUP
gsap.registerPlugin(ScrollTrigger);

// HEADER SCROLL
const header = document.getElementById('header');
window.addEventListener('scroll', function() {
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// MENU TOGGLE - TENEX STYLE + SCROLL DETECTION
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const body = document.body;

function checkMenuScroll() {
  if (!menuOverlay) return;
  const isScrollable = menuOverlay.scrollHeight > menuOverlay.clientHeight + 10;
  const isBottom = menuOverlay.scrollTop + menuOverlay.clientHeight >= menuOverlay.scrollHeight - 50;
  menuOverlay.classList.toggle('scrollable', isScrollable);
  menuOverlay.classList.toggle('at-bottom', isBottom);
}

function openMenu() {
  menuToggle.classList.add('active');
  menuOverlay.classList.add('active');
  body.classList.add('menu-open');
  lenis.stop();
  setTimeout(checkMenuScroll, 100);
}

function closeMenu() {
  menuToggle.classList.remove('active');
  menuOverlay.classList.remove('active');
  body.classList.remove('menu-open');
  menuOverlay.classList.remove('scrollable', 'at-bottom');
  lenis.start();
}

if (menuToggle && menuOverlay) {
  menuToggle.addEventListener('click', openMenu);

  if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
  }

  document.querySelectorAll('.menu-overlay-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (href && href.endsWith('.html')) {
        e.preventDefault();
        closeMenu();
        pageTransition();
        setTimeout(function() {
          window.location.href = href;
        }, 600);
      }
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
      closeMenu();
    }
  });

  menuOverlay.addEventListener('scroll', checkMenuScroll);
  window.addEventListener('resize', checkMenuScroll);
}

// CUSTOM CURSOR
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (window.innerWidth > 768 && cursor && cursorFollower) {
  document.addEventListener('mousemove', function(e) {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0
    });
    gsap.to(cursorFollower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3
    });
  });

  document.querySelectorAll('a, button,.card,.faq-question,.menu-toggle').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      gsap.to(cursorFollower, { scale: 1.5, duration: 0.3 });
    });
    el.addEventListener('mouseleave', function() {
      gsap.to(cursorFollower, { scale: 1, duration: 0.3 });
    });
  });
}

// PAGE TRANSITION
function pageTransition() {
  const transition = document.querySelector('.page-transition');
  if (!transition) return;

  gsap.fromTo(transition,
    { y: '100%' },
    {
      y: '0%',
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: function() {
        gsap.to(transition, {
          y: '-100%',
          duration: 0.5,
          ease: 'power3.inOut',
          delay: 0.1
        });
      }
    }
  );
}

// TEXT SCRAMBLE EFFECT
function TextScramble(el) {
  this.el = el;
  this.chars = '!<>-_\\/[]{}—=+*^?#________';
  this.update = this.update.bind(this);
}

TextScramble.prototype.setText = function(newText) {
  const oldText = this.el.innerText;
  const length = Math.max(oldText.length, newText.length);
  const promise = new Promise((resolve) => this.resolve = resolve);
  this.queue = [];
  for (let i = 0; i < length; i++) {
    const from = oldText[i] || '';
    const to = newText[i] || '';
    const start = Math.floor(Math.random() * 40);
    const end = start + Math.floor(Math.random() * 40);
    this.queue.push({ from: from, to: to, start: start, end: end, char: null });
  }
  cancelAnimationFrame(this.frameRequest);
  this.frame = 0;
  this.update();
  return promise;
};

TextScramble.prototype.update = function() {
  let output = '';
  let complete = 0;
  for (let i = 0, n = this.queue.length; i < n; i++) {
    let item = this.queue[i];
    if (this.frame >= item.end) {
      complete++;
      output += item.to;
    } else if (this.frame >= item.start) {
      if (!item.char || Math.random() < 0.28) {
        item.char = this.chars[Math.floor(Math.random() * this.chars.length)];
      }
      output += item.char;
    } else {
      output += item.from;
    }
  }
  this.el.innerText = output;
  if (complete === this.queue.length) {
    this.resolve();
  } else {
    this.frameRequest = requestAnimationFrame(this.update);
    this.frame++;
  }
};

// HERO QUOTES
const heroQuotes = [
  "Intelligence isn't artificial when it's built on your reality.",
  "Stop wondering where to start. Start knowing where you're going.",
  "The record of what's possible has already been written. We help you read it.",
  "Every breakthrough starts with the right question.",
  "The knowledge exists. Let's access it.",
  "Access the intelligence that already exists in your business.",
  "Ancient wisdom knew that all knowledge is connected. Modern AI proves it.",
  "AI doesn't create intelligence from nothing — it reveals the intelligence that's already there.",
  "One business at a time. No templates. No shortcuts. No hype.",
  "Your blueprint. Your roadmap. Built from your reality.",
  "We don't guess. We diagnose.",
  "From AI-curious to AI-native.",
  "Just the right questions, the right architecture, and the systems to make it real.",
  "In a world drowning in data, clarity is the real currency.",
  "Your competitors aren't waiting. Your data isn't either."
];

let currentQuoteIndex = 0;

// EYEBROW SCRAMBLE
const scrambleEl = document.querySelector('.scramble-text');
if (scrambleEl) {
  const fx = new TextScramble(scrambleEl);
  setTimeout(function() {
    fx.setText(scrambleEl.dataset.text);
    gsap.to(scrambleEl, { opacity: 1, duration: 0.1 });
  }, 300);
}

// HERO ENTRANCE - CLICK O 10 SEGUNDOS + BOTÓN NO SE MUEVE
const heroH1 = document.querySelector('.hero h1');
const heroEyebrow = document.querySelector('.eyebrow');
const heroP = document.querySelector('.hero p');
const heroBtn = document.querySelector('.hero.btn');

if (heroH1) {
  const fxH1 = new TextScramble(heroH1);

  function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % heroQuotes.length;
    fxH1.setText(heroQuotes[currentQuoteIndex]);
  }

  if (heroBtn) {
    heroBtn.classList.add('disabled');
  }

  const heroTl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: function() {
      if (heroBtn) {
        heroBtn.classList.remove('disabled');
      }
    }
  });

  heroTl.from(heroEyebrow, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.3
  })
.call(() => {
    fxH1.setText(heroQuotes[currentQuoteIndex]);
  }, null, 0.5)
.to(heroP, {
    y: 0,
    opacity: 1,
    duration: 0.8
  }, '-=0.2')
.to(heroBtn, {
    y: 0,
    opacity: 1,
    duration: 0.8
  }, '-=0.4');

  setInterval(nextQuote, 10000);

  heroH1.style.cursor = 'pointer';
  heroH1.addEventListener('click', nextQuote);
}

// MAGNETIC BUTTONS - NO SE MUEVE SI TIENE.disabled
document.querySelectorAll('.magnetic').forEach(function(btn) {
  btn.addEventListener('mousemove', function(e) {
    if (btn.classList.contains('disabled')) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
  });
  btn.addEventListener('mouseleave', function() {
    if (btn.classList.contains('disabled')) return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
  });
});

// REVEAL TEXT ON SCROLL
gsap.utils.toArray('.reveal-text').forEach(function(el) {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 1,
    scrollTrigger: { trigger: el, start: 'top 85%', once: true }
  });
});

// CARDS STAGGER + 3D TILT
gsap.utils.toArray('.card').forEach(function(card, i) {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: i * 0.15,
    ease: 'power3.out',
    scrollTrigger: { trigger: card, start: 'top 85%', once: true }
  });

  if (card.hasAttribute('data-tilt')) {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      gsap.to(card, { rotationX: rotateX, rotationY: rotateY, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', function() {
      gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' });
    });
  }
});

// STATS COUNTER
gsap.utils.toArray('.stat-item').forEach(function(item, i) {
  const number = item.querySelector('.stat-number');
  if (!number) return;
  const target = parseInt(number.dataset.count);
  gsap.to(item, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: i * 0.1,
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      once: true,
      onEnter: function() {
        gsap.to(number, { innerText: target, duration: 2, snap: { innerText: 1 }, ease: 'power2.out' });
      }
    }
  });
});

// IMAGE REVEAL
gsap.utils.toArray('.image-reveal').forEach(function(img) {
  gsap.to(img, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.2,
    ease: 'power3.inOut',
    scrollTrigger: { trigger: img, start: 'top 80%', once: true }
  });
});

// FAQ ACCORDION - SOLO 1 ABIERTO
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(function(item, i) {
  gsap.to(item, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: i * 0.1,
    scrollTrigger: { trigger: item, start: 'top 90%', once: true }
  });

  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  if (question && answer) {
    gsap.set(answer, { height: 0, overflow: 'hidden' });

    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');

      faqItems.forEach(function(otherItem) {
        if (otherItem!== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) {
            gsap.to(otherAnswer, {
              height: 0,
              duration: 0.3,
              ease: 'power2.inOut'
            });
          }
        }
      });

      if (isActive) {
        item.classList.remove('active');
        gsap.to(answer, {
          height: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        });
      } else {
        item.classList.add('active');
        gsap.to(answer, {
          height: 'auto',
          duration: 0.4,
          ease: 'power2.inOut'
        });
      }
    });
  }
});

// TIMELINE ITEMS
gsap.utils.toArray('.timeline-item').forEach(function(item, i) {
  gsap.to(item, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    delay: i * 0.15,
    scrollTrigger: { trigger: item, start: 'top 85%', once: true }
  });
});

// EXPECT ITEMS
gsap.utils.toArray('.expect-item').forEach(function(item, i) {
  gsap.to(item, {
    opacity: 1,
    x: 0,
    duration: 0.6,
    delay: i * 0.1,
    scrollTrigger: { trigger: item, start: 'top 90%', once: true }
  });
});

// VALUES ITEMS
gsap.utils.toArray('.value-item').forEach(function(item, i) {
  gsap.to(item, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: i * 0.1,
    scrollTrigger: { trigger: item, start: 'top 85%', once: true }
  });
});

// ABOUT TEXT
gsap.utils.toArray('.about-text p').forEach(function(p, i) {
  gsap.to(p, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: i * 0.15,
    scrollTrigger: { trigger: p, start: 'top 90%', once: true }
  });
});

// FORM SUBMIT
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Gracias! Te contactamos en 24hs para agendar la call.');
    contactForm.reset();
  });
}

// YEAR AUTO
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// RESOURCE FILTERS
const filterBtns = document.querySelectorAll('.filter-btn');
const resourceCards = document.querySelectorAll('#resourcesGrid.card');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      resourceCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          gsap.to(card, { opacity: 1, scale: 1, duration: 0.3, display: 'block' });
        } else {
          gsap.to(card, { opacity: 0, scale: 0.95, duration: 0.3, onComplete: () => card.style.display = 'none' });
        }
      });
    });
  });
}

// REFRESH SCROLLTRIGGER ON LOAD
window.addEventListener('load', function() {
  ScrollTrigger.refresh();
});