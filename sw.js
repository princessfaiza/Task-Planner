self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Task Reminder';
  const options = {
    body: data.body || 'You have a task coming up!',
    icon: '/icon.webp', // Make sure this exists
    badge: '/icon.webp'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

