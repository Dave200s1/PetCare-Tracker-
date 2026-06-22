/* global clients, self, caches, fetch, console, Notification */
const CACHE_NAME = 'pet-cate-cache-v4'
const API_CACHE = 'api-cache-v3'

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

//Aktivierung + CHACHE-CLEANUP
self.addEventListener('activate', (event) => {
  console.log('Service Worker aktiviert – alte Caches werden bereinigt')

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        // Alle Caches durchgehen und löschen, die nicht zu den aktuellen gehören
        const cachesToDelete = cacheNames.filter((name) => {
          return name !== CACHE_NAME && name !== API_CACHE
        })
        return Promise.all(
          cachesToDelete.map((name) => {
            console.log(` Alter Cache gelöscht: ${name}`)
            return caches.delete(name)
          })
        )
      })
      .then(() => {
        // Sofort die Kontrolle über alle Clients übernehmen
        return self.clients.claim()
      })
  )
})

// Fetch (Hybrid-Caching)
self.addEventListener('fetch', (event) => {
  // GET-Requests für API-Endpunkte cachen (Network First)
  if (
    event.request.method === 'GET' &&
    (event.request.url.includes('/api/task') ||
      event.request.url.includes('/api/pet'))
  ) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return caches.open(API_CACHE).then((cache) => {
            cache.put(event.request, networkResponse.clone())
            return networkResponse
          })
        })
        .catch(async () => {
          console.log(' Offline, Cache wird verwendet')
          const cachedResponse = await caches.match(event.request)
          return cachedResponse
        })
    )
    return
  }

  // Static Files: Cache First
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request)
    })
  )
})

// Push-Banachrichtigungen
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body, icon } = event.data.payload
    self.registration.showNotification(title, {
      body: body || 'Erinnerung von PetCare',
      icon: icon || '/icons/doctor.png',
      tag: 'pet-reminder',
      requireInteraction: true,
    })
  }
})

// Auf Notification klicken
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/')
      }
    })
  )
})
