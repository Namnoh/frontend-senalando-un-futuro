// src/app/(protected)/niveles/[idNivel]/categorias/[idCategoria]/palabras/[idPalabras]/components/carrusel/desktop-carousel.tsx
"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { TitleProp } from '@/interfaces/commonInterfaces'
import { Palabra } from '@/interfaces/palabraInterface'
import { MiniCardGalery } from '@/components/customUI/miniCardGalery'

interface DesktopCarouselProps {
  level: TitleProp;
  category: TitleProp;
}

export default function DesktopCarousel({ level, category }: DesktopCarouselProps) {
  const [words, setWords] = useState<Palabra[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWords() {
      if (!category || typeof category.idTitle === 'undefined') {
        setError('Category information is missing')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/words/${category.idTitle}`)
        if (!response.ok) {
          throw new Error('Failed to fetch words')
        }
        const data = await response.json()
        setWords(data)
      } catch (error) {
        console.error('Error fetching words:', error)
        setError('Failed to load words. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchWords()
  }, [category])

  if (loading) {
    return (
      <div className="my-8">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent className="-ml-4">
            {[...Array(5)].map((_, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    )
  }

  if (error) {
    return (
      <div className="my-8 text-center text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  if (words.length === 0) {
    return (
      <div className="my-8 text-center">
        <p>No words found for this category.</p>
      </div>
    )
  }

  return (
    <div className="my-8">
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent className="-ml-4">
          {words.map((word) => (
            <CarouselItem key={word.idPalabra} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <MiniCardGalery
                    level={level}
                    category={category}
                    item={word}
                    iconClasses='h-16 w-16 lg:h-20 lg:w-20 text-black'
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}