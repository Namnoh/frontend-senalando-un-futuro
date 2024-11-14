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

interface ResponsiveComponentsProps {
    level: TitleProp;
    category: TitleProp;
    words: Palabra[];
    currentWordIndex: number;
}

export default function ResponsiveComponents({ level, category, words, currentWordIndex :  initialIndex }: ResponsiveComponentsProps) {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(initialIndex); // Se debe usar directamente en el cuerpo del componente
    const isMobile = useMediaQuery('(max-width: 767px)');

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setCurrentIndex(initialIndex);
      }, [initialIndex]);
    
      const construirUrlPalabra = (palabra: Palabra) => {
        return `/niveles/${encodeURIComponent(level.idTitle)}-${encodeURIComponent(level.nameTitle)}/categorias/${encodeURIComponent(category.idTitle)}-${encodeURIComponent(category.nameTitle)}/palabras/${encodeURIComponent(palabra.idPalabra)}-${encodeURIComponent(palabra.nombrePalabra)}`;
      };
    
      const manejarNavegacion = (direccion: 'siguiente' | 'anterior') => {
        if (!setMounted || words.length === 0) return;
    
        let nuevoIndice = currentIndex;
        if (direccion === 'siguiente') {
          nuevoIndice = (currentIndex + 1) % words.length;
        } else {
          nuevoIndice = (currentIndex - 1 + words.length) % words.length;
        }
    
        setCurrentIndex(nuevoIndice);
        const nuevaPalabra = words[nuevoIndice];
        router.push(construirUrlPalabra(nuevaPalabra));
      };
    
      const manejadoresDeslizamiento = useSwipeable({
        onSwipedLeft: () => manejarNavegacion('siguiente'),
        onSwipedRight: () => manejarNavegacion('anterior'),
        preventScrollOnSwipe: true,
        trackMouse: true,
      });
    
      if (!setMounted) {
        return null;
      }

    return (
    <>
        {isMobile ? (
            <>
            <div {...manejadoresDeslizamiento}>
                <MobileCamera />
                <MobileVideo />
                <MobileCarousel level={level} category={category} words={words} currentWordIndex={currentIndex}/>
            </div>
            </>
        ) : (
            <>
            <DesktopCamera />
            <DesktopVideo />
            <DesktopCarousel level={level} category={category} words={words} />
            </>
        )}
    </>
    );
}
