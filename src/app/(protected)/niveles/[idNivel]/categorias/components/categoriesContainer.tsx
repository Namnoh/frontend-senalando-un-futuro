import { getCategoriesFrom } from '@/services/categories.service';
import { TitleProp } from '@/interfaces/commonInterfaces';
import { MiniCardGalery } from '@/components/customUI/miniCardGalery';

export default async function CategoriesContainer({level}: {level:TitleProp}) {
    const categories = await getCategoriesFrom(level.idTitle);
    return (
        <div className='flex flex-wrap justify-center gap-5 w-2/3 mb-10'>
            { categories.map((c) =>
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
