const cacheNames = ['brainhub-v1'];

const cacheAssets = [
  '/',
  '/index.html',
  '/kitten.4431d989.jpeg',
  '/service-workers-project.e31bb0bc.js',
  '/styles.8986bff4.css',
];

self.addEventListener('install', event => {
  console.log('SW installed!')

  event.waitUntil(
    caches
      .open(cacheNames[0])
      .then(cache => {
        console.log('cache: ', cache);
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting()) // prevents the waiting, meaning the service worker activates as soon as it's finished installing.
  )
});

self.addEventListener('activate', event => {
  console.log('SW activated!')

  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!cacheNames.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('brainhub-v1 is now ready to handle fetches!');
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        console.log('Fetched from server');

        return response;
      })
      .catch(() => {
        console.log('Fetch from server failed. Getting from cache...')

        return caches.match(event.request);
      })
  )
});

self.addEventListener('message', event => {
  console.log("SW Received Message: " + event.data);
  let str = '';
  for (let i = 0; i < 1000000000; i++) {
    if (i % 33333333 === 0) {
      str += i >> i;
    }
  }
  event.ports[0].postMessage("SW Says 'Hello back!'" + str + 'a');
});

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
  };
  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});

self.addEventListener('sync', function(event) {
  if (event.tag === 'someTestSync') {
    event.waitUntil(() => setTimeout(() => {
      console.log('sync!')
    }, 6000));
  }
});
