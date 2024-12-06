import Link from "next/link";
import { Palabra } from '@/interfaces/palabraInterface';
import ProgressBadge from "@/components/customUI/progressBadge";
import { DynamicIcon } from "@/components/customUI/dynamicLucideIcon";
import { Categoria } from "@/interfaces/categoriaInterface";
import { isCategoria, isPalabra } from "@/services/common.service";
import { TitleProp } from "@/interfaces/commonInterfaces";

type MiniCardGaleryProps = {
    level?: TitleProp;
    category?: TitleProp;
    item: Categoria | Palabra;
    iconClasses?: string;
}

type newItem = {
    itemId : number,
    itemName : string,
    itemIcon : string,
}

export const MiniCardGalery = ({level, category, item, iconClasses}: MiniCardGaleryProps) => {
    let newItem: newItem = {
        itemId: 0,
        itemName: '',
        itemIcon: '',
    }
    let enlace = '';
    let isPalabraSection = false;
    
    if (item) {
        if (isCategoria(item)) {
            newItem = { itemId:item.idCategoria, itemName:item.nombreCategoria, itemIcon:item.iconoCategoria }
            enlace = `/niveles/${level?.idTitle}-${encodeURIComponent(level!.nameTitle)}/categorias/${item.idCategoria}-${encodeURIComponent(item.nombreCategoria).toLowerCase()}/palabras`;
            isPalabraSection = false;
        } else if (isPalabra(item)) {
            newItem = { itemId:item.idPalabra, itemName:item.nombrePalabra, itemIcon:item.iconPalabra }
            enlace = `/niveles/${level?.idTitle}-${encodeURIComponent(level!.nameTitle)}/categorias/${category?.idTitle}-${encodeURIComponent(category!.nameTitle).toLowerCase()}/palabras/${newItem.itemId}-${encodeURIComponent(newItem.itemName).toLowerCase()}`;
            isPalabraSection = true;
        } else {
            throw new Error('Tipo de item no reconocido');
        }
    }

    return (
        <div className="max-w-[104px] lg:min-w-[120px] lg:min-h-[120px] lg:max-w-[120px] lg:max-h-[120px] h-fit">
            <Link
                href={enlace}
                className='group'
            >
                <div className={`flex items-center justify-center h-full w-full border-2 border-accent-100 rounded-2xl p-5 relative shadow-md ${isCategoria(item) ? 'bg-background' : 'bg-white'}`}>
                    <DynamicIcon name={newItem.itemIcon} classes={iconClasses} />
                    <ProgressBadge itemId={newItem.itemId} levelId={level?.idTitle} isPalabraSection={isPalabraSection}/>
                    <div className="absolute inset-0 bg-accent-600 opacity-0 group-hover:opacity-70 transition-opacity duration-300 ease-in-out rounded-2xl"/>
                    <div
                        className='flex items-center justify-center text-center absolute h-max opacity-0 group-hover:opacity-100 text-white font-medium transition-opacity duration-300 ease-in-out text-xl break-words pointer-events-none lg:pointer-events-auto'
                    >
                        <p>{newItem.itemName}</p>
                    </div>
                </div>
            </Link>
            <p className={`text-center mt-2 lg:hidden ${isPalabraSection ? 'text-white' : 'text-defaultTextColor'} break-words h-auto overflow-auto`}>{newItem.itemName}</p>
        </div>
    )
}