
//asignar un nombre y versión al cache
const CACHE_NAME = 'cache_popularte',
  urlsToCache = [
    './',
    './activos.html',
    './appleTouchIcon.png',
    './BerlinSansFB.ttf',
    './BG.png',
    './cajaMdf.png',
    './cajaTriplex.png',
    './catalogo.html',
    './cojinTerciopelo.png',
    './cotizacion.png',
    './cotizador.html',
    './cuadroEstibas.png',
    './cuadroPino.png',
    './cuadroTriplex.png',
    './cuadroTronco.png',
    './edicion.png',
    './embalaje.png',
    './estilos.css',
    './favicon.ico',
    './fotografia.png',
    './Icono1.png',
    './Icono2.png',
    './Icono3.png',
    './Icono4.png',
    './icono16x16.png',
    './icono32x32.png',
    './icono150x150.png',
    './icono192x192.png',
    './icono512x512.png',
    './index.html',
    './insumos.html',
    './inventarios.html',
    './jardineraCubo.png',
    './libretaTriplex.png',
    './llaveroMadera.png',
    '/llaveroTextil.png',
    '/Logo.png',
    './Marca.png',
    './muestra1.png',
    './muestra2.png',
    './muestra3.png',
    './muestra4.png',
    '/muestra5.png',
    '/muestra6.png',
    './muestra7.png',
    './muestra8.png',
    './muestra9.png',
    './muestra10.png',
    './muestra11.png',
    './muestra12.png',
    './muestra13.png',
    './procesos.html',
    './promocion.png',
    './relojTronco.png',
    './script.js',
    './soporteCelular.png',
    './tomaDePedidos.png',
    './viniloDecorativo.png',
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
