'use client'

import React from 'react';
import { Palabra } from '@/interfaces/palabraInterface';
import { TitleProp } from '@/interfaces/commonInterfaces';
import { MiniCardGalery } from '@/components/customUI/miniCardGalery';

interface MobileCarouselProps {
  level: TitleProp;
  category: TitleProp;
  words: Palabra[];
  currentWordIndex: number; 
}

export default function MobileCarousel({ level, category, words, currentWordIndex }: MobileCarouselProps) {

  // Validar si el índice está en el rango y si hay palabras disponibles
  if (!words || words.length === 0 || currentWordIndex < 0 || currentWordIndex >= words.length) {
    return <div>No hay palabras disponibles.</div>; // Mostrar un mensaje si no hay palabras disponibles
  }

  // Obtener la palabra correspondiente al índice
  const currentWord = words[currentWordIndex];

  return (
    <div className="flex flex-col items-center w-full mb-10">
      <div className="flex aspect-square items-center justify-center p-6">
        <MiniCardGalery
          key={currentWord.idPalabra}
          level={level}
          category={category}
          item={currentWord}
          iconClasses="h-12 w-12 lg:h-16 lg:w-16 text-black"
        />
      </div>
    </div>
  );
}
