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

interface MobileCarouselProps {
  level: TitleProp
  category: TitleProp
  words: Palabra[]
}

export default function MobileCarousel({ level, category, words }: MobileCarouselProps) {
  return (  
    <div className="flex flex-wrap justify-center gap-5 w-2/3 mb-10">
      <Carousel>
        <CarouselContent>
          {words.map((word: Palabra, index: number) => (
            <CarouselItem key={word.idPalabra} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
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