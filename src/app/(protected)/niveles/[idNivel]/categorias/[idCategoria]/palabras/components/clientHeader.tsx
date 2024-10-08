'use client'
import { Categoria } from '@/interfaces/categoriaInterface'
import React from 'react'

export default function ClientHeader({category}: {category: Categoria | undefined}) {
    return (
        <div className="flex flex-col items-center gap-5">
            <h1 className="text-3xl mt-5 font-medium md:text-4xl lg:text-5xl text-white">
                NIVEL {category?.idNivel} BÁSICO
            </h1>
            <h2 className="text-4xl text-white md:text-5xl lg:text-6xl uppercase">{category ? category.nombreCategoria : ''}</h2>
        </div>
    )
}
