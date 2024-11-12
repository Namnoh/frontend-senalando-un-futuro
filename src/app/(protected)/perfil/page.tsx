'use client'

import { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react'
import { getLevel } from '@/services/common.service'
import { Nivel, UserProgress } from '@/interfaces/levelinterface'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DynamicIcon } from "@/components/customUI/dynamicLucideIcon"
import styles from '@/app/styles/home.module.scss'
import SimpleLoading from '@/components/customUI/simpleLoading'
import { useProgressContext } from '@/contexts/userProgressContext'
import { useSession } from 'next-auth/react'

// Lazy load components
const CambiarContrasena = lazy(() => import('./components/cambiarContrasena'))
const PalabraFavorita = lazy(() => import('./components/palabraFavorita'))
const Progreso = lazy(() => import('./components/progreso'))

export default function PerfilPage() {
    const [niveles, setNiveles] = useState<Nivel[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { progress } = useProgressContext();
    const { data: session } = useSession();

    const cargarDatos = useCallback(async () => {
        if (!session?.user || !progress) {
            console.warn('Los datos del usuario o progreso no están disponibles');
            setIsLoading(false);
            return;
        }
        try {
            const nivelesData = await Promise.all([
                getLevel(1, progress),
                getLevel(2, progress),
                getLevel(3, progress),
            ]);
            setNiveles(nivelesData.filter((nivel): nivel is Nivel => nivel !== null));
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        } finally {
            setIsLoading(false);
        }
    }, [session, progress]);

    useEffect(() => {
        if (isLoading) {
            cargarDatos();
        }
    }, [isLoading, cargarDatos]);

    const memoizedNiveles = useMemo(() => niveles, [niveles]);

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
                            <h2 className="mt-4 text-2xl lg:text-4xl font-semibold text-primary-400">{session?.user?.name} {session?.user?.lastname}</h2>
                        </div>
                    </div>
                    <div className="px-6 -mt-8 mb-4 p-8 relative text-black">
                        <Tabs defaultValue="profile" className="w-full relative">
                            <TabsList className="grid grid-cols-1 rounded-xl bg-white shadow-md h-16 -top-10 w-40 sm:h-20 sm:w-60 lg:w-96 left-1/2 transform -translate-x-1/2 absolute z-10">
                                <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-secondary-400 data-[state=active]:text-white h-full flex items-center justify-center">
                                    <DynamicIcon name="User" classes="w-auto h-auto text-black md:mr-2" />
                                    <span className="hidden md:block text-black">Perfil</span>
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile" className="space-y-6 p-6 bg-secondary-50 lg:p-20 rounded-3xl shadow-2xl shadow-primary-500">
                                <h3 className="pt-10 sm:pt-6 lg:pt-6 sm:text-xl lg:text-2xl text-lg font-semibold text-black ">Correo:</h3>
                                <p className="pb-5 sm:text-xl lg:text-2xl lg:ml-10 text-black">{session?.user.email}</p>
                                <Suspense fallback={<SimpleLoading />}>
                                    <CambiarContrasena />
                                </Suspense>
                                {progress && memoizedNiveles.length > 0 && (
                                    <Suspense fallback={<SimpleLoading />}>
                                        <Progreso niveles={memoizedNiveles} userProgress={progress} />
                                    </Suspense>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}