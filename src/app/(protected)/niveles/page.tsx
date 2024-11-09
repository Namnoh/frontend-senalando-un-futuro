'use client'

import { useState, useEffect } from 'react'
import styles from "@/app/styles/home.module.scss"
import { UserProgress } from "@/interfaces/levelinterface"
import SimpleLoading from '@/components/customUI/simpleLoading'
import { HoverCard } from '@/components/customUI/hoverd-card'
import { getLevel } from '@/services/common.service'
import HeaderLevels from './components/headerLevels'
import { useSession } from 'next-auth/react'
import { useProgressContext } from '@/contexts/userProgressContext'

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
    const { progress } = useProgressContext();

    useEffect(() => {
        if (progress === null || progress === undefined) {
            return; // No hacemos nada hasta que tengamos un valor de progress
        }

        const fetchProgress = async () => {
            setIsLoading(true)
            setError(null)
            try {
                if (progress === null) {
                    throw new Error('El progreso del usuario no está disponible');
                }
                setUserProgress(progress)
                // Obtén el estado de cada nivel
                const levelsState = await Promise.all(niveles.map(nivel => getLevel(nivel.id, progress)))
                setNivelesBloqueados(levelsState.map(level => level ? level.bloqueado : true)); // Actualiza el estado de bloqueado de cada nivel
            } catch (err) {
                setError('Error al cargar el progreso del usuario')
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProgress()
    }, [progress])

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
                        <HeaderLevels />
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
