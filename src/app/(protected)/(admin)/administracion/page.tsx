'use client'

import { useMediaQuery } from "@/hooks/uiHooks";
import CRUD from "./components/crud";
import SimpleLoading from "@/components/customUI/simpleLoading";
import styles from "@/app/styles/home.module.scss"

export default function AdministracionPage() {
    const isMobile = useMediaQuery('(max-width: 767px)');

    return (
        <>
            {isMobile === undefined ? (
                <>
                    <SimpleLoading />
                </>
            ) : (
                <>
                    {isMobile ? (
                        <div className="flex h-full w-full items-center justify-center p-10 text-2xl text-center">
                            <span>Lo sentimos, el apartado de {' '} 
                                <span className="text-primary">administración</span> no está disponible en dispositivos {' '}
                                <span className="text-secondary">móviles</span>.
                            </span>
                        </div>
                    ) : (
                        <>
                        <div className={`${styles.backgroundImage2} min-h-screen  w-full`}></div> 
                        <CRUD />
                        </>
                    )}
                </>
            )}
        </>
    )
}
