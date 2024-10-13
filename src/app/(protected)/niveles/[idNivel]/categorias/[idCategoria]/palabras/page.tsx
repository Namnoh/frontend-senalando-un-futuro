import React, { Suspense } from 'react'
import WordsContainer from './components/wordsContainer';
import { MiniCardGalerySkeleton } from '@/components/customUI/skeletons/miniCardGalerySkeleton';
import Bg from './components/bg';
import { getParamsTitle } from '@/lib/utils';
import CustomHeader from '@/components/customUI/customHeader';

export default async function GeneralContainer({params}:any) {
    // TODO: Verificar si puedo evitar utilizar estas funciones y reemplazarlas con el middleware
    const level = await getParamsTitle(params.idNivel, 'level');
    const cat = await getParamsTitle(params.idCategoria, 'category');
    
    return (
        <div className="relative flex h-full w-full">
            <Suspense fallback={<div className='absolute inset-0 bg-background w-full h-full -z-10'></div>}>
                <Bg idCategoria={cat.idTitle}/>
            </Suspense>
            <div className='flex flex-col items-center gap-20 flex-grow'>
                <div className="flex flex-col items-center gap-5">
                    <CustomHeader level={level} type='words'>
                        <h2 className='text-5xl md:text-6xl lg:text-7xl font-medium text-white capitalize'>{cat.nameTitle}</h2>
                    </CustomHeader>
                </div>
                {/* Palabras */}
                <Suspense fallback={<MiniCardGalerySkeleton length={5} />}>
                    <WordsContainer level={level} category={cat}/>
                </Suspense>
            </div>
        </div>
    )
}