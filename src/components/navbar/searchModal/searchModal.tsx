'use client'

import SimpleLoading from '@/components/customUI/simpleLoading';
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { SearchPalabra } from '@/interfaces/commonInterfaces';
import Link from 'next/link';
import { SetStateAction, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const WAIT_BETWEEN_CHANGE = 400;

export default function SearchModal({filteredItems, setFilteredItems}:{filteredItems:SearchPalabra[], setFilteredItems:React.Dispatch<SetStateAction<SearchPalabra[]>>}) {
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el valor de búsqueda
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Filtrar los ítems basados en lo que el usuario escribe
    const filterItems = useDebouncedCallback(async (currentSearchTerm) => {
        if (currentSearchTerm === '') {return setFilteredItems([])}
        setIsLoading(true);
        const response = await fetch(`/api/words/getWordsFromInput/${currentSearchTerm}`);
        if (!response.ok) {
            throw new Error('Failed to fetch words');
        };
        const wordList = await response.json();
        setFilteredItems(wordList);
        setIsLoading(false);
    }, WAIT_BETWEEN_CHANGE);

    useEffect(() => {
        // searchTerm === '' ? setFilteredItems([]) : filterItems(searchTerm);
        filterItems(searchTerm)
    }, [searchTerm])
    
    return (
        <DialogContent className='flex flex-col w-11/12 lg:w-auto lg:max-w-[1200px] lg:min-w-[800px] rounded-3xl my-10 transition ease-in-out'>
            <DialogHeader className='h-2/5'>
                <DialogTitle>Busca una Palabra</DialogTitle>
                <DialogDescription>Ingresa la palabra que quieras buscar buscarla a través de las categorías y niveles.</DialogDescription>
            </DialogHeader>
            <div className='h-full w-full'>
                <div>
                    <Label htmlFor="search" className="sr-only">
                        Barra Búsqueda
                    </Label>
                    <Input
                        id="search"
                        placeholder='"Gato", "Hola", "Buenos días" ...'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='pt-5 w-full'>
                    {isLoading ? (
                        <SimpleLoading className='text-base lg:text-xl' iconClassName='w-7 h-7'/>
                    ) : (
                        <ul className='h-full w-full flex flex-col lg:gap-5 justify-between'>
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item, index) => (
                                    <div key={index}>
                                        <Link
                                            href={`/niveles/${item.idNivel}-${encodeURI(item.nombreNivel)}/categorias/${item.idCategoria}-${encodeURI(item.nombreCategoria)}/palabras/${item.idPalabra}`}
                                            className='group'
                                        >
                                            <li
                                                className='flex flex-col items-center p-3 w-full lg:flex-row lg:w-full text-center rounded-xl group-hover:bg-primary-100 group-hover:text-black'
                                            >
                                                <span className='h-auto lg:w-1/5 capitalize break-all'>{item.nombrePalabra}</span>
                                                <span className='lg:w-1/5'>-</span>
                                                <span className='h-auto lg:w-1/5 capitalize break-words'>{item.nombreCategoria}</span>
                                                <span className='lg:w-1/5'>-</span>
                                                <span className='h-auto lg:w-1/5 capitalize break-words'>{item.nombreNivel}</span>
                                            </li>
                                        </Link>
                                        <Separator className='lg:hidden'/>
                                    </div>
                                ))
                            ) : (
                                <li>No se encontraron resultados</li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </DialogContent>
    )
};