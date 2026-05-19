const CACHE_NAME = 'pet-cate-cache-v1'

const urlsToCache = ['/', '/index.html', '/manifest.json']

self.addEventListener('install', (event) => {
  console.log('Server Worker installiert')

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )

  //ToDo API calls fetchen
})
