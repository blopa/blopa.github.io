// Kill switch for the old Gatsby site's service worker (gatsby-plugin-offline).
// Browsers that visited the old site still have it installed at /sw.js, and it
// serves stale HTML pointing at JS chunks that no longer exist. Browsers re-fetch
// this exact URL to check for updates, so this replaces the old worker, wipes its
// caches, unregisters itself and reloads open tabs once.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));
    })(),
  );
});
