import * as React from "react"
import Link from "next/link";
import { Vista } from "@/interfaces/vistaInterface";
import { DynamicIcon } from "../customUI/dynamicLucideIcon";

// SIDEBAR CUANDO ESTÁ CERRADA

export const ClosedSidebarLinks = ({actualRoute, links}:{actualRoute:string, links:Vista[]}) => {
    return (
        <>
            <div className="flex flex-col gap-5">
                {links.map((l) => {
                    const isActualRoute = actualRoute.includes(l.hrefVista);
                    return (
                            <Link
                                key={l.idVista}
                                href={l.hrefVista}
                                className={`group mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-accent-800 hover:bg-accent-50
                                ${isActualRoute ? 'bg-accent text-accent-foreground' : 'text-foreground'}`} 
                            >
                                <DynamicIcon name={l.iconoVista} classes={`h-5 w-5`}/>
                                <span
                                    className="absolute rounded-md px-2 py-1 ml-6 text-nowrap
                                    bg-accent-100 text-text-foreground text-sm
                                    invisible opacity-20 -translate-x-3 transition-all w-50
                                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-10
                                    "
                                >
                                    {l.tituloVista}
                                </span>
                            </Link>
                    )
                })}
            </div>
        </>
    )
}

// SIDEBAR CUANDO ESTÁ ABIERTA

export const OpenedSidebarLinks = ({actualRoute, links}:{actualRoute:string, links:Vista[]}) => {
    return (
        <>
            {links.map((l) => {
                const isActualRoute = actualRoute.includes(l.hrefVista);
                return (
                    
                    <Link
                        key={l.idVista}
                        href={l.hrefVista}
                        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-base hover:text-accent-800 hover:bg-accent-50
                            ${isActualRoute ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
                    >
                        <DynamicIcon name={l.iconoVista} classes={`h-5 w-5`}/>
                        {l.tituloVista}
                    </Link>
                )
            })}
        </>
    )
}