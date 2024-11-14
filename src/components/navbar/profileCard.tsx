'use client';
import Link from "next/link";
import { Card, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";

export default function ProfileCard() {
    const { data: session } = useSession();
    return (
        <Link href={'/perfil'}>
            <Card>
                <div className="flex items-center p-3 md:p-4">
                    <Avatar className="w-14 h-14"> 
                        <AvatarImage className="w-full h-full object-cover rounded-md sm:rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TgOv9CMmsUzYKCcLGWPvqcpUk6HXp2mnww&s" alt="Logo" />
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-grow flex-col items-center justify-center">
                        <CardTitle>{session?.user.name} {session?.user.lastname}</CardTitle>
                        <span className="text-sm md:text-base">{session?.user.email}</span>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
