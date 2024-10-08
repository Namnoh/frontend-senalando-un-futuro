import Link from "next/link";
import { Palabra } from '@/interfaces/palabraInterface';
import ProgressBadge from "@/components/customUI/progressBadge";


export const WordCard = ({idNivel, idCategoria, word}: {idNivel:number, idCategoria:number, word:Palabra}) => {
    const w = word;
    const IconToRender = w.iconoPalabra;
    return (
        <Link
            href={`/niveles/${idNivel}/categorias/${idCategoria}/palabras/${w.idPalabra}`}
            className='group'
        >
            <div className='flex items-center justify-center border-2 border-accent-100 rounded-2xl p-5 relative shadow-md bg-white'>
                {IconToRender && <IconToRender className="h-16 w-16 lg:h-20 lg:w-20 text-black" />}
                <ProgressBadge status={w.status}/>
                <div className="absolute inset-0 bg-accent-600 opacity-0 group-hover:opacity-70 transition-opacity duration-300 ease-in-out rounded-2xl"/>
                <div className='absolute h-max opacity-0 group-hover:opacity-100 text-white font-medium transition-opacity duration-300 ease-in-out lg:text-xl'>
                    <p>{w.nombrePalabra}</p>
                </div>
            </div>
        </Link>
    )
}