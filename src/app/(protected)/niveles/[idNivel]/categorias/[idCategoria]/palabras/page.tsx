import React, { Suspense } from 'react'
import WordContainer from './components/wordsContainer';
import { getCategory } from '@/services/categories.service';

interface Category {
    id: number;
    nombre: string;
    bg: string;
}

export default async function Palabras({params}:any) {
    const idNivel = params.idNivel;
    const idCategoria  = params.idCategoria;
    // Crear un componente
    const category= await getCategory(idCategoria);
    return (
        <div className="relative flex h-full w-full">
            {/* Imagen de fondo */}
            <div 
                className='absolute inset-0 bg-cover bg-center w-full h-full -z-10' 
                style={{ backgroundImage: `url(${category?.bg})` }}
            >
                {/* Superposición oscura y blur */}
                <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm -z-10"></div>
            </div>
            <div className='flex flex-col items-center gap-20 flex-grow'>
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-3xl mt-5 font-medium md:text-4xl lg:text-5xl text-white">
                        NIVEL {idNivel} BÁSICO
                    </h1>
                    <h2 className="text-4xl text-white md:text-5xl lg:text-6xl uppercase">{category ? category.nombre : ''}</h2>
                </div>
                {/* Palabras */}
                <Suspense fallback={<div>Cargando...</div>}>
                    <WordContainer idCategoria={idCategoria} idNivel={idNivel}/>
                </Suspense>
            </div>
        </div>
    )
}
