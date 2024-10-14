// Add event listener to navigation menu items
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetSection = document.querySelector(link.getAttribute('href'));
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Add event listener to navigation toggle button
const navToggle = document.querySelector('.nav-toggle');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  document.querySelector('.nav ul').classList.toggle('show');
});

// Add event listener to window scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 200) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Add event listener to window resize
window.addEventListener('resize', () => {
  const nav = document.querySelector('.nav');
  if (window.innerWidth < 768) {
    nav.classList.add('mobile');
  } else {
    nav.classList.remove('mobile');
  }
});