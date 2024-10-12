import React, { Suspense } from 'react'
import WordsContainer from './components/wordsContainer';
import { CategoriesContainerSkeleton } from '../../components/categoriesContainerSkeleton';
import Bg from './components/bg';
import { getParamsTitle } from '@/lib/utils';
import CustomHeader from '@/components/customUI/customHeader';

export default async function GeneralContainer({params}:any) {
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
                        <h2 className='text-5xl md:text-6xl lg:text-7xl font-medium text-white'>{cat.nameTitle}</h2>
                    </CustomHeader>
                </div>
                {/* Palabras */}
                <Suspense fallback={<CategoriesContainerSkeleton />}>
                    <WordsContainer level={level} category={cat}/>
                </Suspense>
            </div>
        </div>
    )
}