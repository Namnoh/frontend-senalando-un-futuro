import React, { Suspense } from 'react'
import WordsContainer from './components/wordsContainer';
import { CategoriesContainerSkeleton } from '../../components/categoriesContainerSkeleton';
import Bg from './components/bg';
import Header from './components/header';
import { getParamsTitle } from '@/lib/utils';

export default async function GeneralContainer({params}:any) {
    const level = getParamsTitle(params.idNivel);
    console.log(params);
    const cat = getParamsTitle(params.idCategoria);
    
    return (
        <div className="relative flex h-full w-full">
            <Suspense fallback={<div className='absolute inset-0 bg-background w-full h-full -z-10'></div>}>
                <Bg idCategoria={cat.idTitle}/>
            </Suspense>
            <div className='flex flex-col items-center gap-20 flex-grow'>
                <Header level={level} nombreCategoria={cat.nameTitle} />
                {/* Palabras */}
                <Suspense fallback={<CategoriesContainerSkeleton />}>
                    <WordsContainer level={level} category={cat}/>
                </Suspense>
            </div>
        </div>
    )
}