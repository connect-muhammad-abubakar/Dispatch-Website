/* ========= Helper: DOM Ready ========= */
function ready(fn) {
  if (document.readyState !== 'loading') { fn(); }
  else { document.addEventListener('DOMContentLoaded', fn); }
}

/* ========= Loader: Spin then Fade ========= */
function hideLoader() {
  const loader = document.getElementById('loader');
  const site = document.getElementById('site');
  loader.style.transition = 'opacity 500ms ease';
  loader.style.opacity = '0';
  setTimeout(() => {
    loader.style.display = 'none';
    site.classList.remove('hidden');
  }, 520);
}

/* ========= Theme Switcher ========= */
const THEME_KEY = "rgn-theme";

function applyStoredTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "light";
  document.documentElement.setAttribute("data-theme", saved);
  const toggle = document.getElementById("themeToggle");
  if (toggle) toggle.checked = saved === "dark";
}

function toggleTheme(checked) {
  const theme = checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

document.addEventListener("DOMContentLoaded", () => {
  applyStoredTheme();

  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("change", e => toggleTheme(e.target.checked));
  }
});

/* ========= Navbar Mobile Toggle ========= */
function initMobileMenu() {
  const btn = document.querySelector('.menu-toggle');
  const list = document.querySelector('.nav-links');
  if (!btn || !list) return;

  btn.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  // close on link click (mobile UX)
  list.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => list.classList.remove('open'));
  });
}

/* ========= Hero Slider ========= */
function initHeroSlider() {
  const track = document.querySelector('.hero-track');
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.querySelector('.hero-dots');
  if (!track || slides.length === 0 || !dotsContainer) return;

  let index = 0;
  const total = slides.length;
  const interval = 2600; // 2–3 seconds per requirements

  // dots
  const dots = [];
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dotsContainer.appendChild(dot);
    dots.push(dot);
  }

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => {
      d.style.opacity = di === index ? '1' : '.55';
      d.style.transform = di === index ? 'scale(1.2)' : 'scale(1)';
      d.style.transition = 'transform 200ms ease, opacity 200ms ease';
    });
  }

  function next() {
    index = (index + 1) % total;
    update();
  }

  // start with slide 0 visible
  update();
  let timer = setInterval(next, interval);

  // pause on hover for desktop
  track.addEventListener('mouseenter', () => clearInterval(timer));
  track.addEventListener('mouseleave', () => { timer = setInterval(next, interval); });
}

/* ========= Scroll Animation (About Zoom-In) ========= */
function initScrollAnimations() {
  const targets = document.querySelectorAll('.observe-zoom');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: 0.2 });
  targets.forEach(el => io.observe(el));
}

/* ========= Map Overlay Logic ========= */
/*function initMapOverlay() {
  const overlay = document.getElementById('mapOverlay');
  const openers = document.querySelectorAll('.map-open');
  const closeBtn = overlay?.querySelector('.map-close');

  if (!overlay) return;

  function open() {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.hidden = true;
    document.body.style.overflow = '';
  }

  openers.forEach(btn => btn.addEventListener('click', open));
  closeBtn?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !overlay.hidden) close(); });
}
*/
/* ========= CTA Normalizer (All CTAs dial the number) ========= */
function linkAllCTAs() {
  const tel = 'tel:+123456789';
  // any element with .tel-cta class or buttons inside forms
  document.querySelectorAll('.tel-cta').forEach(node => {
    if (node.tagName === 'A') {
      node.setAttribute('href', tel);
    } else {
      node.addEventListener('click', () => { window.location.href = tel; });
    }
  });
}

/* ========= Year in Footer ========= */
function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

/* ========= Init ========= */
ready(() => {
  // theme first to avoid flash
  applyStoredTheme();

  // init UI pieces
  initMobileMenu();
  initHeroSlider();
  initScrollAnimations();
  initMapOverlay();
  linkAllCTAs();
  setYear();

  // loader hides after small delay to show spin
  setTimeout(hideLoader, 600);

  // theme toggle
  const toggle = document.getElementById('themeToggle');
  if (toggle) toggle.addEventListener('change', (e) => toggleTheme(e.target.checked));
});
// Back to top functionality
const backToTopBtn = document.querySelector(".back-to-top");

// Show button when scrolling down
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
});

// Smooth scroll to top
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
