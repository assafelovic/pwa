self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('cache-store').then((cache) => cache.addAll([
      '/',
      '/scripts/slideshow.js',
      '/index.js',
      '/style.css',
      '/index.html',
      '/images/houzz-design-1.png',
      '/images/houzz-design-2.png',
      '/images/houzz-design-3.png',
      '/images/houzz-design-4.png',
      '/images/houzz-design-5.png',
    ])),
  );
});

self.addEventListener('activate', (e) => {
  console.log('I am alive...');
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});

self.addEventListener('push', (e) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${e.data.text()}"`);

  const title = 'Houzz Pro';
  const options = {
    body: e.data.text(),
    icon: '/icon/logo.png',
    badge: '/icon/logo.png'
  };

  e.waitUntil(self.registration.showNotification(title, options));
});
