'use client';

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Importa los estilos de AOS
import { metadata } from './metadata';
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      once: true, // Si solo se debe animar una vez al hacer scroll
    });
  }, []);

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Providers>
            <Navbar />
            <div className="min-h-screen min-w-screen pt-4 pb-4 md:pr-16 md:pl-16 lg:pr-56 lg:pl-56">
              {children}
            </div>
            <Footer />
          </Providers>
      </body>
    </html>
  );
}
