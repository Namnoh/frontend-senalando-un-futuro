import * as React from "react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { ModeToggle } from "@/components/modeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { OpenedSidebarLinks } from "./sidebar/sidebarLinks";

export default function MobileNav(props:{actualRoute:string}) {
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
                    <OpenedSidebarLinks actualRoute={props.actualRoute} />
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
    );
    // return (
    //     <Sheet>
    //         <SheetTrigger asChild>
    //             <Button variant="outline" size="icon" className="md:hidden">
    //                 <Menu className="h-5 w-5" />
    //                     <span className="sr-only">Toggle navigation menu</span>
    //             </Button>
    //         </SheetTrigger>
    //         <SheetContent side="left" className="flex flex-col">
    //             <nav className="grid gap-2 text-lg font-medium">
    //                 <Link
    //                 href="#"
    //                 className="flex items-center gap-2 text-lg font-semibold"
    //                 >
    //                     <Package2 className="h-6 w-6" />
    //                     <span className="sr-only">Acme Inc</span>
    //                 </Link>
    //                 <Link
    //                     href="#"
    //                     className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //                 >
    //                     <Home className="h-5 w-5" />
    //                     Dashboard
    //                 </Link>
    //                 <Link
    //                     href="#"
    //                     className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
    //                 >
    //                     <ShoppingCart className="h-5 w-5" />
    //                         Orders
    //                     <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
    //                         6
    //                     </Badge>
    //                 </Link>
    //                 <Link
    //                     href="#"
    //                     className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //                 >
    //                     <Package className="h-5 w-5" />
    //                     Products
    //                 </Link>
    //                 <Link
    //                     href="#"
    //                     className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //                 >
    //                     <Users className="h-5 w-5" />
    //                     Customers
    //                 </Link>
    //                 <Link
    //                     href="#"
    //                     className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //                 >
    //                     <LineChart className="h-5 w-5" />
    //                     Analytics
    //                 </Link>
    //             </nav>
    //             <div>
    //                 <ModeToggle />
    //             </div>
    //             <div className="mt-auto">
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle>Upgrade to Pro</CardTitle>
    //                         <CardDescription>
    //                             Unlock all features and get unlimited access to our support team.
    //                         </CardDescription>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <Button size="sm" className="w-full">
    //                             Upgrade
    //                         </Button>
    //                     </CardContent>
    //                 </Card>
    //             </div>
    //         </SheetContent>
    //     </Sheet>
    // );
}