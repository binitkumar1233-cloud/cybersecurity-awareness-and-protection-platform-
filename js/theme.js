
document.addEventListener('DOMContentLoaded', () => {
  // Theme init
  const saved = localStorage.getItem('symx-theme');
  if (saved === 'light') document.documentElement.classList.add('light');
  // Toggle handler
  const toggle = document.getElementById('theme-switch');
  if (toggle) {
    toggle.checked = document.documentElement.classList.contains('light');
    toggle.addEventListener('change', () => {
      document.documentElement.classList.toggle('light', toggle.checked);
      localStorage.setItem('symx-theme', toggle.checked ? 'light' : 'dark');
    });
  }
});
