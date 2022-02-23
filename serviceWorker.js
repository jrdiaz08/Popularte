if ('serviceWorker' in navigator) { //se activa la funcion de service worker, esta solo puede funcionar en el protocolo HTTPS
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Registro de Service Worker exitoso', reg))
      .catch(err => console.warn('Error al registrar el Service Worker', err))
  }