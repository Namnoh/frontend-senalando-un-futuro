import { useSession } from 'next-auth/react';
import React from 'react'

export default function HeaderLevels() {
    const { data: session } = useSession();
    return (
        <div className="flex flex-col items-center p-8 space-y-8">
            <h2 className="text-2xl mt-7 md:mt-0 sm:text-2xl font-semibold text-center">Bienvenido {session?.user?.name} {session?.user?.lastname}</h2>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-center text-secondary">Niveles</h1>
        </div>
    )
}
