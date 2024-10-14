'use client'

import { useState, useEffect } from 'react'
import { DynamicIcon } from "@/components/customUI/dynamicLucideIcon"
import { perfilService } from '@/services/perfil.service'
import { getLevel, getUserProgress } from '@/services/level.service'
import { perfil } from '@/interfaces/perfilinterface'
import { Nivel, UserProgress } from '@/interfaces/levelinterface'
import Email from '../../app/(protected)/perfil/components/email'
import CambiarContraseña from '../../app/(protected)/perfil/components/cambiarContrasena'
import Progreso from '../../app/(protected)/perfil/components/progreso'
import PalabrasFavoritas from '../../app/(protected)/perfil/components/palabraFavorita'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import  styles  from '@/app/styles/home.module.scss'

export default function PerfilComponent() {
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

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <DynamicIcon name="Loader2" classes="w-8 h-8 animate-spin text-blue-500" />
            <span className="ml-2 text-lg font-semibold">Cargando perfil...</span>
        </div>
    )

    return (
        <div className={styles.backgroundPerfil}>
            <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto relative ">
                    <div className="relative from-orange-100 to-blue-100 p-6 pb-20">
                        <div className="flex flex-col items-center mt-12">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
                                <DynamicIcon name="User" classes="h-12 w-12 text-gray-400" />
                            </div>
                            <h2 className="mt-4 text-2xl font-semibold text-primary-300">{perfil?.nombrePerfil || 'Usuario'}</h2>
                            <p className="text-xl font-semibold text-secondary-200">ID: {perfil?.idPerfil}</p>
                        </div>
                    </div>
                    <div className="px-6 -mt-8 mb-4 p-8 relative ">
                        <Tabs defaultValue="profile" className="w-full relative">
                            <TabsList className="grid grid-cols-2 rounded-xl bg-white shadow-md  h-16 -top-10  w-40 sm:h-20 sm:w-60 lg:w-96 left-1/2 transform -translate-x-1/2 absolute z-10 ">
                                <TabsTrigger value="profile" className="rounded-l-xl data-[state=active]:bg-secondary-400 data-[state=active]:text-white  h-full flex items-center justify-center">
                                    <DynamicIcon name="User" classes="w-auto h-auto text-black md:mr-2" />
                                    <span className="hidden md:block text-black">Perfil</span>
                                </TabsTrigger>
                                <TabsTrigger value="favorites" className="rounded-r-xl data-[state=active]:bg-primary-400 data-[state=active]:text-white h-full flex items-center justify-center">
                                    <DynamicIcon name="Heart" classes="w-auto h-auto text-black md:mr-2" />
                                    <span className="hidden md:block text-black">Favoritos</span>
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile" className="space-y-6 p-6 bg-secondary-50 lg:p-20 rounded-3xl shadow-2xl shadow-primary-500">
                                {perfil ? <Email email={perfil.correoUsuario} /> : <p>Cargando correo...</p>}
                                <CambiarContraseña />
                                {userProgress && niveles.length > 0 && (
                                    <Progreso niveles={niveles} userProgress={userProgress} />
                                )}
                            </TabsContent>
                            <TabsContent value="favorites" className=" bg-primary-50 p-6 rounded-3xl shadow-2xl shadow-secondary-500 ">
                                <PalabrasFavoritas />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}