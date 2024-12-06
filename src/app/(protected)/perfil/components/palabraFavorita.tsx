'use client'

import React, { useState, useEffect } from 'react'
import { DynamicIcon } from '@/components/customUI/dynamicLucideIcon'
import type { Palabra } from '@/interfaces/palabraInterface'
import { Button } from "@/components/ui/button"

export default function WordList({ categoryId = 1 }: { categoryId?: number }) {
    const [words, setWords] = useState<Palabra[]>([])

    useEffect(() => {
        const fetchWords = async () => {
        const response = await fetch(`/api/words/getWordsFromCategory/${categoryId}`,{
            cache: 'no-store'
        });
            if (!response.ok) {
                throw new Error('Failed to fetch words');
            };
            const wordList = await response.json();
        setWords(wordList)
        }

        fetchWords()
    }, [categoryId])

    const handleWordClick = (word: Palabra) => {
    }

    return (
        <div className="pt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {words.map((word) => (
                <Button
                    key={word.idPalabra}
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center hover:bg-primary-300 bg-primary-100"
                    onClick={() => handleWordClick(word)}
                >
                    <DynamicIcon name={word.iconPalabra} classes='text-black'/>
                    <span className="text-sm font-medium text-black">{word.nombrePalabra}</span>
                </Button>
            ))}
        </div>
    )
}