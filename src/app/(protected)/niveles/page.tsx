'use client'

import { useState, useEffect } from 'react'
import styles from "@/app/styles/home.module.scss"
import { UserProgress } from "@/interfaces/levelinterface"
import SimpleLoading from '@/components/customUI/simpleLoading'
import { HoverCard } from '@/components/customUI/hoverd-card'
import { getLevel } from '@/services/common.service'

const niveles = [
    { 
        id: 1,
        enlace: `/niveles/1-${encodeURIComponent('básico')}/categorias`
    },
    { 
        id: 2,
        enlace: `/niveles/2-${encodeURIComponent('Intermedio')}/categorias`
    },
    { 
        id: 3,
        enlace: `/niveles/3-${encodeURIComponent('Avanzado')}/categorias`
    },
]

export default function NivelesPage() {
    const [userProgress, setUserProgress] = useState<UserProgress>({} as UserProgress);
    const [nivelesBloqueados, setNivelesBloqueados] = useState<boolean[]>([true, true, true]) // Por defecto todos bloqueados
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProgress = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch(`/api/level/fetchUserProgress/${44}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch userProgress');
                };
                const progress = await response.json();
                setUserProgress(progress)

                // Obtén el estado de cada nivel
                const levelsState = await Promise.all(niveles.map(nivel => getLevel(nivel.id, progress.idUsuario)))
                setNivelesBloqueados(levelsState.map(level => level ? level.bloqueado : true)); // Actualiza el estado de bloqueado de cada nivel
            } catch (err) {
                setError('Error al cargar el progreso del usuario')
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProgress()
    }, [])

    if (isLoading) {
        return <SimpleLoading />
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
    }

    return (
        <div className={styles.backgroundImage}>   
            <div className="flex flex-col min-h-screen">
                <div className="relative">
                    <div className="flex flex-col items-center p-8 space-y-8">
                        <h2 className="text-2xl mt-7 md:mt-0 sm:text-2xl font-semibold text-center">Bienvenido Miau Venegas</h2>
                        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-center text-secondary bg-background">Niveles</h1>
                    </div>
                </div>
                <main className="flex-grow flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10">
                    <div className="flex flex-col md:items-center lg:flex-row gap-6 w-full max-w-7xl">
                        {niveles.map((nivel, index) => (
                            <HoverCard 
                                key={nivel.id}
                                levelId={nivel.id}
                                link={nivel.enlace}
                                bloqueado={nivelesBloqueados[index]} 
                                userProgress = {userProgress}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div> 
    )
}
