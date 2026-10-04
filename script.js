const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal, .reveal-stagger');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => observer.observe(item));

const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-menu a');

const updateActiveSection = () => {
  let currentId = 'home';

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140 && rect.bottom >= 140) {
      currentId = section.getAttribute('id');
    }
  });

  navAnchors.forEach((link) => {
    const href = link.getAttribute('href');
    const active = href === `#${currentId}`;
    link.classList.toggle('is-active', active);
  });
};

document.addEventListener('scroll', updateActiveSection, { passive: true });
updateActiveSection();
