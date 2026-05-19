const CACHE_NAME = 'pet-cate-cache-v2'
const API_CACHE = 'api-cache-v1'

const urlsToCache = ['/', '/index.html', '/manifest.json']

// Installation
self.addEventListener('install', (event) => {
  console.log('Server Worker installiert')

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
})

// Fetch
self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET' && event.request.url.includes('/tasks')) {
    event.requestWith(
      // ZUERST Netzwerk
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
  }
})
