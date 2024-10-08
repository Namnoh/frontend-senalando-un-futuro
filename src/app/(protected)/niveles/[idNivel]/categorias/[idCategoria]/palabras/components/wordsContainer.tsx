import React from 'react'
import { WordsCards } from './wordCard';
import { getWordsFrom } from '@/services/words.service';

export default async function WordsContainer({idCategoria, idNivel}: {idCategoria:number, idNivel:number}) {
    const words = await getWordsFrom(idCategoria);

    return (
        <div className='flex flex-wrap justify-center gap-5 w-2/3 mb-10'>
            { words.map((w) =>
                {
                    return (
                        <WordsCards key={w.idPalabra} idNivel={idNivel} idCategoria={idCategoria} word={w} />
                    )
                }
            )}
        </div>
    )
}
