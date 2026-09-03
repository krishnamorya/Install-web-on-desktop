"use client";
import { useEffect, useState } from "react";

/**
 * The `beforeinstallprompt` event is not yet in the TS DOM lib,
 * so we declare a minimal interface for the fields we use.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // If the page is already running in standalone mode (installed),
    // the app was launched from the desktop — no install button needed.
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }

    // Capture the install prompt so we can trigger it from our button.
    const onBeforeInstall = (e: Event) => {
      e.preventDefault(); // suppress the browser's mini-infobar
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Fires once the user accepts the install dialog (from any source).
    const onAppInstalled = () => setInstalled(true);

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setInstalled(true);
    }
    setDeferredPrompt(null);
  };

  // Already installed — show success state.
  if (installed) {
    return (
      <div className="status-installed">✓ App Installed — check your desktop!</div>
    );
  }

  // Browser hasn't fired the event yet (not eligible, or unsupported).
  if (!deferredPrompt) return null;

  return (
    <button className="install-btn" onClick={handleInstall}>
      ⬇ Install App
    </button>
  );
}
