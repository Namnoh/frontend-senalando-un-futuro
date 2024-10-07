'use client'

import { BookOpen, Book, GraduationCap } from "lucide-react"
import { HoverCard } from './hoverd-card';

export default function NivelesPage() {
    const levels = [
    { 
        title: "Nivel Básico", 
        icon: BookOpen, 
        description: "En este curso aprenderas sobre: " ,
        progress: 75
    },
    { 
        title: "Nivel Intermedio", 
        icon: Book, 
        description: "En este curso aprenderas sobre: ",
        progress: 50
    },
    { 
        title: "Nivel Avanzado", 
        icon: GraduationCap, 
        description: "En este curso aprenderas sobre: ",
        progress: 25
    },
    ]

    return (
    <div className="flex flex-col min-h-screen">
        <div className="flex flex-col items-center p-8 space-y-17">
        <h2 className="text-2xl font-semibold text-center p-16">Bienvenido Miau Venegas</h2>
        <h1 className="text-8xl font-bold text-center text-primary">Niveles</h1>
        </div>
        <main className="flex-grow flex flex-col items-center p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-8xl">
            {levels.map((level, index) => (
            <HoverCard key={index} {...level} />
            ))}
        </div>
        </main>
    </div>
    )
}