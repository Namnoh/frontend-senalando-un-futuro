'use client'

import { BookOpen, Book, GraduationCap } from "lucide-react"
import { HoverCard } from "@/components/customUI/hoverd-card"
import styles from "@/app/styles/home.module.scss"

//en general esta funcional y responsive solo falta cambiar ajustes pequeños
export default function NivelesPage() {
    const levels = [
    { 
        title: "Nivel Básico", 
        icon: BookOpen, //hay que cambiar la descripcion del hover pero nose que poner xd
        description:(
            <ul>En este nivel aprenderas de estas categorias: 
                <li> Animales</li>
                <li> Paises</li>
                <li> Colores </li>
            </ul>
        ),
        progress: 75,
        color: 'orange',
        link: `/niveles/1-${encodeURIComponent('BÁSICO')}/categorias` //es por mientras pero aqui  se cambian los links de las paginas
    },
    { 
        title: "Nivel Intermedio", 
        icon: Book, 
        description:(
            <ul>En este nivel aprenderas de estas categorias: 
                <li> Animales</li>
                <li> Paises</li>
                <li> Colores </li>
            </ul>
        ),
        progress: 60, //LA BARRA AUMENTA CON EL % ES DECIR SI LO CAMBBIAS, CAMBIARA LA BARRITA
        color: 'blue',
        link: `/niveles/2-${encodeURIComponent('Intermedio')}/categorias`
    },
    { 
        title: "Nivel Avanzado", 
        icon: GraduationCap, 
        description:(
            <ul>En este nivel aprenderas de estas categorias:
                <li> Animales</li>
                <li> Paises</li>
                <li> Colores </li>
            </ul>
        ),
        progress: 40,
        color: 'red',
        link: "/quienesSomos"
    },
    ]

    return (
    <div className={styles.backgroundImage} >   
        <div className="flex flex-col min-h-screen">
            <div className="relative">
                <div className="flex flex-col items-center p-8 space-y-8">
                    <h2 className="text-2xl font-semibold text-center">Bienvenido Miau Venegas</h2>
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-center text-secondary bg-background ">Niveles</h1>
                </div>
            </div>
        <main className="flex-grow flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-7xl">
                {levels.map((level, index) => (
                <HoverCard key={index} {...level} />
                ))}
            </div>
        </main>
        </div>
    </div> 
    )
}