'use client';

import { TitleProp } from '@/interfaces/commonInterfaces';
import { Palabra } from '@/interfaces/palabraInterface';
import React, { useEffect, useState } from 'react';
import MobileCarousel from './carrusel/mobile-carousel';
import DesktopCarousel from './carrusel/desktop-carousel';
import { useMediaQuery } from '@mui/material';
import DesktopCamera from './camera/desktop-camera';
import MobileCamera from './camera/mobile-camera';
import DesktopVideo from './vide/desktop-video';
import MobileVideo from './vide/mobile-video';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from '@/hooks/use-toast';
import { useProgressContext } from '@/contexts/userProgressContext';
import { UserProgress } from '@/interfaces/levelinterface';

interface ResponsiveComponentsProps {
    level: TitleProp;
    category: TitleProp;
    word: Palabra;
    words: Palabra[];
    currentWordIndex: number;
}

export default function ResponsiveComponents({ level, category, word, words, currentWordIndex: initialIndex }: ResponsiveComponentsProps) {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [successTry, setSuccessTry] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: session } = useSession();
    const { progress, updateUserProgress } = useProgressContext();

    async function updateWordProgress() {
        if (!session?.user?.id) {
            console.error("No se ha iniciado sesión o no se puede obtener el ID de usuario");
            return;
        }

        if (!progress) {
            console.error("No hay datos de progreso disponibles");
            return;
        }

        try {
            const updatedProgress: UserProgress = {
                ...progress,
                idProgreso: Number(progress.idProgreso),
                idUsuario: Number(progress.idUsuario),
                idNivel: Number(progress.idNivel),
                porcentajeNivel : Number(progress.porcentajeNivel),
                palabrasProgreso: {
                    ...progress.palabrasProgreso,
                    [word.idPalabra]: {
                        idPalabra: Number(word.idPalabra),
                        nombrePalabra: word.nombrePalabra
                    }
                }
            };
            await updateUserProgress(updatedProgress);
        } catch (error) {
            console.error("Error al actualizar el progreso:", error);
            // Aquí capturamos el mensaje del error para mostrarlo
            const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const isSuccessTry = () => {
        setSuccessTry(prev => {
            const newValue = prev + 1;
            if (prev != 3 && newValue === 3) {updateWordProgress()}
            return newValue >= 3 ? 3 : newValue;
        });
    };

    const isMobile = useMediaQuery('(max-width: 1024px)');
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setCurrentIndex(initialIndex); 
    }, [initialIndex]);

    // Función para construir la URL de la palabra
    const construirUrlPalabra = (palabra: Palabra) => {
        return `/niveles/${encodeURIComponent(level.idTitle)}-${encodeURIComponent(level.nameTitle)}/categorias/${encodeURIComponent(category.idTitle)}-${encodeURIComponent(category.nameTitle)}/palabras/${encodeURIComponent(palabra.idPalabra)}-${encodeURIComponent(palabra.nombrePalabra)}`;
    };

    // Función para manejar la navegación (siguiente o anterior)
    const manejarNavegacion = (direccion: 'siguiente' | 'anterior') => {
        if (!mounted || words.length === 0) return;

        let nuevoIndice = currentIndex;

        // Si es "siguiente", incrementamos el índice y lo usamos cíclicamente
        if (direccion === 'siguiente') {
            nuevoIndice = (currentIndex + 1) % words.length;
        } else { // Si es "anterior", decrementamos el índice de manera cíclica
            nuevoIndice = (currentIndex - 1 + words.length) % words.length;
        }

        // Actualizamos el índice con el valor calculado
        setCurrentIndex(nuevoIndice); 

        // Construimos la URL y redirigimos al usuario
        const nuevaPalabra = words[nuevoIndice];
        router.push(construirUrlPalabra(nuevaPalabra));

    };

    const manejadoresDeslizamiento = useSwipeable({
        onSwipedLeft: () => manejarNavegacion('siguiente'),
        onSwipedRight: () => manejarNavegacion('anterior'),
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    if (!mounted) {
        return null;
    }

    return (
        <>
            {( isMobile ? 
            (
                <div className='flex flex-col w-[320px] sm:w-[600px] '>
                    <div {...manejadoresDeslizamiento}>
                        <MobileCamera />
                    </div>
                    <MobileVideo word={word} />
                    <div {...manejadoresDeslizamiento}>
                        <MobileCarousel level={level} category={category} words={words} currentWordIndex={currentIndex}/>
                    </div>
                </div>
            ) 
            : 
            (
                <div className='flex flex-col h-full w-full items-center justify-center gap-10'>
                    <h2 className={`text-3xl font-medium ${successTry < 3 ? 'text-red-500' : 'text-green-500'}`}>{successTry}/3</h2>
                    <div className='flex flex-grow gap-2 items-center w-full justify-center'>
                        <DesktopVideo word={word} />
                        <DesktopCamera word={word} isSuccessTry={isSuccessTry}/>
                    </div>
                    <DesktopCarousel level={level} category={category} words={words}/>
                </div>
            ) 
            )}
        </>
    );
}
