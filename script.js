/* =============================================
   TREATS24 — MAIN JAVASCRIPT
   ============================================= */

(function () {
  'use strict';

  /* ---- NAVBAR SCROLL ---- */
  const nav = document.getElementById('mainNav');

  function handleScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      // Don't remove 'scrolled' on partner page (it's always scrolled)
      if (!document.body.classList.contains('partner-page')) {
        nav.classList.remove('scrolled');
      }
    }
  }

  if (nav) {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }


  /* ---- MOBILE NAV TOGGLE ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = navToggle.querySelectorAll('span');
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }


  /* ---- SCROLL REVEAL ---- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }


  /* ---- ACTIVE NAV LINK ---- */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveNavLink() {
    let current = '';
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top <= 100) current = sec.getAttribute('id');
    });
    navAnchors.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }
  window.addEventListener('scroll', setActiveNavLink, { passive: true });


  /* ---- RESTAURANT TABS ---- */
  const tabs = document.querySelectorAll('.rest-tab');
  const restCards = document.querySelectorAll('[data-tab-content]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      // Update tab active state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show/hide cards
      restCards.forEach(card => {
        if (card.dataset.tabContent === targetTab) {
          card.classList.remove('hidden');
          // Re-trigger animation
          card.classList.remove('visible');
          requestAnimationFrame(() => {
            setTimeout(() => card.classList.add('visible'), 50);
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Show initial tab cards as visible
  document.querySelectorAll('[data-tab-content="top"]').forEach(card => {
    card.classList.add('visible');
  });


  /* ---- FAVOURITE BUTTON ---- */
  document.querySelectorAll('.rest-fav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const icon = btn.querySelector('i');
      const isActive = icon.classList.contains('ti-heart-filled');
      if (isActive) {
        icon.classList.replace('ti-heart-filled', 'ti-heart');
        btn.style.color = '';
      } else {
        icon.classList.replace('ti-heart', 'ti-heart-filled');
        btn.style.color = '#e91e63';
      }
      btn.style.transform = 'scale(1.4)';
      setTimeout(() => btn.style.transform = '', 200);
    });
  });


  /* ---- CATEGORY CLICK ---- */
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('cat-active'));
      card.classList.add('cat-active');
      // Scroll to restaurants
      const target = document.getElementById('restaurants');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });


  /* ---- FAQ TOGGLE ---- */
  window.toggleFaq = function(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

    // Open clicked if it wasn't open
    if (!isOpen) item.classList.add('open');
  };


  /* ---- HERO SEARCH ---- */
  window.handleHeroSearch = function() {
    const q = document.getElementById('searchInput')?.value.trim();
    const target = document.getElementById('restaurants');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const heroSearchInput = document.getElementById('searchInput');
  if (heroSearchInput) {
    heroSearchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleHeroSearch();
    });
  }


  /* ---- ENQUIRY FORM ---- */
  window.submitEnquiry = function() {
    const fields = [
      { id: 'eq_name',    check: v => v.length > 0 },
      { id: 'eq_phone',   check: v => /^[\d\s\+\-\(\)]{7,15}$/.test(v) },
      { id: 'eq_email',   check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'eq_message', check: v => v.length > 5 },
    ];

    let valid = true;
    fields.forEach(({ id, check }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('invalid');
      if (!check(el.value.trim())) {
        el.classList.add('invalid'); valid = false;
        el.addEventListener('input', () => el.classList.remove('invalid'), { once: true });
      }
    });

    if (!valid) {
      const btn = document.querySelector('.enquiry-right .btn-submit');
      if (btn) {
        btn.classList.add('error-shake');
        btn.addEventListener('animationend', () => btn.classList.remove('error-shake'), { once: true });
      }
      return;
    }

    const btn = document.querySelector('.enquiry-right .btn-submit');
    if (btn) {
      btn.innerHTML = '<i class="ti ti-loader-2" style="animation:spin 0.8s linear infinite"></i> Sending…';
      btn.disabled = true;
    }

    setTimeout(() => {
      const form = document.getElementById('enquiryForm');
      const success = document.getElementById('enquirySuccess');
      if (form) form.style.display = 'none';
      if (success) { success.classList.remove('hidden'); success.style.display = 'block'; }
    }, 1200);
  };


  /* ---- PARTNER FORM ---- */
  window.submitPartnerForm = function() {
    const required = ['rest_name','owner_name','phone','email','city','cuisine','address'];
    let valid = true;

    required.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('invalid');
      if (!el.value.trim()) {
        el.classList.add('invalid'); valid = false;
        el.addEventListener('input', () => el.classList.remove('invalid'), { once: true });
        el.addEventListener('change', () => el.classList.remove('invalid'), { once: true });
      }
    });

    const agree = document.getElementById('agree');
    if (agree && !agree.checked) {
      valid = false;
      agree.parentElement.style.color = 'var(--error)';
      setTimeout(() => agree.parentElement.style.color = '', 2000);
    }

    if (!valid) {
      const btn = document.querySelector('#registrationForm .btn-submit');
      if (btn) {
        btn.classList.add('error-shake');
        btn.addEventListener('animationend', () => btn.classList.remove('error-shake'), { once: true });
      }
      // Scroll to first invalid
      const firstInvalid = document.querySelector('.invalid');
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const btn = document.querySelector('#registrationForm .btn-submit');
    if (btn) {
      btn.innerHTML = '<i class="ti ti-loader-2" style="animation:spin 0.8s linear infinite"></i> Submitting…';
      btn.disabled = true;
    }

    setTimeout(() => {
      const form = document.getElementById('registrationForm');
      const success = document.getElementById('partnerSuccess');
      if (form) form.style.display = 'none';
      if (success) { success.classList.remove('hidden'); success.style.display = 'block'; success.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    }, 1400);
  };


  /* ---- FILE UPLOAD ---- */
  window.handleFileUpload = function(input, labelId) {
    const label = document.getElementById(labelId);
    if (label && input.files.length > 0) {
      label.textContent = '✓ ' + input.files[0].name;
      const wrap = input.parentElement;
      if (wrap) { wrap.style.borderColor = 'var(--success)'; wrap.style.background = '#f0fdf4'; }
    }
  };


  /* ---- PARALLAX ORBS ---- */
  let lastX = 0, lastY = 0, ticking = false;
  document.addEventListener('mousemove', e => {
    lastX = e.clientX / window.innerWidth  - 0.5;
    lastY = e.clientY / window.innerHeight - 0.5;
    if (!ticking) {
      requestAnimationFrame(() => {
        const orb1 = document.querySelector('.orb-1');
        const orb2 = document.querySelector('.orb-2');
        if (orb1) orb1.style.transform = `translate(${lastX * 30}px, ${lastY * 20}px)`;
        if (orb2) orb2.style.transform = `translate(${lastX * -20}px, ${lastY * -15}px)`;
        ticking = false;
      });
      ticking = true;
    }
  });


  /* ---- STORE BTN RIPPLE ---- */
  document.querySelectorAll('.store-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `position:absolute;width:10px;height:10px;background:rgba(255,255,255,0.4);border-radius:50%;top:${e.clientY-rect.top-5}px;left:${e.clientX-rect.left-5}px;pointer-events:none;transform:scale(0);animation:rippleOut 0.5s ease forwards;`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });


  /* ---- INJECT GLOBAL STYLES ---- */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
    @keyframes rippleOut { to{transform:scale(18);opacity:0} }
  `;
  document.head.appendChild(style);


  /* ---- WHATSAPP FLOAT BUTTON (optional) ---- */
  const waBtn = document.createElement('a');
  waBtn.href = 'https://wa.me/919876543210?text=Hi%20Treats24!%20I%20have%20a%20query.';
  waBtn.target = '_blank';
  waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
  waBtn.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:999;
    width:56px; height:56px; border-radius:50%;
    background:#25D366; color:#fff;
    display:flex; align-items:center; justify-content:center;
    font-size:1.6rem; box-shadow:0 6px 24px rgba(37,211,102,0.45);
    transition:all 0.3s ease;
  `;
  waBtn.innerHTML = '<i class="ti ti-brand-whatsapp"></i>';
  waBtn.addEventListener('mouseenter', () => { waBtn.style.transform = 'scale(1.12) translateY(-2px)'; });
  waBtn.addEventListener('mouseleave', () => { waBtn.style.transform = ''; });
  document.body.appendChild(waBtn);

})();