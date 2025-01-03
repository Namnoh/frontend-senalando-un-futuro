import { getCategoriesFrom } from '@/services/categories.service';
import { TitleProp } from '@/interfaces/commonInterfaces';
import { MiniCardGalery } from '@/components/customUI/miniCardGalery';
import { Categoria } from '@/interfaces/categoriaInterface';

export default async function CategoriesContainer({level}: {level:TitleProp}) {
    const categories = await getCategoriesFrom(level.idTitle);

    return (
        <div className='flex flex-wrap justify-center gap-5 gap-y-12 lg:gap-y-0 w-2/3 mb-10'>
            { categories
                .slice()
                .sort((a: Categoria, b: Categoria) => a.idCategoria - b.idCategoria)
                .map((c:Categoria) =>
                {
                    return (
                        <MiniCardGalery
                            key={c.idCategoria}
                            level={level}
                            item={c}
                            iconClasses='h-16 w-16 lg:h-20 lg:w-20'
                        />
                    )
                }
            )}
        </div>
    )
}
