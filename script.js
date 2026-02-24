// ═══════════════════════════════════════════
// Sticky Nav + Mobile Drawer
// ═══════════════════════════════════════════
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerLinks = document.querySelectorAll('.drawer-link');
const themeToggle = document.getElementById('themeToggle');
const themeToggleCircle = document.getElementById('themeToggleCircle');

// Mobile drawer toggle
if (mobileMenuBtn && mobileDrawer) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileDrawer.classList.toggle('-translate-x-full');
  });
}

// Close drawer on link click
drawerLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileDrawer.classList.add('-translate-x-full');
  });
});

// Theme toggle visual logic
if (themeToggle && themeToggleCircle) {
  themeToggle.addEventListener('click', () => {
    themeToggle.classList.toggle('justify-end');
    themeToggle.classList.toggle('justify-start');
    themeToggle.classList.toggle('bg-indigo-600');
    themeToggle.classList.toggle('bg-slate-200');
  });
}

// Initialize Lucide icons
if (window.lucide) {
  window.lucide.createIcons();
}

// ═══════════════════════════════════════════
// Scroll Reveal
// ═══════════════════════════════════════════
function addRevealAttrs() {
  const targets = [
    '.section__header',
    '.about__bio',
    '.about__skills-col',
    '.project-card',
    '.skill-card',
    '.skill-group',
    '.contact__form',
    '.contact__info',
    '.contact__detail',
  ];
  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.setAttribute('data-reveal', '');
      el.style.transitionDelay = `${i * 60}ms`;
    });
  });
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function initReveal() {
  addRevealAttrs();
  document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
  });
}

// ═══════════════════════════════════════════
// Skill Bar Animation (triggered on scroll)
// ═══════════════════════════════════════════
const skillsSection = document.getElementById('skills');
let barsAnimated = false;

const skillsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !barsAnimated) {
    barsAnimated = true;
    document.querySelectorAll('.skill-item__fill').forEach(bar => {
      const target = bar.style.width;
      bar.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.width = target;
        });
      });
    });
  }
}, { threshold: 0.2 });

if (skillsSection) skillsObserver.observe(skillsSection);

// ═══════════════════════════════════════════
// Active Nav Link on Scroll
// ═══════════════════════════════════════════
const sectionIds = ['hero', 'about', 'projects', 'skills', 'contact'];
const navLinks = document.querySelectorAll('.nav__links a');

const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${id}`;
        link.style.color = active ? 'var(--accent)' : '';
        link.style.fontWeight = active ? '600' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) activeObserver.observe(el);
});

// ═══════════════════════════════════════════
// Contact Form Validation
// ═══════════════════════════════════════════
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

function validateField(input, errorId, validator) {
  const errorEl = document.getElementById(errorId);
  const group = input.closest('.form-group');
  const valid = validator(input.value.trim());
  group.classList.toggle('has-error', !valid);
  return valid;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameOk = validateField(nameInput, 'nameError', v => v.length >= 2);
  const emailOk = validateField(emailInput, 'emailError', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  const msgOk = validateField(messageInput, 'messageError', v => v.length >= 10);

  if (!nameOk || !emailOk || !msgOk) return;

  // Simulate async send
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    formSuccess.classList.add('visible');
    setTimeout(() => formSuccess.classList.remove('visible'), 5000);
  }, 1400);
});

// Real-time clear error
['name', 'email', 'message'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('input', () => el.closest('.form-group').classList.remove('has-error'));
});

// ═══════════════════════════════════════════
// Init
// ═══════════════════════════════════════════
initReveal();
