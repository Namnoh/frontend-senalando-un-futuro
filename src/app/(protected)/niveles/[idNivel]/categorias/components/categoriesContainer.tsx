import React from 'react'
import { CategoriesCards } from './categoriesCards';
import { getCategoriesFrom } from '@/services/categories.service';

export default async function CategoriesContainer(props:{idNivel:number}) {
    const idNivel = props.idNivel;
    const categories = await getCategoriesFrom(idNivel);

    return (
        <div className='flex flex-wrap justify-center gap-5 w-2/3 mb-10'>
            { categories.map((c) =>
                {
                    return (
                        <CategoriesCards key={c.idCategoria} idNivel={idNivel} category={c} />
                    )
                }
            )}
        </div>
    )
}
