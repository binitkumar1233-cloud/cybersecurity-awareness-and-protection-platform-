
const CACHE='symantix-v6-site';
const ASSETS=[
  'index.html','identity.html','vault.html','network.html','learning.html','copilot.html',
  'timeline.html','compliance.html','reports.html','graph.html','settings.html',
  'css/global.css','css/dashboard.css','css/identity.css','css/vault.css','css/network.css','css/learning.css','css/copilot.css','css/timeline.css','css/compliance.css','css/reports.css','css/graph.css','css/settings.css',
  'js/main.js','js/dashboard.js','js/identity.js','js/vault.js','js/network.js','js/learning.js','js/copilot.js','js/timeline.js','js/compliance.js','js/reports.js','js/graph.js','js/settings.js',
  'assets/icons/icon-192.png','assets/icons/icon-512.png'
];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); });
self.addEventListener('fetch',e=>{ e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))); });
