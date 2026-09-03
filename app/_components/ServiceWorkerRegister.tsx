"use client";
import { useEffect } from "react";

/**
 * Registers the service worker (/sw.js) on the client.
 * A registered service worker is required for the browser to
 * consider the site "installable" as a PWA.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failed — install button won't appear.
      });
    }
  }, []);

  return null;
}
