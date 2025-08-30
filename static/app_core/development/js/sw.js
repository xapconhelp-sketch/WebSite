const CACHE_NAME = 'paws_roofing-cache-v1';

const urlsToCache = [
  '/',
  // Template CSS
  '/static/app_core/assets/css/bootstrap.min.css',  
  '/static/app_core/assets/css/all.css',  
  '/static/app_core/assets/css/animate.css',  
  '/static/app_core/assets/css/swiper-bundle.min.css',  
  '/static/app_core/assets/css/slick.css',  
  '/static/app_core/assets/css/magnific-popup.css',  
  '/static/app_core/assets/css/meanmenu.min.css',  
  '/static/app_core/assets/css/style.css',  
  '/static/app_core/assets/css/style.css.map',  
  // Template JS
  '/static/app_core/assets/js/jquery-3.6.0.min.js', 
  '/static/app_core/assets/js/bootstrap.min.js', 
  '/static/app_core/assets/js/jquery.counterup.min.js', 
  '/static/app_core/assets/js/popper.min.js', 
  '/static/app_core/assets/js/progressbar.min.js', 
  '/static/app_core/assets/js/jquery.magnific-popup.min.js', 
  '/static/app_core/assets/js/swiper-bundle.min.js', 
  '/static/app_core/assets/js/slick.min.js', 
  '/static/app_core/assets/js/isotope.pkgd.min.js', 
  '/static/app_core/assets/js/jquery.waypoints.min.js', 
  '/static/app_core/assets/js/jquery.meanmenu.min.js', 
  '/static/app_core/assets/js/custom.js', 

  // Base CSS
  '/static/app_user/vendors/pnotify/dist/pnotify.css',  
  '/static/app_user/vendors/pnotify/dist/pnotify.buttons.css',  
  '/static/app_user/vendors/pnotify/dist/pnotify.nonblock.css',  
  '/static/app_user/vendors/pnotify/dist/pnotify.brighttheme.css',
  '/static/app_core/development/css_whatsapp/whatsapp.css',  
  '/static/app_core/development/css_whatsapp/line-awesome.css',  
  '/static/app_core/development/css/counters.css',  
  '/static/app_core/development/css/modals.css',  
  '/static/app_core/development/css/animation.css',  
  '/static/app_core/development/css/preloaders.css',  
  '/static/app_core/development/css/btns-fixed.css',  
  '/static/app_core/development/css/easy-navigation.css',  
  '/static/app_core/development/css/responsive-default.css',  
  // Base JS
  '/static/app_user/vendors/pnotify/dist/pnotify.js', 
  '/static/app_user/vendors/pnotify/dist/pnotify.buttons.js', 
  '/static/app_user/vendors/pnotify/dist/pnotify.nonblock.js', 
  '/static/app_core/development/js/whatsapp.js', 
  '/static/app_core/development/js/scroll-top.js', 
  '/static/app_core/development/js/counters.js', 
  '/static/app_core/development/js/observer-viewport.js', 
  '/static/app_core/development/js/modals.js', 
  '/static/app_core/development/js/preloaders.js', 
  '/static/app_core/development/js/btns-fixed.js', 
  '/static/app_core/development/js/easy-navigation.js', 
  '/static/app_core/development/js/share-on-media.js', 
  '/static/app_core/development/js/send-email.js', 
  '/static/app_core/development/js/lazy-loading.js', 
];

// Instalar el Service Worker y almacenar archivos en caché
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar solicitudes y servir desde caché si es posible
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Si el archivo está en caché, servir desde caché
        if (response) {
          return response;
        }
        // Si no está en caché, realizar la solicitud de red normalmente
        return fetch(event.request);
      })
  );
});

// Actualizar el Service Worker y eliminar la caché anterior
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
