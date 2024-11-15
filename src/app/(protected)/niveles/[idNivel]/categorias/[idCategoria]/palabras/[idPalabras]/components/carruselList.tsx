import React from 'react'
import { TitleProp } from '@/interfaces/commonInterfaces';
import { Palabra } from '@/interfaces/palabraInterface';
import Link from 'next/link';
import { DynamicIcon } from '@/components/customUI/dynamicLucideIcon';
import ProgressBadge from '@/components/customUI/progressBadge';

type CarrouselListProps = {
    level?: TitleProp;
    category?: TitleProp;
    item: Palabra;
    iconClasses?: string;
}

export default function CarruselList({level, category, item, iconClasses}: CarrouselListProps) {
    const enlace  = `/niveles/${level?.idTitle}-${encodeURIComponent(level!.nameTitle)}/categorias/${category?.idTitle}-${encodeURIComponent(category!.nameTitle).toLowerCase()}/palabras/${item.idPalabra}-${encodeURIComponent(item.nombrePalabra).toLowerCase()}`;
    return (
        <div className="max-w-[500px]">
            <Link
                href={enlace}
                className='group'
            >
                <div className={`flex items-center justify-center h-full w-full border-2 border-accent-100 rounded-2xl p-5 relative shadow-md`}>
                    <DynamicIcon name={item.iconPalabra} classes={iconClasses}/>
                    <ProgressBadge itemId={item.idPalabra} isPalabraSection={true}/>
                    <div className="absolute inset-0 bg-accent-600 opacity-0 group-hover:opacity-70 transition-opacity duration-300 ease-in-out rounded-2xl"/>
                    <div
                        className='flex items-center justify-center text-center absolute h-[90%] w-[90%] opacity-0 group-hover:opacity-100 text-white font-medium transition-opacity duration-300 ease-in-out lg:text-xl break-words pointer-events-none lg:pointer-events-auto'
                    >
                        <p>{item.nombrePalabra}</p>
                    </div>
                </div>
            </Link>
            <p className={`text-center mt-2 lg:hidden text-defaultTextColor break-words max-h-16 overflow-scroll`}>{item.nombrePalabra}</p>
        </div>
    )
}
