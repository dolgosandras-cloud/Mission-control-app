// Service Worker az értesítések fogadásához és kattintáskezeléséhez
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Értesítés kattintásának kezelése: megnyitja vagy előtérbe hozza az appot
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});

// Push üzenet fogadása háttérből
self.addEventListener("push", (event) => {
  let data = { title: "Mission Control", body: "Nem felejtettél el valamit ma?" };
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [200, 100, 200],
    data: { url: "/" }
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
