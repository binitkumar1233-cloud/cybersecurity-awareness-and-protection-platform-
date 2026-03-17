
// v14 admin visibility controller
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const setAdmin = v => localStorage.setItem('symx-admin', v ? 'true' : 'false');
  if (params.get('admin') === '1') setAdmin(true);
  if (params.get('logout') === '1') setAdmin(false);

  const isAdmin = localStorage.getItem('symx-admin') === 'true';
  const adminLinks = document.querySelectorAll('.admin-only');
  adminLinks.forEach(a => { a.style.display = isAdmin ? 'inline-block' : 'none'; });

  const badge = document.getElementById('admin-badge');
  if (badge) badge.style.display = isAdmin ? 'inline-block' : 'none';
});
