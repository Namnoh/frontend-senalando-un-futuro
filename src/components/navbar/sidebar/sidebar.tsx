import * as React from "react"
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../ui/card";
import { ModeToggle } from "@/components/modeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { ClosedSidebarLinks, OpenedSidebarLinks } from "./sidebarLinks";



export default function Sidebar(props:{actualRoute:string}) {
    return (
        <aside className="fixed w-20 h-screen border-r flex flex-col items-center gap-5">
            <Sheet>
                {/* Sidebar Cerrada */}
                <div className="flex flex-col items-center gap-5 h-screen">
                    <SheetTrigger asChild>
                        <div className="h-20 p-5">
                            <Button variant="fullGhost" size="icon">
                                <Avatar className="w-12 h-12"> 
                                    <AvatarImage className="w-full h-full object-cover rounder-full" src="/images/Logo_SinBG.png" alt="Logo" />
                                    <AvatarFallback>Avatar Image</AvatarFallback>
                                </Avatar>
                            </Button>
                        </div>
                    </SheetTrigger>
                    <nav>
                        <ClosedSidebarLinks actualRoute={props.actualRoute}/>
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
                        <OpenedSidebarLinks actualRoute={props.actualRoute}/>
                    </nav>
                    <div>
                        <ModeToggle />
                    </div>
                    <div className="mt-auto">
                        <Card>
                            <CardHeader>
                                <CardTitle>Upgrade to Pro</CardTitle>
                                <CardDescription>
                                    Unlock all features and get unlimited access to our support team.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button size="sm" className="w-full">
                                    Upgrade
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </SheetContent>
            </Sheet>
        </aside>
    );
}