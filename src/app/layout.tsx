'use client';

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Importa los estilos de AOS
import { metadata } from './metadata';
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar, MobileNav } from "@/components/navbar/";
import Footer from "@/components/footer/footer";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";

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
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex flex-col h-screen md:flex-row">
                <div className="hidden h-screen md:block md:w-[220px] lg:w-[280px]">
                  <Sidebar />
                </div>
                <div className="w-full p-5 md:hidden">
                  <MobileNav />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col h-full">
                    <main className="flex-grow">
                      {children}
                    </main>
                    <div className="w-full">
                      <Footer />
                    </div>
                  </div>
                </div>
              </div>
            </ThemeProvider>
          </Providers>
      </body>
    </html>
  );
}
