import Link from "next/link";
import { Vista } from "@/interfaces/vistaInterface";
import { DynamicIcon } from "../customUI/dynamicLucideIcon";
import SearchButton from "./searchModal/searchButton";
import React from "react";
import SignOutBtn from "./signOutBtn";

// SIDEBAR CUANDO ESTÁ CERRADA

export const ClosedSidebarLinks = ({actualRoute, links}:{actualRoute:string, links:Vista[]}) => {
    return (
        <>
            <div className="flex flex-col gap-5">
                {links.map((l:Vista) => {
                    let isActualRoute = false;
                    if (actualRoute === '/' && l.iconoVista === 'Home') {
                        isActualRoute = true;
                    } else if (l.iconoVista !== 'Home' && actualRoute.startsWith(l.hrefVista)) {
                        isActualRoute = true;
                    }
                    return (
                        <React.Fragment key={l.idVista}>
                            {l.idVista === 1 ? (
                                <SearchButton l={l}/>
                            ) : ( l.idVista === 9 ) ? (
                                <SignOutBtn l={l}/>
                            ) : (
                                <Link
                                    href={l.hrefVista}
                                    className={`group mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-primary-800 hover:bg-primary-50
                                    ${isActualRoute ? 'bg-primary text-primary-foreground' : 'text-foreground'}`} 
                                >
                                    <DynamicIcon name={l.iconoVista} classes={`h-5 w-5`}/>
                                    <span
                                        className="absolute rounded-md px-2 py-1 ml-6 text-nowrap
                                        bg-primary-100 text-text-foreground text-sm
                                        invisible opacity-20 -translate-x-3 transition-all w-50
                                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-10
                                        "
                                    >
                                        {l.tituloVista}
                                    </span>
                                </Link>
                            )}
                        </React.Fragment>
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
                let isActualRoute = false;
                if (actualRoute === '/' && l.iconoVista === 'Home') {
                    isActualRoute = true;
                } else if (l.iconoVista !== 'Home' && actualRoute.startsWith(l.hrefVista)) {
                    isActualRoute = true;
                }
                return (
                    <React.Fragment key={l.idVista}>
                        {l.idVista === 1 ? (
                            <SearchButton l={l} isOpen={true}/>
                        ) : ( l.idVista === 9 ) ? (
                            <SignOutBtn l={l}/>
                        ) : (
                            <Link
                                key={l.idVista}
                                href={l.hrefVista}
                                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-base hover:text-primary-800 hover:bg-primary-50
                                    ${isActualRoute ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}
                            >
                                <DynamicIcon name={l.iconoVista} classes={`h-5 w-5`}/>
                                {l.tituloVista}
                            </Link>
                        )}
                    </React.Fragment>
                )
            })}
        </>
    )
}