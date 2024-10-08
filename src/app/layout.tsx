import type { Metadata } from "next";
import "./globals.scss";
import { ThemeProvider } from "@/components/themeToggle/theme-provider";
import { fredoka } from './fonts/fonts';
import AnimatedLayout from "../components/customUI/page-transition"

export const metadata: Metadata = {
  title: "Señalando Un Futuro",
  description: "Señalando Un Futuro es una aplicación web para el aprendizaje y reforzamiento de la Lengua de Señas Chilena (LSCh) con el apoyo de la Inteligencia artificial (IA).",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <body
        className={`${fredoka.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col h-full">
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </ThemeProvider>
      </body>
    </html>
  );
}
