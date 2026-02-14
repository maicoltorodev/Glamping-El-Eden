import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brandFont = Sora({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Glamping el Edén - Experiencia Única en la Naturaleza",
  description: "Reserva tu glamping de lujo en Guasca, Cundinamarca. Disponibilidad en tiempo real, precios transparentes y una experiencia inolvidable en medio de la naturaleza.",
  metadataBase: new URL("https://glamping-el-eden.vercel.app"),
  openGraph: {
    images: ["/image-metadata.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/image-metadata.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${brandFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
