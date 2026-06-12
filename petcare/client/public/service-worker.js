const CACHE_NAME = 'pet-care-cache-v3'
const API_CACHE = 'api-cache-v1'

const urlsToCache = ['/', '/index.html', '/manifest.json']

// INSTALL
self.addEventListener('install', (event) => {
  console.log('Service Worker installiert')

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', (event) => {
  const url = event.request.url

  // API: Network First
  if (url.includes('/api/task')) {
    event.respondWith(
      fetch(event.request)
        .then(async (res) => {
          const cache = await caches.open(API_CACHE)
          cache.put(event.request, res.clone())
          return res
        })
        .catch(async () => {
          const cache = await caches.open(API_CACHE)
          return cache.match(event.request)
        })
    )
    return
  }

  // Static files (including JSON): Cache First, then Network
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        // Return cached response if available
        if (cached) {
          return cached
        }
        // Otherwise fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Optionally cache the newly fetched file
            if (networkResponse && networkResponse.status === 200) {
              const cacheCopy = networkResponse.clone()
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, cacheCopy)
              })
            }
            return networkResponse
          })
          .catch(() => {
            // Offline fallback: could return a custom offline page or empty response
            return new Response('Offline', { status: 503 })
          })
      })
    )
  }
})
