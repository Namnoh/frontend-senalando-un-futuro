import { TitleProp } from "@/interfaces/commonInterfaces";

export default function Header({level, nombreCategoria}: {level:TitleProp, nombreCategoria: string}) {
    return (
        <div className="flex flex-col items-center gap-5">
            <h1 className="text-3xl mt-5 font-medium md:text-4xl lg:text-5xl text-white">
                NIVEL {level.idTitle} {level.nameTitle}
            </h1>
            <h2 className="text-4xl text-white md:text-5xl lg:text-6xl uppercase">{nombreCategoria ? nombreCategoria : ''}</h2>
        </div>
    )
}
