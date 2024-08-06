const CACHE_NAME = `image-sizer`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',
      '/main.js',
      '/css/style.css'
    ]);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    try {
        // If the resource was not in the cache, try the network.
        const fetchResponse = await fetch(event.request);

        // Save the resource in the cache and return it.
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
    } catch (e) {
        const cachedResponse = await cache.match(request);
    
        if (!navigator.onLine && cachedResponse) {
            return cachedResponse;
        } else {
            // TODO: render error
        }
    }
  })());
});