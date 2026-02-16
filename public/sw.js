import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'
import { precacheAndRoute } from 'workbox-precaching'

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST)

// Cache pages with stale-while-revalidate strategy
registerRoute(
  ({ request }) => request.destination === 'document',
  new StaleWhileRevalidate({
    cacheName: 'pages-cache',
  })
)

// Cache images, styles, and scripts
registerRoute(
  ({ request }) => request.destination === 'image' ||
                   request.destination === 'style' ||
                   request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'assets-cache',
  })
)

// Handle offline fallback
self.addEventListener('install', (event) => {
  console.log('Service worker installing...')
})

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...')
})

self.addEventListener('fetch', (event) => {
  // Handle fetch events if needed
})