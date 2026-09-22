const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('portfolio-theme', theme);
  const isDark = theme === 'dark';
  themeLabel.textContent = isDark ? 'LIGHT' : 'DARK';
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
};

applyTheme(localStorage.getItem('portfolio-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeToggle?.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

const copyEmailButton = document.querySelector('.copy-email');
copyEmailButton?.addEventListener('click', async () => {
  const email = copyEmailButton.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copyEmailButton.querySelector('.copy-email-label').textContent = 'Copied!';
    setTimeout(() => { copyEmailButton.querySelector('.copy-email-label').textContent = 'Copy email'; }, 1800);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-section').forEach((item) => observer.observe(item));
