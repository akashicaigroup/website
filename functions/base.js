// ===== LENIS SMOOTH SCROLL =====
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower && window.innerWidth > 768) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
    follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor grow on links/buttons
  const hoverElements = document.querySelectorAll('a, button,.magnetic');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(follower, { scale: 1.5, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(follower, { scale: 1, duration: 0.3 });
    });
  });
}

// ===== MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const body = document.body;

function openMenu() {
  menuToggle.classList.add('active');
  menuOverlay.classList.add('active');
  body.classList.add('menu-open');
  lenis.stop();
}

function closeMenu() {
  menuToggle.classList.remove('active');
  menuOverlay.classList.remove('active');
  body.classList.remove('menu-open');
  lenis.start();
}

if (menuToggle) {
  menuToggle.addEventListener('click', openMenu);
}

if (menuClose) {
  menuClose.addEventListener('click', closeMenu);
}

// Close menu on link click
document.querySelectorAll('.menu-overlay-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
    closeMenu();
  }
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ===== FOOTER YEAR =====
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===== PAGE TRANSITION ON LOAD =====
const pageTransition = document.querySelector('.page-transition');
if (pageTransition) {
  gsap.set(pageTransition, { y: '100%' });

  window.addEventListener('load', () => {
    gsap.to(pageTransition, {
      y: '0%',
      duration: 0.8,
      ease: 'power4.inOut',
      onComplete: () => {
        gsap.set(pageTransition, { y: '-100%' });
      }
    });
  });
}

// ===== PAGE TRANSITION ON LINK CLICK =====
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    // Ignora anclas, mailto, tel, target blank
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      link.target === '_blank'
    ) {
      return;
    }

    e.preventDefault();

    gsap.to(pageTransition, {
      y: '0%',
      duration: 0.6,
      ease: 'power4.inOut',
      onComplete: () => {
        window.location.href = href;
      }
    });
  });
});