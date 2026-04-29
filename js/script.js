(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const formatTime = (date, timeZone) => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return formatter.format(date);
  };

  const formatNumber = (value) => {
    try {
      return new Intl.NumberFormat("en-KE").format(value);
    } catch {
      return String(value);
    }
  };

  const serviceLabelById = {
    printing_copying: "Printing & Photocopying",
    scanning: "Scanning",
    kra_services: "KRA Services",
    ecitizen: "eCitizen Applications",
    hebl: "HELB Applications",
    passport: "Passport Applications",
    cv_writing: "CV Writing",
    binding_laminating: "Binding & Laminating",
    online_jobs: "Online Job Applications",
    ntsa: "NTSA Services",
    sha: "SHA Registration",
    graphic_design: "Graphic Design",
    website_dev: "Website Development",
    computer_training: "Computer Packages Training",
    passport_photos: "Passport Photo Services",
    email_compose: "Email Compose (Gmail with Image)",
  };

  const serviceMeta = {
    printing_copying: { etaMin: 10, etaMax: 25 },
    scanning: { etaMin: 12, etaMax: 28 },
    kra_services: { etaMin: 25, etaMax: 55 },
    ecitizen: { etaMin: 30, etaMax: 70 },
    hebl: { etaMin: 30, etaMax: 75 },
    passport: { etaMin: 35, etaMax: 90 },
    cv_writing: { etaMin: 20, etaMax: 60 },
    binding_laminating: { etaMin: 15, etaMax: 35 },
    online_jobs: { etaMin: 25, etaMax: 60 },
    ntsa: { etaMin: 25, etaMax: 65 },
    sha: { etaMin: 25, etaMax: 65 },
    graphic_design: { etaMin: 35, etaMax: 120 },
    website_dev: { etaMin: 60, etaMax: 240 },
    computer_training: { etaMin: 45, etaMax: 140 },
    passport_photos: { etaMin: 15, etaMax: 35 },
    email_compose: { etaMin: 10, etaMax: 20 },
  };

  const trainingModuleLabelById = {
    ms_word: "Microsoft Word",
    excel: "Excel",
    powerpoint: "PowerPoint",
    internet: "Internet",
    email: "Email",
    web_design: "Basic Web Design",
    webdesign: "Basic Web Design",
    ppt: "PowerPoint",
    word: "Microsoft Word",
    email_module: "Email",
  };

  const ICONS = {
    // Services icons
    print: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 4h10v16H7V4Z" stroke="currentColor" stroke-width="1.8"/>
      <path d="M9 8h6M9 12h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M9 20h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    scan: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 7h12v10H6V7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M8 11h4M8 14h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M9 4h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2 20 6v12l-8 4-8-4V6l8-4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M9 12l2 2 4-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    portal: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7h16v10H4V7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M9 12l2 2 4-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 4h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    edu: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M6 10v7c0 .6 1.6 2 6 2s6-1.4 6-2v-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    passport: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.8"/>
      <path d="M12 11c1.2 0 2.1.9 2.1 2.1S13.2 15.2 12 15.2s-2.1-.9-2.1-2.1S10.8 11 12 11Z" stroke="currentColor" stroke-width="1.8"/>
      <path d="M9 7h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    cv: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 2h7l3 3v17H7V2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M14 2v4h4" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M9 12h6M9 16h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    bind: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4h8l2 4v12H6V8l2-4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M9 12h6M9 15h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M9 4v4h6V4" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`,
    jobs: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6V4h6v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M4 8h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M9 12h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M9 16h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    car: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 16l1-6 2-3h8l2 3 1 6H5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M7.5 16a1.8 1.8 0 1 0 0 .01" stroke="currentColor" stroke-width="1.8"/>
      <path d="M16.5 16a1.8 1.8 0 1 0 0 .01" stroke="currentColor" stroke-width="1.8"/>
      <path d="M7 11h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    reg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2 20 6v12l-8 4-8-4V6l8-4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M8 12h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M12 8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    design: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17.3 10.2 10l2.4 2.4L5.4 19.7 3 17.3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M12.6 12.6 20 5.2l-2.4-2.4-7.4 7.4 2.4 2.4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M14 7l3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    web: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2 20 6v12l-8 4-8-4V6l8-4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M7.5 9.5h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M7.5 14.5h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    train: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M6 17V7l6-3 6 3v10" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M9 11h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M10 14h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    photo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 4h10a2 2 0 0 1 2 2v14H5V6a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" stroke="currentColor" stroke-width="1.8"/>
      <path d="M9 7h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,

    // Training module icons
    word: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 4h10v16H7V4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M9 8h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M9 12h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M9 16h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    excel: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 4h10a2 2 0 0 1 2 2v16H5V6a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M9 10h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M9 14h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M8.5 8.5 15.5 15.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    ppt: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6h16v14H4V6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M8 10h3a2 2 0 1 1 0 4H8v-4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M14 10v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    internet: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12c2.3-4.3 13.7-4.3 16 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M6.5 14.5c1.6-2.7 9.4-2.7 11 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M9.2 17.1c.9-1.1 4.7-1.1 5.6 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M12 20h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    email: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6h16v12H4V6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`,
    webdesign: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7h16v10H4V7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M8 11h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M8 14h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M9 4h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
  };

  function renderIcons() {
    const iconSlots = $$(".icon-slot[data-icon]");
    for (const slot of iconSlots) {
      const key = slot.getAttribute("data-icon");
      const svg = ICONS[key];
      if (!svg) continue;
      slot.innerHTML = svg;
    }
  }

  function initThemeToggle() {
    const btn = $("#themeToggle");
    if (!btn) return;

    const root = document.documentElement;
    const saved = localStorage.getItem("ihub-theme");
    const systemPrefersLight =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial = saved || (systemPrefersLight ? "light" : "dark");
    root.setAttribute("data-theme", initial);

    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("ihub-theme", next);
    });
  }

  function initLoadingOverlay() {
    const overlay = $("#loadingOverlay");
    if (!overlay) return;
    const hide = () => {
      overlay.classList.add("is-hidden");
      setTimeout(() => overlay.remove(), 500);
    };
    window.addEventListener("load", hide, { once: true });
    setTimeout(hide, 4500);
  }

  function initBackToTop() {
    const btn = $("#backToTop");
    if (!btn) return;
    const onScroll = () => {
      const show = window.scrollY > 500;
      btn.classList.toggle("is-visible", show);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initSmoothAnchorScroll() {
    const reduced = prefersReducedMotion();
    const links = $$('a[href^="#"]');
    for (const a of links) {
      const href = a.getAttribute("href");
      if (!href || href === "#") continue;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) continue;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        if (reduced) {
          target.scrollIntoView();
          return;
        }
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function initMobileNav() {
    const toggle = $("#navToggle");
    const nav = document.querySelector(".nav");
    if (!toggle || !nav) return;

    const setOpen = (open) => {
      nav.classList.toggle("nav--open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("nav--open");
      setOpen(!isOpen);
    });

    // Close when a navigation link is chosen
    const links = $$(".nav__list a", document);
    for (const link of links) {
      link.addEventListener("click", () => setOpen(false));
    }

    // Close on outside click (best-effort)
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("nav--open")) return;
      const target = e.target;
      if (target === toggle || nav.contains(target)) return;
      setOpen(false);
    });
  }

  function initClock() {
    const clockEl = $("#kenyaClock");
    if (!clockEl) return;
    const update = () => {
      clockEl.textContent = formatTime(new Date(), "Africa/Nairobi");
    };
    update();
    setInterval(update, 1000);
  }

  function initParticles() {
    const canvas = $("#particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const state = {
      w: 0,
      h: 0,
      dpr: Math.max(1, Math.min(2.25, window.devicePixelRatio || 1)),
      particles: [],
      raf: 0,
    };

    const rand = (min, max) => min + Math.random() * (max - min);
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    function resize() {
      state.w = window.innerWidth;
      state.h = window.innerHeight;
      canvas.width = Math.floor(state.w * state.dpr);
      canvas.height = Math.floor(state.h * state.dpr);
      canvas.style.width = `${state.w}px`;
      canvas.style.height = `${state.h}px`;
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

      const count = clamp(Math.floor(state.w / 14), 55, 120);
      state.particles = new Array(count).fill(0).map(() => ({
        x: rand(0, state.w),
        y: rand(0, state.h),
        vx: rand(-0.35, 0.35),
        vy: rand(-0.35, 0.35),
        r: rand(1.2, 2.6),
        a: rand(0.25, 0.75),
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, state.w, state.h);

      // Soft glow background stroke
      const grad = ctx.createLinearGradient(0, 0, state.w, state.h);
      grad.addColorStop(0, "rgba(0,245,255,.08)");
      grad.addColorStop(1, "rgba(11,59,255,.05)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, state.w, state.h);

      // Dots
      for (const p of state.particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = state.w + 20;
        if (p.x > state.w + 20) p.x = -20;
        if (p.y < -20) p.y = state.h + 20;
        if (p.y > state.h + 20) p.y = -20;

        ctx.beginPath();
        ctx.fillStyle = `rgba(0,245,255,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connections
      const threshold = 128;
      for (let i = 0; i < state.particles.length; i++) {
        const a = state.particles[i];
        for (let j = i + 1; j < state.particles.length; j++) {
          const b = state.particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < threshold) {
            const alpha = (1 - dist / threshold) * 0.35;
            ctx.strokeStyle = `rgba(41,185,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      state.raf = requestAnimationFrame(draw);
    }

    resize();
    state.raf = requestAnimationFrame(draw);

    window.addEventListener("resize", () => {
      cancelAnimationFrame(state.raf);
      resize();
      state.raf = requestAnimationFrame(draw);
    });
  }

  function initCounters() {
    const counterEls = $$("[data-counter][data-counter-target]");
    if (!counterEls.length) return;
    if (prefersReducedMotion()) {
      for (const el of counterEls) {
        const target = Number(el.getAttribute("data-counter-target")) || 0;
        el.textContent = formatNumber(target);
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          const target = Number(el.getAttribute("data-counter-target")) || 0;
          const duration = Number(el.getAttribute("data-counter-duration")) || 1200;
          animateCounter(el, target, duration);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    for (const el of counterEls) observer.observe(el);
  }

  function animateCounter(el, target, duration) {
    const start = performance.now();
    const initial = Number(el.textContent.replace(/[^0-9.-]/g, "")) || 0;
    const diff = target - initial;

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = initial + diff * eased;
      el.textContent = formatNumber(Math.round(value));
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  function initFAQ() {
    const items = $$("[data-faq]");
    for (const item of items) {
      const q = item.querySelector(".faq__q");
      const a = item.querySelector(".faq__a");
      if (!q || !a) continue;

      q.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        for (const other of items) {
          if (other !== item) other.classList.remove("is-open");
          const otherBtn = other.querySelector(".faq__q");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }

        item.classList.toggle("is-open", !isOpen);
        q.setAttribute("aria-expanded", String(!isOpen));
        a.setAttribute("aria-hidden", String(isOpen));
      });
    }
  }

  function initTestimonials() {
    const track = $("#testimonialTrack");
    if (!track) return;
    const slides = $$(".testimonial", track);
    if (slides.length <= 1) return;
    const prev = $(".slider__btn--prev");
    const next = $(".slider__btn--next");

    let index = slides.findIndex((s) => s.classList.contains("testimonial--active"));
    if (index < 0) index = 0;

    const goTo = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      for (let i = 0; i < slides.length; i++) slides[i].classList.toggle("testimonial--active", i === index);
    };

    if (prev) prev.addEventListener("click", () => goTo(index - 1));
    if (next) next.addEventListener("click", () => goTo(index + 1));

    if (!prefersReducedMotion()) {
      setInterval(() => goTo(index + 1), 6200);
    }
  }

  function showToast({ title = "Notification", message = "", type = "info", durationMs = 4200 } = {}) {
    const host = $("#toastHost");
    if (!host) return;

    const toast = document.createElement("div");
    toast.className = "toast";

    const iconText =
      type === "success" ? "✓" : type === "error" ? "!" : type === "warning" ? "⚠" : "✦";
    const iconWrap = document.createElement("div");
    iconWrap.className = "toast__icon";
    iconWrap.textContent = iconText;

    const content = document.createElement("div");
    content.className = "toast__content";
    const t = document.createElement("div");
    t.className = "toast__title";
    t.textContent = title;
    const m = document.createElement("p");
    m.className = "toast__msg";
    m.textContent = message;
    content.appendChild(t);
    content.appendChild(m);

    const close = document.createElement("button");
    close.className = "toast__close";
    close.type = "button";
    close.setAttribute("aria-label", "Close notification");
    close.textContent = "✕";
    close.addEventListener("click", () => toast.remove());

    toast.appendChild(iconWrap);
    toast.appendChild(content);
    toast.appendChild(close);
    host.appendChild(toast);

    setTimeout(() => {
      if (toast.isConnected) toast.remove();
    }, durationMs);
  }

  function initDashboard() {
    const queueStatusEl = $("#queueStatus");
    const availableServicesEl = $("#availableServices");
    const estimatedTimeEl = $("#estimatedTime");
    if (!queueStatusEl || !availableServicesEl || !estimatedTimeEl) return;

    const serviceNeededSelect = $("#serviceNeeded");

    let queueAhead = Math.floor(2 + Math.random() * 8);
    const allServiceIds = Object.keys(serviceLabelById);

    const chooseRandom = (arr, excludeValue) => {
      const pool = excludeValue ? arr.filter((x) => x !== excludeValue) : arr.slice();
      if (!pool.length) return arr[0];
      return pool[Math.floor(Math.random() * pool.length)];
    };

    const getCurrentServiceId = () => {
      const v = serviceNeededSelect?.value;
      if (v && serviceMeta[v]) return v;
      return chooseRandom(allServiceIds);
    };

    const renderAvailableServices = (currentServiceId) => {
      const count = Math.min(6, allServiceIds.length);
      const set = new Set();
      while (set.size < count) {
        const id = chooseRandom(allServiceIds, currentServiceId);
        set.add(id);
        if (set.size >= count) break;
      }
      availableServicesEl.innerHTML = "";
      for (const id of set) {
        const chip = document.createElement("div");
        chip.className = "chip-mini";
        chip.textContent = serviceLabelById[id] || id;
        availableServicesEl.appendChild(chip);
      }
    };

    const update = () => {
      const currentServiceId = getCurrentServiceId();
      const meta = serviceMeta[currentServiceId] || { etaMin: 20, etaMax: 60 };
      const etaMin = meta.etaMin;
      const etaMax = meta.etaMax;
      const eta = Math.floor(etaMin + Math.random() * (etaMax - etaMin + 1));

      // Simulated queue updates
      queueAhead = Math.max(0, Math.round(queueAhead + (Math.random() - 0.45) * 3));
      const label =
        queueAhead <= 1
          ? "Ready for review"
          : `Queue: ${queueAhead} ahead`;

      queueStatusEl.textContent = label;
      estimatedTimeEl.textContent = `${eta}–${eta + Math.floor(Math.random() * 12)} minutes`;
      renderAvailableServices(currentServiceId);
    };

    update();
    setInterval(update, 10000);

    if (serviceNeededSelect) {
      serviceNeededSelect.addEventListener("change", () => {
        update();
        const id = serviceNeededSelect.value;
        if (id && serviceMeta[id]) {
          showToast({
            title: "Estimate updated",
            message: `Based on ${serviceLabelById[id] || "your selection"}, we’ll be ready shortly.`,
            type: "info",
            durationMs: 2800,
          });
        }
      });
    }
  }

  function initServiceIconsForModuleHint() {
    // No-op placeholder for future enhancements.
  }

  function initRequestPage() {
    const form = $("#requestForm");
    if (!form) return;

    const serviceNeededSelect = $("#serviceNeeded");
    const descEl = $("#requestDescription");
    const moduleHint = $("#moduleHint");
    const modal = $("#successModal");
    const modalClose = $("#modalClose");
    const modalSummary = $("#successSummary");
    const modalText = $("#successModalText");

    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    const moduleParam = params.get("module");

    const setModuleHint = () => {
      if (!moduleParam) return;
      const label =
        trainingModuleLabelById[moduleParam] ||
        trainingModuleLabelById[moduleParam.toLowerCase()] ||
        moduleParam.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      moduleHint.style.display = "block";
      moduleHint.innerHTML = `Selected module: <strong>${label}</strong>`;

      if (descEl && descEl.value.trim().length === 0) {
        descEl.value = `I want to enroll for ${label}. Please confirm the schedule and requirements.`;
      }
    };

    if (serviceParam && serviceNeededSelect) {
      if (serviceMeta[serviceParam]) serviceNeededSelect.value = serviceParam;
      if (serviceParam === "computer_training") setModuleHint();
    }

    // Validate service parameter even if module param is used first
    if (moduleParam && serviceNeededSelect && serviceNeededSelect.value === "computer_training") {
      setModuleHint();
    }

    const openModal = () => {
      if (!modal) return;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
      if (!modal) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    if (modalClose) modalClose.addEventListener("click", closeModal);

    modal?.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // ESC close
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (modal?.classList.contains("is-open")) closeModal();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const serviceId = serviceNeededSelect?.value || "";
      const serviceLabel = serviceLabelById[serviceId] || serviceId || "Your selected service";

      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const phone = String(fd.get("phone") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const description = String(fd.get("description") || "").trim();

      // Open Gmail directly with pre-filled email for all services
      const subject = encodeURIComponent(`Service Request: ${serviceLabel}`);
      const body = encodeURIComponent(
        `Hello iHub City Cyber,\n\n` +
        `I would like to request the following service:\n` +
        `- Service: ${serviceLabel}\n` +
        `- Name: ${name}\n` +
        `- Phone: ${phone}\n` +
        `- Email: ${email}\n\n` +
        `Description:\n${description}\n\n` +
        `Please confirm receipt and provide next steps.`
      );
      window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&su=${subject}&body=${body}`, "_blank");
            truncate(description, 420)
          )}</div>
        </div>
      `;

      modalText.textContent = `Thank you, ${name || "friend"}! We’ve received your request.`;
      modalSummary.innerHTML = summaryHtml;

      openModal();
      showToast({
        title: "Request received",
        message: `We’re reviewing your ${serviceLabel}. You’ll be contacted soon.`,
        type: "success",
      });

      // Open Gmail directly with pre-filled email for all services
      const subject = encodeURIComponent(`Service Request: ${serviceLabel}`);
      const body = encodeURIComponent(
        `Hello iHub City Cyber,\n\n` +
        `I would like to request the following service:\n` +
        `- Service: ${serviceLabel}\n` +
        `- Name: ${name}\n` +
        `- Phone: ${phone}\n` +
        `- Email: ${email}\n\n` +
        `Description:\n${description}\n\n` +
        `Please confirm receipt and provide next steps.`
      );
      
      window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&su=${subject}&body=${body}`, "_blank");
      
      showToast({
        title: "Opening Gmail",
        message: "Please send the pre-filled email to complete your request.",
        type: "success",
      });

      // Reset form but keep service selection for convenience
      form.reset();
      if (serviceNeededSelect && serviceId) serviceNeededSelect.value = serviceId;
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function truncate(str, max) {
    const s = String(str || "");
    if (s.length <= max) return s;
    return s.slice(0, max - 1) + "…";
  }

  function initContactPage() {
    const form = $("#contactForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      form.reset();
      showToast({
        title: "Message sent",
        message: `Thanks${name ? `, ${name}` : ""}! We’ll respond soon.`,
        type: "success",
      });
    });
  }

  // Init everything
  function init() {
    initThemeToggle();
    initLoadingOverlay();
    renderIcons();
    initBackToTop();
    initSmoothAnchorScroll();
    initMobileNav();
    initClock();
    initParticles();
    initCounters();
    initTestimonials();
    initFAQ();
    initDashboard();
    initRequestPage();
    initContactPage();

    initServiceIconsForModuleHint();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

