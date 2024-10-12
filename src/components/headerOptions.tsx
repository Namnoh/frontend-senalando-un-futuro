'use client'

import { usePathname } from 'next/navigation';
import { AllSidebars } from "@/components/navbar/";
// import { showSidebar } from '@/services/sidebar.service';
import { useMediaQuery } from '@/hooks/uiHooks';
import BackButton from '@/components/backButton';

export default function HeaderOptions() {
const actualRoute = usePathname();
// const showSide = showSidebar({pathName: actualRoute});
let isMobile = useMediaQuery('(max-width: 767px)');

    return (
        <>
            {/* Sidebars */}
            { isMobile != undefined && (
                <AllSidebars actualRoute={actualRoute} isMobile={isMobile}/>
            )}
            {/* Votón para volver */}
                <BackButton actualRoute={actualRoute} isMobile={isMobile}/>
            {/* Contenido Principal */}
        </>
    )
}
