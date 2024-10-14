'use client'

import { useState, useEffect } from 'react'
import { perfilService } from '@/services/perfil.service'
import { getLevel, getUserProgress } from '@/services/level.service'
import { perfil } from '@/interfaces/perfilinterface'
import { Nivel, UserProgress } from '@/interfaces/levelinterface'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DynamicIcon } from "@/components/customUI/dynamicLucideIcon"
import styles from '@/app/styles/home.module.scss'
import SimpleLoading from '@/components/customUI/simpleLoading'
import CambiarContrasena from './components/cambiarContrasena'
import Email from './components/email'
import PalabraFavorita from './components/palabraFavorita'
import Progreso from './components/progreso'

export default function PerfilPage() {
    const [perfil, setPerfil] = useState<perfil | null>(null)
    const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
    const [niveles, setNiveles] = useState<Nivel[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const cargarDatos = async () => {
            setIsLoading(true)
            try {
                const perfilData = await perfilService.obtenerPerfil()
                setPerfil(perfilData)

                const nivelesData = await Promise.all([
                    getLevel(1),
                    getLevel(2),
                    getLevel(3),
                ])
                setNiveles(nivelesData.filter((nivel): nivel is Nivel => nivel !== null))

                const progressData = await getUserProgress()
                setUserProgress(progressData)
            } catch (error) {
                console.error("Error al cargar los datos:", error)
            } finally {
                setIsLoading(false)
            }
        }
        cargarDatos()
    }, [])

    if (isLoading) return <SimpleLoading />

    return (
        <div className={styles.backgroundPerfil}>
            <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto relative">
                    <div className="relative from-orange-100 to-blue-100 p-6 pb-20">
                        <div className="flex flex-col items-center mt-12">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
                                <DynamicIcon name="User" classes="h-12 w-12 text-gray-400" />
                            </div>
                            <h2 className="mt-4 text-2xl lg:text-4xl font-semibold text-primary-400">{perfil?.nombrePerfil || 'Usuario'}</h2>
                            <p className="text-xl font-semibold lg:text-3xl text-secondary-300">ID: {perfil?.idPerfil}</p>
                        </div>
                    </div>
                    <div className="px-6 -mt-8 mb-4 p-8 relative">
                        <Tabs defaultValue="profile" className="w-full relative">
                            <TabsList className="grid grid-cols-2 rounded-xl bg-white shadow-md h-16 -top-10 w-40 sm:h-20 sm:w-60 lg:w-96 left-1/2 transform -translate-x-1/2 absolute z-10">
                                <TabsTrigger value="profile" className="rounded-l-xl data-[state=active]:bg-secondary-400 data-[state=active]:text-white h-full flex items-center justify-center">
                                    <DynamicIcon name="User" classes="w-auto h-auto text-black md:mr-2" />
                                    <span className="hidden md:block text-black">Perfil</span>
                                </TabsTrigger>
                                <TabsTrigger value="favorites" className="rounded-r-xl data-[state=active]:bg-primary-400 data-[state=active]:text-white h-full flex items-center justify-center">
                                    <DynamicIcon name="Heart" classes="w-auto h-auto text-black md:mr-2" />
                                    <span className="hidden md:block text-black">Favoritos</span>
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile" className="space-y-6 p-6 bg-secondary-50 lg:p-20 rounded-3xl shadow-2xl shadow-primary-500">
                                {perfil && <Email email={perfil.correoUsuario} />}
                                <CambiarContrasena />
                                {userProgress && niveles.length > 0 && (
                                    <Progreso niveles={niveles} userProgress={userProgress} />
                                )}
                            </TabsContent>
                            <TabsContent value="favorites" className="bg-primary-50 p-6 rounded-3xl shadow-2xl shadow-secondary-500">
                                <PalabraFavorita />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}