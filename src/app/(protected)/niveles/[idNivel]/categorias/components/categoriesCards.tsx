'use client'

import Link from "next/link";
import { Categoria } from '@/interfaces/categoriaInterface';
import ProgressBadge from "@/components/customUI/progressBadge";
import { DynamicIcon } from "@/components/customUI/dynamicLucideIcon";
import { TitleProp } from "@/interfaces/commonInterfaces";

export const CategoriesCards = ({level, category}: {level:TitleProp, category:Categoria}) => {
    
    return (
        <Link
            href={`/niveles/${level.idTitle}-${level.nameTitle}/categorias/${category.idCategoria}-${category.nombreCategoria}/palabras`}
            className='group'
        >
            <div className='flex items-center justify-center border-2 border-accent-100 rounded-2xl p-5 relative shadow-md bg-background'>
                <DynamicIcon name={category.iconoCategoria} classes={`h-16 w-16 lg:h-20 lg:w-20`}/>
                <ProgressBadge status={category.status}/>
                <div className="absolute inset-0 bg-accent-600 opacity-0 group-hover:opacity-70 transition-opacity duration-300 ease-in-out rounded-2xl"/>
                <div className='absolute h-max opacity-0 group-hover:opacity-100 text-white font-medium transition-opacity duration-300 ease-in-out lg:text-xl'>
                    <p>{category.nombreCategoria}</p>
                </div>
            </div>
        </Link>
    )
}