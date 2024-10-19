import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSidebarLinks } from "@/services/sidebar.service";
import { Vista } from '@/interfaces/vistaInterface';

export async function GET(): Promise<NextResponse> {
    try {
        const session = await getServerSession(authOptions);
        const isAuth = !!session;
        const fetchedLinks = await getSidebarLinks(isAuth)
        return NextResponse.json(fetchedLinks);
    } catch (error) {
        console.error("Error en GET:", error);
        const fetchedLinks:Vista[] = []
        return  NextResponse.json(fetchedLinks); // Manejo de errores
    }
}