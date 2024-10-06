'use client';

import { usePathname } from 'next/navigation';
import { Sidebar, MobileNav } from "@/components/navbar/";
import { showSidebar } from '@/services/sidebar.service';
import Footer from '@/components/footer/footer';
import { useMediaQuery } from '@/hooks/uiHooks';

export default function Layout (
    { children } : { children: React.ReactNode }
    ) 
{
    const actualRoute = usePathname();
    const showSide = showSidebar({pathName: actualRoute});

    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className="flex flex-col h-screen md:flex-row">
            {/* Sidebar */}
            {showSide && isMobile != undefined && (
                <div className={`${isMobile ? 'fixed p-5' : ''}`}>
                    {isMobile ? <MobileNav actualRoute={actualRoute}/> : <Sidebar actualRoute={actualRoute} />}
                </div>
            )}
            {/* Contenido Principal */}
            <div className={`flex flex-col flex-grow ${showSide ? 'md:ml-16' : ''}`}>
                <main className="flex-grow">
                    {children}
                </main>
                <div className="w-full">
                    <Footer />
                </div>
            </div>
        </div>
    );
}