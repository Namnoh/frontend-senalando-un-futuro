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
import { CategoriaProgreso, PalabraProgreso, UserProgress } from '@/interfaces/levelinterface';

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

    useEffect(() => {
        if (!progress) return;
        const wordFound = Object.values(progress.palabrasProgreso).find(
            (palabra) => palabra.idPalabra === word.idPalabra
        );
        if (wordFound) setSuccessTry(3);
    }, [progress])

    async function updateWordProgress() {
        if (!session?.user?.id) {
            console.error("No se ha iniciado sesión o no se puede obtener el ID de usuario");
            return;
        };

        if (!progress) {
            console.error("No hay datos de progreso disponibles");
            return;
        };
        setIsLoading(true);

        try {
            // Guardar progreso de completado de la categoría
            // Se obtienen todas las palabras de la categoría
            const categoryWordsResponse = await fetch(`/api/words/getWordsFromCategory/${category.idTitle}`, {
                method: "GET",
                cache: 'no-store'
            });
            if (!categoryWordsResponse.ok) {
                throw new Error('Failed to fetch words');
            };
            const categoryWordsTotal = await categoryWordsResponse.json();
            // Se crea el progreso de palabras actual
            const palabraProgreso : PalabraProgreso = {
                idPalabra: Number(word.idPalabra),
                nombrePalabra: word.nombrePalabra,
                categoriaPalabra: category.idTitle,
                nivelPalabra: level.idTitle
            };
            const palabrasProgreso: Record<string, PalabraProgreso> = {
                ...progress.palabrasProgreso,
                [word.idPalabra]: palabraProgreso
            };
            // Se cuentan las palabras totales del progreso actual
            const wordsCount = Object.values(palabrasProgreso).filter(
                (palabra) => palabra.categoriaPalabra === category.idTitle
            ).length;
            // Se hace el cálculo para el total.
            const porcentajeCategoria = wordsCount / categoryWordsTotal.length;
            const categoriaProgreso : CategoriaProgreso = {
                idCategoria: category.idTitle,
                nombreCategoria: category.nameTitle,
                progresoCategoria: porcentajeCategoria,
                nivelCategoria: level.idTitle
            };
            // Se crea el objeto con las categorias en progreso.
            const categoriasProgreso: Record<string, CategoriaProgreso> = {
                ...progress.categoriasProgreso,
                [category.idTitle]: categoriaProgreso
            };

            // Se saca el porcentaje total del progreso.
            const levelWordsResponse = await fetch(`/api/words/getAllWordsFromLevel/${level.idTitle}`, {
                method: "GET",
                cache: 'no-store'
            });
            if (!levelWordsResponse.ok) {
                throw new Error('Failed to fetch words');
            };
            const levelWords = await levelWordsResponse.json();
            // Se cuentan las palabras totales del progreso actual
            const progressWordsCount = Object.values(palabrasProgreso).filter(
                (palabra) => palabra.nivelPalabra === level.idTitle
            ).length;
            const porcentajeTotal = Math.round(100 * (progressWordsCount / levelWords.length));

            let updatedProgress: UserProgress;
            if (porcentajeTotal === 100 && progress.idNivel != 3) {
                // Si el nivel está completo, reinicia los progresos y sube el nivel
                updatedProgress = {
                    idProgreso: Number(progress.idProgreso),
                    categoriasProgreso: categoriasProgreso,
                    palabrasProgreso: palabrasProgreso,
                    porcentajeNivel: 0,
                    idUsuario: Number(progress.idUsuario),
                    idNivel: Number(progress.idNivel) + 1,
                };
            } else {
                // Si el nivel no está completo, actualiza el progreso existente
                updatedProgress = {
                    idProgreso: Number(progress.idProgreso),
                    categoriasProgreso: categoriasProgreso,
                    palabrasProgreso: palabrasProgreso,
                    porcentajeNivel: porcentajeTotal,
                    idUsuario: Number(progress.idUsuario),
                    idNivel: Number(progress.idNivel),
                };
            }
            // Actualiza el progreso del usuario
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

    useEffect(() => {
        if (isLoading) {
            toast({
                title: "Guardando Progreso",
                description: 'Por favor, no salga de la página.',
                variant: "warning",
            });
        }
    }, [isLoading])

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
                    <h2 className={`text-center text-3xl font-medium ${successTry < 3 ? 'text-red-500' : 'text-green-500'}`}>{successTry}/3</h2>
                    <div {...manejadoresDeslizamiento}>
                        <MobileCamera word={word} isSuccessTry={isSuccessTry}/>
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
