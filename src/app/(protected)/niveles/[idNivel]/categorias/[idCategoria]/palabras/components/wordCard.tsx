import Link from "next/link";

interface Word {
    id: number;
    nombre: string;
    icono: any;
}

export const WordsCards = ({idNivel, idCategoria, word}: {idNivel:number, idCategoria:number, word:Word}) => {
    const w = word;
    const IconToRender = w.icono;
    return (
        <Link
            href={`/niveles/${idNivel}/categorias/${idCategoria}/palabras/${w.id}`}
            className='group'
        >
            <div className='flex items-center justify-center border-2 border-accent-100 rounded-2xl p-5 relative shadow-md'>
                {IconToRender && <IconToRender className="h-16 w-16 lg:h-20 lg:w-20 text-white" />}
                <div className="absolute inset-0 bg-accent-600 opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-in-out rounded-2xl"/>
                <div className='absolute h-max opacity-0 group-hover:opacity-100 text-white font-medium transition-opacity duration-500 ease-in-out lg:text-xl'>
                    <p>{w.nombre}</p>
                </div>
            </div>
        </Link>
    )
}