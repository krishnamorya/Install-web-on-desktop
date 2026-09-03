import type { Metadata, Viewport } from "next";
import ServiceWorkerRegister from "./_components/ServiceWorkerRegister";
import "./globals.css";

export const metadata: Metadata = {
  title: "PWA Install Demo",
  description: "A minimal Next.js app demonstrating how to add an 'Install App' button.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
