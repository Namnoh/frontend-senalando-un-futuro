import * as React from "react"
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/themeToggle/modeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { OpenedSidebarLinks } from "../sidebarLinks";
import ProfileCard from "../profileCard";


export default function MobileNav({actualRoute, links}:{actualRoute:string, links:any}) {
    const isWordsSection = actualRoute.endsWith('/palabras');
    return (
        <Sheet>
            {/* Sidebar Cerrada */}
            <SheetTrigger asChild>
                <Button variant={`${isWordsSection ? 'fullGhost' : 'outline'}`} size="icon" className={`md:hidden  ${isWordsSection ? 'text-white' : ''}`}>
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
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
    );
}