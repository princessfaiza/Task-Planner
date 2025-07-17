self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
