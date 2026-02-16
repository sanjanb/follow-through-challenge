// Service Worker Registration Utility
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }

      // Handle updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New content is available, notify user
              if (
                confirm(
                  "New content is available! Reload to get the latest version?",
                )
              ) {
                window.location.reload();
              }
            }
          });
        }
      });
    } catch (error) {
      console.error("Service worker registration failed:", error);
    }
  }
};

// Check if app is running offline
export const isOnline = () => {
  return navigator.onLine;
};

// Listen for online/offline events
export const setupNetworkListeners = (onOnline, onOffline) => {
  window.addEventListener("online", onOnline);
  window.addEventListener("offline", onOffline);
};
