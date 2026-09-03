import InstallButton from "./_components/InstallButton";

export default function Home() {
  return (
    <main className="container">
      <span className="badge">PWA</span>
      <h1>Install This App on Your Desktop</h1>
      <p className="desc">
        This demo shows how to add an "Install App" button to your website.
        Click the button below — the app will be installed as a standalone
        desktop application with its own icon, window, and launch entry.
      </p>

      <InstallButton />

      <p className="hint">
        Tip: This only works over HTTPS (or localhost) in Chrome, Edge, or Brave.
      </p>
    </main>
  );
}
