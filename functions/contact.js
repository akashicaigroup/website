// ===== REGISTER GSAP PLUGINS =====
gsap.registerPlugin(ScrollTrigger);

// ===== HERO ENTRANCE =====
window.addEventListener('load', () => {
  // Set initial states primero
  gsap.set(['.contact-hero .section-tag', '.contact-hero h1', '.contact-hero .hero-sub'], {
    opacity: 0,
    y: 30
  });
  
  gsap.set('.contact-hero h1', { y: 50 });

  const contactHeroTl = gsap.timeline({ 
    defaults: { ease: 'power3.out' },
    delay: 0.3
  });

  contactHeroTl.to('.contact-hero .section-tag', { 
    y: 0, 
    opacity: 1, 
    duration: 0.8
  })
  .to('.contact-hero h1', { 
    y: 0, 
    opacity: 1, 
    duration: 1 
  }, '-=0.5')
  .to('.contact-hero .hero-sub', { 
    y: 0, 
    opacity: 1, 
    duration: 0.8 
  }, '-=0.6');
});

// ===== STEPS STAGGER ANIMATION =====
gsap.set('.step-item', { opacity: 0, y: 30 });

gsap.utils.toArray('.step-item').forEach((item, i) => {
  gsap.to(item, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    delay: i * 0.15,
    ease: 'power3.out',
    scrollTrigger: { 
      trigger: item, 
      start: 'top 90%', 
      once: true 
    }
  });
});

// ===== FORM VALIDATION =====
const form = document.getElementById('contactForm');
if (form) {
  const inputs = form.querySelectorAll('input, select, textarea');

  function validateField(field) {
    const group = field.closest('.form-group');
    const error = group.querySelector('.form-error');
    let isValid = true;
    let message = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      message = 'This field is required';
    } else if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        message = 'Please enter a valid email';
      }
    }

    if (isValid) {
      group.classList.remove('error');
      error.textContent = '';
    } else {
      group.classList.add('error');
      error.textContent = message;
    }

    return isValid;
  }

  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.form-group').classList.contains('error')) {
        validateField(input);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let isFormValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      gsap.to(form, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
        ease: 'power2.inOut'
      });
      return;
    }

    const btn = form.querySelector('.btn');
    const originalHTML = btn.innerHTML;
    btn.classList.add('loading');
    btn.disabled = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      btn.classList.remove('loading');
      btn.innerHTML = '<span class="btn-text">✓ Sent successfully</span>';
      btn.style.background = '#00ff00';
      btn.style.color = '#000000';
      
      setTimeout(() => {
        form.reset();
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        
        inputs.forEach(input => {
          input.closest('.form-group').classList.remove('error');
          input.closest('.form-group').querySelector('.form-error').textContent = '';
        });
      }, 3000);
      
    } catch (error) {
      btn.classList.remove('loading');
      btn.innerHTML = '<span class="btn-text">Error - Try again</span>';
      btn.style.background = '#ff4444';
      
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }
  });
}

// ===== MAGNETIC BUTTON =====
const magneticBtn = document.querySelector('.magnetic');
if (magneticBtn) {
  magneticBtn.addEventListener('mousemove', (e) => {
    const rect = magneticBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(magneticBtn, { 
      x: x * 0.2, 
      y: y * 0.2, 
      duration: 0.3 
    });
  });
  
  magneticBtn.addEventListener('mouseleave', () => {
    gsap.to(magneticBtn, { 
      x: 0, 
      y: 0, 
      duration: 0.3 
    });
  });
}