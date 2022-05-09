
//asignar un nombre y versión al cache
const CACHE_NAME = 'cache_popularte',
  urlsToCache = [
    './',
    'https://jrdiaz08.github.io/Popularte/activos.html',
    'https://jrdiaz08.github.io/Popularte/appleTouchIcon.png',
    'https://jrdiaz08.github.io/Popularte/BerlinSansFB.ttf',
    'https://jrdiaz08.github.io/Popularte/BG.png',
    'https://jrdiaz08.github.io/Popularte/cajaMdf.png',
    'https://jrdiaz08.github.io/Popularte/cajaTriplex.png',
    'https://jrdiaz08.github.io/Popularte/catalogo.html',
    'https://jrdiaz08.github.io/Popularte/cojinTerciopelo.png',
    'https://jrdiaz08.github.io/Popularte/cotizacion.png',
    'https://jrdiaz08.github.io/Popularte/cotizador.html',
    'https://jrdiaz08.github.io/Popularte/cuadroEstibas.png',
    'https://jrdiaz08.github.io/Popularte/cuadroPino.png',
    'https://jrdiaz08.github.io/Popularte/cuadroTriplex.png',
    'https://jrdiaz08.github.io/Popularte/cuadroTronco.png',
    'https://jrdiaz08.github.io/Popularte/edicion.png',
    'https://jrdiaz08.github.io/Popularte/embalaje.png',
    'https://jrdiaz08.github.io/Popularte/estilos.css',
    'https://jrdiaz08.github.io/Popularte/favicon.ico',
    'https://jrdiaz08.github.io/Popularte/fotografia.png',
    'https://jrdiaz08.github.io/Popularte/Icono1.png',
    'https://jrdiaz08.github.io/Popularte/Icono2.png',
    'https://jrdiaz08.github.io/Popularte/Icono3.png',
    'https://jrdiaz08.github.io/Popularte/Icono4.png',
    'https://jrdiaz08.github.io/Popularte/icono16x16.png',
    'https://jrdiaz08.github.io/Popularte/icono32x32.png',
    'https://jrdiaz08.github.io/Popularte/icono150x150.png',
    'https://jrdiaz08.github.io/Popularte/icono192x192.png',
    'https://jrdiaz08.github.io/Popularte/icono512x512.png',
    'https://jrdiaz08.github.io/Popularte/index.html',
    
]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
