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
import { MiniCardGalery } from '@/components/customUI/miniCardGalery';

interface DesktopCarouselProps {
  level: TitleProp
  category: TitleProp
  words: Palabra[]
}

export default function DesktopCarousel({ level, category, words }: DesktopCarouselProps) {
  return (  
    <div className="flex flex-wrap justify-center gap-5 w-4/5 mb-5">
      <Carousel className="min-w-[800px]">
        <CarouselContent>
          {words
            .slice()
            .sort((a: Palabra, b: Palabra) => a.idPalabra - b.idPalabra)
            .map((word: Palabra) => (
            <CarouselItem className="basis-1/4 md:basis-1/4 lg:basis-1/4" key={word.idPalabra}>
              <div className="p-1">
                <MiniCardGalery
                  level={level}
                  category={category}
                  item={word}
                  iconClasses="h-12 w-12 lg:h-16 lg:w-16 text-black"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}