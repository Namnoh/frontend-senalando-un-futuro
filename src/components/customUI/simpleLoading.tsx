import { LoaderCircle } from 'lucide-react'

export default function SimpleLoading({className}: {className?:string}) {
    return (
        <div className={`${className ? className : 'flex h-full w-full items-center justify-center p-10 text-4xl text-center'}`}>
            Cargando...
            <LoaderCircle className="animate-spin text-primary h-10 w-10"/>
        </div>
    )
};