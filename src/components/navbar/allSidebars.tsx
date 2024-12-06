'use client'

import { Sidebar, MobileNav, SidebarSkeleton, MobileNavSkeleton } from "@/components/navbar/";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AllSidebars({actualRoute, isMobile} : {actualRoute:string, isMobile:boolean | undefined}) {
    // Estado para almacenar los enlaces
    const { status } = useSession();
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showSkeleton, setShowSkeleton] = useState(false);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetch('/api/sidebar', {
                    cache: 'no-store'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch sidebar links');
                }
                const links = await response.json();
                setLinks(links);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sidebar links:', error);
            }
            
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
    }, [status]);

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
