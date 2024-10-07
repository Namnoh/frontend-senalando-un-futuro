'use client';

import { usePathname } from 'next/navigation';
import { AllSidebars } from "@/components/navbar/";
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
            {/* Sidebars */}
            {showSide && isMobile != undefined && (
                <AllSidebars actualRoute={actualRoute} isMobile={isMobile}/>
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