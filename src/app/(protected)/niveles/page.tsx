'use client'

import { useState, useEffect } from 'react'
import styles from "@/app/styles/home.module.scss"
import { getUserProgress } from "@/services/level.service"
import { UserProgress } from "@/interfaces/levelinterface"
import { HoverCard } from '@/components/customUI/hoverd-card'

const niveles = [
    { 
        id: 1,
        enlace: `/niveles/1-${encodeURIComponent('basico')}/categorias`
    },
    { 
        id: 2,
        enlace: `/niveles/2-${encodeURIComponent('Intermedio')}/categorias`
    },
    { 
        id: 3,
        enlace: `/niveles/3-${encodeURIComponent('Intermedio')}/categorias`
    },
]

export default function NivelesPage() {
    const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUserProgress = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const progress = await getUserProgress()
            setUserProgress(progress)
        } catch (err) {
            setError('Error al cargar el progreso del usuario')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
        }
        fetchUserProgress()
    }, [])

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>
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
                    <div className="flex flex-col md:flex-row gap-6 w-full max-w-7xl">
                        {niveles.map((nivel) => (
                            <HoverCard 
                                key={nivel.id}
                                levelId={nivel.id}
                                link={nivel.enlace}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div> 
    )
}