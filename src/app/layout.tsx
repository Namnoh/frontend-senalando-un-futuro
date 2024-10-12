import type { Metadata } from "next";
import "./globals.scss";
import { ThemeProvider } from "@/components/themeToggle/theme-provider";
import { fredoka } from './fonts/fonts';
import HeaderOptions from "@/components/headerOptions";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Señalando Un Futuro",
  description: "Señalando Un Futuro es una aplicación web para el aprendizaje y reforzamiento de la Lengua de Señas Chilena (LSCh) con el apoyo de la Inteligencia artificial (IA).",
  manifest: "/manifest.json",
  keywords: 
  "Lengua de Señas, Lengua de Señas Chilena, Señas Chile, Señas Chilena, Aprender Lengua de Señas, IA, Aprender con IA, Lengua de Signos, Aprender Lengua de Señas con IA, \
  IA para Aprender Lengua de Señas, Lengua de Señas en Chile, Lengua de Signos Chilena, Lengua de Señas online, Aprender Lengua de Signos, Aprender lengua de señas online \
  Lengua de Señas para principiantes, Lengua de Señas para intermedios, Lengua de Señas para avanzados",
  // authors: 'Bytes & Bits Team, Alfredo Galdames - Fernando Muñoz - Jean Venegas'
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
            <div className="flex flex-col h-screen md:flex-row">
              <HeaderOptions />
              <div className={`flex flex-col flex-grow md:ml-16`}>
                <main className="flex-grow">
                  {children}
                </main>
                <div className="w-full">
                  <Footer />
                </div>
              </div>
            </div>
          </ThemeProvider>
      </body>
    </html>
  );
}
