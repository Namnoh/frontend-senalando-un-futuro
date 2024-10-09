'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Link from 'next/link'
import { Nivel, UserProgress } from "@/interfaces/levelinterface"
import { getLevel, getUserProgress } from "@/services/level.service"
import { DynamicIcon } from "@/components/customUI/dynamicLucideIcon"

interface HoverCardProps {
    levelId: number
    link?: string
}

export function HoverCard({ levelId, link }: HoverCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [levelData, setLevelData] = useState<Nivel | null>(null)
    const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true)
        setError(null)
        try {
        const [levelData, progressData] = await Promise.all([
            getLevel(levelId),
            getUserProgress()
            ])
            if (levelData) {
            setLevelData(levelData)
            setUserProgress(progressData)
            } else {
            setError('No se encontró el nivel')
            }
        } catch (err) {
            setError('Error al cargar los datos')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
        fetchData()
    }, [levelId])

    if (isLoading) {
        return <div className="w-full md:w-1/3 p-4" aria-live="polite">Cargando...</div>
    }

    if (error || !levelData || !userProgress) {
        return <div className="w-full md:w-1/3 p-4 text-red-500" aria-live="assertive">{error || 'Error desconocido'}</div>
    }

    const getColorClasses = (status: number, isLocked: boolean) => {
        if (isLocked) {
        return {
            border: 'border-gray-400',
            bg: 'bg-gray-200',
            hover: 'hover:bg-gray-300',
            progress: '#6b7280',
            trailColor: '#d1d5db'
            }
        }
    switch (status) {
        case 1:
            return {
            border: 'border-primary',
            bg: 'bg-primary-50',
            hover: 'hover:bg-primary-50',
            progress: 'hsl(var(--primary))',
            trailColor: 'hsl(var(--primary) / 0.2)'
            }
        case 2:
            return {
            border: 'border-secondary',
            bg: 'bg-secondary-50',
            hover: 'hover:bg-secondary-50',
            progress: 'hsl(var(--secondary))',
            trailColor: 'hsl(var(--secondary) / 0.2)'
            }
        case 3:
            return {
            border: 'border-destructive',
            bg: 'bg-destructive-50',
            hover: 'hover:bg-destructive-50',
            progress: 'hsl(var(--destructive))',
            trailColor: 'hsl(var(--destructive) / 0.2)'
            }
        default:
            return {
            border: 'border-muted',
            bg: 'bg-muted/10',
            hover: 'hover:bg-muted/20',
            progress: 'hsl(var(--muted))',
            trailColor: 'hsl(var(--muted) / 0.2)'
            }
        }
    }

    const isLocked = levelData.bloqueado
    const colorClasses = getColorClasses(levelData.statusNivel, isLocked)

    const CardContent = (
        <Card 
        className={`relative flex flex-col items-center justify-between border-8 p-6 h-96 sm:h-[28rem] md:h-[32rem] lg:h-[31rem] w-full overflow-hidden cursor-pointer transition-all duration-300 ease-in-out
        ${colorClasses.border} ${colorClasses.bg} ${colorClasses.hover}
        ${isHovered ? 'shadow-lg transform -translate-y-8' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        <div className="absolute top-4 right-4 w-20 h-20 z-10">
            <CircularProgressbar 
            value={isLocked ? 0 : levelData.progreso} 
            text={isLocked ? '' : `${levelData.progreso}%`}
            styles={buildStyles({
                textSize: '24px',
                pathColor: colorClasses.progress,
                textColor: colorClasses.progress,
                trailColor: colorClasses.trailColor
            })}
            />
        </div>
        <div 
            className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ease-in-out ${
            isHovered ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <div className="flex-grow flex items-center justify-center">
                <DynamicIcon 
                    strokeWidth={1.25}
                    name={isLocked ? 'Lock' : levelData.iconoNivel} 
                    classes={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 ${isLocked ? 'text-gray-400' : 'text-black'}`}
                />
            </div>
            <div className="text-center mt-4 ">
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-black">{levelData.nombreNivel}</h3>
            </div>
        </div>
        <div 
            className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ease-in-out ${
            isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-normal mb-4 text-black">{levelData.nombreNivel}</h3>
            <div className="sm:text-lg md:text-xl lg:text-2xl text-center whitespace-pre-line text-black">
                {isLocked ? `${levelData.descripcionNivel}\nCompleta el nivel anterior para desbloquear` : levelData.descripcionNivel || 'No hay descripción disponible'}
            </div>
        </div>
        </Card>
    )

    return isLocked ? (
        <div className="w-full md:w-1/3">
            {CardContent}
        </div>
    ) : link ? (
    <Link href={link} className="w-full md:w-1/3">
        {CardContent}
    </Link>
    ) : (
    <div className="w-full md:w-1/3">
        {CardContent}
    </div>
    )
}