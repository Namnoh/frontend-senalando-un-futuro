'use client';

import { usePathname } from 'next/navigation';
// import { metadata } from './metadata';
import "./globals.scss";
import { Sidebar, MobileNav } from "@/components/navbar/";
import Footer from "@/components/footer/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { fredoka } from './fonts/fonts';
import { showSidebar } from '@/services/sidebar.service';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const actualRoute = usePathname();
  const showSide = showSidebar({pathName: actualRoute});

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
              {showSide && (
                <>
                  <div className="hidden md:block">
                    {/* <Sidebar /> */}
                    <Sidebar actualRoute={actualRoute} />
                  </div>
                  <div className="fixed p-5 md:hidden">
                    <MobileNav actualRoute={actualRoute}/>
                  </div>
                </>
              )}
              <div className={`flex-grow ${showSide ? 'md:ml-20' : ''}`}>
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
      </body>
    </html>
  );
}
