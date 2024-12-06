import { Suspense } from 'react';
import CategoriesContainer  from './components/categoriesContainer';
import { MiniCardGalerySkeleton } from '@/components/customUI/skeletons/miniCardGalerySkeleton';
import styles from "@/app/styles/home.module.scss"
import { getParamsTitle } from '@/services/actions.services';
import CustomHeader from '@/components/customUI/customHeader';

export default async function Categorias({params}:any) {
    const level = await getParamsTitle(params.idNivel, 'level');
    return(
        <div className={`${styles.backgroundImage} flex min-h-full`}>
            <div className="flex flex-col flex-grow items-center gap-20" >
                <div className="flex flex-col items-center gap-5">
                    <CustomHeader level={level}>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium">Categorías</h2>
                    </CustomHeader>
                </div>
                {/* Categorías */}
                <Suspense fallback={<MiniCardGalerySkeleton length={4} />}>
                    <CategoriesContainer level={level}/>
                </Suspense>
            </div>
        </div>
    )
};