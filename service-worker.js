const OFFLINE_VERSION = 1;
const CACHE_NAME = 'pwa-rc-v1'
const OFFLINE_URL = 'offline.html'

const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/css/style.css',
  '/manifest.json',
  '/assets/fonts/Nunito-Regular.ttf'
]



// Install Service Worker and open the cache
self.addEventListener('install', function (event) {
  event.waitUntil((
    async () => {
      const cache = await caches.open(CACHE_NAME)

      // Cache without asset
      // await cache.add(new Request(OFFLINE_URL, {
      //   cache: 'reload'
      // }))

      // cache with all with assets
      await cache.addAll(assets)
    }
  )())

  self.skipWaiting()
})

// Do preload
self.addEventListener('activate', function (event) {
  console.info('[SW] active!');

  event.waitUntil((async () => {
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable()
    }
  })())

  self.clients.claim()

})

// interrupt
self.addEventListener('fetch', function (event) {
  if (event.request.mode === 'navigate')
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse

          if (preloadResponse)
            return preloadResponse

          const networkResponse = await fetch(event.request)
        } catch (err) {
          console.log("Fetch failed, returning offline page.");

          const cache = await caches.open(CACHE_NAME)
          // If offline, load offiline.html
          // const cachedResponse = await cache.match(OFFLINE_URL)

          // If offline, load all assets
          const cachedResponse = await cache.match(event.request)

          return cachedResponse || fetch(event.request)

        }
      })()
    )
})