import React from 'react'
import { CategoriesCards } from './categoriesCards';
import { getCategoriesFrom } from '@/services/categories.service';
import { TitleProp } from '@/interfaces/commonInterfaces';

export default async function CategoriesContainer({level}: {level:TitleProp}) {
    const categories = await getCategoriesFrom(level.idTitle);

    return (
        <div className='flex flex-wrap justify-center gap-5 w-2/3 mb-10'>
            { categories.map((c) =>
                {
                    return (
                        <CategoriesCards key={c.idCategoria} level={level} category={c} />
                    )
                }
            )}
        </div>
    )
}
