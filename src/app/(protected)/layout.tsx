'use client';

import { usePathname } from 'next/navigation';
import { Sidebar, MobileNav } from "@/components/navbar/";
import { showSidebar } from '@/services/sidebar.service';
import Footer from '@/components/footer/footer';

export default function Layout (
    { children } : { children: React.ReactNode }
    ) 
{
    const actualRoute = usePathname();
    const showSide = showSidebar({pathName: actualRoute});

    return (
        <div className="flex flex-col h-screen md:flex-row">
            {showSide && (
                <>
                    <div className="hidden md:block">
                        {/* <Sidebar /> */}
                        <Sidebar actualRoute={actualRoute} />
                    </div>
                    <div className="fixed p-5 md:hidden">
                        {/* MobileSidebar */}
                        <MobileNav actualRoute={actualRoute}/>
                    </div>
                </>
            )}
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