const CACHE_DYNAMIC_NAME = "dynamic-v1";

const updateCacheDynamic = (dynamicCache, req, res) => {
  if (res.ok) {
    return caches.open(dynamicCache).then((cache) => {
      cache.put(req, res.clone());
      return res.clone();
    });
  } else return res;
};

self.addEventListener("fetch", (e) => {
  const respuesta = async () => {
    const cache = await caches.match(e.request);
    const fileHTML = /\.(html)$/i.test(e.request.url);
    const fileCSS = /\.(css)$/i.test(e.request.url);
    const fileJS = /\.(js)$/i.test(e.request.url);

    const validate_file = fileHTML || fileCSS || fileJS;

    if (cache) {
      if (navigator.onLine)
        if (validate_file)
          fetch(e.request).then((newRes) =>
            updateCacheDynamic(CACHE_DYNAMIC_NAME, e.request, newRes)
          );

      return cache;
    }

    if (validate_file)
      return fetch(e.request).then((newRes) =>
        updateCacheDynamic(CACHE_DYNAMIC_NAME, e.request, newRes)
      );

    return fetch(e.request);
  };

  e.respondWith(respuesta());
});

self.addEventListener("push", (e) => {
  const data = JSON.parse(e.data.text());
  const title = data.title ?? "";
  const options = {
    body: data.body ?? "",
    icon: data.icon ?? "",
    tag: data.tag ?? "",
    data: {
      url: data.url ?? "/",
    },
  };

  const respuesta = self.clients.matchAll().then((clients) => {
    const client = clients.find((client) => {
      const url = new URL(client.url);
      const pathhash = url.pathname + url.hash;

      if (client.visibilityState === "visible") return data.url == pathhash;
      return false;
    });

    return client == undefined
      ? self.registration.showNotification(title, options)
      : false;
  });
  e.waitUntil(respuesta);
});

self.addEventListener("notificationclick", (e) => {
  const url = e.notification.data.url;

  const respuesta = self.clients.matchAll().then((clients) => {
    const client = clients.find(
      (client) => client.visibilityState === "visible"
    );

    if (client !== undefined) {
      client.navigate(url);
      client.focus();
    } else {
      self.clients.openWindow(url);
    }

    return e.notification.close();
  });

  e.waitUntil(respuesta);
});

self.addEventListener("message", (e) => {
  const data = JSON.parse(e.data);

  if (data.type == "stream") {
    self.registration.getNotifications().then((notifications) => {
      notifications.forEach((notification) => {
        if (notification.data.url === data.pathhash) {
          notification.close();
        }
      });
    });
  }
});
