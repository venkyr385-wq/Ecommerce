// =========================================================
// AURA — COMPREHENSIVE ANIMATION ENGINE
// Depends on: GSAP (loaded before this file)
// =========================================================

(function AuraAnimations() {
  'use strict';

  // ── 1. SCROLL PROGRESS TOP BAR ─────────────────────────
  function initScrollProgressBar() {
    const bar = document.createElement('div');
    bar.id = 'scroll-top-bar';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  // ── 2. NAVBAR ENTRANCE ─────────────────────────────────
  function initNavbarAnimation() {
    const header = document.getElementById('main-header');
    if (!header) return;

    gsap.from(header, {
      y: -80, opacity: 0, duration: 0.9,
      ease: 'power3.out', delay: 0.1
    });

    // Logo
    const logo = header.querySelector('a.font-display');
    if (logo) {
      logo.classList.add('logo-anim');
      gsap.from(logo, { x: -24, opacity: 0, duration: 0.7, delay: 0.35, ease: 'back.out(1.7)' });
    }

    // Nav links stagger
    const navLinks = header.querySelectorAll('.nav-link');
    if (navLinks.length) {
      gsap.from(navLinks, {
        y: -12, opacity: 0, duration: 0.5, stagger: 0.08,
        delay: 0.5, ease: 'power2.out'
      });
    }

    // Action buttons
    const actions = header.querySelectorAll('#theme-toggle, #cart-drawer-trigger, #user-profile-trigger, #mobile-menu-trigger');
    if (actions.length) {
      gsap.from(actions, {
        scale: 0, opacity: 0, duration: 0.45, stagger: 0.07,
        delay: 0.65, ease: 'back.out(2)'
      });
    }

    // Top search band
    const band = header.querySelector('.top-search-band');
    if (band) {
      gsap.from(band, { y: -20, opacity: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' });
    }
  }

  // ── 3. HERO SLIDER TEXT ANIMATIONS ─────────────────────
  function initHeroAnimations() {
    // Animate active slide content on swiper init and slide change
    function animateSlideContent(slide) {
      if (!slide) return;
      const badge = slide.querySelector('span.inline-block');
      const h1    = slide.querySelector('h1');
      const p     = slide.querySelector('p');
      const cta   = slide.querySelector('a');

      const tl = gsap.timeline();
      if (badge) tl.from(badge, { x: -30, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' }, 0);
      if (h1)    tl.from(h1,    { y: 50,  opacity: 0, duration: 0.7, ease: 'power3.out' },    0.15);
      if (p)     tl.from(p,     { y: 30,  opacity: 0, duration: 0.55, ease: 'power2.out' },   0.35);
      if (cta)   tl.from(cta,   { y: 20, scale: 0.88, opacity: 0, duration: 0.5, ease: 'back.out(1.5)' }, 0.5);
    }

    // Hook into Swiper after it initialises
    const checkSwiper = setInterval(() => {
      const swiperEl = document.querySelector('.hero-swiper.swiper-initialized');
      if (!swiperEl) return;
      clearInterval(checkSwiper);

      const activeSlide = swiperEl.querySelector('.swiper-slide-active');
      animateSlideContent(activeSlide);

      // Listen for future slide changes via MutationObserver
      const observer = new MutationObserver(() => {
        const active = swiperEl.querySelector('.swiper-slide-active');
        animateSlideContent(active);
      });
      observer.observe(swiperEl.querySelector('.swiper-wrapper'), {
        attributeFilter: ['class'], subtree: true, attributes: true
      });
    }, 200);
  }

  // ── 4. PRELOADER EXIT ANIMATION ────────────────────────
  function initPreloaderAnimation() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Enhance preloader icon
    const icon = preloader.querySelector('.fa-wand-magic-sparkles');
    if (icon) {
      gsap.to(icon, { rotation: 360, duration: 1.5, ease: 'power1.inOut', repeat: -1 });
    }
  }

  // ── 5. INTERSECTION OBSERVER — SCROLL REVEAL ───────────
  function initScrollReveal() {
    // Add base classes to all target elements
    const selectors = {
      '.anim-fade-up'    : 'fade-up',
      '.anim-fade-down'  : 'fade-down',
      '.anim-fade-left'  : 'fade-left',
      '.anim-fade-right' : 'fade-right',
      '.anim-scale-in'   : 'scale-in',
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(
      '.anim-fade-up, .anim-fade-down, .anim-fade-left, .anim-fade-right, .anim-scale-in'
    ).forEach(el => io.observe(el));
  }

  // ── 6. DYNAMIC SCROLL REVEAL — auto-tag sections ───────
  function tagSectionsForReveal() {
    // Section headings
    document.querySelectorAll(
      '#home-view h2, #shop-view h1, #wishlist-view h1, ' +
      '#compare-view h1, #about-view h1, #contact-view h1, #faq-view h1'
    ).forEach((el, i) => {
      if (!el.classList.contains('anim-fade-up')) {
        el.classList.add('anim-fade-up');
      }
    });

    // Flash sale banner
    const flashBanner = document.querySelector('#home-view .glass-card.bg-gradient-to-br');
    if (flashBanner) flashBanner.classList.add('anim-fade-up');

    // Category grid children
    document.querySelectorAll('#categories-grid > a').forEach((el, i) => {
      el.classList.add('anim-scale-in', `anim-delay-${(i % 6) + 1}`);
    });

    // Newsletter / CTA banner
    const cta = document.querySelector('#newsletter-form')?.closest('.relative.rounded-3xl');
    if (cta) cta.classList.add('anim-fade-up');

    // About cards
    document.querySelectorAll('#about-view .glass-card').forEach((el, i) => {
      el.classList.add('anim-fade-up', `anim-delay-${i + 1}`);
    });

    // Admin stat cards
    document.querySelectorAll('#admin-view .grid .glass-card').forEach((el, i) => {
      el.classList.add('anim-fade-up', `anim-delay-${i + 1}`);
    });

    // FAQ items
    document.querySelectorAll('#faq-accordion > div').forEach((el, i) => {
      el.classList.add('anim-fade-up', `anim-delay-${i + 1}`);
    });

    // Contact form + info
    const contactCards = document.querySelectorAll('#contact-view .glass-card > *');
    contactCards.forEach((el, i) => {
      el.classList.add('anim-fade-up', `anim-delay-${i + 1}`);
    });

    // Footer columns
    document.querySelectorAll('footer .grid > div').forEach((el, i) => {
      el.classList.add('anim-fade-up', `anim-delay-${i + 1}`);
    });
  }

  // ── 7. FLASH SALE ICON ─────────────────────────────────
  function initFlashSaleAnimation() {
    const icon = document.querySelector('#home-view .fa-bolt')?.parentElement;
    if (icon) icon.classList.add('flash-sale-icon');
  }

  // ── 8. TIMER FLIP EFFECT ───────────────────────────────
  function initTimerFlipEffect() {
    const ids = ['timer-hours', 'timer-minutes', 'timer-seconds'];
    const prev = { hours: null, minutes: null, seconds: null };

    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        const el  = m.target;
        const key = el.id.replace('timer-', '');
        if (el.textContent !== prev[key]) {
          prev[key] = el.textContent;
          el.classList.remove('timer-flip');
          void el.offsetWidth; // reflow
          el.classList.add('timer-flip');
          el.addEventListener('animationend', () => el.classList.remove('timer-flip'), { once: true });
        }
      });
    });

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el, { childList: true, characterData: true, subtree: true });
    });
  }

  // ── 9. INIT ALL ────────────────────────────────────────
  function initAnimations() {
    initScrollProgressBar();
    initNavbarAnimation();
    initHeroAnimations();
    initPreloaderAnimation();
    initScrollReveal();
    tagSectionsForReveal();
    initFlashSaleAnimation();
    initTimerFlipEffect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();
