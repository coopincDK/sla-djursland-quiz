// ============================================================
// S-LA DJURSLAND — Service Worker med auto cache-bust
// Opdater CACHE_VERSION ved hver deploy for at rydde cache
// ============================================================

const CACHE_VERSION = 'v1.0.9';
const CACHE_NAME = `djursland-quiz-${CACHE_VERSION}`;

// Filer der skal caches
const PRECACHE = [
  './',
  './index.html',
  './style.css',
  './game.js',
  './questions.js',
  './firebase-config.js'
];

// Install — cache core filer
self.addEventListener('install', event => {
  console.log(`[SW] Installing ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()) // Aktiver straks
  );
});

// Activate — slet ALLE gamle caches
self.addEventListener('activate', event => {
  console.log(`[SW] Activating ${CACHE_NAME} — rydder gamle caches`);
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log(`[SW] Sletter gammel cache: ${key}`);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim()) // Overtag alle tabs straks
  );
});

// Modtag besked fra app om at skippe waiting
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch — network first, cache fallback
self.addEventListener('fetch', event => {
  // Skip non-GET og cross-origin
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Gem frisk kopi i cache
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Offline fallback — brug cache
        return caches.match(event.request);
      })
  );
});
