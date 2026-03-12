const cacheName = "service-worker-v1";
const filesToCache = [
    "index.html"
]

self.addEventListener("install", e => {
    e.waitUntil(caches.open(cacheName).then(cache => {
        return cache.addAll(filesToCache);
    }))
})

self.addEventListener("activate", e => {
    console.log("Service worker activated")
})

self.addEventListener("fetch", event => {

    // API caching
    if(event.request.url.includes("")){
        event.respondWith(

            // first it should match if cache for that particular request already exist
            caches.match(event.request).then(response => {

                // if exist then return it
                if(response) return response;

                // if not exist then proceed with fetching response
                return fetch(event.request).then(response => {
                    if(!response || response.status !== 200){
                    return response;
                };

                // once got clone it because response is single time readable stream
                const apiResponse = response.clone();

                // make cache of clone response
                caches.open("api-cache").then(cache => {
                    cache.put(event.request, apiResponse)
                })

                // return original response
                return response;
                })
            })
        )
    }

    // Files caching
    event.respondWith(
        caches.match(event.request).then(response => {
            if(response) return response

            return fetch(event.request).then(response => {
                if(!response || response.status !== 200){
                    return response;
                };

                const responseToCache = response.clone();

                caches.open(cacheName).then(cache => cache.put(event.request ,responseToCache))
                return response;
            })
        })
    )
})