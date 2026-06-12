const CACHE_NAME = 'pet-cate-cache-v2'
const API_CACHE = 'api-cache-v1'

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/meta_data/pets.json',
  '/imgs/dog1.webp',
]

// Installation
self.addEventListener('install', (event) => {
  console.log('Server Worker installiert')

  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of urlsToCache) {
        try {
          await cache.add(url)
        } catch (err) {
          console.warn('Cache fehlgeschlagen: ', url, err)
        }
      }
    })
  )
})

// Fetch (Hybrid-Caching)
self.addEventListener('fetch', (event) => {
  if (
    event.request.method === 'GET' &&
    event.request.url.includes('/api/task')
  ) {
    event.respondWith(
      // ZUERST Netzwerk bzw. Network First
      fetch(event.request)
        .then((networkResponse) => {
          // Antwort im Cache speichern
          return caches.open(API_CACHE).then((cache) => {
            cache.put(event.request, networkResponse.clone())

            return networkResponse
          })
        })

        // Falls im Offline-Mode, Cache verwenden
        .catch(async () => {
          console.log('Offline, Cache wird verwendet')
          const cachedResponse = await caches.match(event.request)

          return cachedResponse
        })
    )
    return
  }

  // Static Files , Cache First Strategie
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request)
    })
  )
})
