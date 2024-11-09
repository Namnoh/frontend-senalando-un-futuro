import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { getSidebarLinks } from "@/services/sidebar.service";
import { Vista } from '@/interfaces/vistaInterface';

export async function GET(): Promise<NextResponse> {
    try {
        const session = await getServerSession(authOptions);
        const isAuth = !!session;
        const isAdmin = session?.user.idRol === 2 ? true : false;
        const fetchedLinks = await getSidebarLinks(isAuth, isAdmin)
        return NextResponse.json(fetchedLinks);
    } catch (error) {
        console.error("Error en GET:", error);
        const fetchedLinks:Vista[] = []
        return  NextResponse.json(fetchedLinks); // Manejo de errores
    }
}