'use client'

import { useMediaQuery } from "@/hooks/uiHooks"
import CRUD from "./components/crud"
import { LoaderCircle } from "lucide-react"

export default function AdministracionPage() {
    const isMobile = useMediaQuery('(max-width: 767px)')

    return (
        <>
            {isMobile === undefined ? (
                <>
                    <div className="flex h-full w-full items-center justify-center p-10 text-2xl text-center">
                        Cargando... {' '}
                        <LoaderCircle className="animate-spin text-primary"/>
                    </div>
                </>
            ) : (
                <>
                    {isMobile ? (
                        <div className="flex h-full w-full items-center justify-center p-10 text-2xl text-center">
                            <span>Lo sentimos, el apartado de {' '} 
                            <span className="text-primary">administración</span> no está disponible en dispositivos {' '}
                            <span className="text-secondary">móviles</span>.</span>
                        </div>
                    ) : (
                        <CRUD />
                    )}
                </>
            )}
        </>
    )
}
