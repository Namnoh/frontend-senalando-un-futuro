'use client';

import React from 'react';
import { BadgeCheck, CircleEllipsis } from "lucide-react";
import { useProgressContext } from '@/contexts/userProgressContext';
import { CategoriaProgreso, PalabraProgreso } from '@/interfaces/levelinterface';

type ProgressBadgeProps = {
    itemId : number;
    levelId : number | undefined;
    isPalabraSection : boolean;
}

export default function ProgressBadge({itemId, levelId, isPalabraSection}: ProgressBadgeProps) {
    const { progress } = useProgressContext();
    let status : number | boolean = false;
    if (progress) {
        if (isPalabraSection) {
            const wordProgress = Object.values(progress.palabrasProgreso).find(
                (palabra: PalabraProgreso) => palabra.idPalabra === itemId
            );
            status = wordProgress ? true : false;
        } else {
            const categoryProgress = Object.values(progress.categoriasProgreso).find(
                (category: CategoriaProgreso) => Number(category.idCategoria) === itemId
            );
            status = categoryProgress ? categoryProgress.progresoCategoria : 0;
        };
    };

    return (
        <>
            <div className={`${status == 1 || status == true ? '' : 'hidden'} absolute -right-2 -bottom-2 bg-background rounded-full text-green-400 z-10`}>
                <BadgeCheck className='h-7 w-7'/>
            </div>
            {typeof status == 'number' && (
                <div className={`${status > 0 && status < 1 ? '' : 'hidden'} absolute -right-2 -bottom-2 bg-background rounded-full text-yellow-400 z-10`}>
                    <CircleEllipsis className='h-7 w-7'/>
                </div>
            )}
        </>
    )
}