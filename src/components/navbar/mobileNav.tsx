import * as React from "react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import {
    Card,
    // CardContent,
    // CardDescription,
    // CardHeader,
    CardTitle,
} from "../ui/card";
import { ModeToggle } from "@/components/themeToggle/modeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { OpenedSidebarLinks } from "./sidebar/sidebarLinks";
import Link from "next/link";

export default function MobileNav({actualRoute, links}:{actualRoute:string, links:any}) {

    return (
        <Sheet>
            {/* Sidebar Cerrada */}
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
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
                        <Link href={'/'}>
                            <Card>
                                <div className="flex items-center p-3">
                                    <Avatar className="w-14 h-14"> 
                                        <AvatarImage className="w-full h-full object-cover rounder-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TgOv9CMmsUzYKCcLGWPvqcpUk6HXp2mnww&s" alt="Logo" />
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-grow flex-col items-center justify-center">
                                        <CardTitle>Miau Venegas</CardTitle>
                                        <span className="text-sm">miau.venegas@duocuc.cl</span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
}