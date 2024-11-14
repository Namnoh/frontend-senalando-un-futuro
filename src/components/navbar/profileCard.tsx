'use client';
import Link from "next/link";
import { Card, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import { DynamicIcon } from "../customUI/dynamicLucideIcon";

export default function ProfileCard() {
    const { data: session } = useSession();
    return (
        <Link href={'/perfil'}>
            <Card>
                <div className="flex items-center p-3 gap-3 md:p-4">
                    {session?.user?.image ? (
                        <Image
                        src={session.user.image} 
                        alt="Perfil del usuario"
                        width={50} 
                        height={50} 
                        className="first-letter:object-cover rounded-full"
                        />
                        ) : (
                        <DynamicIcon name="User" classes="h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex flex-grow flex-col items-center justify-center">
                        <CardTitle>{session?.user.name} {session?.user.lastname}</CardTitle>
                        <span className="text-sm md:text-base">{session?.user.email}</span>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
