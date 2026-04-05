/* =============================================
   TREATS24 — MAIN JAVASCRIPT
   Fonts: Poppins (primary) + Open Sans (body)
   ============================================= */
(function () {
  'use strict';

  /* ============================================= */
  /* CONFIG OBJECT — Edit all site content here    */
  /* ============================================= */
  const CONFIG = {
    logo: {
      type: "text",       // "text" or "image"
      src: "logo.png",    // used only if type is "image"
      alt: "Treats24"
    },
    brand: {
      name: "Treats24",
      tagline: "Dil Se Delivery 💛",
      email: "support@treats24.com",
      phone: "+91 98765 43210",
      whatsapp: "919876543210",
      address: "Kolkata, West Bengal, India"
    },
    hero: {
      bgImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop&q=80",
      headline: "Your Favourite Food,",
      headlineBold: "Delivered with Love ❤️",
      subtext: "Discover the best restaurants around you and enjoy seamless delivery anytime. Fresh, fast, and made with heart.",
      pill: "Now live in Kolkata — More cities coming soon!"
    },
    stats: [
      { value: "500+",    label: "Restaurants",     icon: "ti-building-store" },
      { value: "1 City",  label: "Kolkata",          icon: "ti-map-pin-filled" },
      { value: "10,000+", label: "Happy Customers",  icon: "ti-heart-filled" },
      { value: "⚡ Fast", label: "Local Delivery",   icon: "ti-bolt" }
    ],
    cities: {
      active: ["Kolkata"],
      coming: ["Mumbai", "Delhi", "Bengaluru", "Chennai"]
    },
    about: {
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&auto=format&fit=crop",
      heading: "Food Delivery Built with Heart & Soul",
      text1: "Treats24 was born out of a simple idea — to connect Kolkata's incredible food culture with the people who love it. We're not just a delivery app; we're a platform that celebrates local restaurants and supports the city's culinary soul.",
      text2: "From iconic biryani joints in Park Street to hidden gem cafes in South Kolkata, we bring you the best of the city — delivered fresh, fast, and with love."
    },
    whyCards: [
      {
        icon: "ti-coin-rupee",
        title: "Low Commission for Restaurants",
        text: "Fair, transparent commission plans. Partners keep more of what they earn — helping local businesses genuinely thrive.",
        colorClass: "wc1"
      },
      {
        icon: "ti-rocket",
        title: "Quick Onboarding",
        text: "Get your restaurant live in 48 hours. Our streamlined process makes joining Treats24 incredibly simple and fast.",
        colorClass: "wc2"
      },
      {
        icon: "ti-headset",
        title: "Local Restaurant Support",
        text: "Dedicated local support team available 7 days a week. We understand Kolkata's food culture and are always here.",
        colorClass: "wc3"
      },
      {
        icon: "ti-credit-card",
        title: "Fast & Reliable Payments",
        text: "Timely, accurate settlements. Partners receive payouts seamlessly with full transparency and zero delays.",
        colorClass: "wc4"
      },
      {
        icon: "ti-users",
        title: "Dedicated Partner Support",
        text: "A personal account manager for every restaurant. We're invested in your growth as much as you are.",
        colorClass: "wc5"
      },
      {
        icon: "ti-layout-grid",
        title: "Easy Menu Management",
        text: "Update your menu, prices, and availability in real-time from anywhere — no tech expertise needed at all.",
        colorClass: "wc6"
      }
    ],
    faq: [
      {
        q: "How do I place an order on Treats24?",
        a: "Simply download the Treats24 app on Android or iOS, browse restaurants near you, add items to your cart, and checkout. You can pay using UPI, cards, wallets, or cash on delivery."
      },
      {
        q: "What are the delivery charges?",
        a: "Delivery charges vary by distance and restaurant. We offer free delivery on your first three orders! After that, charges typically range from ₹0–₹49 depending on your location."
      },
      {
        q: "How fast is the delivery?",
        a: "Our average delivery time is under 35 minutes in Kolkata. For restaurants closer to you, delivery can be even faster. You can track your order live in the app."
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, popular wallets, and cash on delivery. All online payments are 100% secure."
      },
      {
        q: "Can I cancel or modify my order?",
        a: "You can cancel your order within 2 minutes of placing it, before the restaurant accepts it. Once accepted, modifications are not possible. Contact support for urgent cases."
      },
      {
        q: "How do I become a restaurant partner?",
        a: "Click 'Partner With Us' in the navigation, fill out the registration form, and our team will contact you within 24 hours. Setup is free and going live takes just 48 hours!"
      }
    ],
    appLinks: {
      android: "https://play.google.com/store",
      ios: "https://apps.apple.com"
    },
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
      youtube: "#"
    }
  };

  /* ============================================= */
  /* RENDER FROM CONFIG                            */
  /* ============================================= */
  function renderConfig() {
    // Hero pill text
    const heroPill = document.getElementById('heroPill');
    if (heroPill) heroPill.textContent = CONFIG.hero.pill;

    // Hero subtext
    const heroSubtext = document.getElementById('heroSubtext');
    if (heroSubtext) heroSubtext.textContent = CONFIG.hero.subtext;

    // Why cards
    const whyGrid = document.getElementById('whyGrid');
    if (whyGrid) {
      whyGrid.innerHTML = CONFIG.whyCards.map((card, i) => `
        <div class="why-card reveal" style="--delay:${i * 0.1}s">
          <div class="why-card-icon ${card.colorClass}">
            <i class="ti ${card.icon}"></i>
          </div>
          <h3>${card.title}</h3>
          <p>${card.text}</p>
        </div>
      `).join('');
      // Re-observe new elements
      if (observer) whyGrid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // FAQ
    const faqList = document.getElementById('faqList');
    if (faqList) {
      faqList.innerHTML = CONFIG.faq.map((item, i) => `
        <div class="faq-item">
          <button class="faq-q" onclick="toggleFaq(this)" aria-expanded="false">
            <span>${item.q}</span>
            <i class="ti ti-plus"></i>
          </button>
          <div class="faq-a"><p>${item.a}</p></div>
        </div>
      `).join('');
    }

    // Logo image mode
    if (CONFIG.logo.type === 'image') {
      document.querySelectorAll('.nav-logo').forEach(logo => {
        logo.innerHTML = `<img src="${CONFIG.logo.src}" alt="${CONFIG.logo.alt}" style="max-height:44px;"/>`;
      });
    }

    // WhatsApp links
    document.querySelectorAll('.wa-float, a[href*="wa.me"]').forEach(a => {
      if (a.classList.contains('wa-float')) {
        a.href = `https://wa.me/${CONFIG.brand.whatsapp}?text=Hi%20Treats24!`;
      }
    });
  }

  /* ============================================= */
  /* SCROLL REVEAL (IntersectionObserver)          */
  /* ============================================= */
  let observer;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ============================================= */
  /* NAVBAR SCROLL                                 */
  /* ============================================= */
  const nav = document.getElementById('mainNav');
  function handleScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      if (!document.body.classList.contains('partner-page')) {
        nav.classList.remove('scrolled');
      }
    }
  }
  if (nav) {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ============================================= */
  /* MOBILE NAV TOGGLE                             */
  /* ============================================= */
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

  /* ============================================= */
  /* ACTIVE NAV LINK                               */
  /* ============================================= */
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

  /* ============================================= */
  /* HERO SEARCH                                   */
  /* ============================================= */
  window.heroSearch = function () {
    const contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView({ behavior: 'smooth' });
  };
  const heroQInput = document.getElementById('heroQuery');
  if (heroQInput) {
    heroQInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') heroSearch();
    });
  }

  /* ============================================= */
  /* FAQ ACCORDION                                 */
  /* ============================================= */
  window.toggleFaq = function (btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  };

  /* ============================================= */
  /* QR TABS                                       */
  /* ============================================= */
  const qrTabs = document.querySelectorAll('.qr-tab');
  qrTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      qrTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const platform = tab.dataset.platform;
      const androidEl = document.getElementById('qrAndroid');
      const iosEl     = document.getElementById('qrIos');
      if (androidEl) androidEl.classList.toggle('hidden', platform !== 'android');
      if (iosEl)     iosEl.classList.toggle('hidden', platform !== 'ios');
    });
  });

  /* ============================================= */
  /* CONTACT FORM                                  */
  /* ============================================= */
  window.submitContact = function () {
    const fields = [
      { id: 'cf_name',     check: v => v.length > 0 },
      { id: 'cf_phone',    check: v => /^[\d\s\+\-\(\)]{7,15}$/.test(v) },
      { id: 'cf_email',    check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'cf_location', check: v => v.length > 0 },
      { id: 'cf_message',  check: v => v.length > 5 },
    ];
    let valid = true;
    fields.forEach(({ id, check }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const wrap = el.closest('.cf-field');
      if (wrap) wrap.classList.remove('invalid');
      if (!check(el.value.trim())) {
        if (wrap) wrap.classList.add('invalid');
        valid = false;
        if (wrap) wrap.addEventListener('input', () => wrap.classList.remove('invalid'), { once: true });
      }
    });
    if (!valid) {
      const btn = document.querySelector('.cf-submit');
      if (btn) {
        btn.classList.add('shake');
        btn.addEventListener('animationend', () => btn.classList.remove('shake'), { once: true });
      }
      return;
    }
    const btn = document.querySelector('.cf-submit');
    if (btn) {
      btn.innerHTML = '<i class="ti ti-loader-2" style="animation:spin 0.8s linear infinite"></i> Sending…';
      btn.disabled = true;
    }
    setTimeout(() => {
      const form = document.getElementById('contactForm');
      if (form) form.style.display = 'none';
      const s = document.getElementById('contactSuccess');
      if (s) { s.classList.remove('hidden'); s.style.display = 'block'; }
    }, 1200);
  };

  /* ============================================= */
  /* PARTNER FORM                                  */
  /* ============================================= */
  window.submitPartnerForm = function () {
    const required = ['rest_name','owner_name','phone','email','city','cuisine','address'];
    let valid = true;
    required.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('invalid');
      if (!el.value.trim()) {
        el.classList.add('invalid');
        valid = false;
        el.addEventListener('input',  () => el.classList.remove('invalid'), { once: true });
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
      if (success) {
        success.classList.remove('hidden');
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1400);
  };

  /* ============================================= */
  /* FILE UPLOAD                                   */
  /* ============================================= */
  window.handleFileUpload = function (input, labelId) {
    const label = document.getElementById(labelId);
    if (label && input.files.length > 0) {
      label.textContent = '✓ ' + input.files[0].name;
      const wrap = input.parentElement;
      if (wrap) {
        wrap.style.borderColor = 'var(--success)';
        wrap.style.background  = '#f0fdf4';
      }
    }
  };

  /* ============================================= */
  /* CITY CHIP HOVER                               */
  /* ============================================= */
  document.querySelectorAll('.city-chip.coming').forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      const em = chip.querySelector('em');
      if (em) em.style.background = 'var(--primary)';
    });
    chip.addEventListener('mouseleave', () => {
      const em = chip.querySelector('em');
      if (em) em.style.background = '';
    });
  });

  /* ============================================= */
  /* INJECT GLOBAL KEYFRAMES                       */
  /* ============================================= */
  const style = document.createElement('style');
  style.textContent = `@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`;
  document.head.appendChild(style);

  /* ============================================= */
  /* INIT                                          */
  /* ============================================= */
  document.addEventListener('DOMContentLoaded', () => {
    renderConfig();
    // Re-observe after render
    if (observer) {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
    }
  });

  // Also run immediately in case DOMContentLoaded already fired
  if (document.readyState !== 'loading') {
    renderConfig();
    if (observer) {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
    }
  }

})();