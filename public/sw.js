// public/sw.js - Megbízható háttér- és riasztáskezelő

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Értesítés kattintásának kezelése
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

// Háttérben kapott üzenetküldési parancs
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "TRIGGER_NOTIFICATION") {
    const { title, body } = event.data;
    self.registration.showNotification(title, {
      body: body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      vibrate: [200, 100, 200],
      tag: "mission-control-alert",
      renotify: true
    });
  }

  // Helyi rendszer-időzítő (ha az Android támogatja a TimestampTrigger-t)
  if (event.data && event.data.type === "SCHEDULE_TIMESTAMP_TRIGGER") {
    const { title, body, timestamp } = event.data;
    if ("showTrigger" in Notification.prototype && "TimestampTrigger" in self) {
      try {
        self.registration.showNotification(title, {
          body: body,
          icon: "/icon-192.png",
          badge: "/icon-192.png",
          showTrigger: new TimestampTrigger(timestamp),
          tag: "scheduled-" + timestamp,
          renotify: true
        });
      } catch (e) {
        console.warn("TimestampTrigger hiba:", e);
      }
    }
  }
});
