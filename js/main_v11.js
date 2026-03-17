
// Navbar toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }
  // Highlight active link
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('nav.symx-nav a').forEach(a => {
    if (a.getAttribute('href') === path) {
      a.classList.add('active');
    }
  });
  // Interactive timeline
  document.querySelectorAll('.timeline .step h3').forEach(h => {
    h.addEventListener('click', () => {
      h.parentElement.classList.toggle('open');
    });
  });
});


/* v13 smooth scroll + active section */
document.addEventListener('DOMContentLoaded', () => {
  // Active link by hash/section
  const links = document.querySelectorAll('nav.symx-nav a[href^="#"], nav.symx-nav a[href$=".html"]');
  // Optional: if page has sections with IDs matching nav hashes
  const sections = Array.from(document.querySelectorAll('section[id]'));
  function onScroll(){
    const pos = window.scrollY + 120;
    let current = null;
    for (const s of sections){
      if (s.offsetTop <= pos) current = s.id;
    }
    if (current){
      links.forEach(a => {
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
        else if (!a.getAttribute('href').endsWith('.html')) a.classList.remove('active');
      });
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
});
