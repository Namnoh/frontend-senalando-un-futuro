import React, { Suspense } from 'react'
import WordsContainer from './wordsContainer';
import { CategoriesContainerSkeleton } from '../../../components/categoriesContainerSkeleton';
import ClientSideBg from './clientSideBg';
import ClientHeader from './clientHeader';
import { getCategory } from '@/services/categories.service';
import { Categoria } from '@/interfaces/categoriaInterface';

export default async function GeneralContainer({idNivel, idCategoria}: {idNivel:number, idCategoria:number}) {
    const category: Categoria | undefined = await getCategory(idCategoria);
    return (
        <div className="relative flex h-full w-full">
            <ClientSideBg category={category}/>
            <div className='flex flex-col items-center gap-20 flex-grow'>
                <ClientHeader category={category}/>
                {/* Palabras */}
                <Suspense fallback={<CategoriesContainerSkeleton />}>
                    <WordsContainer idCategoria={idCategoria} idNivel={idNivel}/>
                </Suspense>
            </div>
        </div>
    )
}