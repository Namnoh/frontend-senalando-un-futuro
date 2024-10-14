'use client'

import React, { useState, useEffect } from 'react'
import { getWordsFrom } from '@/services/words.service'
import type { Palabra } from '@/interfaces/palabraInterface'
import { Button } from "@/components/ui/button"

export default function WordList({ categoryId = 1 }: { categoryId?: number }) {
    const [words, setWords] = useState<Palabra[]>([])

    useEffect(() => {
        const fetchWords = async () => {
        const wordList = await getWordsFrom(categoryId)
        setWords(wordList)
        }

        fetchWords()
    }, [categoryId])

    const handleWordClick = (word: Palabra) => {
        console.log(`Clicked on word: ${word.nombrePalabra}`)
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
                    {React.createElement(word.iconoPalabra, { className: "w-8 h-8 mb-2 text-black" })}
                    <span className="text-sm font-medium text-black">{word.nombrePalabra}</span>
                </Button>
            ))}
        </div>
    )
}