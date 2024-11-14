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
import CarruselList from "../carruselList"

interface MobileCarouselProps {
  level: TitleProp
  category: TitleProp
  words: Palabra[]
}

export default function MobileCarousel({ level, category, words }: MobileCarouselProps) {
  return (  
    <div className="flex justify-center gap-5 w-full my-10">
      <Carousel className="flex w-[70%]">
        <CarouselContent className="flex">
          {words.map((word: Palabra) => (
            <CarouselItem className="basis-1/2 sm:basis-1/4">
              <div className="w-fit">
                <CarruselList
                  key={word.idPalabra} 
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
  )
}