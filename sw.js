// S-LA Djursland Quiz — Service Worker (minimal, til PWA install)
const CACHE = 'sla-quiz-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => clients.claim());
// Ingen caching — bare for at aktivere PWA install-prompt
