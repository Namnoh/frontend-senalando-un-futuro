'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { LucideIcon } from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface HoverCardProps {
    title: string
    icon: LucideIcon
    description: string
    progress: number
}

export function HoverCard({ title, icon: Icon, description, progress }: HoverCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
    <Card 
        className="relative flex flex-col items-center justify-between p-6 h-80 w-full md:w-1/3 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <div className="absolute top-2 right-2 w-16 h-16 z-10">
        <CircularProgressbar 
            value={progress} 
            text={`${progress}%`}
            styles={buildStyles({
            textSize: '24px',
            pathColor: `hsl(var(--primary))`,
            textColor: 'hsl(var(--primary))',
            trailColor: 'hsl(var(--muted))',
            })}
        />
        </div>
        <div 
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ease-in-out ${
            isHovered ? 'opacity-0' : 'opacity-100'
        }`}
        >
        <div className="flex-grow flex items-center justify-center">
            <Icon className="w-96 h-52 md:w-40 md:h-40" /> 
        </div>
        <div className="text-center">
            <h3 className="text-5xl mb-2">{title}</h3>
        </div>
        </div>
        <div 
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 bg-primary text-primary-foreground transition-opacity duration-300 ease-in-out ${
            isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        >
        <h3 className="text-3xl mb-4">{title}</h3>
        <p className="text-lg text-center">{description}</p>
        </div>
    </Card>
    )
}