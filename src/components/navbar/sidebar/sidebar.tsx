'use client'

import * as React from "react"
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";
import { ModeToggle } from "@/components/themeToggle/modeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { ClosedSidebarLinks, OpenedSidebarLinks } from "../sidebarLinks";
import ProfileCard from "../profileCard";

export default function Sidebar({actualRoute, links}:{actualRoute:string, links:any}) {
    

    return (
        <aside className="fixed w-16 h-screen border-r flex flex-col items-center gap-5 bg-background">
            <Sheet>
                {/* Sidebar Cerrada */}
                <div className="flex flex-col items-center gap-5 h-screen">
                    <SheetTrigger asChild>
                        <div className="h-20 p-4">
                            <Button variant="fullGhost" size="icon">
                                <Avatar className="w-12 h-12"> 
                                    <AvatarImage className="w-full h-full object-cover rounder-full" src="/images/Logo_SinBG.png" alt="Logo" />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                            </Button>
                        </div>
                    </SheetTrigger>
                    <nav>
                        <ClosedSidebarLinks actualRoute={actualRoute} links={links}/>
                    </nav>
                    <div className="mt-auto pb-5">
                        <ModeToggle /> 
                    </div>
                </div>
                {/* Sidebar Abierta */}
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <div className="h-20">
                            <Avatar className="w-16 h-16"> 
                                <AvatarImage className="w-full h-full object-cover rounder-full" src="/images/Logo_SinBG.png" alt="Logo" />
                                <AvatarFallback>Avatar Image</AvatarFallback>
                            </Avatar>
                        </div>
                        <OpenedSidebarLinks actualRoute={actualRoute} links={links}/>
                    </nav>
                    <div>
                        <ModeToggle />
                    </div>
                    <div className="mt-auto">
                        <ProfileCard />
                    </div>
                </SheetContent>
            </Sheet>
        </aside>
    );
}