import React, { Suspense } from 'react'
import GeneralContainer from './components/generalContainer';

export default function Palabras({params}:any) {
    const idNivel = params.idNivel;
    const idCategoria  = params.idCategoria;
    return (
        <Suspense fallback={<div className='flex items-center justify-center text-9xl h-full'>CARGANDO...</div>}>
            <GeneralContainer idNivel={idNivel} idCategoria={idCategoria}/>
        </Suspense>
    )
}
