const cacheName = "service-worker-v1"

if("serviceWorker" in navigator){
    window.addEventListener("load", () => {

        // creating a new service worker - ASYNCHRONOUS
        navigator.serviceWorker.register("./service-worker.js").then(

            function (registration){
                console.log("ServiceWorker is successfull", registration.scope);
            },

            function(err){
                // registation failed
                console.error(err?.message)
            }
        )
    })
}