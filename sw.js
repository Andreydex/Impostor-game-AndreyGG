const CACHE_NAME = 'impostor-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn-icons-png.flaticon.com/512/2591/2591141.png'
];

// Instalar el service worker y guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Estrategia: Primero buscar en caché, si no hay, ir a la red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});