import * as React from "react"
import {
    CirclePlus,
    FastForward,
    Home,
    Info,
    LogOut,
    Search,
    Users,
} from "lucide-react";
import Link from "next/link";

const links = [
    {href: "#", icon: Search, text: 'Buscar Palabras',},
    {href: "/", icon: Home, text: 'Niveles',},
    {href: "#", icon: FastForward, text: 'Tu progreso',},
    {href: "/quienesSomos", icon: Info, text: 'Sobre Nosotros',},
    {href: "#", icon: Users, text: 'Perfil',},
    {href: "#", icon: CirclePlus, text: 'Administración',},
    {href: "/login", icon: LogOut, text: 'Cerrar Sesión',},
]

// SIDEBAR CUANDO ESTÁ CERRADA

export const ClosedSidebarLinks = (props:{actualRoute:string}) => {
    return (
        <>
            <div className="flex flex-col gap-5">
                {links.map((l, index) => {
                    const IconToRender = l.icon;
                    return (
                            <Link
                                key={index}
                                href={l.href}
                                className={`group mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted
                                ${props.actualRoute === l.href ? 'bg-muted-foreground text-white' : ''}`}
                            >
                                {IconToRender && <IconToRender className="h-6 w-6" />}
                                <span
                                    className="absolute rounded-md px-2 py-1 ml-6 text-nowrap
                                    bg-muted text-text-foreground text-sm
                                    invisible opacity-20 -translate-x-3 transition-all w-50
                                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-10
                                    "
                                >
                                    {l.text}
                                </span>
                            </Link>
                    )
                })}
            </div>
        </>
    )
}

// SIDEBAR CUANDO ESTÁ ABIERTA

export const OpenedSidebarLinks = () => {
    return (
        <>
            {links.map((l, index) => {
                const IconToRender = l.icon;
                return (
                    
                    <Link
                        key={index}
                        href={l.href}
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                        {IconToRender && <IconToRender className="h-6 w-6" />}
                        {l.text}
                    </Link>
                )
            })}
        </>
    )
}