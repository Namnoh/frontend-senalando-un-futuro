'use client'

import { Sidebar, MobileNav, SidebarSkeleton, MobileNavSkeleton } from "@/components/navbar/";
import { getSidebarLinks } from "@/services/sidebar.service";
import { useEffect, useState } from "react";

export default function AllSidebars({actualRoute, isMobile} : {actualRoute:string, isMobile:boolean}) {
    // Estado para almacenar los enlaces
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showSkeleton, setShowSkeleton] = useState(false);

    useEffect(() => {
        const fetchLinks = async () => {
            const fetchedLinks = await getSidebarLinks();
            setLinks(fetchedLinks);
            setLoading(false);
        };

        const timer = setTimeout(() => {
            if (loading) {
                setShowSkeleton(true);
            }
        }, 50);

        fetchLinks();

        return () => {
            clearTimeout(timer);
        };
    }, []);

    if (loading) {
        if (showSkeleton) {
            const skeleton = isMobile ? <MobileNavSkeleton /> : <SidebarSkeleton />;
            return skeleton;
        }
    } else {
        return (
            <div className={`fixed z-50 ${isMobile ? 'p-5' : ''}`}>
                { isMobile ? <MobileNav actualRoute={actualRoute} links={links} /> : <Sidebar actualRoute={actualRoute} links={links} /> }
            </div>
        )
    }
}
