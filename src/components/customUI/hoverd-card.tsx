'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { LucideIcon } from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Link from 'next/link'

interface HoverCardProps {
    title: string
    icon: LucideIcon
    description: React.ReactNode
    progress: number
    color: string
    link?: string //el link lleva una ? por que esta opcional, lo puse de prueba
}

export function HoverCard({ title, icon: Icon, description, progress, color, link }: HoverCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    const getColorClasses = (color: string) => {
        switch (color) {
            case 'orange':
                return {
                    border: 'border-primary-300',
                    bg: 'bg-primary-200', //el bg no quedo iwal al mockup por que las letras estas webeadas con el fondo oscuro y claro
                    hover: 'hover:bg-primary-300',
                    progress: 'hsl(var(--primaryVar),30%)' //es la opacidad que tendra el color
                }
            case 'blue':
                return {
                    border: 'border-secondary-400',
                    bg: 'bg-secondary-200',
                    hover: 'hover:bg-secondary-400',
                    progress: 'hsl(var(--secondaryVar), 30%)'
                }
            case 'red':
                return {
                    border: 'border-destructive-300',
                    bg: 'bg-destructive-200',
                    hover: 'hover:bg-destructive-300',
                    progress: 'hsl(var(--destructiveVar), 30%)'
                }
            default:
                return {
                    border: 'border-gray-500',
                    bg: 'bg-gray-100',
                    hover: 'hover:bg-gray-200',
                    progress: '#6b7280'
                }
        }
    }

    const colorClasses = getColorClasses(color)

    const CardContent = (
        <Card 
            className={`relative flex flex-col items-center justify-between border-8 p-6 h-96 sm:h-[28rem] md:h-[32rem] lg:h-[36rem] w-full overflow-hidden cursor-pointer transition-all duration-300 ease-in-out
            ${colorClasses.border} ${colorClasses.bg} ${colorClasses.hover}
            ${isHovered ? 'shadow-lg transform -translate-y-8' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute top-4 right-4 w-20 h-20 z-10">
                <CircularProgressbar 
                    value={progress} 
                    text={`${progress}%`}
                    styles={buildStyles({
                        textSize: '24px',
                        pathColor: colorClasses.progress,
                        textColor: colorClasses.progress,
                        trailColor: 'hsl(var(--muted-50))', //lo deje transparente por que me daba tok 
                    })}
                />
            </div>
            <div 
                className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ease-in-out ${
                    isHovered ? 'opacity-0' : 'opacity-100'
                }`}
            >
                <div className="flex-grow flex items-center justify-center">
                    <Icon className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56" /> 
                </div>
                <div className="text-center mt-4">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{title}</h3>
                </div>
            </div>
            <div 
                className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ease-in-out ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4">{title}</h3>
                <div className="sm:text-lg md:text-xl lg:text-2xl text-center">{description}</div>
            </div>
        </Card>
    )
    //esto es para hacer que los links funcionen en la card completa
    return link ? (
        <Link href={link} className="w-full md:w-1/3">
            {CardContent}
        </Link>
    ) : (
        <div className="w-full md:w-1/3">
            {CardContent}
        </div>
    )
}