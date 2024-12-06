'use client'

import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Palabra } from "@/interfaces/palabraInterface"
import { TitleProp } from "@/interfaces/commonInterfaces"
import CarruselList from "../carruselList"

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
    <div className="flex justify-center gap-5 w-full my-10">
      <Carousel className="flex w-[80%] justify-center">
        <CarouselContent className="flex w-full">
          {words.map((word: Palabra) => (
            <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/3">
              <div className="w-fit">
                <CarruselList
                  key={currentWord.idPalabra}
                  level={level}
                  category={category}
                  item={word}
                  iconClasses="h-10 w-10"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
