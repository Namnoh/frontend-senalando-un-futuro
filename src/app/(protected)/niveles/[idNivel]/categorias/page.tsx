import { Suspense } from 'react';
import CategoriesContainer  from './components/categoriesContainer';
import { CategoriesContainerSkeleton } from './components/categoriesContainerSkeleton';
import styles from "@/app/styles/home.module.scss"
import { getParamsTitle } from '@/lib/utils';

export default async function Categorias({params}:any) {
    const level = getParamsTitle(params.idNivel);

    return(
        <div className={`${styles.backgroundImage} flex min-h-full`}>
            <div className="flex flex-col flex-grow items-center gap-20" >
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-3xl mt-5 font-medium md:text-4xl lg:text-5xl">
                        <span className="text-secondary">NIVEL {level.idTitle}</span> <span className="text-primary">{level.nameTitle}</span>
                    </h1>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl">Categorías</h2>
                </div>
                {/* Categorías */}
                <Suspense fallback={<CategoriesContainerSkeleton />}>
                    <CategoriesContainer level={level}/>
                </Suspense>
            </div>
        </div>
    )
};